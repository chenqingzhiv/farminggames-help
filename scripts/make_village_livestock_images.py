#!/usr/bin/env python
"""Generate 800x450 WebP infographics for the Village in the Shade
Livestock & Mutant Crops guide (docs/village-in-the-shade/)."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 800, 450
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs", "village-in-the-shade", "images")
os.makedirs(OUT, exist_ok=True)

FDIR = "C:/Windows/Fonts/"
F_TITLE = ImageFont.truetype(FDIR + "arialbd.ttf", 30)
F_SUB = ImageFont.truetype(FDIR + "ariali.ttf", 16)
F_H = ImageFont.truetype(FDIR + "arialbd.ttf", 21)
F_BODY = ImageFont.truetype(FDIR + "arial.ttf", 16)
F_SMALL = ImageFont.truetype(FDIR + "arial.ttf", 13)

# Palette — cream & twilight indigo (Village in the Shade)
BG = (243, 240, 230)        # cream
BG2 = (250, 247, 239)       # soft cream panel
PANEL = (255, 253, 247)     # white panel
INK = (43, 45, 77)          # indigo text
SLATE = (93, 93, 116)       # secondary text
PURPLE = (125, 99, 155)     # purple accent
DPURPLE = (92, 74, 122)     # deep purple
LILAC = (196, 184, 203)     # light purple
TAN = (196, 173, 152)       # tan
GREEN = (111, 154, 93)      # crop green
GOLD = (201, 160, 90)       # gold
RED = (184, 96, 94)         # ghost red
BLUE = (90, 138, 168)       # soft blue


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


def header(draw, title, sub=None, accent=PURPLE):
    rounded(draw, (0, 0, W, 74), 0, BG2)
    draw.line([(0, 74), (W, 74)], fill=(224, 219, 205), width=2)
    draw.rounded_rectangle([(18, 16), (26, 58)], radius=4, fill=accent)
    draw.text((40, 16), title, font=F_TITLE, fill=INK)
    if sub:
        draw.text((42, 50), sub, font=F_SUB, fill=SLATE)


def footer(draw, text):
    draw.text((18, H - 24), text, font=F_SMALL, fill=(140, 134, 142))


def chip(draw, x, y, text, fill, fg=(255, 255, 255), font=None):
    font = font or F_SMALL
    w = draw.textlength(text, font=font) + 18
    rounded(draw, (x, y, x + w, y + 24), 12, fill)
    draw.text((x + 9, y + 4), text, font=font, fill=fg)


def stars(draw, x, y, n, color):
    for i in range(n):
        cx = x + i * 20
        d = 13
        draw.polygon(
            [(cx, y), (cx + 4, y + 5), (cx + 10, y + 5), (cx + 5, y + 9),
             (cx + 7, y + 15), (cx, y + 11), (cx - 7, y + 15), (cx - 5, y + 9),
             (cx - 10, y + 5), (cx - 4, y + 5)],
            fill=color,
        )


def farm_sky(d):
    # twilight cream-to-purple gradient
    for i in range(H):
        t = i / H
        r = int(243 - 30 * t)
        g = int(240 - 34 * t)
        b = int(230 - 20 * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # moon
    d.ellipse([660, 55, 716, 111], fill=(236, 214, 180))
    d.ellipse([668, 63, 708, 103], fill=(243, 230, 220))
    # far ridge
    d.polygon([(0, 300), (150, 225), (280, 295), (420, 215), (560, 300), (700, 235), (800, 300), (800, 450), (0, 450)],
              fill=(58, 66, 90))
    d.polygon([(0, 330), (200, 265), (360, 330), (520, 258), (660, 330), (800, 272), (800, 450), (0, 450)],
              fill=(46, 52, 72))
    # field bands
    for i, fy in enumerate([415, 428, 441]):
        d.rounded_rectangle((16 + i * 8, fy, 140 - i * 8, fy + 10), radius=4, fill=(122, 148, 98))


# ─────────────────────────── 1. livestock-hero.webp ───────────────────────────
def make_hero():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    farm_sky(d)
    # chicken coop (left)
    rounded(d, (90, 340, 180, 400), 6, (110, 96, 118))
    d.polygon([(82, 340), (135, 300), (188, 340)], fill=(125, 99, 155))
    d.rounded_rectangle((122, 368, 148, 400), radius=2, fill=(255, 253, 247))
    # barn (right)
    rounded(d, (560, 320, 700, 400), 6, (125, 60, 58))
    d.polygon([(550, 320), (630, 268), (710, 320)], fill=(150, 80, 74))
    d.rounded_rectangle((620, 352, 654, 400), radius=3, fill=(255, 253, 247))
    # ghost cow (spooky, semi-transparent feel via light fill)
    d.ellipse([688, 300, 760, 336], fill=(210, 200, 220))
    d.rounded_rectangle([(690, 320), (758, 344)], radius=6, fill=(210, 200, 220))
    d.ellipse([700, 286, 724, 310], fill=(210, 200, 220))
    d.ellipse([734, 286, 758, 310], fill=(210, 200, 220))
    d.ellipse([708, 300, 716, 308], fill=(184, 96, 94))
    d.ellipse([742, 300, 750, 308], fill=(184, 96, 94))
    # hen + chick
    d.ellipse([210, 380, 250, 402], fill=(255, 253, 247))
    d.ellipse([205, 366, 225, 384], fill=(255, 253, 247))
    d.polygon([(225, 372), (238, 376), (225, 380)], fill=(196, 173, 152))
    d.ellipse([238, 400, 256, 414], fill=(238, 214, 120))
    # giant pumpkin (mutant crop)
    d.ellipse([300, 370, 380, 424], fill=(214, 130, 74))
    d.polygon([(322, 370), (340, 350), (358, 370)], fill=(96, 140, 78))
    # title plate
    rounded(d, (30, 70, 770, 142), 12, (43, 45, 77))
    d.text((52, 82), "Livestock & Mutant Crops", font=F_TITLE, fill=(250, 247, 239))
    d.text((54, 116), "Chickens, barns, ghost cows & soil-seed giant crops — a Village in the Shade deep dive", font=F_SUB, fill=(196, 184, 203))
    footer(d, "Kagatsu Village Livestock Ledger · Hono Gurashi no Niwa · by the Farming Games Help team")
    img.save(os.path.join(OUT, "livestock-hero.webp"), "WEBP", quality=88)


# ─────────────────────────── 2. livestock-timeline.webp ───────────────────────────
def make_timeline():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "The Livestock Unlock Chain", "Spring 8 to 16 — every step, in order", PURPLE)
    steps = [
        ("Spring 8", "Peddler Chinana delivers a chick (You's chick) · learn 兵糧丸 rations", LILAC, INK),
        ("Spring 10", "Livestock shed is built · buy chicks & pasture seed · prep 4 hens", PURPLE, (255, 255, 255)),
        ("Spring 12", "Chicks grow into chickens — start collecting eggs daily", GREEN, (255, 255, 255)),
        ("Spring 13", "⚠ Chicken massacre event — a scripted scare, not a game-over", RED, (255, 255, 255)),
        ("Spring 16", "Help-ticket quests: Kisuke's carpentry contract unlocks the barn (cows & sheep)", GOLD, (255, 255, 255)),
    ]
    y = 96
    for day, text, col, fg in steps:
        rounded(d, (24, y, 776, y + 56), 10, PANEL)
        chip(d, 38, y + 14, day, col, fg=fg, font=F_H)
        d.text((150, y + 12), text, font=F_BODY, fill=INK)
        y += 64
    footer(d, "Before Spring 16 you raise chickens only — the barn opens after Kisuke's carpentry job.")
    img.save(os.path.join(OUT, "livestock-timeline.webp"), "WEBP", quality=88)


# ─────────────────────────── 3. livestock-comparison.webp ───────────────────────────
def make_comparison():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Which Animal First?", "Chicken · Duck · Cow · Sheep — early-game value", GREEN)
    rows = [
        ("Chicken", "Eggs daily → boiled eggs (HP) + egg processing · cheap · up to 4 to start", PURPLE, "Best first"),
        ("Duck", "Ducks auto-clear weeds on farm & paddy — free labor", BLUE, "Low upkeep"),
        ("Cow", "Milk → processed dairy · needs the barn (Spring 16+) · high value", GOLD, "Long-term cash"),
        ("Sheep", "Wool — sheared later, feeds cloth & crafts · barn dweller", GREEN, "Winter value"),
        ("Color chick", "Summer festival: ¥1,600 each · ALL MALE, no eggs — collector only", RED, "Skip"),
    ]
    y = 96
    for name, text, col, tag in rows:
        rounded(d, (24, y, 776, y + 56), 10, PANEL)
        chip(d, 38, y + 14, name, col, font=F_H)
        d.text((150, y + 10), text, font=F_BODY, fill=INK)
        d.text((150, y + 34), tag, font=F_SMALL, fill=(125, 99, 155))
        y += 64
    footer(d, "Barn & coop max upgrade unlocks auto-feeding — the biggest mid-game quality-of-life unlock.")
    img.save(os.path.join(OUT, "livestock-comparison.webp"), "WEBP", quality=88)


# ─────────────────────────── 4. mutant-crops.webp ───────────────────────────
def make_mutant():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Giant & Mutant Crops", "The soil-seed lottery — mass-plant 泥の種 and a patch may merge into a giant", GOLD)
    # Left panel: how giants happen
    rounded(d, (20, 92, 388, 412), 10, PANEL)
    d.text((34, 104), "How giants happen", font=F_H, fill=PURPLE)
    steps = [
        "1. Soil seeds grow a random",
        "   seasonal crop — the only way",
        "   to get some year-one seeds",
        "2. Plant them in bulk — a patch",
        "   can merge into a giant crop",
        "3. A sprinkler in the patch",
        "   prevents the merge",
        "4. A giant yields ONE product",
        "   & counts toward the",
        "   encyclopedia — plant late",
    ]
    y = 136
    for ln in steps:
        d.text((34, y), ln, font=F_BODY, fill=INK)
        y += 20
    # mini field illustration (bulk patch with one giant)
    gx, gy = 70, 320
    for r in range(3):
        for c in range(3):
            d.rounded_rectangle((gx + c * 42, gy + r * 42, gx + c * 42 + 38, gy + r * 42 + 38),
                                radius=4, fill=(125, 99, 155))
    # giant crop on top
    d.ellipse([gx + 42, gy - 34, gx + 42 + 56, gy + 22], fill=(214, 130, 74))
    d.polygon([(gx + 42 + 28, gy - 34), (gx + 42 + 42, gy - 56), (gx + 42 + 56, gy - 34)], fill=(96, 140, 78))
    # sprinkler (prevents)
    d.ellipse([gx + 140, gy - 8, gx + 168, gy + 20], fill=(90, 138, 168))
    d.line([(gx + 154, gy + 20), (gx + 154, gy + 34)], fill=(90, 138, 168), width=3)
    d.text((gx + 108, gy + 44), "sprinkler = no merge", font=F_SMALL, fill=SLATE)
    # Right panel: soil seeds 101
    rounded(d, (408, 92, 780, 412), 10, PANEL)
    d.text((422, 104), "Soil seeds (泥の種) 101", font=F_H, fill=GOLD)
    facts = [
        "• Night ghost plants seeds you dig",
        "  up — three at a time",
        "• Water for 2 days → ghost flowers",
        "  that become furniture at night",
        "• Sometimes grow cursed crops",
        "  (祟られた) — harvest damages you",
        "• Konno sells the info for ¥1,000",
        "• Throw cursed crops into the",
        "  waterfall spot → fish lord gives",
        "  max-HP upgrades",
    ]
    y = 136
    for ln in facts:
        d.text((422, y), ln, font=F_BODY, fill=INK)
        y += 20
    footer(d, "Volume is the strategy — run many soil-seed patches, but only once your catalog is settled.")
    img.save(os.path.join(OUT, "mutant-crops.webp"), "WEBP", quality=88)


# ─────────────────────────── 5. crop-star-quality.webp ───────────────────────────
def make_star():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Crop Star Quality = Profit", "Five tiers — raise stars by replanting the same crop, harvest syncs the whole patch", GOLD)
    tiers = [
        ("White", "Normal", (210, 210, 210)),
        ("Green", "Fine", (111, 154, 93)),
        ("Blue", "Premium", (90, 138, 168)),
        ("Purple", "Rare", (125, 99, 155)),
        ("Gold", "Best", (201, 160, 90)),
    ]
    x = 26
    for i, (name, label, col) in enumerate(tiers):
        rounded(d, (x, 100, x + 140, 250), 10, PANEL)
        d.rounded_rectangle([(x, 100), (x + 140, 132)], radius=10, fill=col)
        d.text((x + 12, 106), f"{i+1}·{name}", font=F_H, fill=(43, 45, 77) if name in ("White", "Green") else (255, 255, 255))
        d.text((x + 12, 142), label, font=F_BODY, fill=INK)
        stars(d, x + 28, 180, i + 1, col)
        d.text((x + 12, 206), "+ base yield", font=F_SMALL, fill=SLATE)
        d.text((x + 12, 224), "+ sell price", font=F_SMALL, fill=SLATE)
        d.text((x + 12, 242), "better crafts", font=F_SMALL, fill=SLATE)
        x += 150
    rounded(d, (26, 268, 774, 330), 10, PANEL)
    d.text((40, 278), "How to raise stars:", font=F_H, fill=PURPLE)
    d.text((40, 304), "Plant the same crop repeatedly · harvest quality carries into processed goods · check the item encyclopedia (bottom-right) for the next threshold", font=F_SMALL, fill=INK)
    footer(d, "Gold-star entries let you name your own brand at the monthly quality contest (品評会).")
    img.save(os.path.join(OUT, "crop-star-quality.webp"), "WEBP", quality=88)


make_hero()
make_timeline()
make_comparison()
make_mutant()
make_star()
print("Done:", sorted(os.listdir(OUT)))
