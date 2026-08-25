#!/usr/bin/env python
"""Generate 800x450 WebP infographics for the Welcome to Elderfield preview guide
(docs/welcome-to-elderfield/). Cozy-horror palette: deep night purple, bone
white, sickly green accents, warm lantern amber and blood red highlights."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 800, 450
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs", "welcome-to-elderfield", "images")
os.makedirs(OUT, exist_ok=True)

FDIR = "C:/Windows/Fonts/"
F_TITLE = ImageFont.truetype(FDIR + "arialbd.ttf", 30)
F_SUB = ImageFont.truetype(FDIR + "ariali.ttf", 16)
F_H = ImageFont.truetype(FDIR + "arialbd.ttf", 21)
F_BODY = ImageFont.truetype(FDIR + "arial.ttf", 16)
F_SMALL = ImageFont.truetype(FDIR + "arial.ttf", 13)

# Palette — cozy-horror (dusk purple + bone + lantern amber + blood red)
BG = (27, 25, 38)           # deep dusk purple
BG2 = (37, 33, 50)          # slightly lighter panel
PANEL = (46, 42, 60)        # card panel
INK = (235, 228, 214)       # bone-white text
SLATE = (176, 168, 158)     # secondary text
MIST = (102, 92, 120)       # muted purple
LIME = (150, 176, 96)       # sickly green accent
DEEP = (104, 128, 62)       # deep green
AMBER = (222, 164, 84)      # lantern amber
DAMBER = (176, 124, 56)     # deep amber
BLOOD = (190, 82, 74)       # blood red
RED2 = (158, 64, 58)        # deep red
PURPLE = (130, 96, 168)     # magic purple
DPURPLE = (96, 70, 132)     # deep magic purple


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


def header(draw, title, sub=None, accent=AMBER):
    rounded(draw, (0, 0, W, 74), 0, BG2)
    draw.line([(0, 74), (W, 74)], fill=(66, 58, 82), width=2)
    draw.rounded_rectangle([(18, 16), (26, 58)], radius=4, fill=accent)
    draw.text((40, 16), title, font=F_TITLE, fill=INK)
    if sub:
        draw.text((42, 50), sub, font=F_SUB, fill=SLATE)


def footer(draw, text):
    draw.text((18, H - 24), text, font=F_SMALL, fill=(140, 132, 122))


def chip(draw, x, y, text, fill, fg=(255, 255, 255), font=None):
    font = font or F_SMALL
    w = draw.textlength(text, font=font) + 18
    rounded(draw, (x, y, x + w, y + 24), 12, fill)
    draw.text((x + 9, y + 4), text, font=font, fill=fg)


def dusk_sky(d):
    # dusk gradient behind the farm
    for i in range(H):
        t = i / H
        r = int(60 - 24 * t)
        g = int(48 - 18 * t)
        b = int(84 - 30 * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # a sickly pale moon
    d.ellipse([600, 34, 660, 94], fill=(226, 214, 188))
    d.ellipse([606, 40, 654, 88], fill=(222, 196, 150))
    # distant hills
    d.ellipse([-80, 300, 300, 430], fill=(52, 40, 58))
    d.ellipse([240, 290, 640, 440], fill=(46, 36, 52))
    d.ellipse([520, 300, 920, 440], fill=(52, 40, 58))


def tentacle(d, x, y, col=DPURPLE, big=False):
    s = 1.6 if big else 1.0
    # wavy tentacle rising from the ground
    pts = []
    for i in range(13):
        xi = x + i * 9 * s
        yi = y - (6 * s) * i - (8 * s) * abs(i - 6) * 0.35
        pts.append((xi, yi))
    d.line(pts, fill=col, width=int(8 * s) if big else 6)
    d.ellipse([pts[-1][0] - 7 * s, pts[-1][1] - 7 * s, pts[-1][0] + 7 * s, pts[-1][1] + 7 * s], fill=col)


def eyeball_crop(d, x, y, s=1.0):
    d.ellipse([x - 16 * s, y - 12 * s, x + 16 * s, y + 12 * s], fill=(228, 226, 214))
    d.ellipse([x - 7 * s, y - 6 * s, x + 7 * s, y + 6 * s], fill=(44, 40, 52))
    d.ellipse([x - 2 * s, y - 2 * s, x + 3 * s, y + 3 * s], fill=(235, 230, 220))
    d.line([(x - 16 * s, y - 10 * s), (x + 16 * s, y - 8 * s)], fill=BLOOD, width=2)


def tooth_crop(d, x, y, s=1.0):
    d.polygon([(x - 12 * s, y + 12 * s), (x - 10 * s, y - 8 * s), (x - 3 * s, y - 12 * s),
               (x + 4 * s, y - 9 * s), (x + 12 * s, y + 10 * s), (x + 6 * s, y + 13 * s)], fill=(232, 228, 216))
    d.line([(x - 4 * s, y - 2 * s), (x + 4 * s, y - 1 * s)], fill=(150, 142, 130), width=2)


def corn_stalk(d, x, y, col=DEEP):
    d.line([(x, y), (x, y - 46)], fill=col, width=3)
    d.line([(x, y - 30), (x - 12, y - 38)], fill=col, width=2)
    d.line([(x, y - 22), (x + 12, y - 30)], fill=col, width=2)
    d.polygon([(x - 7, y - 40), (x, y - 52), (x + 7, y - 40), (x, y - 44)], fill=AMBER)


# ─────────────────────────── 1. hero.webp ───────────────────────────
def make_hero():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    dusk_sky(d)
    # a rickety farm fence line
    d.rectangle([0, 330, W, 450], fill=(34, 30, 44))
    d.line([(0, 330), (W, 330)], fill=(58, 50, 66), width=2)
    for fx in range(30, W, 60):
        d.rectangle([fx, 300, fx + 6, 350], fill=(86, 76, 88))
    # tentacles creeping at the fence
    tentacle(d, 120, 360)
    tentacle(d, 300, 352)
    tentacle(d, 470, 362)
    tentacle(d, 640, 350)
    # strange crops along the fence
    eyeball_crop(d, 190, 340)
    tooth_crop(d, 260, 344)
    eyeball_crop(d, 560, 342)
    tooth_crop(d, 700, 346)
    corn_stalk(d, 90, 348)
    # title plate
    rounded(d, (30, 118, 470, 258), 12, (24, 22, 34))
    d.rounded_rectangle([(30, 118), (470, 258)], radius=12, outline=AMBER, width=2)
    d.text((52, 130), "Welcome to", font=F_SUB, fill=SLATE)
    d.text((52, 152), "Elderfield", font=F_TITLE, fill=INK)
    d.text((54, 192), "Cozy horror farming RPG · Sept 10, 2026", font=F_SUB, fill=SLATE)
    d.text((54, 214), "Farm the strange. Befriend the odd. Die, learn, repeat.", font=F_SMALL, fill=AMBER)
    # rating chip
    chip(d, 52, 240, "Free demo on Steam · 96% positive", BLOOD)
    footer(d, "Farming Games Help · Welcome to Elderfield Preview Guide · Chris Cote / Kwalee")
    img.save(os.path.join(OUT, "hero.webp"), "WEBP", quality=88)


# ─────────────────────────── 2. farm-strange.webp ───────────────────────────
def make_farm_strange():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Farm the Strange", "Corn and pumpkins... and teeth, eyeballs and tentacles", LIME)
    rows = [
        ("Normal crops", "Corn, pumpkins and the familiar staples of a cozy farm", "Farming you already know", DEEP, "Grow freely"),
        ("Unsettling crops", "Teeth and eyeballs grow right beside the tomatoes", "The horror is in the harvest", LIME, "Harvest carefully"),
        ("Tentacled livestock", "Strange otherworldly cattle — a cow with tentacles", "Milk it? The demo lets you find out", PURPLE, "Feed & keep"),
        ("Unruly tentacles", "Stop the tentacles from spreading across your land", "The farm fights back", BLOOD, "Cut them back"),
        ("Your landlord", "Hans — a giant skull who outgrew his body", "You rent the farm from him", AMBER, "Pay your rent"),
    ]
    y = 92
    for name, how, why, col, tag in rows:
        rounded(d, (24, y, 776, y + 60), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((192, y + 8), how, font=F_BODY, fill=INK)
        d.text((192, y + 30), why, font=F_SMALL, fill=SLATE)
        d.text((620, y + 20), tag, font=F_SMALL, fill=AMBER)
        y += 68
    footer(d, "Every farming routine has a twist — the field is alive, and not all of it wants to be harvested.")
    img.save(os.path.join(OUT, "farm-strange.webp"), "WEBP", quality=88)


# ─────────────────────────── 3. daily-stakes.webp ───────────────────────────
def make_daily_stakes():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Everyday Tasks Have Stakes", "Tabletop-style d6 dice rolls decide the mundane", BLOOD)
    rows = [
        ("d6 dice rolls", "Opening a bin, looting, sleeping — most actions roll a die", "Tabletop RPG luck on a farm", AMBER, "Roll for it"),
        ("Trash cans", "A useful weapon... or a two-headed rat attack", "Developer: a one-time early bonus", BLOOD, "Gamble"),
        ("Grass & rocks", "Cutting grass or breaking rocks can trigger a fight", "Even chores are dangerous", LIME, "Be ready"),
        ("The bath", "Restores health, but resets monsters onto the map", "Risk/reward recovery", PURPLE, "Trade-off"),
        ("Sleep", "Can end a curse — or start a new one. Not sleeping is worse", "You can literally die in your sleep", RED2, "Rest carefully"),
    ]
    y = 92
    for name, how, why, col, tag in rows:
        rounded(d, (24, y, 776, y + 60), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((178, y + 8), how, font=F_BODY, fill=INK)
        d.text((178, y + 30), why, font=F_SMALL, fill=SLATE)
        d.text((618, y + 20), tag, font=F_SMALL, fill=AMBER)
        y += 68
    footer(d, "The horror gives farming the stakes it otherwise lacks — comfort is never guaranteed.")
    img.save(os.path.join(OUT, "daily-stakes.webp"), "WEBP", quality=88)


# ─────────────────────────── 4. combat-mall.webp ───────────────────────────
def make_combat_mall():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Turn-Based Combat & the Dead Mall", "The local shopping mall is your first dungeon", PURPLE)
    steps = [
        ("1  Action Points", "Spend AP on attacks, healing, buffs or debuffs", "Every turn is a decision", PURPLE),
        ("2  Run is legit", "Running away is a fully valid option", "Live to farm another day", SLATE),
        ("3  The Mall", "A dead mall — shops and monsters under one roof", "First dungeon, real challenge", BLOOD),
        ("4  The Old Gods", "Seek the ancient horrors for the true endgame", "They are watching", DPURPLE),
        ("5  Harder modes", "Cozy mode is chill — the harder mode brings the Old Gods in", "Choose your fear level", AMBER),
    ]
    y = 92
    for name, desc, note, col in steps:
        rounded(d, (24, y, 776, y + 60), 10, PANEL)
        chip(d, 38, y + 17, name, col, font=F_H)
        d.text((196, y + 8), desc, font=F_BODY, fill=INK)
        d.text((196, y + 30), note, font=F_SMALL, fill=SLATE)
        y += 68
    footer(d, "Reviewers flag a difficulty spike partway through the supermarket — stock up before you shop.")
    img.save(os.path.join(OUT, "combat-mall.webp"), "WEBP", quality=88)


# ─────────────────────────── 5. cozy-life.webp ───────────────────────────
def make_cozy_life():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    header(d, "Cozy Life, Unsettling Town", "Befriend the odd townsfolk — you can even marry one", AMBER)
    # left panel: life sim layer
    rounded(d, (20, 92, 388, 412), 10, PANEL)
    d.text((34, 104), "The life sim layer", font=F_H, fill=AMBER)
    facts = [
        "• Befriend or romance the townsfolk",
        "  — one of them is a skeleton",
        "• Marry a local if you dare",
        "• Fish, mine, forage, craft, cook",
        "• Cooked food can heal, bless,",
        "  or curse you",
        "• Customize your character",
        "  and decorate your home",
    ]
    y = 138
    for ln in facts:
        d.text((34, y), ln, font=F_BODY, fill=INK)
        y += 20
    # right panel: mystery layer
    rounded(d, (408, 92, 780, 412), 10, PANEL)
    d.text((422, 104), "The mystery layer", font=F_H, fill=LIME)
    hids = [
        "• Explore the town, the dead mall",
        "  and the wilds around Elderfield",
        "• Watch unsettling local news",
        "• Unravel daily mysteries",
        "• Eldritch beings watch the town",
        "• Rarely does anyone leave",
        "• Cozy mode = relax",
        "• Hard mode = the Old Gods",
    ]
    y = 138
    for ln in hids:
        d.text((422, y), ln, font=F_BODY, fill=INK)
        y += 20
    footer(d, "Welcome to Elderfield — the abnormal is the normal, and the farm is just the start.")
    img.save(os.path.join(OUT, "cozy-life.webp"), "WEBP", quality=88)


if __name__ == "__main__":
    make_hero()
    make_farm_strange()
    make_daily_stakes()
    make_combat_mall()
    make_cozy_life()
    print("Generated 5 WebP images in", OUT)
