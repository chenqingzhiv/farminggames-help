#!/usr/bin/env python
"""Generate 800x450 WebP infographics for the Halcyon Days at Taoyuan guide."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 800, 450
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs", "halcyon-days", "images")
os.makedirs(OUT, exist_ok=True)

FDIR = "C:/Windows/Fonts/"
F_TITLE = ImageFont.truetype(FDIR + "arialbd.ttf", 30)
F_SUB = ImageFont.truetype(FDIR + "ariali.ttf", 16)
F_H = ImageFont.truetype(FDIR + "arialbd.ttf", 21)
F_BODY = ImageFont.truetype(FDIR + "arial.ttf", 16)
F_SMALL = ImageFont.truetype(FDIR + "arial.ttf", 13)

# Palette — warm ink & peach (国风)
BG = (30, 28, 34)          # dark ink
BG2 = (44, 40, 48)         # panel
INK = (233, 226, 216)      # cream text
GOLD = (214, 168, 84)      # gold accent
PEACH = (233, 130, 92)     # peach accent
GREEN = (122, 168, 116)    # soft green
RED = (193, 93, 74)        # festival red
BLUE = (116, 160, 190)     # soft blue


def wrap(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def rounded(draw, box, rad, fill):
    draw.rounded_rectangle(box, radius=rad, fill=fill)


def header(draw, title, sub=None, accent=PEACH):
    rounded(draw, (0, 0, W, 74), 0, BG2)
    draw.line([(0, 74), (W, 74)], fill=(70, 64, 76), width=2)
    draw.rounded_rectangle([(18, 16), (26, 58)], radius=4, fill=accent)
    draw.text((40, 16), title, font=F_TITLE, fill=INK)
    if sub:
        draw.text((42, 50), sub, font=F_SUB, fill=(176, 170, 178))


def footer(draw, text):
    draw.text((18, H - 24), text, font=F_SMALL, fill=(140, 134, 142))


def chip(draw, x, y, text, fill, fg=(255, 255, 255), font=None):
    font = font or F_SMALL
    w = draw.textlength(text, font=font) + 18
    rounded(draw, (x, y, x + w, y + 24), 12, fill)
    draw.text((x + 9, y + 4), text, font=font, fill=fg)


# ─────────────────────────── 1. hero.webp ───────────────────────────
def make_hero():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # sky gradient bands (peach dusk)
    for i in range(H):
        t = i / H
        r = int(52 + 26 * (1 - t))
        g = int(44 + 18 * (1 - t))
        b = int(48 + 20 * (1 - t))
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # far mountains
    d.polygon([(0, 300), (120, 205), (240, 290), (380, 190), (520, 300), (660, 215), (800, 300), (800, 450), (0, 450)], fill=(58, 66, 72))
    d.polygon([(0, 330), (180, 250), (320, 330), (480, 240), (620, 330), (800, 255), (800, 450), (0, 450)], fill=(46, 52, 58))
    # village buildings
    for bx, bh, bw in [(150, 70, 56), (225, 55, 44), (470, 62, 50), (540, 50, 40)]:
        rounded(d, (bx, 400 - bh, bx + bw, 400), 6, (66, 50, 40))
        d.polygon([(bx - 8, 400 - bh), (bx + bw / 2, 400 - bh - 30), (bx + bw + 8, 400 - bh)], fill=(88, 66, 52))
        d.rounded_rectangle((bx + bw / 2 - 5, 400 - 20, bx + bw / 2 + 5, 400), radius=2, fill=(233, 226, 216))
    # blossom tree
    tx = 350
    d.rounded_rectangle([(tx - 6, 300), (tx + 6, 400)], radius=3, fill=(80, 56, 44))
    for cx, cy, cr in [(330, 285, 34), (370, 272, 30), (340, 250, 26), (375, 300, 26), (315, 305, 24)]:
        d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=(224, 148, 122))
        d.ellipse([cx - cr + 8, cy - cr + 8, cx + cr - 8, cy + cr - 8], fill=(238, 178, 150))
    # farm fields
    for i, fy in enumerate([410, 425, 440]):
        d.rounded_rectangle((20 + i * 8, fy, 120 - i * 8, fy + 10), radius=4, fill=(88, 116, 74))
    # moon
    d.ellipse([660, 60, 720, 120], fill=(236, 214, 180))
    # title plate
    rounded(d, (40, 330, 760, 400), 12, (24, 22, 28))
    d.text((60, 342), "Halcyon Days at Taoyuan", font=F_TITLE, fill=GOLD)
    d.text((62, 372), "Barter your way into a thousand-year-old village", font=F_SUB, fill=INK)
    footer(d, "桃 源 村 日 志  ·  Taoyuan Village Log  ·  by BotanX / CubeGame")
    img.save(os.path.join(OUT, "hero.webp"), "WEBP", quality=88)


# ─────────────────────────── 2. barter-economy.webp ───────────────────────────
def make_barter():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "The Barter Economy", "No money in the village — every item carries a hidden Contribution Value (CV)", GOLD)
    # left panel: how it works
    rounded(d, (20, 92, 380, 408), 10, BG2)
    d.text((34, 104), "How trading works", font=F_H, fill=GOLD)
    items = [
        "• Open Inventory → Knowledge tab to see CV",
        "• Offer items whose CV totals EXACTLY match",
        "• Same CV trades 1-for-1 (Softwood 2 ↔ Stone 2)",
        "• Donating to the Contribution Box pays",
        "  vouchers worth only 1/10 of an item's value",
        "• Barter preserves value — never wasteful",
        "• Bamboo is the best early 'currency'",
    ]
    y = 138
    for it in items:
        for line in wrap(d, it, F_BODY, 330):
            d.text((34, y), line, font=F_BODY, fill=INK)
            y += 21
    # right panel: CV examples
    rounded(d, (400, 92, 780, 408), 10, BG2)
    d.text((414, 104), "Sample CV values", font=F_H, fill=PEACH)
    rows = [
        ("Bamboo", "5", "Copper Ore", "5", GREEN),
        ("Wheat", "22", "Rice", "20", GREEN),
        ("Hardwood", "20", "Iron Ore", "20", GREEN),
        ("Chili", "18", "Garlic", "10", GREEN),
        ("Basic Bait", "5", "Stone", "2", GREEN),
    ]
    y = 136
    for a, va, b, vb, col in rows:
        chip(d, 414, y, f"{a} {va} CV", col)
        d.text((414 + 150, y + 4), "↔", font=F_BODY, fill=GOLD)
        chip(d, 414 + 170, y, f"{b} {vb} CV", col)
        y += 34
    d.text((414, y + 6), "Chick 1,000 CV · Lamb 6,000 · Calf 7,000 · Piglet 10,000", font=F_SMALL, fill=(176, 170, 178))
    footer(d, "Trade fair, keep bamboo in your pocket, and never donate what you can barter.")
    img.save(os.path.join(OUT, "barter-economy.webp"), "WEBP", quality=88)


# ─────────────────────────── 3. first-week.webp ───────────────────────────
def make_first_week():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Your First Week", "A gentle route through Days 1–7 in Taoyuan Village", GREEN)
    steps = [
        ("Day 1", "Pigeon letters · tavern quest · learn fishing · plant wheat", PEACH),
        ("Day 2–3", "Clear weeds & till green tiles for Peach Pearls · fish quest fish", GREEN),
        ("Day 4–5", "Barter bamboo → copper ore · turn on the map · cook for buffs", GOLD),
        ("Day 6–7", "Queue a tool upgrade · scallion noodle soup (+10% DEF)", BLUE),
    ]
    y = 100
    for day, text, col in steps:
        rounded(d, (24, y, 776, y + 62), 10, BG2)
        chip(d, 38, y + 14, day, col, font=F_H)
        d.text((150, y + 12), text, font=F_BODY, fill=INK)
        d.text((150, y + 36), wrap(d, text, F_BODY, 590)[0] if not text.startswith("Pigeon") else "", font=F_SMALL, fill=(150, 144, 152))
        y += 72
    rounded(d, (24, y, 776, y + 66), 10, BG2)
    chip(d, 38, y + 14, "Keep", RED, font=F_H)
    d.text((110, y + 12), "Peach Pearls (need 6 for 'Legend of Taoling') · Wheat for the mill · berries for stamina", font=F_BODY, fill=INK)
    d.text((110, y + 38), "The map setting shows every villager's location & shop hours — turn it on day one.", font=F_SMALL, fill=(176, 170, 178))
    footer(d, "Quest errands first, wheat second, bamboo as your trading wallet.")
    img.save(os.path.join(OUT, "first-week.webp"), "WEBP", quality=88)


# ─────────────────────────── 4. caves-martial-arts.webp ───────────────────────────
def make_caves():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Caves, Bosses & Martial Arts", "Dungeon progression — gear up, then go deeper", RED)
    cols = [
        ("1 · Earth Cave", "Boss: Dankang", "Reward: bronze pickaxe", "Mine tin & copper next", PEACH),
        ("2 · Wood Cave", "Boss: Lushu", "Reward: underfur → armor", "Survive deeper caves", GREEN),
        ("3 · Metal Cave", "Iron ore & bosses", "Upgrade: iron sword", "Keep climbing", BLUE),
    ]
    x = 24
    for title, b, r, note, col in cols:
        rounded(d, (x, 96, x + 240, 330), 10, BG2)
        d.rounded_rectangle([(x, 96), (x + 240, 132)], radius=10, fill=col)
        d.text((x + 14, 102), title, font=F_H, fill=(40, 36, 42))
        d.text((x + 14, 148), b, font=F_BODY, fill=INK)
        d.text((x + 14, 172), r, font=F_BODY, fill=GOLD)
        d.text((x + 14, 200), note, font=F_BODY, fill=(176, 170, 178))
        # arrow
        if x < 520:
            d.text((x + 248, 190), "→", font=F_H, fill=GOLD)
        x += 264
    rounded(d, (24, 348, 776, 408), 10, BG2)
    d.text((40, 358), "Collect along the way:", font=F_BODY, fill=INK)
    d.text((40, 380), "Hero's Journal fragments ×5 (Li Jie'er) · shrine items (Thunder-Struck Wood · Six-Colored Stone · Ebony Root) · Peach Pearls", font=F_SMALL, fill=(176, 170, 178))
    footer(d, "Bamboo → copper ore funds your first tools; Contribution Level unlocks better shop stock.")
    img.save(os.path.join(OUT, "caves-martial-arts.webp"), "WEBP", quality=88)


# ─────────────────────────── 5. v11-flowers.webp ───────────────────────────
def make_v11():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "V1.1《花千树》Flower Update", "First major content drop — June 15, 2026 · V1.1.1 late July", GOLD)
    feats = [
        ("🌺 Flowers", "32 new flowers & craftables, worn as accessories", PEACH),
        ("🏺 Ceramics", "20 vessels · 2,000+ flower arrangements", RED),
        ("🌳 Trees", "20 plantable trees + bamboo processing", GREEN),
        ("🍷 Wine", "10 ordinary · 78 superior wines", GOLD),
        ("🚜 Second Farm", "Unlock via 'More for the Able' quest", BLUE),
        ("🪑 Landscaping", "Fish ponds, pavilions, 9 new floors", GREEN),
    ]
    x, y = 24, 100
    for emoji, text, col in feats:
        rounded(d, (x, y, x + 372, y + 82), 10, BG2)
        d.text((x + 16, y + 10), emoji, font=F_H, fill=INK)
        d.text((x + 60, y + 12), text.split(" ")[0], font=F_H, fill=col)
        d.text((x + 60, y + 38), text, font=F_SMALL, fill=(176, 170, 178))
        y += 94 if x > 0 else 94
        if y + 94 > 400:
            y = 100
            x = 404
    rounded(d, (24, 398, 776, 424), 10, BG2)
    d.text((40, 404), "Also: bartering table, 224 gift dialogues, ~680 daily dialogues, chest replacement, controller support — all free.", font=F_SMALL, fill=(150, 144, 152))
    footer(d, "Coming next: 簪花 flower-in-hair update · garden landscaping · more bamboo furniture.")
    img.save(os.path.join(OUT, "v11-flowers.webp"), "WEBP", quality=88)


make_hero()
make_barter()
make_first_week()
make_caves()
make_v11()
print("Done:", [f for f in sorted(os.listdir(OUT))])
