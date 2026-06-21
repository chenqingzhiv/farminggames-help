#!/usr/bin/env python3
"""
Auto-fix script for Vale-detected English issues.
Reads Vale output, sends problematic sentences to DeepSeek for natural rephrasing.
Usage: python3 fix_english.py [--diff] [--file FILE.md]
  --diff    Show suggested diffs without modifying files
  --file    Fix a specific file (otherwise scan all)
"""
import re, sys, os, json, subprocess
from pathlib import Path

HERMES_HOME = os.environ.get("HERMES_HOME", os.path.expanduser("~/.hermes"))
SITE_DIR = sys.argv[sys.argv.index("--dir") + 1] if "--dir" in sys.argv else "."
DRY_RUN = "--diff" in sys.argv
TARGET_FILE = None
for i, a in enumerate(sys.argv):
    if a == "--file" and i + 1 < len(sys.argv):
        TARGET_FILE = sys.argv[i + 1]

# Load DeepSeek API key from Hermes config
def get_deepseek_key():
    env_path = os.path.join(HERMES_HOME, ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("DEEPSEEK_API_KEY="):
                    return line.strip().split("=", 1)[1].strip('"\'')
    return ""

API_KEY = get_deepseek_key()
if not API_KEY:
    print("ERROR: No DEEPSEEK_API_KEY found in Hermes .env")
    sys.exit(1)

def run_vale(filepath):
    """Run Vale on a file and return suggestions."""
    result = subprocess.run(
        ["vale", "--no-wrap", "--minAlertLevel", "suggestion", 
         "--config", ".vale.ini", str(filepath)],
        capture_output=True, text=True, cwd=SITE_DIR
    )
    suggestions = []
    for line in result.stdout.splitlines():
        # Parse Vale output: filename:line:col  level  message  rule
        m = re.match(r'(.+):(\d+):(\d+)\s+(error|warning|suggestion)\s+(.+?)\s{2,}(\S+)', line)
        if m:
            suggestions.append({
                'file': m.group(1),
                'line': int(m.group(2)),
                'col': int(m.group(3)),
                'level': m.group(4),
                'message': m.group(5).strip(),
                'rule': m.group(6)
            })
    return suggestions

def get_sentence(filepath, line_num):
    """Extract the sentence at the given line."""
    with open(filepath) as f:
        lines = f.readlines()
    if line_num <= len(lines):
        return lines[line_num - 1].strip()
    return ""

def fix_with_deepseek(text, issue):
    """Send problematic sentence to DeepSeek for a natural rewrite."""
    prompt = f"""You are an English game guide editor. Fix this sentence to sound more natural and less like AI translation.

Issue: {issue['message']} (rule: {issue['rule']})

Rules:
- Keep the same information and facts
- Use active voice, not passive
- Use shorter, more direct sentences
- Sound like a human game guide writer, not an AI
- Keep game-specific terms unchanged
- Return ONLY the revised sentence, no explanations

Original: "{text}"
Revised:"""

    try:
        resp = subprocess.run(
            ["curl", "-s", "-X", "POST", "https://api.deepseek.com/v1/chat/completions",
             "-H", f"Authorization: Bearer {API_KEY}",
             "-H", "Content-Type: application/json",
             "-d", json.dumps({
                 "model": "deepseek-chat",
                 "messages": [{"role": "user", "content": prompt}],
                 "temperature": 0.3,
                 "max_tokens": 200
             })],
            capture_output=True, text=True, timeout=15
        )
        data = json.loads(resp.stdout)
        return data['choices'][0]['message']['content'].strip('" \n')
    except Exception as e:
        print(f"  API error: {e}", file=sys.stderr)
        return None

# Main
files_to_check = [TARGET_FILE] if TARGET_FILE else list(Path(SITE_DIR).rglob("*.md"))

for fpath in files_to_check:
    fpath = Path(fpath)
    if not fpath.exists():
        continue
    
    suggestions = run_vale(str(fpath))
    if not suggestions:
        continue
    
    print(f"\n📄 {fpath.relative_to(SITE_DIR)} — {len(suggestions)} suggestions")
    
    for s in suggestions[:3]:  # max 3 per file to control cost
        sentence = get_sentence(str(fpath), s['line'])
        if not sentence or len(sentence) < 10:
            continue
        
        # Skip trivial rules
        if s['rule'] in ('write-good.E-Prime', 'Translationese.OverusedAIWords'):
            continue
        
        print(f"  ⚠️  L{s['line']}: {sentence[:60]}...")
        fixed = fix_with_deepseek(sentence, s)
        if fixed:
            print(f"  ✅ → {fixed[:80]}")
            if not DRY_RUN:
                # Show diff - actual replacement would need more careful line handling
                print(f"  📝  (dry run mode — use without --diff to apply)")
        else:
            print(f"  ❌  Failed")

print("\n✨ Done.")
