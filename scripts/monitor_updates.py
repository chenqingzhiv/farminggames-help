#!/usr/bin/env python3
"""
Farming Games Help — Game Update Monitor (production version)
Checks official game websites for content changes using headless detection.
Silent when no changes, alerts when updates are detected.
"""
import json
import os
import hashlib
import subprocess
from datetime import datetime

BASE_DIR = os.path.expanduser("~/farminggames-help")
STATE_FILE = os.path.join(BASE_DIR, "monitor_state.json")

SOURCES = [
    ("Stardew Valley",     "https://www.stardewvalley.net/"),
    ("Palia",              "https://palia.com/news"),
    ("Coral Island",       "https://store.steampowered.com/news/app/1158160"),
    ("My Time at Sandrock","https://store.steampowered.com/news/app/1084600"),
    ("Sun Haven",          "https://store.steampowered.com/news/app/1432860"),
    ("Fields of Mistria",  "https://store.steampowered.com/news/app/2797420"),
    ("Farming Simulator",  "https://www.farming-simulator.com/news.php"),
]

def fetch(url):
    """Fetch page via curl."""
    try:
        r = subprocess.run(
            ["curl", "-s", "-L", "--max-time", "15",
             "-A", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
             url],
            capture_output=True, text=True, timeout=20
        )
        if r.returncode == 0 and r.stdout:
            return r.stdout[:5000]  # first 5K chars as signature
        return ""
    except:
        return ""

def main():
    prev = {}
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE) as f:
                prev = json.load(f)
        except:
            pass

    alerts = []
    new_state = {}

    for name, url in SOURCES:
        content = fetch(url)
        if not content:
            print(f"  ⚠️  {name}: Fetch failed or empty")
            new_state[name] = prev.get(name, "unknown")
            continue

        sig = hashlib.md5(content.encode()).hexdigest()
        new_state[name] = sig

        old = prev.get(name)
        if old and old != sig:
            alerts.append(name)
            print(f"  🔄 {name}: UPDATE DETECTED → {url}")
        elif not old:
            print(f"  📝 {name}: First check (baseline saved)")
        else:
            pass  # silent — no change

    with open(STATE_FILE, 'w') as f:
        json.dump(new_state, f, indent=2)

    if alerts:
        now = datetime.now().strftime("%Y-%m-%d %H:%M")
        print(f"\n{'='*50}")
        print(f"⚠️  GAME UPDATE ALERT — {now}")
        print(f"{'='*50}")
        print(f"Update detected in: {', '.join(alerts)}")
        print(f"\nCheck the following URLs:")
        for name, url in SOURCES:
            if name in alerts:
                print(f"  • {name}: {url}")
        print(f"\nPlease verify and update site content accordingly.")
    else:
        # Silent exit — no news is good news
        pass

if __name__ == "__main__":
    main()
