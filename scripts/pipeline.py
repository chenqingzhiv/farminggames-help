#!/usr/bin/env python3
"""
Pipeline controller for farminggames.help / game-guide.club.
Replaces LLM agent workflows with code-enforced pipeline.

Usage:
  python3 scripts/pipeline.py --site farming --type database [--count 3]
  python3 scripts/pipeline.py --site game --type deep-guide [--topic "Factorio"]

Flow:
  1. Site state analysis (rule-based) → identify content gap
  2. Call LLM API (model only step) → generate .md content
  3. Validate generated content (frontmatter, word count, format)
  4. Run preflight checks (reuse preflight_check.run_all)
  5. mkdocs build --strict
  6. git commit + push
  7. Report

Model is ONLY used in step 2. All other steps are code-enforced.
"""
import argparse, json, os, re, subprocess, sys, time
from datetime import datetime, timezone
from pathlib import Path

# ── Config per site ──

SITES = {
    "farming": {
        "dir": "/home/hermes/farminggames-help",
        "git_remote": "origin",
        "git_branch": "main",
        "name": "Farming Games Help",
        "url": "https://farminggames.help",
        "games": {
            "stardew": "Stardew Valley",
            "farmingsim": "Farming Simulator 25",
            "palia": "Palia",
            "fields-mistria": "Fields of Mistria",
            "coral-island": "Coral Island",
            "sandrock": "My Time at Sandrock",
            "sun-haven": "Sun Haven",
        },
        "llm_model": "deepseek-chat",
        "llm_temp": 0.4,
        "llm_max_tokens": 4000,
    },
    "game": {
        "dir": "/home/hermes/game-guide",
        "git_remote": "origin",
        "git_branch": "main",
        "name": "Game Guide Club",
        "url": "https://game-guide.club",
        "games": {
            "satisfactory": "Satisfactory",
            "factorio": "Factorio",
            "dyson": "Dyson Sphere Program",
            "timberborn": "Timberborn",
            "shapez2": "Shapez 2",
            "valheim": "Valheim",
            "enshrouded": "Enshrouded",
            "vrising": "V Rising",
            "sons-forest": "Sons of the Forest",
            "grounded": "Grounded",
        },
        "llm_model": "deepseek-chat",
        "llm_temp": 0.4,
        "llm_max_tokens": 4000,
    },
}

# ── Content generation prompts ──

DATABASE_PROMPT_TEMPLATE = """You are a game guide content writer for {site_name} ({site_url}).
Write a {content_type} page for {game_name}.

OUTPUT FORMAT (ABSOLUTELY REQUIRED):
The first line MUST be exactly three dashes: ---
Then frontmatter fields:
title: <Descriptive Title>
description: <Brief description>
date: 2026-06-26
Then another line with three dashes: ---
Then the markdown body.

Example start:
---
title: Stardew Valley Spring Crops Database
description: Complete reference for all spring crops with profit data
date: 2026-06-26
---

# Title Here

Content here with tables and data.

Requirements:
- At least 500 words of useful information
- Use h2/h3 headers for structure
- Include data in markdown tables where applicable
- End with a "Quick Tips" section
- Output ONLY the file content, no explanations

Topic: {topic}
Target file: {target_path}
"""

DEEP_GUIDE_PROMPT_TEMPLATE = """You are a game guide content writer for {site_name} ({site_url}).
Write a comprehensive guide about {topic} for {game_name}.

OUTPUT FORMAT (ABSOLUTELY REQUIRED):
The first line MUST be exactly three dashes: ---
Then frontmatter fields:
title: <Descriptive Title>
description: <Brief description>
date: 2026-06-26
Then another line with three dashes: ---
Then the markdown body.

Requirements:
- At least 1500 words of in-depth coverage
- Include tables for stats/items/recipes
- Use h2/h3 headers for sections
- Include a "Beginner Tips" section
- Add strategy recommendations
- Output ONLY the file content, no explanations

Target file: {target_path}
"""


# ── API Key ──

def get_api_key():
    """Read DeepSeek API key from Hermes .env."""
    env_path = os.path.expanduser("~/.hermes/.env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line.startswith("DEEPSEEK_API_KEY="):
                    return line.split("=", 1)[1].strip("\"'")
    return os.environ.get("DEEPSEEK_API_KEY", "")


# ── Step 1: Content Strategy ──

DATABASE_ROTATION = {
    "farming": [
        {
            "game_key": "stardew",
            "target_path": "docs/stardew/spring-crops.md",
            "topic": "Spring Crops Database — Complete table of all spring crops with profit calculations, growth times, and best picks",
            "content_type": "database",
        },
        {
            "game_key": "stardew",
            "target_path": "docs/stardew/summer-crops.md",
            "topic": "Summer Crops Database — All summer crops with profit per day, regrow mechanics, and season strategy",
            "content_type": "database",
        },
        {
            "game_key": "stardew",
            "target_path": "docs/stardew/fall-crops.md",
            "topic": "Fall Crops Database — Complete fall crop reference with profit calculators and best crop rankings",
            "content_type": "database",
        },
        {
            "game_key": "stardew",
            "target_path": "docs/stardew/greenhouse-crops.md",
            "topic": "Greenhouse Crops Guide — Best crops for greenhouse with year-round profit analysis and layout tips",
            "content_type": "database",
        },
        {
            "game_key": "palia",
            "target_path": "docs/palia/crops.md",
            "topic": "Palia Crops Database — All crop types with grow times, seed costs, and profit per harvest",
            "content_type": "database",
        },
        {
            "game_key": "palia",
            "target_path": "docs/palia/fish.md",
            "topic": "Palia Fish Database — Complete fish catalog with locations, bait requirements, and bundle info",
            "content_type": "database",
        },
        {
            "game_key": "fields-mistria",
            "target_path": "docs/fields-mistria/fish.md",
            "topic": "Fields of Mistria Fish Database — All fish with locations, seasons, and sell prices",
            "content_type": "database",
        },
        {
            "game_key": "coral-island",
            "target_path": "docs/coral-island/crops.md",
            "topic": "Coral Island Crops Database — Complete crop profit guide with seasonal rankings",
            "content_type": "database",
        },
    ],
    "game": [
        {
            "game_key": "satisfactory",
            "target_path": "docs/satisfactory/alternate-recipes.md",
            "topic": "Satisfactory Alternate Recipes Database — All alternate recipes with input/output, savings, and priority ratings",
            "content_type": "database",
        },
        {
            "game_key": "factorio",
            "target_path": "docs/factorio/items.md",
            "topic": "Factorio Items Database — Complete item catalog with crafting costs, tech requirements, and usage",
            "content_type": "database",
        },
        {
            "game_key": "dyson",
            "target_path": "docs/dyson/resources.md",
            "topic": "Dyson Sphere Program Resources Database — All raw and refined resources with mining rates and production chains",
            "content_type": "database",
        },
        {
            "game_key": "timberborn",
            "target_path": "docs/timberborn/materials.md",
            "topic": "Timberborn Materials Database — All material types with production chains and storage requirements",
            "content_type": "database",
        },
        {
            "game_key": "shapez2",
            "target_path": "docs/shapez2/upgrades.md",
            "topic": "Shapez 2 Upgrades Database — Complete upgrade tree with costs, effects, and optimal path",
            "content_type": "database",
        },
        {
            "game_key": "valheim",
            "target_path": "docs/valheim/materials.md",
            "topic": "Valheim Materials Database — All crafting materials with sources, biomes, and usage",
            "content_type": "database",
        },
        {
            "game_key": "vrising",
            "target_path": "docs/vrising/castle.md",
            "topic": "V Rising Castle Building Database — All castle structures with costs, tier requirements, and bonuses",
            "content_type": "database",
        },
    ],
}

DEEP_GUIDE_ROTATION = {
    "farming": [
        {
            "game_key": "stardew",
            "target_path": "docs/stardew/perfection-guide.md",
            "topic": "Complete Perfection Guide — How to reach 100% perfection in Stardew Valley 1.6, including all checks, milestones, and step-by-step roadmap",
            "content_type": "guide",
        },
        {
            "game_key": "farmingsim",
            "target_path": "docs/farmingsim/advanced-farming.md",
            "topic": "Advanced Farming Techniques in Farming Simulator 25 — Precision farming, GPS, yield optimization, and automation",
            "content_type": "guide",
        },
        {
            "game_key": "palia",
            "target_path": "docs/palia/friendship.md",
            "topic": "Complete Friendship & Romance Guide for Palia — All NPC preferences, weekly wants, romance levels, and fastest path to max relationships",
            "content_type": "guide",
        },
        {
            "game_key": "stardew",
            "target_path": "docs/stardew/money-making.md",
            "topic": "Ultimate Money Making Guide — Best profits per season in Stardew Valley 1.6, from early game to endgame, with exact daily earnings",
            "content_type": "guide",
        },
    ],
    "game": [
        {
            "game_key": "satisfactory",
            "target_path": "docs/satisfactory/early-game.md",
            "topic": "Satisfactory Early Game Guide — First 20 hours: tech tree order, base layout, power management, and efficient factory foundation",
            "content_type": "guide",
        },
        {
            "game_key": "factorio",
            "target_path": "docs/factorio/mega-base.md",
            "topic": "Factorio Mega Base Guide — Scaling from starter base to 1k+ SPM, train networks, city blocks, and UPS optimization",
            "content_type": "guide",
        },
        {
            "game_key": "timberborn",
            "target_path": "docs/timberborn/drought.md",
            "topic": "Timberborn Drought Survival Guide — Water management, food reserves, district planning, and Iron Teeth vs Folktails drought strategies",
            "content_type": "guide",
        },
        {
            "game_key": "valheim",
            "target_path": "docs/valheim/advancement.md",
            "topic": "Valheim Progression Guide — Complete advancement path from Meadows to Mistlands, boss order, gear tiers, and biome prep checklist",
            "content_type": "guide",
        },
    ],
}


def get_rotation_index(site_key, content_type):
    cfg_dir = Path(SITES[site_key]["dir"]) / ".hermes"
    cfg_dir.mkdir(parents=True, exist_ok=True)
    marker = cfg_dir / f"rotation_{content_type}.idx"
    if marker.exists():
        return int(marker.read_text().strip())
    return 0


def advance_rotation(site_key, content_type):
    cfg_dir = Path(SITES[site_key]["dir"]) / ".hermes"
    rotation = _get_rotation(site_key, content_type)
    current = get_rotation_index(site_key, content_type)
    next_idx = (current + 1) % len(rotation)
    (cfg_dir / f"rotation_{content_type}.idx").write_text(str(next_idx))
    return current


def _get_rotation(site_key, content_type):
    if content_type == "database":
        return DATABASE_ROTATION[site_key]
    elif content_type == "deep-guide":
        return DEEP_GUIDE_ROTATION[site_key]
    raise ValueError(f"Unknown content type: {content_type}")


def select_content_brief(site_key, content_type):
    idx = advance_rotation(site_key, content_type)
    return _get_rotation(site_key, content_type)[idx]


# ── Step 2: LLM Content Generation ──

def call_llm(prompt, api_key, model="deepseek-chat", temp=0.4, max_tokens=4000):
    """Call DeepSeek API. Returns generated text or None."""
    payload = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temp,
        "max_tokens": max_tokens,
    })
    auth_header = "Authorization: Bearer " + api_key
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", "https://api.deepseek.com/v1/chat/completions",
         "-H", auth_header,
         "-H", "Content-Type: application/json",
         "-d", payload],
        capture_output=True, text=True, timeout=60
    )
    if result.returncode != 0:
        print("  curl failed (exit {}): {}".format(result.returncode, result.stderr[:200]))
        return None
    try:
        data = json.loads(result.stdout)
        if "choices" not in data or not data["choices"]:
            print("  API returned no choices: " + json.dumps(data)[:300])
            return None
        return data["choices"][0]["message"]["content"]
    except (json.JSONDecodeError, KeyError) as e:
        print("  API response parse error: " + str(e))
        print("  Response preview: " + result.stdout[:300])
        return None


def generate_content(site_key, brief):
    """Core content generation. Calls LLM → writes .md. Returns file path or None."""
    site = SITES[site_key]
    game_name = site["games"][brief["game_key"]]
    target_path = os.path.join(site["dir"], brief["target_path"])

    if brief["content_type"] in ("database",):
        prompt = DATABASE_PROMPT_TEMPLATE.format(
            site_name=site["name"], site_url=site["url"],
            game_name=game_name, content_type=brief["content_type"],
            topic=brief["topic"], target_path=brief["target_path"],
        )
    else:
        prompt = DEEP_GUIDE_PROMPT_TEMPLATE.format(
            site_name=site["name"], site_url=site["url"],
            game_name=game_name, topic=brief["topic"],
            target_path=brief["target_path"],
        )

    print("\nGenerating content for {}...".format(brief["target_path"]))
    api_key = get_api_key()
    if not api_key:
        print("  No API key found. Set DEEPSEEK_API_KEY in ~/.hermes/.env")
        return None

    content = None
    for attempt in range(2):
        content = call_llm(prompt, api_key, site["llm_model"], site["llm_temp"], site["llm_max_tokens"])
        if content:
            break
        print("  Retrying (attempt {})...".format(attempt + 2))
        time.sleep(3)

    if not content:
        print("  Failed to generate content after 2 attempts")
        return None

    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    with open(target_path, "w") as f:
        f.write(content.strip() + "\n")
    print("  Written to " + target_path)
    return target_path


# ── Step 3: Content Validation ──

def validate_content(filepath, content_type):
    errors = []
    print("\nValidating content at {}...".format(filepath))
    if not os.path.exists(filepath):
        errors.append("File not found: " + filepath)
        return False, errors

    with open(filepath) as f:
        content = f.read()

    if not content.startswith("---"):
        errors.append("Missing YAML frontmatter (must start with ---)")
    else:
        fm_end = content.find("---", 3)
        if fm_end == -1:
            errors.append("Unclosed YAML frontmatter")
        else:
            fm = content[3:fm_end].strip()
            if "title:" not in fm:
                errors.append("Frontmatter missing 'title' field")
            if "description:" not in fm:
                errors.append("Frontmatter missing 'description' field")

    body = content
    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            body = content[end + 3:]
    words = len(body.split())

    min_words = 400 if content_type == "database" else 1200
    if words < min_words:
        errors.append("Too short: {} words (minimum {})".format(words, min_words))
    else:
        print("  Word count: {}".format(words))

    if content_type != "database":
        code_blocks = body.count("```")
        if code_blocks == 0 and words > 2000:
            errors.append("Very long page with no code blocks")

    if errors:
        print("  Validation failed:")
        for e in errors:
            print("    - " + e)
        return False, errors
    print("  Content structure OK")
    return True, errors


# ── Step 4-5: Build + Deploy ──

def run_build(site_dir):
    print("\nBuilding site in {}...".format(site_dir))
    result = subprocess.run(
        ["mkdocs", "build", "--strict"],
        cwd=site_dir, capture_output=True, text=True, timeout=120
    )
    if result.returncode != 0:
        print("  Build failed:\n" + result.stderr[:500])
        return False
    print("  Build succeeded")
    return True


def preflight_check(site_dir, fast=False):
    try:
        sys.path.insert(0, site_dir)
        from scripts.preflight_check import run_all
        passed, errors, warnings = run_all(fast=fast)
        return passed
    except ImportError:
        print("  preflight_check not importable, running as subprocess...")
        result = subprocess.run(
            [sys.executable, "scripts/preflight_check.py", "--fast"],
            cwd=site_dir, timeout=120
        )
        return result.returncode == 0


def git_commit_push(site_dir, content_desc):
    print("\nGit commit & push in {}...".format(site_dir))
    status = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=site_dir, capture_output=True, text=True, timeout=10
    )
    if not status.stdout.strip():
        print("  No changes to commit")
        return False

    changed = [line.strip() for line in status.stdout.strip().split("\n") if line.strip()]
    print("  Changed files: {}".format(len(changed)))

    add = subprocess.run(["git", "add", "-A"], cwd=site_dir, capture_output=True, text=True, timeout=10)
    if add.returncode != 0:
        print("  git add failed: " + add.stderr[:200])
        return False

    commit_msg = "auto: " + content_desc
    commit = subprocess.run(
        ["git", "commit", "-m", commit_msg],
        cwd=site_dir, capture_output=True, text=True, timeout=10
    )
    if commit.returncode != 0:
        print("  git commit failed: " + commit.stderr[:200])
        return False
    print("  Committed: " + commit_msg)

    push = subprocess.run(["git", "push"], cwd=site_dir, capture_output=True, text=True, timeout=30)
    if push.returncode != 0:
        print("  git push failed: " + push.stderr[:200])
        return False
    print("  Pushed to remote")
    return True


def rollback_changes(site_dir):
    print("\nRolling back changes...")
    result = subprocess.run(["git", "checkout", "--", "."], cwd=site_dir, capture_output=True, text=True, timeout=10)
    if result.returncode == 0:
        print("  Changes reverted")
        return True
    print("  Rollback failed: " + result.stderr[:200])
    return False


def generate_report(site_key, content_type, brief, success, details):
    site = SITES[site_key]
    status = "OK" if success else "FAIL"
    lines = [
        "{} Pipeline Report -- {}".format(status, site["name"]),
        "Type: {}".format(content_type),
        "Topic: {}...".format(brief["topic"][:60]),
        "Target: {}".format(brief["target_path"]),
    ]
    if details:
        lines.append("")
        lines.extend(details)
    return "\n".join(lines)


# ── Main Pipeline ──

def run_pipeline(site_key, content_type, count=1):
    site = SITES[site_key]
    site_dir = site["dir"]
    all_ok = True
    report_details = []
    brief = None

    os.chdir(site_dir)
    print("Pipeline: {} -- {}".format(site["name"], content_type))

    for i in range(count):
        print("\n--- Iteration {}/{} ---".format(i + 1, count))

        # Step 1: Content strategy
        print("Step 1/6: Content strategy...")
        brief = select_content_brief(site_key, content_type)
        print("  Topic: {}...".format(brief["topic"][:80]))
        print("  Target: {}".format(brief["target_path"]))

        # Step 2: Generate content (MODEL ONLY)
        print("Step 2/6: LLM Content generation...")
        filepath = generate_content(site_key, brief)
        if not filepath:
            print("  Content generation failed, aborting")
            report_details.append("FAIL Content generation for {}".format(brief["target_path"]))
            all_ok = False
            break

        # Step 3: Validate
        validated, val_errors = validate_content(filepath, content_type)
        if not validated:
            print("  Validation failed, rolling back")
            rollback_changes(site_dir)
            report_details.append("FAIL Validation: {}".format("; ".join(val_errors)))
            all_ok = False
            break

        # Step 4: Preflight
        print("Step 4/6: Preflight checks...")
        if not preflight_check(site_dir, fast=True):
            print("  Preflight failed, rolling back")
            rollback_changes(site_dir)
            report_details.append("FAIL Preflight checks for {}".format(brief["target_path"]))
            all_ok = False
            break
        print("  Preflight OK")

        # Step 5: Build
        print("Step 5/6: Full build...")
        if not run_build(site_dir):
            print("  Build failed, rolling back")
            rollback_changes(site_dir)
            report_details.append("FAIL Build for {}".format(brief["target_path"]))
            all_ok = False
            break
        print("  Build OK")

        # Step 6: Git push
        print("Step 6/6: Git commit & push...")
        content_desc = "{}: {}".format(content_type, brief["topic"][:60])
        pushed = git_commit_push(site_dir, content_desc)
        if not pushed:
            print("  Git push skipped (changes may be committed locally)")
            report_details.append("WARN {} (committed locally)".format(brief["target_path"]))
        else:
            report_details.append("OK {} -- pushed".format(brief["target_path"]))

        print("  Iteration {} complete!".format(i + 1))

    if all_ok:
        print("PIPELINE COMPLETE")
    else:
        print("PIPELINE FAILED")

    report = generate_report(site_key, content_type, brief, all_ok, report_details)
    return all_ok, report


# ── CLI ──

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MkDocs content pipeline")
    parser.add_argument("--site", required=True, choices=["farming", "game"])
    parser.add_argument("--type", required=True, choices=["database", "deep-guide"])
    parser.add_argument("--count", type=int, default=1)
    args = parser.parse_args()

    if args.site not in SITES:
        print("Unknown site: {}. Choose from: {}".format(args.site, list(SITES.keys())))
        sys.exit(1)

    success, report = run_pipeline(args.site, args.type, count=args.count)
    print("\n\n---PIPELINE_REPORT---\n{}\n---END_PIPELINE_REPORT---".format(report))
    sys.exit(0 if success else 1)
