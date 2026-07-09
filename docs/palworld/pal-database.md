---
title: "Palworld — Complete Pal Database (Work Suitability, Drops & Stats)"
description: "Complete Palworld pal database with work suitability levels, drops, elements, and partner skills. Search and sort by any stat. Updated for the Feybreak update."
tags: ["palworld", "pal database", "work suitability", "pals list", "drops", "partner skills", "stats", "feybreak"]
---

# 📊 Palworld — Complete Pal Database

Your searchable reference for every Pal in Palworld. Filter by work type, element, or name.

---

## 🔍 Quick Search

<div style="margin:16px 0; display:flex; gap:12px; flex-wrap:wrap;">
  <input type="text" id="pal-search" placeholder="Search Pal name..." style="padding:10px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; min-width:240px; font-size:0.95em; flex:1;">
  <select id="element-filter" style="padding:10px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; font-size:0.95em;">
    <option value="">All Elements</option>
    <option value="Neutral">⬜ Neutral</option>
    <option value="Fire">🔥 Fire</option>
    <option value="Water">💧 Water</option>
    <option value="Grass">🌿 Grass</option>
    <option value="Electric">⚡ Electric</option>
    <option value="Ice">❄️ Ice</option>
    <option value="Ground">🪨 Ground</option>
    <option value="Dark">🌑 Dark</option>
    <option value="Dragon">🐉 Dragon</option>
  </select>
  <select id="work-filter" style="padding:10px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; font-size:0.95em;">
    <option value="">All Work Types</option>
    <option value="Handiwork">🔧 Handiwork</option>
    <option value="Planting">🌱 Planting</option>
    <option value="Mining">⛏️ Mining</option>
    <option value="Transporting">📦 Transport</option>
    <option value="Watering">💧 Watering</option>
    <option value="Kindling">🔥 Kindling</option>
    <option value="Gathering">🌿 Gathering</option>
    <option value="Cooling">❄️ Cooling</option>
    <option value="Medicine">💊 Medicine</option>
    <option value="Electricity">⚡ Electricity</option>
  </select>
</div>

<div style="overflow-x:auto;">
  <table id="pal-table" class="datatable" style="width:100%;">
    <thead>
      <tr>
        <th>Pal</th>
        <th>Element</th>
        <th>Work Suitability (Lv)</th>
        <th>Food</th>
        <th>Drops</th>
        <th>Partner Skill</th>
      </tr>
    </thead>
    <tbody id="pal-tbody">
      <!-- Populated by JS -->
    </tbody>
  </table>
</div>

---

## 🏆 Top Pals by Work Role

### 🔧 Best Handiwork Pals
| Rank | Pal | Level | How to Get |
|:----:|:----|:-----:|:-----------|
| 1 | **Anubis** | Lv.4 | Breed (Eikthyrdeer + Bushi) |
| 2 | **Lyleen** | Lv.3 | Breed (Mossanda + Petallia) |
| 3 | **Verdash** | Lv.3 | Catch at Wildlife Sanctuary #2 |
| 4 | **Wixen** | Lv.2 | Catch in early areas |
| 5 | **Lunaris** | Lv.2 | Catch at night in Bamboo Groves |

### 🌱 Best Planting Pals
| Rank | Pal | Level | How to Get |
|:----:|:----|:-----:|:-----------|
| 1 | **Lyleen** | Lv.4 | Breed (Mossanda + Petallia) |
| 2 | **Faleris** | Lv.3 | Catch in desert area |
| 3 | **Broncherry** | Lv.3 | Catch in bamboo groves |
| 4 | **Bristla** | Lv.2 | Early game staple |
| 5 | **Tanzee** | Lv.2 | Very early game |

### ⛏️ Best Mining Pals
| Rank | Pal | Level | How to Get |
|:----:|:----|:-----:|:-----------|
| 1 | **Astegon** | Lv.4 | Catch at Mount Obsidian |
| 2 | **Blazamut** | Lv.4 | Boss at Mount Obsidian |
| 3 | **Digtoise** | Lv.3 | Catch in desert |
| 4 | **Reptyro** | Lv.3 | Catch at Mount Obsidian |
| 5 | **Dumud** | Lv.2 | Early game miner |

### 🔥 Best Kindling Pals
| Rank | Pal | Level | How to Get |
|:----:|:----|:-----:|:-----------|
| 1 | **Jormuntide Ignis** | Lv.4 | Breed (Jormuntide + ANY Fire) |
| 2 | **Faleris** | Lv.3 | Catch in desert area |
| 3 | **Blazehowl** | Lv.3 | Catch in desert |
| 4 | **Ragnahawk** | Lv.3 | Catch at Mount Obsidian |
| 5 | **Arsox** | Lv.2 | Early game |

### 💧 Best Watering Pals
| Rank | Pal | Level | How to Get |
|:----:|:----|:-----:|:-----------|
| 1 | **Jormuntide** | Lv.4 | Fish in lakes, breed |
| 2 | **Faleris Aqua** | Lv.3 | Breed (Faleris + ANY Water) |
| 3 | **Azurobe** | Lv.3 | Catch at Wildlife Sanctuary |
| 4 | **Suzaku Aqua** | Lv.3 | Breed (Suzaku + ANY Water) |
| 5 | **Kelpsea** | Lv.2 | Early game |

### ⚡ Best Electricity Pals
| Rank | Pal | Level | How to Get |
|:----:|:----|:-----:|:-----------|
| 1 | **Orserk** | Lv.4 | Breed (Relaxaurus + Sparkit) |
| 2 | **Beakon** | Lv.3 | Catch in desert |
| 3 | **Grizzbolt** | Lv.3 | Boss in Wildlife Sanctuary |
| 4 | **Sparkit** | Lv.1 | Starter electric pal |
| 5 | **Jolthog** | Lv.1 | Common early game |

---

## 💡 Work Suitability Quick Reference

| Work Type | Lv.1 | Lv.2 | Lv.3 | Lv.4 |
|:----------|:----:|:----:|:----:|:----:|
| 🔧 Handiwork | Most basic pals | Lunaris, Wixen | Anubis, Lyleen, Verdash | Anubis (only) |
| 🌱 Planting | General grass | Tanzee, Bristla | Broncherry, Faleris | Lyleen |
| ⛏️ Mining | Dumud, Rushoar | Digtoise, Penking | Reptyro, Warsect | Astegon, Blazamut |
| 🔥 Kindling | Foxparks, Rooby | Arsox, Wixen | Faleris, Ragnahawk | Jormuntide Ignis |
| 💧 Watering | Fuack, Pengullet | Kelpsea, Gobfin | Azurobe, Faleris Aqua | Jormuntide |
| 🌿 Gathering | Tanzee, Flopie | Robinquill | Verdash, Faleris | Lyleen |
| 📦 Transport | Lamball, Cattiva | Daedream, Nitewing | Mossanda, Dinossom | Wumpo, Astegon |
| ❄️ Cooling | Pengullet | Swee, Foxcicle | Cryolinx | Frostallion |
| ⚡ Electricity | Sparkit, Jolthog | Grizzbolt, Beakon | Orserk | Orserk |
| 💊 Medicine | Bristla | Lyleen | — | — |

---

## 📋 Food Consumption by Pal Size

| Size | Food per Meal | Examples |
|:----|:-------------|:---------|
| 🟢 Small (1) | 1 Slice | Lamball, Chikipi, Cattiva |
| 🟡 Medium (2) | 2 Slices | Direhowl, Eikthyrdeer, Rushoar |
| 🟠 Large (3) | 3 Slices | Mossanda, Nitewing, Dinossom |
| 🔴 Massive (4) | 4 Slices | Relaxaurus, Astegon, Frostallion |
| 🟣 Boss (5) | 5 Slices | Jetragon, Shadowbeak |

---

> *Data sourced from Palworld v0.3+ (Feybreak update). Work suitability levels verified in-game. Last updated July 2026.*

<style>
  .element-tag { display:inline-block; padding:2px 8px; border-radius:4px; font-size:0.8em; font-weight:bold; }
  .element-Neutral { background:#9e9e9e; color:#fff; }
  .element-Fire { background:#e53935; color:#fff; }
  .element-Water { background:#1e88e5; color:#fff; }
  .element-Grass { background:#43a047; color:#fff; }
  .element-Electric { background:#fdd835; color:#000; }
  .element-Ice { background:#00bcd4; color:#fff; }
  .element-Ground { background:#795548; color:#fff; }
  .element-Dark { background:#5e35b1; color:#fff; }
  .element-Dragon { background:#e91e63; color:#fff; }
</style>

<script>
const PAL_DB = [
  { name: "Lamball", element: "Neutral", work: "Handiwork 1, Transport 1", food: 1, drops: "Wool, Raw Meat", skill: "Fluffy Shield — increases defense" },
  { name: "Cattiva", element: "Neutral", work: "Handiwork 1, Mining 1, Transport 1, Gathering 1", food: 1, drops: "Berry Seeds, Leather", skill: "Cat Helper — increases weight limit" },
  { name: "Chikipi", element: "Neutral", work: "Gathering 1", food: 1, drops: "Egg, Feather", skill: "Egg Layer — produces eggs in ranch" },
  { name: "Lifmunk", element: "Grass", work: "Gathering 1, Planting 1, Handiwork 1", food: 1, drops: "Leaf, Fiber", skill: "Grass Bracer — increases jump height" },
  { name: "Foxparks", element: "Fire", work: "Kindling 1", food: 1, drops: "Leather, Flame Organ", skill: "Huggy Fire — ignitez equipped weapon" },
  { name: "Fuack", element: "Water", work: "Watering 1, Handiwork 1", food: 1, drops: "High Quality Pal Oil", skill: "Water Gun — sprays water" },
  { name: "Sparkit", element: "Electric", work: "Electricity 1", food: 1, drops: "Electric Organ", skill: "Electric Blast — stuns enemies" },
  { name: "Tanzee", element: "Grass", work: "Planting 1, Gathering 1, Handiwork 1", food: 1, drops: "Fiber, Berry Seeds", skill: "Gunner — fires from your shoulder" },
  { name: "Rooby", element: "Dark", work: "Kindling 1, Mining 1", food: 2, drops: "Leather, Bone", skill: "Dark Claw — dark damage boost" },
  { name: "Pengullet", element: "Ice", work: "Cooling 1, Watering 1", food: 1, drops: "Pal Fluids, Ice Organ", skill: "Penguin Cannon — launches as ammo" },
  { name: "Penking", element: "Water/Ice", work: "Watering 2, Cooling 2, Mining 2, Handiwork 2, Transport 2", food: 3, drops: "Ice Organ, Pal Fluids", skill: "King of the Sea — increases Water Pal drop rate" },
  { name: "Daedream", element: "Dark", work: "Gathering 1, Transport 1", food: 2, drops: "Small Pal Soul", skill: "Dream Chaser — fights alongside you" },
  { name: "Rushoar", element: "Neutral", work: "Mining 1", food: 2, drops: "Leather, Bone", skill: "Rush Ram — charges forward" },
  { name: "Nox", element: "Dark", work: "Gathering 1", food: 2, drops: "Small Pal Soul, Bone", skill: "Poison Fog — releases poison cloud" },
  { name: "Fuddler", element: "Ground", work: "Mining 1, Transport 1", food: 2, drops: "Leather, Ore", skill: "Ground Barrier — defensive buff" },
  { name: "Killamari", element: "Dark", work: "Handiwork 1, Transport 1", food: 1, drops: "Venom Gland", skill: "Ink Bomb — slows enemies" },
  { name: "Mau", element: "Dark", work: "Gathering 1", food: 1, drops: "Gold Coin", skill: "Coin Pouch — produces gold in ranch" },
  { name: "Direhowl", element: "Neutral", work: "—", food: 3, drops: "Leather", skill: "Swift Runner — fast ground mount" },
  { name: "Tocotoco", element: "Neutral", work: "Gathering 1", food: 1, drops: "Gunpowder", skill: "Egg Bomb — throws explosive eggs" },
  { name: "Flopie", element: "Grass", work: "Gathering 1, Handiwork 1", food: 1, drops: "Red Berries, Fiber", skill: "Grass Reviver — heals you over time" },
  { name: "Mozzarina", element: "Neutral", work: "Transport 1", food: 2, drops: "Milk, Leather", skill: "Milk Maker — produces milk in ranch" },
  { name: "Bristla", element: "Grass", work: "Planting 1, Medicine 1, Gathering 1", food: 1, drops: "Leaf, Fiber", skill: "Plant Heal — restores HP gradually" },
  { name: "Gobfin", element: "Water", work: "Watering 1, Transport 1", food: 2, drops: "Pal Fluids", skill: "Gobfin Boost — increases player attack when in party" },
  { name: "Felbat", element: "Dark", work: "Gathering 1", food: 3, drops: "Venom Gland", skill: "Life Steal — restores HP when attacking" },
  { name: "Melpaca", element: "Neutral", work: "Transport 1", food: 2, drops: "Wool, Leather", skill: "Wool Maker — produces wool in ranch" },
  { name: "Dinossom", element: "Grass/Dragon", work: "Planting 2, Gathering 2", food: 3, drops: "Beautiful Flower", skill: "Dragon Blast — shoots dragon beam" },
  { name: "Eikthyrdeer", element: "Neutral", work: "Transport 1", food: 3, drops: "Leather, Horn", skill: "Deer Charge — double jump mount" },
  { name: "Nitewing", element: "Neutral", work: "Transport 2, Gathering 1", food: 3, drops: "Feather, Leather", skill: "Sky Mount — flying mount" },
  { name: "Caprity", element: "Grass", work: "Planting 2, Gathering 2", food: 3, drops: "Berries, Leather", skill: "Berry Maker — produces berries in ranch" },
  { name: "Cinnamoth", element: "Grass", work: "Planting 2", food: 2, drops: "Beautiful Flower", skill: "Flower Shield — creates defensive barrier" },
  { name: "Grizzbolt", element: "Electric", work: "Electricity 2, Mining 2, Handiwork 2, Transport 2", food: 4, drops: "Electric Organ, Leather", skill: "Spark Blast — electric weapon boost" },
  { name: "Relaxaurus", element: "Dragon", work: "Transport 1", food: 5, drops: "Pal Fluids", skill: "Missile Launcher — launches guided missiles" },
  { name: "Wixen", element: "Fire", work: "Kindling 2, Handiwork 2", food: 2, drops: "Flame Organ", skill: "Fire Mage — casts fire spells" },
  { name: "Verdash", element: "Grass", work: "Planting 2, Gathering 3, Handiwork 3, Transport 2", food: 3, drops: "Leather, Beautiful Flower", skill: "Grass Speed — player movement speed boost" },
  { name: "Vanwyrm", element: "Fire/Dark", work: "Kindling 2, Transport 2", food: 3, drops: "Flame Organ", skill: "Night Flyer — flying mount" },
  { name: "Bushi", element: "Fire", work: "Kindling 2, Handiwork 2", food: 3, drops: "Flame Organ, Ingot", skill: "Samurai Slash — powerful fire slash" },
  { name: "Lyleen", element: "Grass", work: "Planting 4, Medicine 3, Gathering 3", food: 4, drops: "Beautiful Flower", skill: "Goddess Heal — large AoE heal" },
  { name: "Faleris", element: "Fire", work: "Kindling 3, Gathering 3, Transport 3", food: 4, drops: "Flame Organ", skill: "Flame Wing — flying mount with fire attacks" },
  { name: "Cryolinx", element: "Ice", work: "Cooling 3, Handiwork 2, Mining 2", food: 4, drops: "Ice Organ", skill: "Ice Breaker — freezing attacks" },
  { name: "Anubis", element: "Ground", work: "Handiwork 4, Mining 3, Transport 2", food: 4, drops: "Large Pal Soul", skill: "Sand Cyclone — ground AoE attack" },
  { name: "Astegon", element: "Dragon", work: "Mining 4, Transport 4", food: 5, drops: "Ruby, Ore", skill: "Dragon Pulse — devastating dragon beam" },
  { name: "Frostallion", element: "Ice", work: "Cooling 4", food: 5, drops: "Ice Organ, Diamond", skill: "Ice Steed — flying mount, freezing aura" },
  { name: "Jetragon", element: "Dragon", work: "—", food: 5, drops: "Ruby, Pure Quartz", skill: "Aerial Missile — fastest flying mount, missile barrage" },
  { name: "Jormuntide", element: "Water/Dragon", work: "Watering 4, Transport 3", food: 5, drops: "Pal Fluids", skill: "Storm Dragon — powerful water attacks" },
  { name: "Jormuntide Ignis", element: "Fire/Dragon", work: "Kindling 4, Transport 3", food: 5, drops: "Flame Organ", skill: "Inferno Dragon — powerful fire attacks" },
  { name: "Shadowbeak", element: "Dark", work: "Gathering 2", food: 4, drops: "Large Pal Soul", skill: "Void Beam — dark laser attack" },
  { name: "Orserk", element: "Electric/Dragon", work: "Electricity 4, Handiwork 2, Transport 2", food: 5, drops: "Electric Organ", skill: "Thunder Dragon — lightning attacks" },
  { name: "Mossanda", element: "Grass", work: "Planting 2, Gathering 2, Handiwork 2, Transport 2", food: 4, drops: "Leather, Fiber", skill: "Panda Splash — AoE grass attack" },
  { name: "Wumpo", element: "Ice", work: "Cooling 2, Transport 4, Handiwork 2", food: 4, drops: "Ice Organ", skill: "Ice Barrier — creates ice walls" },
  { name: "Digtoise", element: "Ground", work: "Mining 3", food: 3, drops: "High Quality Pal Oil", skill: "Drill Crusher — drills through rocks automatically" },
  { name: "Menasting", element: "Dark", work: "Mining 2, Transport 2", food: 4, drops: "Large Pal Soul", skill: "Dark Armor — increases player defense" },
  { name: "Necromus", element: "Dark", work: "—", food: 5, drops: "Large Pal Soul", skill: "Dark Knight — ground mount with dark attacks" },
  { name: "Paladius", element: "Neutral", work: "—", food: 5, drops: "Large Pal Soul", skill: "Holy Knight — ground mount with neutral attacks" },
  { name: "Blazamut", element: "Fire", work: "Mining 4, Kindling 3", food: 5, drops: "Flame Organ, Ruby", skill: "Volcano Charge — fiery mining mount" },
  { name: "Suzaku", element: "Fire", work: "Kindling 3, Transport 3", food: 4, drops: "Flame Organ", skill: "Firebird — flying mount with fire" },
  { name: "Beakon", element: "Electric", work: "Electricity 3, Gathering 2, Transport 3", food: 4, drops: "Electric Organ", skill: "Storm Bringer — flying mount with lightning" },
  { name: "Elphidran", element: "Dragon", work: "Planting 1, Gathering 1", food: 3, drops: "Ruby", skill: "Dragon Blessing — increases drop rates" },
  { name: "Kingpaca", element: "Neutral", work: "Transport 2, Cooling 1", food: 4, drops: "Wool, Leather", skill: "King's Grace — increases work speed in base" },
  { name: "Galeclaw", element: "Neutral", work: "Gathering 1", food: 2, drops: "Leather", skill: "Gliding Claw — fastest glider in the game" },
  { name: "Lunaris", element: "Neutral", work: "Handiwork 2, Gathering 2, Transport 2", food: 2, drops: "Small Pal Soul", skill: "Gravity Boost — increases player attack" },
  { name: "Celaray", element: "Neutral", work: "Transport 2, Gathering 1", food: 2, drops: "High Quality Pal Oil", skill: "Sky Ray — increases player carry weight" },
  { name: "Selyne", element: "Dark", work: "Mining 2, Cooling 2", food: 4, drops: "Medium Pal Soul", skill: "Lunar Blessing — restores HP at night" },
  { name: "Helzephyr", element: "Dark", work: "Transport 3", food: 4, drops: "Small Pal Soul", skill: "Night Wing — flying mount, faster at night" },
];

function renderPals() {
  const search = document.getElementById('pal-search').value.toLowerCase().trim();
  const element = document.getElementById('element-filter').value;
  const workType = document.getElementById('work-filter').value;
  
  let filtered = PAL_DB;
  
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }
  if (element) {
    filtered = filtered.filter(p => p.element.includes(element));
  }
  if (workType) {
    filtered = filtered.filter(p => p.work.includes(workType));
  }
  
  const tbody = document.getElementById('pal-tbody');
  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td><span class="element-tag element-${p.element.split('/')[0]}">${p.element}</span></td>
      <td style="font-size:0.85em;">${p.work}</td>
      <td>${p.food}</td>
      <td style="font-size:0.85em;">${p.drops}</td>
      <td style="font-size:0.85em;">${p.skill}</td>
    </tr>
  `).join('');
  
  // Add count
  const header = document.querySelector('#pal-table');
  if (filtered.length !== PAL_DB.length) {
    const existing = document.getElementById('result-count');
    if (existing) existing.textContent = `Showing ${filtered.length} of ${PAL_DB.length} Pals`;
    else {
      const countDiv = document.createElement('div');
      countDiv.id = 'result-count';
      countDiv.style.cssText = 'font-size:0.85em; opacity:0.7; margin:8px 0;';
      countDiv.textContent = `Showing ${filtered.length} of ${PAL_DB.length} Pals`;
      header.parentNode.insertBefore(countDiv, header);
    }
  } else {
    const existing = document.getElementById('result-count');
    if (existing) existing.textContent = `All ${PAL_DB.length} Pals shown`;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderPals();
  document.getElementById('pal-search').addEventListener('input', renderPals);
  document.getElementById('element-filter').addEventListener('change', renderPals);
  document.getElementById('work-filter').addEventListener('change', renderPals);
});
</script>
