#!/usr/bin/env python3
"""
Pre-deployment check for farminggames.help.
Run BEFORE every git push to catch broken paths and build errors.

Usage:
  python3 scripts/preflight_check.py          # full check
  python3 scripts/preflight_check.py --paths  # only path validation (fast)
"""
import os, re, sys, subprocess, threading, time, urllib.request, http.server

SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(SITE_DIR, "docs")
BUILD_DIR = os.path.join(SITE_DIR, "site")
PORT = 9999
errors = []
warnings = []

def log(level, msg):
    icon = "🔴" if level == "ERROR" else "🟡"
    print(f"  {icon} {level}: {msg}")
    if level == "ERROR":
        errors.append(msg)
    else:
        warnings.append(msg)

def check_build():
    print("\n📦 Step 1: mkdocs build --strict")
    result = subprocess.run(
        ["mkdocs", "build", "--strict"],
        cwd=SITE_DIR, capture_output=True, text=True, timeout=120
    )
    if result.returncode != 0:
        log("ERROR", f"Build failed:\n{result.stderr[:500]}")
        return False
    print(f"  ✅ Build OK ({len(os.listdir(BUILD_DIR))} dirs)")
    return True

def check_paths():
    print("\n🔗 Step 2: Path validation")
    bad_refs = []
    total_refs = 0
    for root, dirs, files in os.walk(DOCS_DIR):
        for fname in files:
            if not fname.endswith(".md"):
                continue
            fpath = os.path.join(root, fname)
            with open(fpath) as f:
                content = f.read()
            refs = re.findall(r'<(?:script|img)\s+[^>]*(?:src|href)="([^"]+)"', content)
            total_refs += len(refs)
            for ref in refs:
                if ref.startswith("http") or ref.startswith("//"):
                    continue
                if "#" in ref:
                    ref = ref.split("#")[0]
                if ref.startswith("/"):
                    ref_path = os.path.normpath(os.path.join(DOCS_DIR, ref.lstrip("/")))
                else:
                    md_dir = os.path.dirname(fpath)
                    ref_path = os.path.normpath(os.path.join(md_dir, ref))
                if not os.path.exists(ref_path):
                    rel = os.path.relpath(fpath, DOCS_DIR)
                    bad_refs.append((rel, ref, ref_path))
    if bad_refs:
        for file, ref, resolved in bad_refs:
            log("ERROR", f"{file}: broken reference '{ref}' -> {resolved}")
    else:
        print(f"  ✅ All in-page references resolve ({total_refs} checked)")
    return len(bad_refs) == 0

def check_tool_js():
    print("\n📜 Step 3: Tool JS file check")
    tool_js_dir = os.path.join(DOCS_DIR, "assets", "js", "tools")
    if not os.path.isdir(tool_js_dir):
        log("ERROR", f"tools JS directory missing: {tool_js_dir}")
        return False
    files = os.listdir(tool_js_dir)
    print(f"  ✅ Found {len(files)} tool JS files: {', '.join(files)}")
    for root, dirs, files in os.walk(DOCS_DIR):
        for fname in files:
            if not fname.endswith(".md"):
                continue
            fpath = os.path.join(root, fname)
            with open(fpath) as f:
                content = f.read()
            # Only check JS from our tools directory, not CDN/vendor scripts
            refs = re.findall(r'src="([^"]*/tools/[^/"]+\.js)"', content)
            for js_ref in refs:
                js_name = os.path.basename(js_ref)
                if not os.path.exists(os.path.join(tool_js_dir, js_name)):
                    log("ERROR", f"{os.path.relpath(fpath,DOCS_DIR)}: JS '{js_name}' not in tools dir")
    return True

def check_http():
    print(f"\n🌐 Step 4: HTTP smoke test (port {PORT})")
    handler = http.server.SimpleHTTPRequestHandler
    server = http.server.HTTPServer(("", PORT), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    time.sleep(1)
    pages = [
        "/", "/stardew/", "/tools/",
        "/tools/stardew-valley/profit-planner/",
        "/farmingsim/", "/palia/", "/fields-mistria/", "/coral-island/",
    ]
    js_files = ["/assets/js/tools/stardew-profit-planner.js"]
    old_dir = os.getcwd()
    os.chdir(BUILD_DIR)
    all_ok = True
    for page in pages + js_files:
        try:
            resp = urllib.request.urlopen(f"http://localhost:{PORT}{page}", timeout=5)
            if resp.status != 200:
                log("ERROR", f"HTTP {resp.status} for {page}")
                all_ok = False
        except Exception as e:
            log("ERROR", f"Failed to fetch {page}: {e}")
            all_ok = False
    os.chdir(old_dir)
    server.shutdown()
    if all_ok:
        print(f"  ✅ All {len(pages + js_files)} URLs returned 200")
    return all_ok

def check_og_image():
    print("\n🖼️  Step 5: OG image check")
    og_path = os.path.join(DOCS_DIR, "assets", "img", "og-image.png")
    if os.path.exists(og_path):
        print(f"  ✅ OG image: {os.path.getsize(og_path)/1024:.0f}KB")
        return True
    log("WARNING", "OG image missing at docs/assets/img/og-image.png")
    return True

def summary():
    print("\n" + "=" * 50)
    if errors:
        print(f"🔴 FAILED - {len(errors)} error(s):")
        for e in errors:
            print(f"   . {e}")
        print("\nFix errors before pushing!")
    else:
        print(f"✅ ALL CHECKS PASSED ({len(warnings)} warnings)")
        for w in warnings:
            print(f"   🟡 {w}")
    print("=" * 50)
    return len(errors) == 0

if __name__ == "__main__":
    fast = "--paths" in sys.argv
    passes = True
    if not fast:
        passes &= check_build()
    passes &= check_paths()
    passes &= check_tool_js()
    if not fast:
        passes &= check_http()
    passes &= check_og_image()
    success = summary()
    sys.exit(0 if success else 1)
