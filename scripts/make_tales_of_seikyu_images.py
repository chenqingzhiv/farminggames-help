#!/usr/bin/env python
"""Generate 800x450 WebP infographics for the Tales of Seikyu
Beginner's Guide (docs/tales-of-seikyu/)."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 800, 450
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs", "tales-of-seikyu", "images")
os.makedirs(OUT, exist_ok=True)

FDIR = "C:/Windows/Fonts/"
F_TITLE = ImageFont.truetype(FDIR + "arialbd.ttf", 30)
F_SUB = ImageFont.truetype(FDIR + "ariali.ttf", 16)
F_H = ImageFont.truetype(FDIR + "arialbd.ttf", 21)
F_BODY = ImageFont.truetype(FDIR + "arial.ttf", 16)
F_SMALL = ImageFont.truetype(FDIR + "arial.ttf", 13)

# Palette — yokai dusk (fox shrine reds on indigo-tinged cream)
BG = (250, 246, 238)        # cream
BG2 = (243, 236, 222)       # soft cream panel
PANEL = (255, 252, 246)     # white panel
INK = (43, 40, 66)          # indigo text
SLATE = (110, 106, 128)     # secondary text
VERMILION = (197, 88, 66)   # fox / torii red
DVERM = (166, 64, 48)       # deep vermilion
GOLD = (201, 160, 90)       # gold
TEAL = (84, 138, 132)       # teal
GREEN = (111, 154, 93)      # crop green
PURPLE = (125, 99, 155)     # spirit purple
DPURPLE = (92, 74, 122)     # deep purple
LILAC = (196, 184, 203)     # light purple
RED = (184, 96, 94)         # warning red
BLUE = (90, 138, 168)       # slime blue


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


def header(draw, title, sub=None, accent=VERMILION):
    rounded(draw, (0, 0, W, 74), 0, BG2)
    draw.line([(0, 74), (W, 74)], fill=(226, 217, 198), width=2)
    draw.rounded_rectangle([(18, 16), (26, 58)], radius=4, fill=accent)
    draw.text((40, 16), title, font=F_TITLE, fill=INK)
    if sub:
        draw.text((42, 50), sub, font=F_SUB, fill=SLATE)


def footer(draw, text):
    draw.text((18, H - 24), text, font=F_SMALL, fill=(150, 144, 158))


def chip(draw, x, y, text, fill, fg=(255, 255, 255), font=None):
    font = font or F_SMALL
    w = draw.textlength(text, font=font) + 18
    rounded(draw, (x, y, x + w, y + 24), 12, fill)
    draw.text((x + 9, y + 4), text, font=font, fill=fg)


def dusk_sky(d):
    # dusk cream-to-indigo gradient
    for i in range(H):
        t = i / H
        r = int(250 - 44 * t)
        g = int(246 - 52 * t)
        b = int(238 - 26 * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # lantern moon
    d.ellipse([655, 50, 715, 110], fill=(245, 214, 160))
    d.ellipse([663, 58, 707, 102], fill=(250, 236, 210))
    # far ridge
    d.polygon([(0, 300), (150, 220), (290, 292), (430, 210), (570, 296), (720, 228), (800, 290), (800, 450), (0, 450)],
              fill=(62, 58, 92))
    d.polygon([(0, 330), (210, 262), (370, 330), (530, 256), (680, 330), (800, 268), (800, 450), (0, 450)],
              fill=(48, 44, 74))
    # field bands
    for i, fy in enumerate([418, 431, 444]):
        d.rounded_rectangle((14 + i * 8, fy, 132 - i * 8, fy + 10), radius=4, fill=(132, 156, 100))


def torii(d, x, base_y, scale=1.0):
    # simple torii gate silhouette
    w = int(120 * scale)
    h = int(150 * scale)
    # top beam
    d.rounded_rectangle([(x, base_y - h), (x + w, base_y - h + int(14 * scale))], radius=6, fill=DVERM)
    # second beam
    d.rounded_rectangle([(x - int(8 * scale), base_y - h + int(34 * scale)), (x + w + int(8 * scale), base_y - h + int(46 * scale))], radius=6, fill=DVERM)
    # pillars
    d.rounded_rectangle([(x + int(12 * scale), base_y - h), (x + int(26 * scale), base_y)], radius=5, fill=VERMILION)
    d.rounded_rectangle([(x + w - int(26 * scale), base_y - h), (x + w - int(12 * scale), base_y)], radius=5, fill=VERMILION)


def farmhouse(d, x, y):
    # thatched roof house
    d.polygon([(x - 45, y), (x, y - 62), (x + 45, y)], fill=(150, 118, 92))
    rounded(d, (x - 40, y - 4, x + 40, y + 52), 6, (222, 204, 168))
    d.rounded_rectangle((x - 14, y + 12, x + 14, y + 52), radius=3, fill=(110, 96, 118))
    # lanterns
    d.ellipse([x - 52, y - 12, x - 42, y - 2], fill=(245, 214, 160))
    d.ellipse([x + 42, y - 12, x + 52, y - 2], fill=(245, 214, 160))


def fox_spirit(d, x, y, color=VERMILION):
    # simple spirit fox head
    d.ellipse([x, y, x + 34, y + 26], fill=color)
    d.polygon([(x, y + 8), (x - 12, y - 6), (x + 4, y + 6)], fill=color)   # left ear
    d.polygon([(x + 34, y + 8), (x + 46, y - 6), (x + 30, y + 6)], fill=color)  # right ear
    d.ellipse([x + 8, y + 8, x + 14, y + 14], fill=(250, 246, 238))
    d.ellipse([x + 22, y + 8, x + 28, y + 14], fill=(250, 246, 238))


# ─────────────────────────── 1. hero.webp ───────────────────────────
def make_hero():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    dusk_sky(d)
    torii(d, 56, 330, 1.15)
    farmhouse(d, 500, 340)
    # spirit foxes
    fox_spirit(d, 300, 300)
    fox_spirit(d, 620, 320)
    # slime blob
    d.ellipse([250, 330, 292, 360], fill=BLUE)
    # title plate
    rounded(d, (30, 62, 770, 146), 12, INK)
    d.text((52, 74), "Tales of Seikyu", font=F_TITLE, fill=(250, 246, 238))
    d.text((54, 112), "Yokai farming · no hoe · 5 forms · 20 romance candidates · a first-season field guide", font=F_SUB, fill=(196, 184, 203))
    footer(d, "Seikyu Island Farmstead Ledger · 青岚物语 · by the Farming Games Help team")
    img.save(os.path.join(OUT, "hero.webp"), "WEBP", quality=88)


# ─────────────────────────── 2. forms-unlock.webp ───────────────────────────
def make_forms():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Unlock All 5 Yokai Forms", "Boar → Slime → Tengu → Yuki-onna → Fox — the route through Fox Ruins", VERMILION)
    forms = [
        ("🐗 Boar", "Story — right after you arrive", "Tills soil · chops trees · breaks rocks · fast clearing", GREEN, "Day 1"),
        ("🫧 Slime", "Fox Ruins boss #1 — Anji", "Replaces the watering can · water projectiles · underwater", BLUE, "Level first"),
        ("🪶 Tengu", "Fox Ruins boss #2 — Fujiki", "Flight · high ledges · combat speed & defense", PURPLE, "Ruins combat"),
        ("❄️ Yuki-onna", "Deeper Fox Ruins", "Ice abilities · hover movement for late routes", TEAL, "Route-gated"),
        ("🦊 Fox", "Final — needs the four earlier forms", "Climactic story form (customizable in 1.0)", GOLD, "Endgame"),
    ]
    y = 92
    for name, unlock, use, col, tag in forms:
        rounded(d, (24, y, 776, y + 62), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((176, y + 10), unlock, font=F_BODY, fill=INK)
        d.text((176, y + 32), use, font=F_SMALL, fill=SLATE)
        d.text((672, y + 20), tag, font=F_SMALL, fill=VERMILION)
        y += 70
    footer(d, "Boar clears, Slime waters, Tengu flies, Yuki-onna hovers, Fox finishes the story — keep the field small enough for one Slime pass.")
    img.save(os.path.join(OUT, "forms-unlock.webp"), "WEBP", quality=88)


# ─────────────────────────── 3. first-season-route.webp ───────────────────────────
def make_route():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Your First Season, Day by Day", "Build a stable daily loop — don't min-max the island on day one", TEAL)
    steps = [
        ("Day 1-3", "Follow Yui's tour · pay respects at shrines (fast travel) · clear farm with Boar · rummage trash cans for eggs", GREEN, "Clear & gather"),
        ("Day 3-7", "Buy one of each seasonal seed · plant 2-3 multi-harvest crops · keep field to one Slime watering pass · take the fishing request → Basic Rod", BLUE, "Plant narrow"),
        ("Day 7+", "Gift 2× per week per villager · start romance early · enter Fox Ruins with food, weapon & inventory space", VERMILION, "Relationships & ruins"),
    ]
    y = 96
    for day, text, col, tag in steps:
        rounded(d, (24, y, 776, y + 72), 10, PANEL)
        chip(d, 38, y + 22, day, col, font=F_H)
        d.text((150, y + 12), text, font=F_BODY, fill=INK)
        d.text((150, y + 48), tag, font=F_SMALL, fill=VERMILION)
        y += 82
    footer(d, "Stamina is the real currency — a tight field you can water in one run beats an expanded farm you can't keep up with.")
    img.save(os.path.join(OUT, "first-season-route.webp"), "WEBP", quality=88)


# ─────────────────────────── 4. income-compare.webp ───────────────────────────
def make_income():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Season-One Money, Ranked", "Which income stream is worth your stamina?", GOLD)
    rows = [
        ("🥚 Egg → Mayo", "20g raw → 200g processed", "10× multiplier — best early income", GREEN, "Best"),
        ("🪨 Spice rocks", "4 rocks → 1 spice rock = 104g", "Passive smelter overflow while you clear", GOLD, "Passive"),
        ("🍳 Cooking", "~22-25% margins", "Pumpkin special: 262g → 341g grilled veggies", VERMILION, "Solid"),
        ("🎣 Fishing", "~500g per session", "Weak early — save it for requests & romance", BLUE, "Skip"),
    ]
    y = 96
    for name, num, note, col, tag in rows:
        rounded(d, (24, y, 776, y + 60), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((176, y + 10), num, font=F_BODY, fill=INK)
        d.text((176, y + 32), note, font=F_SMALL, fill=SLATE)
        d.text((672, y + 20), tag, font=F_SMALL, fill=VERMILION)
        y += 68
    footer(d, "Field expansion: first free, then 2,000g–10,000g each — ~30,000g for the full farm. Don't rush it.")
    img.save(os.path.join(OUT, "income-compare.webp"), "WEBP", quality=88)


# ─────────────────────────── 5. fox-ruins-tips.webp ───────────────────────────
def make_ruins():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Fox Ruins — 86 Rooms & Form Bosses", "Bring food, a weapon & a waypoint. These catches surprise everyone", DPURPLE)
    # left panel: must-knows
    rounded(d, (20, 92, 388, 412), 10, PANEL)
    d.text((34, 104), "What catches you off guard", font=F_H, fill=VERMILION)
    facts = [
        "• Shiny wall gems = ambush fights",
        "  with much stronger enemies —",
        "  wait until Boar/Slime are Lv 3",
        "• Wanyudo (wheeled fire monster)",
        "  spawns midnight–2am, 2× per day",
        "• Three forms come from bosses:",
        "  Slime (Anji), Tengu (Fujiki),",
        "  Yuki-onna (deeper ruins)",
        "• Restore relic waypoints to cut",
        "  long walks back into the dungeon",
    ]
    y = 136
    for ln in facts:
        d.text((34, y), ln, font=F_BODY, fill=INK)
        y += 20
    # right panel: hidden mechanics
    rounded(d, (408, 92, 780, 412), 10, PANEL)
    d.text((422, 104), "Hidden mechanics", font=F_H, fill=TEAL)
    hids = [
        "• Game speed slider: 0.5×–3.0×",
        "• Yokai Storage feeds on stone/",
        "  clay up to level 5",
        "• Fenced trees don't respawn;",
        "  rocks respawn every other day",
        "• Nine Lives black-market shop in",
        "  the bamboo forest (after dark,",
        "  footpath behind your house)",
        "• Difficulty: Story 0.7× HP /",
        "  0.4× atk · Challenge 1.3×/2.0×",
    ]
    y = 136
    for ln in hids:
        d.text((422, y), ln, font=F_BODY, fill=INK)
        y += 20
    footer(d, "Fox Ruins is a long project, not a first-week task — work it alongside your daily farm loop.")
    img.save(os.path.join(OUT, "fox-ruins-tips.webp"), "WEBP", quality=88)


make_hero()
make_forms()
make_route()
make_income()
make_ruins()
print("Done:", sorted(os.listdir(OUT)))
