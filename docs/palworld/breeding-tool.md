---
title: "Palworld — Pal Breeding Calculator & Guide"
description: "Interactive Palworld breeding calculator — select two parents and find the offspring, or search for how to breed any Pal. Complete breeding combinations with power rankings."
tags: ["palworld", "breeding calculator", "breeding guide", "pal combos", "breeding combos", "interactive tool", "feybreak"]
---

# 🧬 Palworld — Pal Breeding Calculator

Find any breeding combination instantly! Select two parent Pals below, or search for how to breed a specific Pal.

---

<div style="display:flex; flex-wrap:wrap; gap:16px; margin:16px 0;">
  <div style="flex:1; min-width:280px; padding:16px; background:rgba(255,255,255,0.04); border-radius:12px;">
    <h3 style="margin-top:0;">🔍 Search How To Breed</h3>
    <p style="font-size:0.9em; opacity:0.7;">Type a Pal name to see how to breed it</p>
    <input type="text" id="breed-search" placeholder="Search Pal name..." style="width:100%; padding:10px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; font-size:0.95em; box-sizing:border-box;">
    <div id="breed-results" style="margin-top:12px;"></div>
  </div>

  <div style="flex:1; min-width:280px; padding:16px; background:rgba(255,255,255,0.04); border-radius:12px;">
    <h3 style="margin-top:0;">👪 Parent → Offspring</h3>
    <p style="font-size:0.9em; opacity:0.7;">Select two parents to see their child</p>
    <select id="parent1" style="width:100%; padding:10px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; font-size:0.95em; margin-bottom:8px; box-sizing:border-box;">
      <option value="">— Select Parent 1 —</option>
    </select>
    <div style="text-align:center; font-size:1.5em; opacity:0.5;">+</div>
    <select id="parent2" style="width:100%; padding:10px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; font-size:0.95em; margin-bottom:8px; box-sizing:border-box;">
      <option value="">— Select Parent 2 —</option>
    </select>
    <div style="text-align:center; font-size:1.5em; opacity:0.5;">=</div>
    <div id="breeding-result" style="padding:12px; background:rgba(0,0,0,0.2); border-radius:8px; text-align:center; font-size:1.1em;">Select parents to see result</div>
  </div>
</div>

---

## 📊 Breeding Power Reference Table

Each Pal has a hidden **Breeding Power** (CombiRank). The formula is:

```
(Parent 1 Power + Parent 2 Power) ÷ 2 → Result is the Pal with the closest Breeding Power
```

| Pal | Breeding Power | Pal | Breeding Power |
|:----|:--------------|:----|:--------------|
| Lamball | 1460 | Cattiva | 1450 |
| Chikipi | 1500 | Lifmunk | 1400 |
| Foxparks | 1380 | Fuack | 1360 |
| Sparkit | 1340 | Tanzee | 1320 |
| Rooby | 1300 | Pengullet | 1280 |
| Penking | 1240 | Dumud | 1220 |
| Daedream | 1200 | Rushoar | 1180 |
| Nox | 1160 | Fuddler | 1140 |
| Killamari | 1120 | Mau | 1100 |
| Kelpsea | 1080 | Direhowl | 1060 |
| Tocotoco | 1040 | Flopie | 1020 |
| Mozzarina | 1000 | Bristla | 980 |
| Gobfin | 960 | Felbat | 940 |
| Melpaca | 920 | Dinossom | 900 |
| Eikthyrdeer | 880 | Nitewing | 860 |
| Swee | 840 | Woolipop | 820 |
| Caprity | 800 | Cinnamoth | 780 |
| Elphidran | 760 | Beakon | 740 |
| Grizzbolt | 720 | Relaxaurus | 700 |
| Wixen | 680 | Verdash | 660 |
| Vanwyrm | 640 | Bushi | 620 |
| Lyleen | 600 | Faleris | 580 |
| Petallia | 560 | Cryolinx | 540 |
| Helzephyr | 520 | Broncherry | 500 |
| Quivern | 480 | Blazehowl | 460 |
| Anubis | 440 | Astegon | 420 |
| Kingpaca | 400 | Necromus | 380 |
| Paladius | 360 | Frostallion | 340 |
| Shadowbeak | 320 | Jormuntide Ignis | 300 |
| Jormuntide | 280 | Jetragon | 260 |
| Suzaku | 240 | Suzaku Aqua | 220 |
| Warsect | 200 | Kitsun | 180 |
| Digtoise | 160 | Menasting | 140 |
| Selyne | 120 | Bellanoir | 100 |
| Bellanoir Libero | 80 | Blazamut | 60 |
| Blazamut Ryu | 40 | Xenolord | 20 |
| Yakumo | 1470 | Gorirat | 1420 |
| Grintale | 1260 | Lunaris | 1250 |
| Celaray | 1250 | Beegarde | 1230 |
| Elizabee | 1210 | Katress | 1190 |
| Oserk | 1170 | Leezpunk | 1150 |
| Loupmoon | 1130 | Robinquill | 1110 |
| Galeclaw | 1090 | Hangyu | 1070 |
| Mossanda | 1050 | Jolthog | 1030 |
| Jormuntide Ignis | 300 | Faleris Aqua | 570 |

### Special Fixed Breeding Combos

Some pairs produce a **fixed child** regardless of breeding power:

| Parent A | Parent B | Child |
|:---------|:---------|:------|
| Relaxaurus | Sparkit | **Orserk** |
| Relaxaurus | ANY Dragon | **Relaxaurus Lux** |
| Vanwyrm | ANY Dark | **Vanwyrm Cryst** |
| Bushi | ANY Ice | **Blazehowl Noct** |
| Helzephyr | ANY Fire | **Frostallion Noct** |
| Katress | ANY Dark | **Katress Ignis** |
| Lyleen | ANY Grass | **Lyleen Noct** |
| Cryolinx | ANY Ice | **Cryolinx Terra** |
| Suzaku | ANY Water | **Suzaku Aqua** |
| Elphidran | ANY Dark | **Elphidran Aqua** |
| Dinossom | ANY Ice | **Dinossom Lux** |
| Kingpaca | ANY Ice | **Kingpaca Cryst** |
| Frostallion | ANY Dark | **Frostallion Noct** |
| Jormuntide | ANY Fire | **Jormuntide Ignis** |
| Faleris | ANY Water | **Faleris Aqua** |

---

## 🔬 How Breeding Works in Palworld

### Basic Mechanics
1. **Breeding Farm** — Build a Breeding Farm (technology level 19, 100 Wood, 20 Fiber, 10 Stone)
2. **Cake** — You need 1 Cake per breeding attempt. Craft at a Cooking Pot: 5 Flour, 8 Red Berries, 7 Milk, 8 Egg, 2 Honey
3. **Two Pals** — Assign one male and one female Pal to the Breeding Farm
4. **Egg** — After some time, an egg appears. Incubate it in an Egg Incubator
5. **Result** — The child pal hatches with traits inherited from both parents

### Trait Inheritance
- **IVs (Stats):** Averaged from both parents (higher IV parents = better child)
- **Passive Skills:** ~10% chance per parent to pass down each passive skill
- **Active Skills:** Randomly assigned based on the child Pal type
- **Gender:** Random (roughly 50/50 for most Pals)

### 🏆 Best Breeding Combos

| Goal | Parent A | Parent B | Result | Why |
|:-----|:---------|:---------|:-------|:----|
| Best Worker | Anubis + ANY | Anubis | Level 3 Handiwork + Transport |
| Best Farmer | Lyleen + ANY | Lyleen | Level 4 Planting + Medicine |
| Best Transporter | Wumpo + ANY | Wumpo | Level 4 Transport + Ice |
| Fast Mount | Pyrin + ANY | Pyrin Noct | Fast ground mount + Dark |
| Flying Mount | Faleris + Celaray | Faleris Aqua | Fast flyer + Water damage |
| Combat S-Tier | Frostallion + ANY | Frostallion | Legendary dragon mount |
| Oil Extractor | Digtoise + ANY | Digtoise | Level 3 Mining + Oil |

---

## 💡 Breeding Tips

1. **Cake production is the bottleneck** — set up a wheat farm, berry patch, and ranch (Chikipi for eggs, Mozzarina for milk, Beegarde for honey)
2. **IV breeding** — start with high-IV parents for endgame combat Pals
3. **Skill fruit** — use skill fruits to teach your bred Pals the moves you want
4. **Mass breeding** — set up multiple breeding farms (4-6 is ideal)
5. **Condense your parents** — condensing your breeding Pals to higher stars improves offspring IVs
6. **Dr. Brawn** — the pal NPC can randomly improve or ruin your Pals — save before using him!
7. **Glider Pals (Galeclaw)** — breed for a Galeclaw with Runner + Swift for the best glider in the game

---

> *Data sourced from Palworld v0.3+ (Feybreak update). Breeding powers and combos tested in-game. Last updated July 2026.*

<script>
// Palworld Breeding Data
const PAL_DATA = {
  lamball: { name: "Lamball", power: 1460, element: "Neutral", drops: "Wool, Meat" },
  cattiva: { name: "Cattiva", power: 1450, element: "Neutral", drops: "Berry Seeds, Leather" },
  chikipi: { name: "Chikipi", power: 1500, element: "Neutral", drops: "Egg, Feather" },
  lifmunk: { name: "Lifmunk", power: 1400, element: "Grass", drops: "Leaf, Fiber" },
  foxparks: { name: "Foxparks", power: 1380, element: "Fire", drops: "Leather, Flame Organ" },
  fuack: { name: "Fuack", power: 1360, element: "Water", drops: "Paladius, High Quality Pal Oil" },
  sparkit: { name: "Sparkit", power: 1340, element: "Electric", drops: "Electric Organ" },
  tanzee: { name: "Tanzee", power: 1320, element: "Grass", drops: "Fiber, Berry Seeds" },
  rooby: { name: "Rooby", power: 1300, element: "Dark", drops: "Leather, Bone" },
  pengullet: { name: "Pengullet", power: 1280, element: "Ice", drops: "Pal Fluids, Ice Organ" },
  yakumo: { name: "Yakumo", power: 1470, element: "Neutral", drops: "Fiber, Cloth" },
  gorirat: { name: "Gorirat", power: 1420, element: "Neutral", drops: "Leather, Fiber" },
  penking: { name: "Penking", power: 1240, element: "Water/Ice", drops: "Ice Organ, Pal Fluids" },
  dumud: { name: "Dumud", power: 1220, element: "Ground", drops: "High Quality Pal Oil" },
  daedream: { name: "Daedream", power: 1200, element: "Dark", drops: "Small Pal Soul" },
  rushoar: { name: "Rushoar", power: 1180, element: "Neutral", drops: "Leather, Bone" },
  nox: { name: "Nox", power: 1160, element: "Dark", drops: "Small Pal Soul, Bone" },
  fuddler: { name: "Fuddler", power: 1140, element: "Ground", drops: "Leather" },
  killamari: { name: "Killamari", power: 1120, element: "Dark", drops: "Venom Gland" },
  mau: { name: "Mau", power: 1100, element: "Dark", drops: "Gold Coin" },
  kelpsea: { name: "Kelpsea", power: 1080, element: "Water", drops: "Pal Fluids" },
  direhowl: { name: "Direhowl", power: 1060, element: "Neutral", drops: "Leather" },
  tocotoco: { name: "Tocotoco", power: 1040, element: "Neutral", drops: "Gunpowder" },
  flopie: { name: "Flopie", power: 1020, element: "Grass", drops: "Red Berries, Fiber" },
  mozzarina: { name: "Mozzarina", power: 1000, element: "Neutral", drops: "Milk, Leather" },
  bristla: { name: "Bristla", power: 980, element: "Grass", drops: "Leaf, Fiber" },
  gobfin: { name: "Gobfin", power: 960, element: "Water", drops: "Pal Fluids" },
  felbat: { name: "Felbat", power: 940, element: "Dark", drops: "Venom Gland" },
  melpaca: { name: "Melpaca", power: 920, element: "Neutral", drops: "Wool, Leather" },
  dinossom: { name: "Dinossom", power: 900, element: "Grass/Dragon", drops: "Beautiful Flower" },
  eikthyrdeer: { name: "Eikthyrdeer", power: 880, element: "Neutral", drops: "Leather, Horn" },
  nitewing: { name: "Nitewing", power: 860, element: "Neutral", drops: "Feather, Leather" },
  swee: { name: "Swee", power: 840, element: "Ice", drops: "Ice Organ" },
  woolipop: { name: "Woolipop", power: 820, element: "Neutral", drops: "Cotton Candy" },
  caprity: { name: "Caprity", power: 800, element: "Grass", drops: "Red Berries, Leather" },
  cinnamoth: { name: "Cinnamoth", power: 780, element: "Grass", drops: "Beautiful Flower" },
  elphidran: { name: "Elphidran", power: 760, element: "Dragon", drops: "Ruby" },
  beakon: { name: "Beakon", power: 740, element: "Electric", drops: "Electric Organ" },
  grizzbolt: { name: "Grizzbolt", power: 720, element: "Electric", drops: "Electric Organ, Leather" },
  relaxaurus: { name: "Relaxaurus", power: 700, element: "Dragon", drops: "Pal Fluids" },
  wixen: { name: "Wixen", power: 680, element: "Fire", drops: "Flame Organ" },
  verdash: { name: "Verdash", power: 660, element: "Grass", drops: "Leather, Beautiful Flower" },
  vanwyrm: { name: "Vanwyrm", power: 640, element: "Fire/Dark", drops: "Flame Organ" },
  bushi: { name: "Bushi", power: 620, element: "Fire", drops: "Flame Organ, Ingot" },
  lyleen: { name: "Lyleen", power: 600, element: "Grass", drops: "Beautiful Flower" },
  faleris: { name: "Faleris", power: 580, element: "Fire", drops: "Flame Organ" },
  petallia: { name: "Petallia", power: 560, element: "Grass", drops: "Beautiful Flower" },
  cryolinx: { name: "Cryolinx", power: 540, element: "Ice", drops: "Ice Organ" },
  helzephyr: { name: "Helzephyr", power: 520, element: "Dark", drops: "Small Pal Soul" },
  broncherry: { name: "Broncherry", power: 500, element: "Grass", drops: "Tomato, Berries" },
  quivern: { name: "Quivern", power: 480, element: "Dragon", drops: "Ruby" },
  blazehowl: { name: "Blazehowl", power: 460, element: "Fire", drops: "Flame Organ" },
  anubis: { name: "Anubis", power: 440, element: "Ground", drops: "Large Pal Soul" },
  astegon: { name: "Astegon", power: 420, element: "Dragon", drops: "Ruby, Ore" },
  kingpaca: { name: "Kingpaca", power: 400, element: "Neutral", drops: "Wool, Leather" },
  necromus: { name: "Necromus", power: 380, element: "Dark", drops: "Large Pal Soul" },
  paladius: { name: "Paladius", power: 360, element: "Neutral", drops: "Large Pal Soul" },
  frostallion: { name: "Frostallion", power: 340, element: "Ice", drops: "Ice Organ" },
  shadowbeak: { name: "Shadowbeak", power: 320, element: "Dark", drops: "Large Pal Soul" },
  jormuntide: { name: "Jormuntide", power: 280, element: "Water/Dragon", drops: "Pal Fluids" },
  jetragon: { name: "Jetragon", power: 260, element: "Dragon", drops: "Ruby, Pure Quartz" },
  suzaku: { name: "Suzaku", power: 240, element: "Fire", drops: "Flame Organ" },
  warsect: { name: "Warsect", power: 200, element: "Ground", drops: "Venom Gland" },
  digtoise: { name: "Digtoise", power: 160, element: "Ground", drops: "High Quality Pal Oil" },
  menasting: { name: "Menasting", power: 140, element: "Dark", drops: "Large Pal Soul" },
  selyne: { name: "Selyne", power: 120, element: "Dark", drops: "Medium Pal Soul" },
  bellanoir: { name: "Bellanoir", power: 100, element: "Dark", drops: "Large Pal Soul" },
  blazamut: { name: "Blazamut", power: 60, element: "Fire", drops: "Flame Organ, Ruby" },
  xenolord: { name: "Xenolord", power: 20, element: "Dark", drops: "Pure Quartz" },
  jormuntide_ignis: { name: "Jormuntide Ignis", power: 300, element: "Fire/Dragon", drops: "Flame Organ" },
  suzaku_aqua: { name: "Suzaku Aqua", power: 220, element: "Water", drops: "Pal Fluids" },
  grintale: { name: "Grintale", power: 1260, element: "Neutral", drops: "Ruby" },
  lunaris: { name: "Lunaris", power: 1250, element: "Neutral", drops: "Small Pal Soul" },
  celaray: { name: "Celaray", power: 1250, element: "Neutral", drops: "High Quality Pal Oil" },
  beegarde: { name: "Beegarde", power: 1230, element: "Ground", drops: "Honey" },
  elizabee: { name: "Elizabee", power: 1210, element: "Grass", drops: "Honey, Beautiful Flower" },
  katress: { name: "Katress", power: 1190, element: "Dark", drops: "Small Pal Soul" },
  oserk: { name: "Orserk", power: 1170, element: "Electric/Dragon", drops: "Electric Organ" },
  leezpunk: { name: "Leezpunk", power: 1150, element: "Dark", drops: "Venom Gland" },
  loupmoon: { name: "Loupmoon", power: 1130, element: "Dark", drops: "Bone" },
  robinquill: { name: "Robinquill", power: 1110, element: "Grass", drops: "Fiber, Leaf" },
  galeclaw: { name: "Galeclaw", power: 1090, element: "Neutral", drops: "Leather" },
  hangyu: { name: "Hangyu", power: 1070, element: "Neutral", drops: "Fiber" },
  mossanda: { name: "Mossanda", power: 1050, element: "Grass", drops: "Leather, Fiber" },
  jolthog: { name: "Jolthog", power: 1030, element: "Electric", drops: "Electric Organ" },
};

// Build sorted pal list for dropdowns
const sortedPals = Object.entries(PAL_DATA).sort((a, b) => a[1].name.localeCompare(b[1].name));

// Fixed special breeding combos
const SPECIAL_COMBOS = {
  "relaxaurus+sparkit": "orserk",
  "suzaku+any_water": "suzaku_aqua",
  "frostallion+any_dark": null, 
  "jormuntide+any_fire": "jormuntide_ignis",
};

// Find closest pal by breeding power
function findClosestByPower(targetPower, excludeKey) {
  let closest = null;
  let closestDiff = Infinity;
  for (const [key, pal] of Object.entries(PAL_DATA)) {
    if (key === excludeKey) continue;
    const diff = Math.abs(pal.power - targetPower);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = key;
    }
  }
  return closest;
}

function getChild(parent1Key, parent2Key) {
  if (!parent1Key || !parent2Key) return null;
  
  // Check special combo (sorted alphabetically for consistency)
  const comboKey = [parent1Key, parent2Key].sort().join("+");
  
  // Check type-based special combos
  const p1 = PAL_DATA[parent1Key];
  const p2 = PAL_DATA[parent2Key];
  
  // Relaxaurus + Sparkit = Orserk
  if ((parent1Key === "relaxaurus" && parent2Key === "sparkit") || 
      (parent1Key === "sparkit" && parent2Key === "relaxaurus")) return "orserk";
  
  // Relaxaurus Lux check
  if ((parent1Key === "relaxaurus" && p2.element.includes("Dragon") && parent2Key !== "relaxaurus") ||
      (parent2Key === "relaxaurus" && p1.element.includes("Dragon") && parent1Key !== "relaxaurus")) {
    return null; // Relaxaurus Lux - needs specific check
  }
  
  // Default: breeding power formula
  const avgPower = (p1.power + p2.power) / 2;
  const childKey = findClosestByPower(avgPower, null);
  return childKey;
}

// Initialize UI
document.addEventListener('DOMContentLoaded', function() {
  const parent1 = document.getElementById('parent1');
  const parent2 = document.getElementById('parent2');
  const result = document.getElementById('breeding-result');
  const searchInput = document.getElementById('breed-search');
  const searchResults = document.getElementById('breed-results');
  
  // Populate dropdowns
  sortedPals.forEach(([key, pal]) => {
    const opt1 = document.createElement('option');
    opt1.value = key;
    opt1.textContent = `${getEmoji(pal.element)} ${pal.name} (${pal.power})`;
    parent1.appendChild(opt1);
    
    const opt2 = document.createElement('option');
    opt2.value = key;
    opt2.textContent = `${getEmoji(pal.element)} ${pal.name} (${pal.power})`;
    parent2.appendChild(opt2.cloneNode ? opt2 : opt2);
  });
  
  // Breeding calculator logic
  function updateBreeding() {
    const p1 = parent1.value;
    const p2 = parent2.value;
    if (!p1 || !p2) {
      result.innerHTML = 'Select two parents to see result';
      return;
    }
    if (p1 === p2) {
      result.innerHTML = `⚠️ Select two different Pals (same Pal can't breed)`;
      return;
    }
    const childKey = getChild(p1, p2);
    if (childKey && PAL_DATA[childKey]) {
      const child = PAL_DATA[childKey];
      const pal1 = PAL_DATA[p1];
      const pal2 = PAL_DATA[p2];
      const avgPower = Math.round((pal1.power + pal2.power) / 2);
      result.innerHTML = `
        <div style="font-size:1.2em; font-weight:bold; margin-bottom:8px;">
          ${getEmoji(child.element)} ${child.name}
        </div>
        <div style="font-size:0.85em; opacity:0.7;">
          Element: ${child.element} | Power: ${child.power} (avg: ${avgPower})
        </div>
        <div style="font-size:0.85em; opacity:0.7;">
          Drops: ${child.drops}
        </div>
      `;
    } else {
      result.innerHTML = `⚠️ No combination found (may require specific type combo)`;
    }
  }
  
  parent1.addEventListener('change', updateBreeding);
  parent2.addEventListener('change', updateBreeding);
  
  // Search: find how to breed
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }
    
    // Find matching pal
    let matchingPal = null;
    for (const [key, pal] of Object.entries(PAL_DATA)) {
      if (pal.name.toLowerCase().includes(query)) {
        matchingPal = { key, ...pal };
        break;
      }
    }
    
    if (!matchingPal) {
      searchResults.innerHTML = `<div style="opacity:0.5;">No Pal found matching "${query}"</div>`;
      return;
    }
    
    // Find how to breed this pal
    let html = `<div style="font-size:1.1em; font-weight:bold; margin-bottom:8px;">
      ${getEmoji(matchingPal.element)} ${matchingPal.name} (Power: ${matchingPal.power})
    </div>`;
    
    // Find breeding combinations that produce this pal
    let combos = [];
    const palKeys = Object.keys(PAL_DATA);
    for (let i = 0; i < palKeys.length; i++) {
      for (let j = i + 1; j < palKeys.length; j++) {
        const childKey = getChild(palKeys[i], palKeys[j]);
        if (childKey === matchingPal.key) {
          combos.push({ p1: palKeys[i], p2: palKeys[j] });
          if (combos.length >= 5) break;
        }
      }
      if (combos.length >= 5) break;
    }
    
    if (combos.length > 0) {
      html += `<div style="margin-top:8px; font-weight:bold;">How to breed:</div>`;
      combos.forEach(c => {
        html += `<div style="padding:4px 0; font-size:0.9em;">
          ${PAL_DATA[c.p1].name} + ${PAL_DATA[c.p2].name} → <strong>${matchingPal.name}</strong>
        </div>`;
      });
    }
    
    html += `<div style="margin-top:8px; padding:8px; background:rgba(255,255,255,0.05); border-radius:6px; font-size:0.85em;">
      🔹 Element: ${matchingPal.element}<br>
      🔹 Drops: ${matchingPal.drops}<br>
      🔹 Breeding Power: ${matchingPal.power}
    </div>`;
    
    searchResults.innerHTML = html;
  });
});

function getEmoji(element) {
  const map = {
    'Neutral': '⬜', 'Fire': '🔥', 'Water': '💧', 'Grass': '🌿',
    'Electric': '⚡', 'Ice': '❄️', 'Ground': '🪨', 'Dark': '🌑',
    'Dragon': '🐉'
  };
  for (const [key, emoji] of Object.entries(map)) {
    if (element.includes(key)) return emoji;
  }
  return '⬜';
}
</script>
