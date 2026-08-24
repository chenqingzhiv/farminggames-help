#!/usr/bin/env python
"""Generate 800x450 WebP infographics for the Tiny Eden preview guide
(docs/tiny-eden/). Cozy indoor-apartment palette: warm cream walls,
plant greens, terracotta pots, window-blue light."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 800, 450
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs", "tiny-eden", "images")
os.makedirs(OUT, exist_ok=True)

FDIR = "C:/Windows/Fonts/"
F_TITLE = ImageFont.truetype(FDIR + "arialbd.ttf", 30)
F_SUB = ImageFont.truetype(FDIR + "ariali.ttf", 16)
F_H = ImageFont.truetype(FDIR + "arialbd.ttf", 21)
F_BODY = ImageFont.truetype(FDIR + "arial.ttf", 16)
F_SMALL = ImageFont.truetype(FDIR + "arial.ttf", 13)

# Palette — cozy apartment interior (warm cream + plant greens + terracotta)
BG = (248, 244, 236)        # warm cream wall
BG2 = (238, 231, 216)       # soft panel
PANEL = (255, 253, 249)     # white panel
INK = (51, 58, 47)          # deep green-brown text
SLATE = (120, 118, 105)     # secondary text
LEAF = (98, 143, 84)        # plant green
DEEP = (64, 96, 57)         # deep green
TERRA = (189, 107, 74)      # terracotta pot
DTERRA = (158, 86, 57)      # deep terracotta
WINDOW = (96, 140, 155)     # window-blue
GOLD = (198, 158, 88)       # gold
PURPLE = (125, 99, 155)     # automation purple
DPURPLE = (92, 74, 122)     # deep purple
RED = (184, 96, 94)         # warning red


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


def header(draw, title, sub=None, accent=LEAF):
    rounded(draw, (0, 0, W, 74), 0, BG2)
    draw.line([(0, 74), (W, 74)], fill=(222, 210, 188), width=2)
    draw.rounded_rectangle([(18, 16), (26, 58)], radius=4, fill=accent)
    draw.text((40, 16), title, font=F_TITLE, fill=INK)
    if sub:
        draw.text((42, 50), sub, font=F_SUB, fill=SLATE)


def footer(draw, text):
    draw.text((18, H - 24), text, font=F_SMALL, fill=(150, 144, 132))


def chip(draw, x, y, text, fill, fg=(255, 255, 255), font=None):
    font = font or F_SMALL
    w = draw.textlength(text, font=font) + 18
    rounded(draw, (x, y, x + w, y + 24), 12, fill)
    draw.text((x + 9, y + 4), text, font=font, fill=fg)


def city_sky(d):
    # dusk gradient behind the window
    for i in range(H):
        t = i / H
        r = int(148 - 52 * t)
        g = int(168 - 56 * t)
        b = int(178 - 40 * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # skyline silhouettes
    d.rectangle([0, 250, 800, 450], fill=(62, 74, 82))
    for x, w, h in [(30, 70, 120), (140, 55, 160), (230, 80, 90), (360, 60, 150),
                    (470, 75, 110), (580, 55, 175), (680, 80, 130)]:
        d.rectangle([x, 280 - h, x + w, 280], fill=(52, 62, 70))
    # lit windows on towers
    for x, w, h in [(30, 70, 120), (140, 55, 160), (360, 60, 150), (580, 55, 175)]:
        for wx in range(x + 6, x + w - 8, 12):
            for wy in range(285 - h + 8, 280, 16):
                d.rectangle([wx, wy, wx + 6, wy + 8], fill=(240, 214, 140))


def window_frame(d, x, y, w, h):
    # wooden window frame with sill
    d.rounded_rectangle([x, y, x + w, y + h], radius=6, fill=(70, 82, 88))
    d.rectangle([x + 4, y + 4, x + w - 4, y + h - 4], fill=(66, 74, 82))
    d.rectangle([x + 4, y + h - 2, x + w - 4, y + h + 8], fill=(142, 116, 84))  # sill


def planter(d, x, y, leaf_color=LEAF):
    # terracotta pot with a plant
    d.polygon([(x - 14, y), (x + 14, y), (x + 10, y + 26), (x - 10, y + 26)], fill=TERRA)
    d.polygon([(x - 12, y), (x + 12, y), (x + 12, y + 4), (x - 12, y + 4)], fill=DTERRA)
    # stem
    d.line([(x, y - 6), (x, y - 18)], fill=DEEP, width=3)
    # leaves
    d.ellipse([x - 12, y - 26, x - 2, y - 14], fill=leaf_color)
    d.ellipse([x + 2, y - 28, x + 12, y - 16], fill=leaf_color)
    d.ellipse([x - 6, y - 18, x + 6, y - 8], fill=(76, 118, 66))
    # a berry dot
    d.ellipse([x + 4, y - 22, x + 8, y - 18], fill=TERRA)


def cat_silhouette(d, x, y):
    # simple sitting cat
    d.ellipse([x, y - 20, x + 44, y + 14], fill=(74, 72, 66))   # body
    d.ellipse([x - 14, y - 10, x + 2, y + 6], fill=(74, 72, 66))  # head
    d.polygon([(x - 12, y - 10), (x - 18, y - 24), (x - 6, y - 14)], fill=(74, 72, 66))  # left ear
    d.polygon([(x + 0, y - 10), (x - 2, y - 24), (x + 8, y - 12)], fill=(74, 72, 66))    # right ear
    d.line([(x + 46, y - 8), (x + 56, y - 2)], fill=(74, 72, 66), width=4)                # tail


# ─────────────────────────── 1. hero.webp ───────────────────────────
def make_hero():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # window fills most of the upper frame
    city_sky(d)
    window_frame(d, 24, 16, 752, 300)
    # planters along the sill
    for px in [110, 220, 330, 540, 650]:
        planter(d, px, 320)
    planter(d, 150, 322, leaf_color=(76, 140, 66))
    planter(d, 600, 322, leaf_color=(76, 140, 66))
    cat_silhouette(d, 420, 320)
    # title plate
    rounded(d, (30, 336, 770, 430), 12, INK)
    d.text((52, 348), "Tiny Eden", font=F_TITLE, fill=(248, 244, 236))
    d.text((54, 386), "Cozy indoor farming in a 2050 megacity · windowsill to rooftop · a preview guide", font=F_SUB, fill=(196, 196, 176))
    footer(d, "Farming Games Help · Tiny Eden Preview Guide · Bajka Games / Digital Vortex Entertainment")
    img.save(os.path.join(OUT, "hero.webp"), "WEBP", quality=88)


# ─────────────────────────── 2. growing-system.webp ───────────────────────────
def make_growing():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "The Realistic Growing System", "Not click-to-water — soil, water, temperature and growth phases all matter", LEAF)
    rows = [
        ("💧 Water the right amount", "Under-water stalls growth · over-water drowns the roots", "Manual pour, real consequence", DEEP, "Do this daily"),
        ("🧪 Soil chemistry", "Fertilizer and soil condition are tracked variables", "Changes how the plant behaves", TERRA, "Check before planting"),
        ("🌡️ Indoor temperature", "Hot room? Open a window — placement changes micro-climate", "Some plants are temperature-sensitive", WINDOW, "Watch the gauge"),
        ("🌱 Growth phases", "Seed → sprout → vegetative → harvest, visible on the plant", "Read the plant, not a timer", GOLD, "Harvest on time"),
        ("🍂 Clear dead growth", "Stems and leaves need clearing as cycles finish", "Keeps the space tidy and the plant healthy", PURPLE, "Small daily chore"),
    ]
    y = 92
    for name, how, why, col, tag in rows:
        rounded(d, (24, y, 776, y + 60), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((192, y + 8), how, font=F_BODY, fill=INK)
        d.text((192, y + 30), why, font=F_SMALL, fill=SLATE)
        d.text((620, y + 20), tag, font=F_SMALL, fill=TERRA)
        y += 68
    footer(d, "The demo proves it: watering in Tiny Eden is an action with a consequence, not a button.")
    img.save(os.path.join(OUT, "growing-system.webp"), "WEBP", quality=88)


# ─────────────────────────── 3. core-loop.webp ───────────────────────────
def make_loop():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "The Core Loop — Grow, Cook, Sell & Deliver", "Every meal does double duty: cash now, reputation for later", GOLD)
    steps = [
        ("1  Grow", "Tend plants through their growth phases", "Water · soil · temperature", LEAF),
        ("2  Harvest", "Take the produce to the kitchen", "Pick on time", TERRA),
        ("3  Cook", "Turn ingredients into meals", "Salads · jams · sweets · pickles · baked goods", WINDOW),
        ("4  Sell or Deliver", "Market = cash · neighbors = money + reputation", "Deliveries build the community", PURPLE),
        ("5  Reinvest", "Spend income on seeds, furniture & expansion", "The garden grows", DEEP),
    ]
    y = 92
    for name, desc, note, col in steps:
        rounded(d, (24, y, 776, y + 60), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((176, y + 8), desc, font=F_BODY, fill=INK)
        d.text((176, y + 30), note, font=F_SMALL, fill=SLATE)
        y += 68
    footer(d, "Cook before you sell — raw produce becomes a real paycheck as a salad, a jam or a pickle.")
    img.save(os.path.join(OUT, "core-loop.webp"), "WEBP", quality=88)


# ─────────────────────────── 4. expansion-path.webp ───────────────────────────
def make_expansion():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "The Apartment Grows With You", "Windowsill → a full room → the rooftop — the garden is vertical", DEEP)
    stages = [
        ("🪟 The Windowsill", "One pot, one seed packet, first harvests", "Everything within arm's reach", LEAF, "Day one"),
        ("🛋️ A Full Room", "Shelves, more planters, a proper kitchen station", "Income + reputation open the space", WINDOW, "First unlock"),
        ("🏠 Decor & Automation", "Furniture, lighting, art — plus irrigation helpers", "Make it a home, then let it run", PURPLE, "Mid-game"),
        ("🌇 The Rooftop", "The garden meets the sky — the city becomes a view", "Endgame of the apartment farm", GOLD, "Long-term goal"),
    ]
    y = 92
    for name, what, why, col, tag in stages:
        rounded(d, (24, y, 776, y + 74), 10, PANEL)
        chip(d, 38, y + 24, name, col, font=F_H)
        d.text((240, y + 12), what, font=F_BODY, fill=INK)
        d.text((240, y + 36), why, font=F_SMALL, fill=SLATE)
        d.text((690, y + 26), tag, font=F_SMALL, fill=TERRA)
        y += 84
    footer(d, "Expansion is earned with cash and reputation — the DIY Club unlocks rooms, automation keeps them manageable.")
    img.save(os.path.join(OUT, "expansion-path.webp"), "WEBP", quality=88)


# ─────────────────────────── 5. reputation-club.webp ───────────────────────────
def make_reputation():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Reputation & the DIY Club", "The apartment's residents are your progression key", TERRA)
    # left panel: how it works
    rounded(d, (20, 92, 388, 412), 10, PANEL)
    d.text((34, 104), "How reputation works", font=F_H, fill=TERRA)
    facts = [
        "• Deliver meals to neighbors",
        "  for money + reputation",
        "• Help out around the building",
        "• Reputation unlocks new seeds",
        "• Reputation unlocks rooms and",
        "  apartment expansions",
        "• The social layer and the farm",
        "  layer are the same loop",
    ]
    y = 138
    for ln in facts:
        d.text((34, y), ln, font=F_BODY, fill=INK)
        y += 20
    # right panel: why it matters
    rounded(d, (408, 92, 780, 412), 10, PANEL)
    d.text((422, 104), "Why it matters", font=F_H, fill=LEAF)
    hids = [
        "• Neighbors are the market —",
        "  delivery beats a shop trip",
        "• New seeds = new crops = a",
        "  richer kitchen",
        "• Expanded rooms are the",
        "  whole point of the game",
        "• It turns selling into a",
        "  community you build",
    ]
    y = 138
    for ln in hids:
        d.text((422, y), ln, font=F_BODY, fill=INK)
        y += 20
    footer(d, "Cook to impress the neighbors, impress the neighbors to grow more — the cozy loop is self-sustaining.")
    img.save(os.path.join(OUT, "reputation-club.webp"), "WEBP", quality=88)


if __name__ == "__main__":
    make_hero()
    make_growing()
    make_loop()
    make_expansion()
    make_reputation()
    print("Generated 5 WebP images in", OUT)
