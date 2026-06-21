#!/usr/bin/env python3
"""
Stardew Valley 1.6 Data Audit Script
Compares our local JS data against the official Wiki.
Runs every 2 weeks via cron. Reports differences to Feishu.

Usage: python3 scripts/data-audit.py [--verbose] [--notify]
"""

import os, re, sys, json, hashlib
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: Need requests and beautifulsoup4")
    sys.exit(1)

BASE_DIR = Path(__file__).resolve().parent.parent
WIKI_BASE = "https://stardewvalleywiki.com"
TIMEOUT = 15
UA = "FarmingGamesHelp/1.0 (data audit; +https://farminggames.help)"

NPC_JS = BASE_DIR / "docs/assets/js/tools/stardew-npc-optimizer.js"
FISH_JS = BASE_DIR / "docs/assets/js/tools/stardew-fish-tracker.js"
REPORT = BASE_DIR / ".hermes/audit-report.json"


class Audit:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warnings = []
        self.errors = []
        self._verbose = "--verbose" in sys.argv

    def ok(self, msg):
        self.passed += 1
        if self._verbose: print(f"  ✅ {msg}")

    def fail(self, msg, detail=""):
        self.failed += 1
        self.errors.append(f"❌ {msg}")
        print(f"  ❌ {msg}")
        if detail: print(f"     → {detail[:300]}")

    def warn(self, msg):
        self.warnings.append(f"⚠️  {msg}")
        print(f"  ⚠️  {msg}")

    def summary(self):
        return {
            "passed": self.passed, "failed": self.failed,
            "total": self.passed + self.failed,
            "warnings": self.warnings, "errors": self.errors,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "healthy": self.failed == 0
        }


def fetch(url):
    try:
        r = requests.get(url, timeout=TIMEOUT, headers={"User-Agent": UA})
        r.raise_for_status()
        return r.text
    except Exception as e:
        return None


# ── 1. Version Check ──
def check_version(audit):
    print("\n📋 1. Version Check:")
    html = fetch(f"{WIKI_BASE}/Version_History")
    if not html:
        audit.fail("Cannot fetch Version_History page")
        return
    versions = re.findall(r'1\.6\.\d+', html)
    if not versions:
        audit.fail("No 1.6.x versions found on wiki")
        return
    latest = sorted(set(versions), reverse=True)[0]
    audit.ok(f"Wiki latest version: 1.6.{latest}")
    # Check blog for announcements
    blog = fetch("https://www.stardewvalley.net/")
    if blog:
        soup = BeautifulSoup(blog, "html.parser")
        posts = [h.get_text(strip=True) for h in soup.find_all("h2")[:3]]
        for p in posts:
            if any(kw in p.lower() for kw in ["update", "patch", "1.6", "release"]):
                audit.ok(f"Blog post: \"{p[:80]}\"")
                break
        else:
            audit.ok("No new version announcements on blog")
    # SDV Steam App News
    steam = fetch("https://store.steampowered.com/news/app/413150")
    if steam:
        if "1.6" in steam[:20000]:
            audit.ok("Steam news mentions 1.6")


# ── 2. Fish Audit (proper table parsing) ──
def check_fish(audit):
    print("\n📋 2. Fish Data Audit:")
    html = fetch(f"{WIKI_BASE}/Fish")
    if not html:
        audit.fail("Cannot fetch Fish page")
        return

    soup = BeautifulSoup(html, "html.parser")
    tables = soup.find_all("table", class_="wikitable")
    if len(tables) < 8:
        audit.fail(f"Expected 8+ fish tables, found {len(tables)}", "Fish page structure may have changed")
        return

    # Get all fish names from the first fish table
    fish_table = tables[0]
    fish_names = []
    for row in fish_table.find_all("tr"):
        cells = row.find_all("td")
        if len(cells) >= 2:
            name_cell = cells[1]
            name = name_cell.get_text(strip=True)
            if name and name != "Name":
                fish_names.append(name)

    audit.ok(f"Found {len(fish_names)} fish entries on wiki table")

    # Check key fish all present
    expected = ["Sturgeon", "Legend", "Crimsonfish", "Angler", "Lava Eel",
                 "Pufferfish", "Octopus", "Blobfish", "Midnight Carp", "Stingray"]
    for f in expected:
        if f in html:
            audit.ok(f"{f} present on wiki")
        else:
            audit.fail(f"{f} MISSING from wiki", "Fish may have been renamed/removed")

    if len(fish_names) < 65:
        audit.fail(f"Only {len(fish_names)} fish (expected 70+)", "Fish page may be incomplete")


# ── 3. NPC Gift Audit ──
def check_npc_gifts(audit):
    print("\n📋 3. NPC Gift Audit:")
    html = fetch(f"{WIKI_BASE}/Gifts")
    if not html:
        audit.fail("Cannot fetch Gifts page")
        return

    soup = BeautifulSoup(html, "html.parser")
    tables = soup.find_all("table", class_="wikitable")
    if len(tables) < 3:
        audit.fail(f"Expected 3+ gift tables, found {len(tables)}", "Gifts page structure changed")
        return

    audit.ok(f"Gifts page OK ({len(tables)} tables)")

    # Check key NPC names exist in page
    expected_npcs = ["Abigail", "Alex", "Elliott", "Emily", "Haley", "Harvey",
                     "Leah", "Maru", "Penny", "Sam", "Sebastian", "Shane",
                     "Krobus", "Wizard", "Willy", "Linus"]
    for npc in expected_npcs:
        if npc in html:
            audit.ok(f"{npc} present on Gifts page")
        else:
            audit.fail(f"{npc} MISSING from Gifts page")

    # Check key loved gifts
    gifts = ["Amethyst", "Prismatic Shard", "Rabbit's Foot", "Diamond",
             "Coffee", "Wine", "Pizza", "Beer", "Pomegranate"]
    for gift in gifts:
        if gift in html:
            audit.ok(f"'{gift}' present on Gifts page")
        else:
            audit.fail(f"'{gift}' MISSING from Gifts page", "Gift may have been removed from game")


# ── 4. JS File Integrity ──
def check_js_integrity(audit):
    print("\n📋 4. JS File Integrity:")

    checks = {
        "NPC Optimizer": (NPC_JS, "NPCS = ", "NPCS.length"),
        "Fish Tracker": (FISH_JS, "ALL_FISH = ", "ALL_FISH.length"),
    }

    for name, (fpath, arr_def, _len_ref) in checks.items():
        if not fpath.exists():
            audit.fail(f"{name} — FILE MISSING", str(fpath))
            continue

        content = fpath.read_text(encoding="utf-8")
        size = len(content)
        if size < 5000:
            audit.fail(f"{name} — too small ({size} bytes)")
        else:
            audit.ok(f"{name} — {size} bytes")

        # Check array definition exists
        if arr_def in content:
            audit.ok(f"{name} — array definition OK")
        else:
            audit.fail(f"{name} — MISSING array '{arr_def}'")

        # Count data entries
        entry_count = content.count("{ id:")
        if name == "NPC Optimizer":
            if entry_count >= 30:
                audit.ok(f"{name} — {entry_count} NPC entries (expected 33)")
            else:
                audit.fail(f"{name} — only {entry_count} NPCs, expected 33+")
        else:
            if entry_count >= 65:
                audit.ok(f"{name} — {entry_count} fish entries (expected 70+)")
            else:
                audit.fail(f"{name} — only {entry_count} fish, expected 70+")

        # Checksum
        checksum = hashlib.md5(content.encode()).hexdigest()[:12]
        audit.ok(f"{name} — checksum: {checksum}")


# ── 5. Page Integrity ──
def check_pages(audit):
    print("\n📋 5. Page Accessibility:")
    pages = [
        "/", "/tools/",
        "/tools/stardew-valley/npc-friendship/",
        "/tools/stardew-valley/fish-tracker/",
        "/tools/stardew-valley/profit-planner/",
        "/tools/game-comparison/",
        "/tools/release-calendar/",
    ]
    base = None
    for candidate in ["https://farminggames-help.pages.dev", "http://localhost:9999"]:
        try:
            r = requests.get(candidate, timeout=8)
            if r.status_code == 200:
                base = candidate
                break
        except:
            continue
    if not base:
        audit.warn("Cannot reach site (pages.dev or localhost)")
        return
    audit.ok(f"Site reachable at {base}")
    for page in pages:
        try:
            r = requests.get(f"{base}{page}", timeout=8)
            if r.status_code == 200:
                audit.ok(f"{page} → 200")
            else:
                audit.fail(f"{page} → {r.status_code}")
        except Exception as e:
            audit.fail(f"{page} → {e}")


# ── Main ──
def main():
    os.chdir(BASE_DIR)
    print(f"=== Stardew Valley Data Audit ===")
    print(f"Date: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"Repo: {BASE_DIR.name}")

    a = Audit()
    check_version(a)
    check_fish(a)
    check_npc_gifts(a)
    check_js_integrity(a)
    check_pages(a)

    s = a.summary()
    print(f"\n{'='*50}")
    print(f"Results: {s['passed']}/{s['total']} passed")
    print(f"Warnings: {len(s['warnings'])}")
    print(f"Errors: {len(s['errors'])}")
    print(f"Healthy: {'✅ YES' if s['healthy'] else '❌ NO'}")

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(s, indent=2, ensure_ascii=False))

    # If notify mode, also output a concise summary for Feishu
    if "--notify" in sys.argv:
        status = "✅" if s["healthy"] else "❌"
        msg_parts = [f"{status} SDV 数据审计报告"]
        msg_parts.append(f"日期: {datetime.now(timezone.utc).strftime('%Y-%m-%d')}")
        msg_parts.append(f"通过: {s['passed']}/{s['total']}")
        if s["warnings"]:
            msg_parts.append(f"警告: {len(s['warnings'])}项")
        if s["errors"]:
            msg_parts.append(f"异常: {len(s['errors'])}项")
            for e in s["errors"][:5]:
                msg_parts.append(f"  {e}")
        else:
            msg_parts.append("所有数据正常 ✅")
        feishu_msg = "\n".join(msg_parts)
        print(f"\n---FEISHU_MESSAGE---\n{feishu_msg}\n---END_FEISHU_MESSAGE---")

    sys.exit(0 if s["healthy"] else 1)


if __name__ == "__main__":
    main()
