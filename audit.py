#!/usr/bin/env python3
"""Full content quality audit for farminggames.help"""
import os, re, json

GAMES = ['stardew', 'coral-island', 'fields-mistria', 'palia', 'sandrock', 'sun-haven']
EXTRA = ['tools', 'guides', 'news']
issues = []

def all_md(dirs):
    files = []
    for d in dirs:
        path = f'docs/{d}'
        if os.path.isdir(path):
            for root, _, fnames in os.walk(path):
                for f in fnames:
                    if f.endswith('.md'):
                        files.append(os.path.join(root, f))
    return files

# ========== 1. BROKEN INTERNAL LINKS ==========
print("=== 1. BROKEN INTERNAL LINKS ===")
link_pat = re.compile(r'\]\(([^)]+)\)')
files = all_md(GAMES + EXTRA + [''])
broken = []
for fp in files:
    with open(fp) as fh:
        content = fh.read()
    links = link_pat.findall(content)
    for link in links:
        if link.startswith('http') or link.startswith('#') or link.startswith('mailto:'):
            continue
        target = os.path.normpath(os.path.join(os.path.dirname(fp), link))
        if not os.path.exists(target) and not os.path.exists(target + '.md') and not os.path.isdir(target):
            broken.append((fp, link))
if broken:
    for fp, link in broken:
        print(f"  BROKEN: {fp} -> {link}")
else:
    print("  ✅ No broken internal links")

# ========== 2. YAML FRONTMATTER QUALITY ==========
print("\n=== 2. YAML FRONTMATTER ISSUES ===")
yaml_pat = re.compile(r'^---\s*\n(.*?)\n---', re.DOTALL)
yaml_issues = []
for fp in files:
    with open(fp) as fh:
        content = fh.read()
    m = yaml_pat.match(content)
    if not m:
        yaml_issues.append(f"{fp}: MISSING frontmatter")
        continue
    yb = m.group(1)
    if re.search(r'^description: >', yb, re.MULTILINE):
        yaml_issues.append(f"{fp}: description uses '>' blockquote syntax")
    if '&amp;' in yb:
        yaml_issues.append(f"{fp}: contains &amp; in YAML")
    title_m = re.search(r'^title: (.+)$', yb, re.MULTILINE)
    if title_m:
        t = title_m.group(1)
        if ' & ' in t and not (t.startswith('"') or t.startswith("'")):
            yaml_issues.append(f"{fp}: bare & in title (needs quotes): {t[:60]}")
if yaml_issues:
    for i in yaml_issues:
        print(f"  ⚠️  {i}")
else:
    print("  ✅ All YAML clean")

# ========== 3. GAME NAME CONSISTENCY ==========
print("\n=== 3. GAME NAME / DIR CONSISTENCY ===")
dir_to_canon = {
    'stardew': 'Stardew Valley',
    'coral-island': 'Coral Island',
    'fields-mistria': 'Fields of Mistria',
    'palia': 'Palia',
    'sandrock': 'My Time at Sandrock',
    'sun-haven': 'Sun Haven',
}
for d, canon in dir_to_canon.items():
    path = f'docs/{d}/index.md'
    if os.path.exists(path):
        with open(path) as fh:
            content = fh.read()
        # Check H1 includes the canonical name
        h1 = re.search(r'^# (.+)$', content, re.MULTILINE)
        if h1 and canon.lower() not in h1.group(1).lower():
            print(f"  ⚠️  {path}: H1 '{h1.group(1)}' doesn't mention '{canon}'")

# ========== 4. DUPLICATE / SIMILAR PAGE NAMES ==========
print("\n=== 4. CROSS-GAME PAGE CONSISTENCY ===")
game_files = {}
for d in GAMES:
    path = f'docs/{d}'
    if os.path.isdir(path):
        game_files[d] = set(os.listdir(path))

all_basenames = set()
for d, fileset in game_files.items():
    all_basenames.update(fileset)
common = [b for b in sorted(all_basenames) if sum(b in fs for fs in game_files.values()) >= 4]
if common:
    print(f"  Pages present in 4+ games: {common}")
else:
    print("  ✅ No pages common across all games")

# ========== 5. RAW HTML / FORMATTING ERRORS ==========
print("\n=== 5. MARKDOWN QUALITY ===")
md_issues = []
for fp in files:
    with open(fp) as fh:
        lines = fh.readlines()
    # Check for <br> without space
    for i, line in enumerate(lines, 1):
        if '<br>' in line:
            md_issues.append(f"{fp}:{i} uses <br> (use markdown instead)")
            break
    # Check for consecutive blank lines (>2)
    blank_run = 0
    for i, line in enumerate(lines, 1):
        if line.strip() == '':
            blank_run += 1
            if blank_run > 2:
                md_issues.append(f"{fp}:{i} excessive blank lines ({blank_run})")
                break
        else:
            blank_run = 0
    if md_issues:
        break

for i in md_issues[:10]:
    print(f"  ⚠️  {i}")
if not md_issues:
    print("  ✅ No markdown quality issues found (<br>, triple blanks, etc.)")

# ========== 6. COMMON ENGLISH MISTAKES ==========
print("\n=== 6. COMMON ENGLISH ISSUES ===")
eng_pats = {
    "should of": "should have",
    "could of": "could have",
    "would of": "would have",
    "its'": "its (possessive, no apostrophe)",
    "it's its": "confusion",
    "alot": "a lot",
    "dependant": "dependent (adj)",
    "affects": "affect/effect check",
    "loose": "lose (likely typo for lose)",
}
eng_issues = []
for fp in files:
    with open(fp) as fh:
        content = fh.read()
    for pat, msg in eng_pats.items():
        m = re.search(r'\b' + re.escape(pat) + r'\b', content, re.IGNORECASE)
        if m:
            ctx_start = max(0, m.start() - 30)
            ctx_end = min(len(content), m.end() + 30)
            ctx = content[ctx_start:ctx_end].replace('\n', ' ')
            eng_issues.append(f"{fp}: '{pat}' ({msg}) ...{ctx}...")
            break  # one issue per file
if eng_issues:
    for i in eng_issues:
        print(f"  ⚠️  {i}")
else:
    print("  ✅ No common English mistakes found")

# ========== 7. DESCRIPTION QUALITY ==========
print("\n=== 7. DESCRIPTION QUALITY (game pages only) ===")
for fp in files:
    with open(fp) as fh:
        content = fh.read()
    m = yaml_pat.match(content)
    if not m:
        continue
    desc_m = re.search(r'^description: ?(.+)$', m.group(1), re.MULTILINE)
    if desc_m:
        raw = desc_m.group(1).strip().strip('"').strip("'")
        if raw.startswith('>'):
            print(f"  ⚠️  {fp}: description starts with '>' blockquote")
            continue
        if 'Complete' in raw and len(raw) > 120:
            print(f"  ⚠️  {fp}: verbose description ({len(raw)} chars): {raw[:80]}...")

# ========== 8. TOOL PAGES ==========
print("\n=== 8. TOOL PAGES CHECK ===")
tool_files = all_md(['tools'])
for fp in sorted(tool_files):
    with open(fp) as fh:
        content = fh.read()
    m = yaml_pat.match(content)
    if m:
        desc_m = re.search(r'^description: ?(.+)$', m.group(1), re.MULTILINE)
        if desc_m:
            raw = desc_m.group(1).strip().strip('"').strip("'")
            print(f"  {fp.split('/')[-1]}: {raw[:80]}")

print("\n=== AUDIT COMPLETE ===")
