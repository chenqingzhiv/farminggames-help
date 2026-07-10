# Palworld Breeding Mechanics & Data Reference

> Data sourced from [palworld.wiki.gg/wiki/Breeding](https://palworld.wiki.gg/wiki/Breeding)  
> Covers Sakurajima, Feybreak, and all major updates

---

## How Breeding Works

1. Each Pal has a hidden **Breeding Power** number (1–1500). **Lower = rarer/more powerful.**
2. Place one Male + one Female Pal in the **Breeding Farm** with ≥1 **Cake**.
3. The result is determined by:

```
Child Power = floor( (ParentA_Power + ParentB_Power + 1) / 2 )
```

4. The Pal species whose power is **closest** to this value is the offspring.
   - Tie → lowest internal index wins.
5. **You can never breed a Pal rarer (lower power) than your rarest parent.**
6. Some variant Pals bypass this calculation and require **specific parent combos** (see Unique Combinations below).

---

## Quick Calculator Logic

**Input:** `parentA_name`, `parentB_name`  
**Steps:**
1. Look up both powers from the breeding power table.
2. `computed = floor((powerA + powerB + 1) / 2)`
3. Search all eligible Pals for the closest power value.
4. If a unique combo matches the parent pair → override result.
5. Return closest pal + power difference.

---

## Breeding Power Table (All 140+ Pals)

| # | Pal | Power | # | Pal | Power |
|---|-----|-------|---|-----|-------|
| 001 | Lamball | 1470 | 002 | Cattiva | 1460 |
| 003 | Chikipi | 1500 | 004 | Lifmunk | 1430 |
| 005 | Foxparks | 1400 | 005B | Foxparks Cryst | 1305 |
| 006 | Fuack | 1330 | 007 | Sparkit | 1410 |
| 008 | Tanzee | 1250 | 009 | Rooby | 1155 |
| 010 | Pengullet | 1350 | 011 | Penking | **520** |
| 012 | Jolthog | 1370 | 012B | Jolthog Cryst | 1360 |
| 013 | Gumoss | 1240 | 014 | Vixy | 1450 |
| 015 | Hoocrates | 1390 | 016 | Teafant | 1490 |
| 017 | Depresso | 1380 | 018 | Cremis | 1455 |
| 019 | Daedream | 1230 | 020 | Rushoar | 1130 |
| 021 | Nox | 1180 | 022 | Fuddler | 1220 |
| 023 | Killamari | 1290 | 024 | Mau | 1480 |
| 024B | Mau Cryst | 1440 | 025 | Celaray | 870 |
| 026 | Direhowl | 1060 | 027 | Tocotoco | 1340 |
| 028 | Flopie | 1280 | 029 | Mozzarina | 910 |
| 030 | Bristla | 1320 | 031 | Gobfin | 1090 |
| 031B | Gobfin Ignis | 1100 | 032 | Hangyu | 1420 |
| 032B | Hangyu Cryst | 1422 | 033 | Mossanda | 430 |
| 033B | Mossanda Lux | 390 | 034 | Woolipop | 1190 |
| 035 | Caprity | 930 | 035B | Caprity Noct | 855 |
| 036 | Melpaca | 890 | 037 | Eikthyrdeer | 920 |
| 037B | Eikthyrdeer Terra | 900 | 038 | Nitewing | 420 |
| 039 | Ribbuny | 1310 | 039B | Ribbuny Botan | 1205 |
| 040 | Incineram | 590 | 040B | Incineram Noct | 580 |
| 041 | Cinnamoth | 490 | 042 | Arsox | 790 |
| 043 | Dumud | 895 | 044 | Cawgnito | 1080 |
| 045 | Leezpunk | 1120 | 045B | Leezpunk Ignis | 1140 |
| 046 | Loupmoon | 950 | 046B | Loupmoon Cryst | 805 |
| 047 | Galeclaw | 1030 | 048 | Robinquill | 1020 |
| 048B | Robinquill Terra | 1000 | 049 | Gorirat | 1040 |
| 049B | Gorirat Terra | 1030 | 050 | Beegarde | 1070 |
| 051 | Elizabee | 330 | 052 | Grintale | 510 |
| 053 | Swee | 1300 | 054 | Sweepa | 410 |
| 055 | Chillet | 800 | 055B | Chillet Ignis | 790 |
| 056 | Univolt | 680 | 057 | Foxcicle | 760 |
| 058 | Pyrin | 360 | 058B | Pyrin Noct | 240 |
| 059 | Reindrix | 880 | 060 | Rayhound | 740 |
| 061 | Kitsun | 830 | 061B | Kitsun Noct | 735 |
| 062 | Dazzi | 1210 | 062B | Dazzi Noct | 1115 |
| 063 | Lunaris | 1110 | 064 | Dinossom | 820 |
| 064B | Dinossom Lux | 810 | 065 | Surfent | 560 |
| 065B | Surfent Terra | 550 | 066 | Maraith | 1150 |
| 067 | Digtoise | 850 | 068 | Tombat | 750 |
| 069 | Lovander | 940 | 070 | Flambelle | 1405 |
| 071 | Vanwyrm | 660 | 071B | Vanwyrm Cryst | 620 |
| 072 | Bushi | 640 | 072B | Bushi Noct | 650 |
| 073 | Beakon | 220 | 074 | Ragnahawk | 380 |
| 075 | Katress | 700 | 075B | Katress Ignis | 690 |
| 076 | Wixen | 1160 | 076B | Wixen Noct | 1150 |
| 077 | Verdash | 990 | 078 | Vaelet | 1050 |
| 079 | Sibelyx | 450 | 080 | Elphidran | 540 |
| 080B | Elphidran Aqua | 530 | 081 | Kelpsea | 1260 |
| 081B | Kelpsea Ignis | 1270 | 082 | Azurobe | 500 |
| 083 | Cryolinx | **130** | 083B | Cryolinx Terra | 160 |
| 084 | Blazehowl | 710 | 084B | Blazehowl Noct | 670 |
| 085 | Relaxaurus | 280 | 085B | Relaxaurus Lux | 270 |
| 086 | Broncherry | 860 | 086B | Broncherry Aqua | 840 |
| 087 | Petallia | 780 | 088 | Reptyro | 320 |
| 088B | Reptyro Cryst | 230 | 089 | Kingpaca | 470 |
| 089B | Kingpaca Cryst | 440 | 090 | Mammorest | 300 |
| 090B | Mammorest Cryst | 290 | 091 | Wumpo | 460 |
| 091B | Wumpo Botan | 480 | 092 | Warsect | 340 |
| 092B | Warsect Terra | 350 | 093 | Fenglope | 980 |
| 093B | Fenglope Lux | 835 | 094 | Felbat | 1010 |
| 095 | Quivern | 350 | 095B | Quivern Botan | 340 |
| 096 | Blazamut | **10** | 096B | Blazamut Ryu | 9 |
| 097 | Helzephyr | 190 | 097B | Helzephyr Lux | 180 |
| 098 | Astegon | **150** | 099 | Menasting | 260 |
| 099B | Menasting Terra | 250 | 100 | Anubis | **570** |
| 101 | Jormuntide | 310 | 101B | Jormuntide Ignis | 315 |
| 102 | Suzaku | **50** | 102B | Suzaku Aqua | 30 |
| 103 | Grizzbolt | 200 | 104 | Lyleen | 250 |
| 104B | Lyleen Noct | 210 | 105 | Faleris | 370 |
| 105B | Faleris Aqua | 245 | 106 | Orserk | **140** |
| 107 | Shadowbeak | **60** | 108 | Paladius | **80** |
| 109 | Necromus | **70** | 110 | Frostallion | **120** |
| 110B | Frostallion Noct | **100** | 111 | Jetragon | **90** |
| 112 | Bellanoir | **1** | 112B | Bellanoir Libero | 1 |
| 113 | Selyne | 345 | 114 | Croajiro | 795 |
| 115 | Lullu | 905 | 116 | Shroomer | 720 |
| 116B | Shroomer Noct | 730 | 117 | Kikit | 1125 |
| 118 | Sootseer | 545 | 119 | Prixter | 355 |
| 120 | Knocklem | 265 | 121 | Yakumo | 945 |
| 122 | Dogen | 665 | 123 | Dazemu | 675 |
| 124 | Mimog | 1200 | 125 | Xenovader | 465 |
| 126 | Xenogard | 435 | 127 | Xenolord | 265 |
| 128 | Nitemary | 705 | 129 | Starryon | 365 |
| 130 | Silvegis | 215 | 131 | Smokie | 1245 |
| 132 | Celesdir | 815 | 133 | Omascul | 630 |
| 134 | Splatterina | 725 | 135 | Tarantriss | 825 |
| 136 | Azurmane | 400 | 137 | Bastigor | 170 |
| 138 | Prunelia | 755 | 139 | Nyafia | 645 |
| 140 | Gildane | 505 |

### Key Power Tiers

| Tier | Power | Pals |
|------|-------|------|
| **Legendary** | 1–90 | Bellanoir(1), Blazamut(10), Suzaku(50), Shadowbeak(60), Necromus(70), Paladius(80), Jetragon(90) |
| **Very Rare** | 100–200 | Frostallion Noct(100), Frostallion(120), Cryolinx(130), Orserk(140), Astegon(150), Bastigor(170), Helzephyr(190), Grizzbolt(200) |
| **Rare** | 210–400 | Lyleen Noct(210), Beakon(220), Pyrin Noct(240), Lyleen(250), Menasting(260), Relaxaurus(280), Mammorest(300), Jormuntide(310), Reptyro(320), Elizabee(330), Warsect(340), Quivern(350), Pyrin(360), Faleris(370), Ragnahawk(380), Azurmane(400) |
| **Uncommon** | 410–700 | Nitewing(420), Mossanda(430), Sibelyx(450), Wumpo(460), Kingpaca(470), Azurobe(500), Penking(520), Anubis(570), Surfent(560), Jormuntide Ignis(315), etc. |
| **Common** | 710–1500 | Blazehowl, Katress, Bushi, Dinossom, Rayhound, Foxcicle, Arsox, Univolt, Vanwyrm, Eikthyrdeer, Caprity, Mozzarina, Lamball, Chikipi, etc. |

---

## Unique Combinations (53 Variants)

These override the power-averaging formula. Breed the specific parents → get the specific result:

| Result | Parents | Result | Parents |
|--------|---------|--------|---------|
| Azurobe Cryst | Azurobe + Frostplume | Blazehowl Noct | Blazehowl + Felbat |
| Broncherry Aqua | Broncherry + Fuack | Bushi Noct | Bushi + Sootseer |
| Caprity Noct | Caprity + Tarantriss | Chillet Ignis | Chillet + Arsox |
| Croajiro Noct | Croajiro + Bushi Noct | Cryolinx Terra | Cryolinx + Dazemu |
| Dazzi Noct | Dazzi + Omascul | Dinossom Lux | Dinossom + Rayhound |
| Dumud Gild | Dumud + Eikthyrdeer Terra | Eikthyrdeer Terra | Eikthyrdeer + Hangyu |
| Elphidran Aqua | Elphidran + Surfent | Faleris Aqua | Faleris + Jormuntide |
| Fenglope Lux | Fenglope + Azurmane | Finsider Ignis | Finsider + Gobfin Ignis |
| Foxparks Cryst | Foxparks + Foxcicle | Frostallion Noct | Frostallion + Helzephyr |
| Fuack Ignis | Fuack + Flambelle | Ghangler Ignis | Ghangler + Sootseer |
| Gobfin Ignis | Gobfin + Rooby | Gorirat Terra | Gorirat + Kikit |
| Hangyu Cryst | Hangyu + Swee | Helzephyr Lux | Helzephyr + Beakon |
| Incineram Noct | Incineram + Maraith | Jolthog Cryst | Jolthog + Pengullet |
| Jormuntide Ignis | Jormuntide + Blazehowl | Katress Ignis | Wixen + Katress |
| Killamari Primo | Killamari + Ribbuny | Kingpaca Cryst | Kingpaca + Reindrix |
| Kitsun Noct | Kitsun + Nyafia | Leezpunk Ignis | Leezpunk + Flambelle |
| Loupmoon Cryst | Loupmoon + Sweepa | Lyleen Noct | Lyleen + Menasting |
| Mammorest Cryst | Mammorest + Wumpo | Mau Cryst | Mau + Pengullet |
| Menasting Terra | Menasting + Knocklem | Mossanda Lux | Mossanda + Grizzbolt |
| Pengullet Lux | Pengullet + Sparkit | Penking Lux | Penking + Rayhound |
| Pyrin Noct | Pyrin + Katress | Quivern Botan | Quivern + Lullu |
| Relaxaurus Lux | Relaxaurus + Sparkit | Reptyro Cryst | Reptyro + Foxcicle |
| Ribbuny Botan | Ribbuny + Bristla | Robinquill Terra | Robinquill + Fuddler |
| Surfent Terra | Surfent + Dumud | Suzaku Aqua | Suzaku + Jormuntide |
| Turtacle Terra | Turtacle + Digtoise | Vanwyrm Cryst | Vanwyrm + Foxcicle |
| Whalaska Ignis | Whalaska + Chillet Ignis | Warsect Terra | Warsect + Digtoise |
| Wixen Noct | Katress + Wixen | | |

---

## Special Variant Combinations (Non-Rank-Based)

These produce base species (not variants) via specific combos:

| Result | Parents |
|--------|---------|
| **Lyleen** | Mossanda + Petallia |
| **Faleris** | Vanwyrm + Anubis |
| **Grizzbolt** | Mossanda + Rayhound |
| **Orserk** | Grizzbolt + Relaxaurus |
| **Shadowbeak** | Kitsun + Astegon |
| **Selyne** | Paladius + Lunaris |
| **Bastigor** | Frostallion + Anubis |
| **Celesdir** | Gildane + Eikthyrdeer Terra (Tower Boss) |

---

## Top Breeding Targets

### ⚡ Anubis (Power 570) — Best Handiwork Pal
- **Easy early combo:** Incineram(590) + Surfent(560) → avg=575 → Anubis(570)
- **Alt:** Celaray(870) + Anubis(570) → avg=720 → Shroomer Noct(730)

### ❄️ Frostallion (Power 120) — Best Ice Mount
- Jetragon(90) + Necromus(70) → avg=80 → Paladius(80)
- Cryolinx(130) + Anubis(570) → avg=350 → Quivern(350)

### 🔥 Jormuntide Ignis (Power 315) — Best Kindling
- **Special combo:** Jormuntide(310) + Blazehowl(710)
- Relaxaurus(280) + Jormuntide(310) → avg=295 → Mammorest Cryst(290)

### 💧 Jormuntide (Power 310) — Best Watering
- Relaxaurus(280) + Menasting(260) → avg=270 → Relaxaurus Lux(270)

### ⚡ Orserk (Power 140) — Best Electricity
- **Special combo:** Grizzbolt(200) + Relaxaurus(280)

### 🏥 Lyleen (Power 250) — Best Medicine
- **Special combo:** Mossanda(430) + Petallia(780)

### 🏗️ Astegon (Power 150) — Best Mining
- Shadowbeak(60) + Necromus(70) → avg=65 → closest=Shadowbeak(60)
- Cryolinx(130) + Menasting(260) → avg=195 → Helzephyr(190)

### 🐉 Jetragon (Power 90) — Fastest Mount
- Breed down: Start with Frostallion+Paladius, keep breeding lower-power offspring

---

## Calculator Algorithm (Pseudocode)

```
function calculateBreeding(parentA, parentB):
    // 1. Check unique combos first
    if isUniqueCombo(parentA, parentB):
        return uniqueCombos[parentA][parentB]
    
    // 2. Calculate average power
    powerA = getPower(parentA)
    powerB = getPower(parentB)
    targetPower = floor((powerA + powerB + 1) / 2)
    
    // 3. Find closest eligible pal
    bestPal = null
    bestDiff = Infinity
    for each pal in eligiblePals:
        diff = abs(pal.power - targetPower)
        if diff < bestDiff or (diff == bestDiff and pal.index < bestPal.index):
            bestPal = pal
            bestDiff = diff
    
    return bestPal.name
```

---

## Notes

- **Variants** (Cryst, Ignis, Noct, Lux, Aqua, Terra, Botan, etc.) have their own breeding power entries. They are marked `eligible: false` since they require unique combos.
- **Same-species breeding** always produces the same species.
- **Alpha/Boss Pals** bred from a boss parent don't guarantee boss offspring — size/IVs have a chance to inherit.
- Data current as of **v0.3.x** (Sakurajima + Feybreak updates). Full structured JSON with power table + all combos available in `palworld_breeding_data.json`.
