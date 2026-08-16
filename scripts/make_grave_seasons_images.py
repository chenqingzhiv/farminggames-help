#!/usr/bin/env python3
"""Generate Grave Seasons Beginner's Guide WebP infographics (800x600).

Cozy-horror palette: charcoal night background, bone-cream text,
blood-red + harvest-gold accents for danger/coziness, a supernatural
purple for the occult, and a muted mossy green for the farm loop.
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "docs", "grave-seasons", "images")
os.makedirs(OUT, exist_ok=True)

W, H = 800, 600
SS = 2
SW, SH = W * SS, H * SS
FONT_DIR = r"C:\Windows\Fonts"

# Grave Seasons palette
BG = (26, 24, 30)
BG2 = (16, 14, 19)
PANEL = (40, 36, 46)
CARD = (33, 31, 40)
BLOOD = (186, 66, 72)
GOLD = (222, 176, 104)
CREAM = (233, 227, 215)
MUTED = (156, 148, 160)
PURPLE = (158, 124, 196)
GREEN = (122, 152, 100)

_FONT_CACHE = {}

def font(size, bold=False):
    key = (size, bold)
    if key not in _FONT_CACHE:
        name = "arialbd.ttf" if bold else "arial.ttf"
        _FONT_CACHE[key] = ImageFont.truetype(os.path.join(FONT_DIR, name), size * SS)
    return _FONT_CACHE[key]

def tlen(text, fnt):
    b = fnt.getbbox(text)
    return (b[2] - b[0]) / SS

def fit(text, max_w, base_size, bold=False):
    for s in range(base_size, 9, -1):
        f = font(s, bold)
        if tlen(text, f) <= max_w:
            return f
    return font(9, bold)

def canvas():
    img = Image.new("RGB", (SW, SH), BG)
    d = ImageDraw.Draw(img)
    for y in range(SH):
        t = y / SH
        c = tuple(int(BG[i] + (BG2[i] - BG[i]) * t) for i in range(3))
        d.line([(0, y), (SW, y)], fill=c)
    return img, d

def rrect(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=int(r * SS), fill=fill, outline=outline, width=width * SS)

def ctext(d, xy, text, fnt, fill=CREAM, anchor="mm"):
    d.text((xy[0] * SS, xy[1] * SS), text, font=fnt, fill=fill, anchor=anchor)

def save(img, name):
    img = img.resize((W, H), Image.LANCZOS)
    img.save(os.path.join(OUT, name), "WEBP", quality=90, method=6)
    print("wrote", os.path.join(OUT, name))

def header(d, title, subtitle=None):
    rrect(d, (20, 16, W - 20, 86), 16, fill=PANEL)
    ctext(d, (W / 2, 35), title, font(27, True), fill=GOLD)
    if subtitle:
        ctext(d, (W / 2, 64), subtitle, fit(subtitle, W - 80, 16), fill=CREAM)

def wrap_lines(text, fnt, max_w):
    words = text.split(" ")
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if tlen(t, fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def panel_lines(d, x0, y0, lines, fnt=None, fill=CREAM, gap=21, max_w=None):
    f = fnt or font(14)
    y = y0
    for ln in lines:
        bullet = "•  "
        rest = ln
        if ln.startswith("> "):
            bullet = "»  "
            rest = ln[2:]
        if max_w:
            wrapped = wrap_lines(rest, f, max_w)
        else:
            wrapped = [rest]
        for wi, wl in enumerate(wrapped):
            lead = bullet if wi == 0 else "   "
            ctext(d, (x0, y), lead + wl, f, fill=fill, anchor="lm")
            y += gap
    return y

# ---------------------------------------------------------------- 1. Hero
def hero():
    img, d = canvas()
    # title zone
    rrect(d, (30, 40, W - 30, 132), 18, fill=PANEL)
    ctext(d, (W / 2, 62), "GRAVE SEASONS", font(40, True), fill=BLOOD)
    ctext(d, (W / 2, 102), "Farm by day · Unmask the killer by night", fit("Farm by day · Unmask the killer by night", W - 100, 20, True), fill=CREAM)

    # left: the farm, right: the mystery
    lx, rx = 34, 420
    lw = (W - 48 - 20) / 2
    rrect(d, (lx, 158, lx + lw, 452), 14, fill=CARD)
    rrect(d, (lx, 158, lx + lw, 158 + 40), 14, fill=GREEN)
    ctext(d, (lx + lw / 2, 178), "THE FARM", fit("THE FARM", lw - 16, 17, True), fill=BG)
    panel_lines(d, lx + 16, 222, [
        "Seasonal crops & plots",
        "Kitchen / shed crafting",
        "Fishing, mining, foraging",
        "600+ items to collect",
        "Tools & buildings upgrade",
    ], font(13), gap=27, max_w=lw - 32)

    rrect(d, (rx, 158, rx + lw, 452), 14, fill=CARD)
    rrect(d, (rx, 158, rx + lw, 158 + 40), 14, fill=PURPLE)
    ctext(d, (rx + lw / 2, 178), "THE MYSTERY", fit("THE MYSTERY", lw - 16, 17, True), fill=BG)
    panel_lines(d, rx + 16, 222, [
        "A supernatural serial killer",
        "Random villager each run",
        "One in-game year to unmask",
        "Investigate, protect, romance",
        "Every choice is tracked",
    ], font(13), gap=27, max_w=lw - 32)

    # footer facts
    rrect(d, (34, 470, W - 34, H - 22), 14, fill=PANEL)
    facts = "Ashenridge · 30+ residents · 12 romanceable · 7 areas · 70+ interiors"
    ctext(d, (W / 2, 505), facts, fit(facts, W - 90, 17, True), fill=GOLD)
    ctext(d, (W / 2, 542), "Perfect Garbage × Blumhouse Games · Out Aug 14, 2026", fit("Perfect Garbage × Blumhouse Games · Out Aug 14, 2026", W - 90, 14), fill=MUTED)
    save(img, "grave-seasons-hero.webp")

# ---------------------------------------------------------------- 2. Ashenridge areas
def areas():
    img, d = canvas()
    header(d, "SEVEN AREAS OF ASHENRIDGE", "Your farm sits at the top of the mountain — the town fans out below")

    cells = [
        ("🚜  YOUR FARM", "Seasonal crops · plots · kitchen · shed", GREEN),
        ("⛰️  THE MOUNTAINSIDE", "Your back yard — trees, forage, wilds", GREEN),
        ("🌲  THE FOREST", "Mushrooms, game trails, hidden paths", GREEN),
        ("🏠  LOCAL DISTRICT", "Resident homes · 70+ interiors · secrets", GOLD),
        ("🛒  COMMERCIAL DISTRICT", "Shops, seeds, crafting materials", GOLD),
        ("⚓  COAST & DOCKS", "Fishing · dockside trade", PURPLE),
        ("⛏️  THE MINES", "Ores, ingredients, deeper mysteries", PURPLE),
    ]
    grid_x, grid_y = 30, 106
    cell_w = (W - 60 - 14) / 2
    cell_h = 62
    for i, (title, sub, accent) in enumerate(cells):
        cx = grid_x + (i % 2) * (cell_w + 14)
        cy = grid_y + (i // 2) * (cell_h + 12)
        rrect(d, (cx, cy, cx + cell_w, cy + cell_h), 12, fill=CARD)
        rrect(d, (cx, cy, cx + cell_w, cy + cell_h), 12, outline=accent, width=2)
        ctext(d, (cx + 14, cy + 22), title, fit(title, cell_w - 20, 15, True), fill=accent, anchor="lm")
        ctext(d, (cx + 14, cy + 43), sub, fit(sub, cell_w - 20, 12), fill=CREAM, anchor="lm")

    rrect(d, (30, 452, W - 30, H - 20), 14, fill=PANEL)
    tip = "The world reshapes itself around who is alive, who is the killer, and what season it is"
    ctext(d, (W / 2, 486), "THE TOWN IS ALIVE — AND IT REMEMBERS", font(16, True), fill=GOLD)
    ctext(d, (W / 2, 520), tip, fit(tip, W - 100, 14), fill=CREAM)
    ctext(d, (W / 2, 552), "Break into homes · don't get caught · dig up the town's secrets", fit("Break into homes · don't get caught · dig up the town's secrets", W - 100, 13), fill=MUTED)
    save(img, "ashenridge-areas.webp")

# ---------------------------------------------------------------- 3. Daily loop
def daily_loop():
    img, d = canvas()
    header(d, "THE DAILY LOOP", "One in-game year · 24-hour days · stay up as long as you dare")

    steps = [
        ("MORNING", "FARM", ["Water crops, harvest", "Feed animals, tend plots", "Check the calendar"], GREEN),
        ("AFTERNOON", "TOWN", ["Shops & seeds", "Talk to 30+ residents", "Run errands, gain trust"], GOLD),
        ("EVENING", "INVESTIGATE", ["Follow the clues", "Break into homes", "Learn villagers' secrets"], PURPLE),
        ("NIGHT", "SURVIVE", ["The killer strikes", "Protect the next victim", "Occult ward crafting"], BLOOD),
    ]
    box_w = 168
    gap = 20
    x0 = 34
    y0, y1 = 102, 268
    for i, (when, name, lines, col) in enumerate(steps):
        bx = x0 + i * (box_w + gap)
        rrect(d, (bx, y0, bx + box_w, y1), 14, fill=CARD)
        rrect(d, (bx, y0, bx + box_w, y0 + 38), 14, fill=col)
        ctext(d, (bx + box_w / 2, y0 + 16), when, fit(when, box_w - 12, 15, True), fill=BG)
        ctext(d, (bx + box_w / 2, y0 + 62), name, fit(name, box_w - 16, 15, True), fill=col)
        panel_lines(d, bx + 12, y0 + 86, lines, font(11), gap=20, max_w=box_w - 24)
    for i in range(3):
        ax = x0 + box_w + gap + i * (box_w + gap) - 14
        ay = (y0 + y1) // 2
        d.polygon([(ax * SS, (ay - 10) * SS), (ax * SS, (ay + 10) * SS), ((ax + 13) * SS, ay * SS)], fill=GOLD)

    rrect(d, (34, 286, W - 34, 430), 14, fill=PANEL)
    ctext(d, (W / 2, 314), "THE INVESTIGATION WALL", font(16, True), fill=GOLD)
    items = [
        "Crops are your cash engine — but money is a means, not the goal",
        "Trust unlocks secrets: villagers hold back until you earn their confidence",
        "Fishing, mining and foraging feed the occult recipes that save victims",
        "The killer has a type — learn their kill patterns to predict targets",
        "You were a convict: sneaking and breaking in are fair game",
    ]
    y = 344
    for it in items:
        ctext(d, (W / 2, y), it, fit(it, W - 100, 13), fill=CREAM)
        y += 19

    rrect(d, (34, 448, W - 34, H - 20), 14, fill=CARD)
    ctext(d, (W / 2, 478), "EVERY CHOICE IS AUTOSAVED AND COUNTS", font(16, True), fill=BLOOD)
    ctext(d, (W / 2, 512), "People die or survive · new stories unlock either way", fit("People die or survive · new stories unlock either way", W - 90, 14), fill=CREAM)
    ctext(d, (W / 2, 544), "How will you leave your mark on Ashenridge?", fit("How will you leave your mark on Ashenridge?", W - 90, 14), fill=MUTED)
    save(img, "daily-loop.webp")

# ---------------------------------------------------------------- 4. Killer mechanics
def killer():
    img, d = canvas()
    header(d, "HOW THE KILLER WORKS", "Every playthrough is a new whodunit")

    # row of facts
    rrect(d, (30, 96, W - 30, 196), 14, fill=CARD)
    rrect(d, (30, 96, W - 30, 132), 14, fill=BLOOD)
    ctext(d, (W / 2, 114), "ONE VILLAGER IS THE SUPERNATURAL SERIAL KILLER", font(15, True), fill=BG)
    ctext(d, (W / 2, 162), "The identity is randomly chosen from a pool of candidates each run", fit("The identity is randomly chosen from a pool of candidates each run", W - 100, 15, True), fill=CREAM)
    ctext(d, (W / 2, 188), "The killer has a campaign, motives, kill styles and targets of their own", fit("The killer has a campaign, motives, kill styles and targets of their own", W - 100, 13), fill=MUTED)

    # three columns: investigate / protect / unmask
    cols = [
        ("INVESTIGATE", PURPLE, [
            "Follow clues across town",
            "Break into locked homes",
            "Learn each resident's secrets",
            "Watch for supernatural tell-tales",
        ]),
        ("PROTECT", GREEN, [
            "Identify the next victim",
            "Craft ward items & rituals",
            "Occult recipes in your shed",
            "Save who you can — or can't",
        ]),
        ("UNMASK", GOLD, [
            "Gather enough evidence",
            "Name the killer before the",
            "   year is out",
            "Romance may reveal a side",
            "   no one else sees",
        ]),
    ]
    col_w = (W - 60 - 28) / 3
    y0, y1 = 212, 458
    for i, (name, col, lines) in enumerate(cols):
        px = 30 + i * (col_w + 14)
        rrect(d, (px, y0, px + col_w, y1), 14, fill=CARD)
        rrect(d, (px, y0, px + col_w, y0 + 40), 14, fill=col)
        ctext(d, (px + col_w / 2, y0 + 20), name, fit(name, col_w - 12, 16, True), fill=BG)
        panel_lines(d, px + 14, y0 + 58, lines, font(12), gap=23, max_w=col_w - 28)

    rrect(d, (30, 474, W - 30, H - 20), 14, fill=PANEL)
    ctext(d, (W / 2, 506), "MAJOR CHARACTERS WEAR TWO FACES", font(16, True), fill=GOLD)
    ctext(d, (W / 2, 540), "Even when they aren't the killer, every monster-typed resident has a hidden form and a hidden struggle", fit("Even when they aren't the killer, every monster-typed resident has a hidden form and a hidden struggle", W - 90, 13), fill=CREAM)
    save(img, "killer-mechanics.webp")

# ---------------------------------------------------------------- 5. Protect & romance
def protect_romance():
    img, d = canvas()
    header(d, "PROTECT THE VICTIMS · ROMANCE 12", "Two goals, one year, all your choices tracked")

    lx = 34
    lw = (W - 68 - 20) / 2
    rrect(d, (lx, 96, lx + lw, 470), 14, fill=CARD)
    rrect(d, (lx, 96, lx + lw, 140), 14, fill=GREEN)
    ctext(d, (lx + lw / 2, 118), "PROTECT THE NEXT VICTIM", fit("PROTECT THE NEXT VICTIM", lw - 16, 16, True), fill=BG)
    panel_lines(d, lx + 16, 160, [
        "Craft occult ward items",
        "Cook protective meals",
        "Keep a vigil through the night",
        "The killer picks their targets —",
        "   learn the pattern",
        "Some victims can be saved...",
        "   some cannot",
    ], font(12), gap=24, max_w=lw - 32)

    rx = lx + lw + 20
    rrect(d, (rx, 96, rx + lw, 470), 14, fill=CARD)
    rrect(d, (rx, 96, rx + lw, 140), 14, fill=BLOOD)
    ctext(d, (rx + lw / 2, 118), "ROMANCE 12 CANDIDATES", fit("ROMANCE 12 CANDIDATES", lw - 16, 16, True), fill=BG)
    panel_lines(d, rx + 16, 160, [
        "Build trust through quests",
        "Learn their hidden sides",
        "You can romance the killer",
        "   without knowing it",
        "Monsters can change their fate",
        "Romance a victim, save a life",
    ], font(12), gap=24, max_w=lw - 32)

    rrect(d, (30, 488, W - 30, H - 20), 14, fill=PANEL)
    ctext(d, (W / 2, 522), "NEW GAME+ CARRIES YOUR WORK FORWARD", font(16, True), fill=GOLD)
    ctext(d, (W / 2, 554), "Your previous year's progress is tracked into the next playthrough", fit("Your previous year's progress is tracked into the next playthrough", W - 90, 14), fill=CREAM)
    save(img, "protect-and-romance.webp")

if __name__ == "__main__":
    hero()
    areas()
    daily_loop()
    killer()
    protect_romance()
