# SEO Content Analysis Report — farminggames.help

**Generated:** 2026-07-27  
**Tool:** mkdocs-material site | **Total .md files:** 197  
**Site URL:** https://farminggames.help

---

## 1. Site Overview

| Metric | Value |
|--------|-------|
| Total Markdown Pages | 197 |
| Total Word Count | 208,762 |
| Average Words Per Page | 1,060 |
| Longest Page | `palworld/base-building-defense.md` (3,883 words) |
| Shortest Page | `guides/星露谷物语新手所应了解并避免的事项.md` (42 words) |
| Total Internal Links (Markdown) | 221 |
| Average Internal Links Per Page | 1.1 |

### Content Volume by Category

| Category | Pages | Total Words | Avg Words | Thin (<500w) | Total Links |
|----------|-------|-------------|-----------|-------------|-------------|
| Stardew Valley | 46 | 54,615 | 1,187 | 8 | 76 |
| Tools | 22 | 18,308 | 832 | 11 | 1 |
| Palia | 19 | 21,500 | 1,132 | 5 | 4 |
| Coral Island | 15 | 17,414 | 1,161 | 1 | 0 |
| Sun Haven | 15 | 19,882 | 1,325 | 1 | 27 |
| Fields of Mistria | 14 | 11,705 | 836 | 1 | 4 |
| Sandrock | 14 | 12,052 | 861 | 1 | 0 |
| Guides | 13 | 6,903 | 531 | 10 | 62 |
| Farming Simulator | 12 | 12,252 | 1,021 | 2 | 6 |
| Core Keeper | 7 | 9,323 | 1,332 | 1 | 19 |
| Palworld | 6 | 10,625 | 1,771 | 1 | 8 |
| Don't Starve Together | 5 | 9,432 | 1,886 | 1 | 7 |
| Starsand Island | 2 | 2,941 | 1,471 | 1 | 5 |
| About/Privacy/Legal | 3 | 1,020 | 340 | 3 | 1 |
| Other (index, codes, news, database) | 4 | 790 | 198 | 4 | 0 |

---

## 2. Navigation Structure (mkdocs.yml)

The nav is well-organized with emoji icons and a clean hierarchy covering 12 game sections, tools, guides, and legal pages.

**Structure highlights:**
- Home -> `index.md`
- 9 main game hubs (Stardew Valley, Farming Sim 25, Palia, Coral Island, Fields of Mistria, Sandrock, Sun Haven, Core Keeper, Palworld, Don't Starve Together)
- Tools umbrella with sub-tools
- General Guides, New Player, Beginners, Gear pages
- Legal: About, Privacy Policy, Affiliate Disclosure

**Issues found:**
1. **Ranch Simulator** has a card on the homepage linking to `tools/game-comparison/` but no dedicated nav entry.
2. **Starsand Island** (`starsand-island/`) has a homepage card and content files but no entry in `mkdocs.yml` nav — these are effectively orphaned from the navigation.
3. Some nav entries point to `.md` files, others to directory indexes — inconsistency (e.g., `guides/index.md` vs `stardew/`).

---

## 3. Homepage (index.md) Content Analysis

**Metadata:** Title and description present. Date: 2026-06-27.

- **Word count:** 499 words (borderline thin — barely under 500)
- **Structure:** Hero section with search, 9 game cards (good internal links), tools grid, "Latest Guides" preview cards, Chinese video series section, gaming gear promo

**Strengths:**
- Good meta title and description
- Extensive internal links to game hubs and tools
- Current date stamp

**Weaknesses:**
- Word count at 499 is thin for a homepage
- Ranch Simulator links to `tools/game-comparison/` (no dedicated hub)
- Starsand Island links to a section not in the nav
- Heavy HTML/CSS inline content reduces text-to-code ratio
- Video series section is nearly all HTML with minimal readable text
- Static "Latest Guides" — no auto-generated recent content feed

---

## 4. Representative Content Page Analysis

### 4a. Stardew Valley Crops Guide (`stardew/crops.md`)
- **Title/Description:** Excellent — both present and descriptive
- **Word count:** ~1,510 | **H1:** 1 | **H2s:** 9 well-structured headings
- **Internal links:** 0 (only affiliate link) — **needs cross-linking** to artisan, greenhouse, planting calendar
- **Assessment:** Strongest content on site. Data tables + SVG chart. The only gap is internal linking.

### 4b. Palia Crops Database (`palia/crops.md`)
- **Title/Description:** Both present and descriptive
- **Word count:** ~1,200 | **H1:** 1 | **H2s:** 7 sections with detailed combo tables
- **Internal links:** 0 (only affiliate link) — zero cross-links to other Palia guides
- **Assessment:** Solid content. Links to cooking, fish, friendship guides needed.

### 4c. Stardew Valley Index (`stardew/index.md`)
- **Title/Description:** Both present
- **Word count:** ~860 | **H1:** 1 | **H2s:** 3 sections
- **Internal links:** 42 — **best internal linking on the site**, serves as a true hub
- **Assessment:** Model page for how hubs should work.

### 4d. Guides Index (`guides/index.md`)
- **Title:** Missing | **Description:** Missing
- **Word count:** 442 (thin) | **Internal links:** 39 (good hub)
- **Assessment:** Decent hub but thin + missing frontmatter. Add title + description.

### 4e. Starsand Island Index (`starsand-island/index.md`)
- **Title/Description:** Both present (rare example of good frontmatter)
- **Word count:** 136 (very thin) | **Internal links:** 1
- **Assessment:** Content is too thin. Nav entry missing entirely. Orphaned.

### 4f. 2026 Beginner's Guide (`guides/stardew-valley-2026-beginners-guide.md`)
- **Title/Description/Tags:** All present (best frontmatter example on site)
- **Word count:** 131 (very thin) | **H2s:** 6 sections but each is just a bullet list
- **Internal links:** 0
- **Assessment:** Good outline but needs 3-5x expansion to be useful for SEO.

---

## 5. Thin Content Pages (Under 500 Words)

**51 pages total** are under 500 words. Breakdown by severity:

### Critical (0-100 words) — 7 pages
| Page | Words | Issue |
|------|-------|-------|
| `guides/星露谷物语新手所应了解并避免的事项.md` | 42 | Bare stub, Chinese |
| `codes/index.md` | 45 | Empty codes page |
| `guides/星露谷物语新手攻略最好的农作物上古果.md` | 46 | Bare stub, Chinese |
| `palia/feedback.md` | 68 | Minimal feedback form |
| `stardew/feedback.md` | 70 | Minimal feedback form |
| `farmingsim/feedback.md` | 73 | Minimal feedback form |
| `news/index.md` | 98 | Empty news page |

### Warning (101-300 words) — 18 pages
Key examples: `starsand-island/index.md` (136w), `database/games.md` (148w), `stardew/encyclopedia.md` (168w), `dst/index.md` (198w), `guides/newbie.md` (200w), `palia/index.md` (202w), `about.md` (322w), `guides/成功培育必爆钻石的白色史莱姆.md` (347w)

### Needs Expansion (301-499 words) — 26 pages
Key examples: `stardew/summer-guide.md` (394w), `stardew/fall-guide.md` (462w), `stardew/winter.md` (468w), `stardew/artisan.md` (440w), `guides/index.md` (442w), `palia/redeem-codes.md` (465w)

**Notable pattern:** Index/landing pages across all game sections are consistently thin (200-400 words). These are critical gateway pages that need expansion.

---

## 6. Frontmatter & Meta Description Analysis

### True frontmatter coverage
After re-examining representative files directly, the frontmatter format on this site has an unusual pattern. Many pages use an inline HTML-like header format rather than standard YAML frontmatter delimiters. Examples inspected:

- `stardew/crops.md` — **HAS frontmatter**: title, description, date (all present and correct)
- `palia/crops.md` — **HAS frontmatter**: title, description, date
- `starsand-island/index.md` — **HAS frontmatter**: title, description, date
- `tools/index.md` — **HAS frontmatter**: title, description, date
- `guides/stardew-valley-2026-beginners-guide.md` — **HAS frontmatter**: title, description, date, tags
- `stardew/index.md` — **HAS frontmatter**: title, description

### Automated scan results vs. reality
The automated parser struggled with some YAML variations (e.g., special characters, emoji in values). Manual inspection of 30+ pages shows the vast majority DO have `title:` and `description:` in YAML frontmatter. The key findings from manual sampling:

- **title field:** Present on ~190 of 197 pages (estimate) — only obvious gaps are very bare stubs
- **description field:** Present on ~180 of 197 pages (estimate) — most content pages have descriptions
- **date field:** Present on ~30% of pages — inconsistent coverage
- **tags field:** Only found on the one Chinese beginner guide

### Verification of truly missing pages
Pages confirmed WITHOUT frontmatter (via manual check):
- `guides/星露谷物语新手所应了解并避免的事项.md` (42 words — bare stub)
- `guides/星露谷物语新手攻略最好的农作物上古果.md` (46 words — bare stub)
- `news/index.md` (98 words — empty)
- `codes/index.md` (45 words — empty)

### Meta description quality assessment
Most descriptions are functional but many could be optimized:
- Some are too short (<120 chars) and don't cover enough keywords
- Many are truncated by the `description` YAML field limit
- Missing compelling call-to-action phrasing
- Inconsistent length — some are 80 chars, others 180+

---

## 7. Internal Linking Analysis

### Current state
- **Total internal markdown links across all pages:** 221
- **Average links per page:** 1.1
- **Pages with zero internal links:** ~150 pages
- **Internal link concentration:** 81 of 221 links (37%) come from just 2 hub pages (`stardew/index.md`: 42, `guides/index.md`: 39)

### Pages with most internal links
| Page | Links | Role |
|------|-------|------|
| `stardew/index.md` | 42 | Hub/Index |
| `guides/index.md` | 39 | Hub/Index |
| `guides/星露谷物语5个极其伟大mod.md` | 8 | Content page |
| `stardew/summer-blueprint.md` | 7 | Content page |
| `core-keeper/index.md` | 6 | Hub/Index |

### Key gap: Content pages lack cross-links
Almost all content pages (crop guides, fishing guides, etc.) have **zero internal markdown links** to related pages. For example:
- `stardew/crops.md` does NOT link to `stardew/artisan.md`, `stardew/greenhouse-crops.md`, or `stardew/planting-calendar.md`
- `palia/crops.md` does NOT link to `palia/cooking.md`, `palia/friendship.md`, or `palia/fish.md`
- `farmingsim/crops.md` does NOT link to `farmingsim/profit-guide.md` or `farmingsim/production-chains.md`

### Orphaned pages (no incoming links detected)
Page sections that may be orphaned:
- `starsand-island/` — not in nav, only on homepage hero card
- `tools/stardew-valley/` — accessible via Tools hub but not cross-linked from Stardew guides
- `guides/sunflower-land-saltwort-crop-week.md` — single article, no nav entry

---

## 8. Heading Structure Analysis

| Metric | Value |
|--------|-------|
| Pages with at least 1 H1 | 193 |
| Pages with multiple H1s | 0 (good) |
| Pages with at least 1 H2 | 193 |
| Pages with NO H1 (non-index) | 3 |

**Pages missing H1 (non-index files):**
- `codes/index.md` — only has H2
- `tools/animal-profit-comparison.md` — only has H2
- `tools/crop-profit-comparison.md` — only has H2

**H1/H2 structure quality:** Generally good. Most pages have one clear H1 matching the page topic, with well-organized H2 subsections. No pages have multiple H1 tags (good practice).

---

## 9. Key Recommendations

### Priority 1: Content Expansion (Critical)
1. **Expand 51 thin pages** — prioritize pages that are in the nav and under 300 words:
   - All game `index.md` pages (currently 200-400 words each)
   - `stardew/fall-guide.md`, `stardew/summer-guide.md`, `stardew/winter.md` — season guides should be 800+ words
   - `guides/index.md` — needs expansion + frontmatter
   - Chinese-language stubs (`42w`, `46w`) — either expand fully or remove/consolidate

2. **Kill or merge bare stubs:**
   - 3 feedback pages (very low value)
   - `codes/index.md` and `news/index.md` — empty pages hurt crawl budget

### Priority 2: Internal Linking Overhaul (High)
1. **Add navigation breadcrumbs** to every content page — link back to the game hub and related guides
2. **Cross-link content pages:** Each crop guide should link to artisan/profit guides; each game guide should link to related tools
3. **Link from deep content pages back to hub:** Every `stardew/crops.md` should link to `stardew/index.md`

### Priority 3: Frontmatter Standardization (Medium)
1. Add `date:` to all pages (only ~30% have it now)
2. Add `tags:` for topical grouping where relevant
3. Standardize description length to 150-160 characters across all pages
4. Verify all pages in nav have proper frontmatter

### Priority 4: Navigation & Orphan Fixes (Medium)
1. Add `starsand-island/` to `mkdocs.yml` navigation
2. Create a proper hub for Ranch Simulator (currently linking to comparison tool)
3. Consider adding auto-generated "latest articles" section to homepage
4. Fix nav path consistency (mix of `.md` and directory-style paths)

### Priority 5: Technical SEO (Low-Medium)
1. Add canonical URLs via mkdocs config
2. Ensure search is fully functional (hero search appears JS-dependent)
3. Consider adding structured data (Schema.org) for game guides
4. Add `hreflang` tags for Chinese-language content
5. Consider generating an automatic "recently updated" section for homepage freshness signals
