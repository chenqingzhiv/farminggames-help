---
title: "Don't Starve Together — Complete Bosses & Giants Database"
description: "Complete Don't Starve Together boss database with HP, damage, drops, spawn conditions, and fighting strategies. Covers all giants, seasonal bosses, and raid bosses."
date: 2026-07-13
tags: ["dst", "don't starve together", "bosses", "giants", "raid bosses", "deerclops", "bearger", "dragonfly", "ancient guardian", "fuelweaver", "guide"]
---

# ⚔️ Don't Starve Together — Bosses & Giants Database

> *A comprehensive reference for every boss and giant in DST. Sort and filter by season, difficulty, and drops.*

Don't Starve Together features a wide array of boss-level threats, from seasonal giants that arrive at your doorstep to optional raid bosses lurking in deep caves. This guide covers spawn conditions, stats, strategies, and loot for every boss.

<small style="opacity: 0.6;">Data source: Klei Entertainment / Don't Starve Together game files (various patches).</small>

---

## 🔍 Filter & Search

<div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; align-items: center;">
  <div>
    <label style="font-size: 0.8em; opacity: 0.7;">🔎 Search</label><br>
    <input type="text" id="boss-search" placeholder="Search bosses..." style="padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: #e8e6e1; min-width: 180px;">
  </div>
  <div>
    <label style="font-size: 0.8em; opacity: 0.7;">📅 Season</label><br>
    <select id="filter-season" style="padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: #e8e6e1;">
      <option value="all">All Seasons</option>
      <option value="Autumn">🍂 Autumn</option>
      <option value="Winter">❄️ Winter</option>
      <option value="Spring">🌧️ Spring</option>
      <option value="Summer">☀️ Summer</option>
      <option value="Any">🕐 Any Season</option>
      <option value="Caves">🕳️ Cave/Ruins</option>
    </select>
  </div>
  <div>
    <label style="font-size: 0.8em; opacity: 0.7;">⚡ Difficulty</label><br>
    <select id="filter-difficulty" style="padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: #e8e6e1;">
      <option value="all">All Difficulties</option>
      <option value="Easy">🟢 Easy</option>
      <option value="Medium">🟡 Medium</option>
      <option value="Hard">🔴 Hard</option>
      <option value="Raid">💀 Raid Boss</option>
    </select>
  </div>
</div>

## 📊 Boss Database

<div style="overflow-x: auto;">
<table id="boss-table" style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
<thead>
<tr style="background: rgba(255,255,255,0.05);">
  <th onclick="sortTable(0)" style="padding: 10px 12px; text-align: left; cursor: pointer; border-bottom: 2px solid rgba(255,255,255,0.1);">📛 Boss Name ↕</th>
  <th onclick="sortTable(1)" style="padding: 10px 12px; text-align: center; cursor: pointer; border-bottom: 2px solid rgba(255,255,255,0.1);">❤️ HP</th>
  <th onclick="sortTable(2)" style="padding: 10px 12px; text-align: center; cursor: pointer; border-bottom: 2px solid rgba(255,255,255,0.1);">⚔️ Damage</th>
  <th onclick="sortTable(3)" style="padding: 10px 12px; text-align: center; cursor: pointer; border-bottom: 2px solid rgba(255,255,255,0.1);">📅 Season ↕</th>
  <th onclick="sortTable(4)" style="padding: 10px 12px; text-align: center; cursor: pointer; border-bottom: 2px solid rgba(255,255,255,0.1);">⚡ Difficulty ↕</th>
  <th onclick="sortTable(5)" style="padding: 10px 12px; text-align: left; cursor: pointer; border-bottom: 2px solid rgba(255,255,255,0.1);">🎁 Key Drops ↕</th>
</tr>
</thead>
<tbody>
</tbody>
</table>
</div>

<p style="text-align: right; font-size: 0.85em; opacity: 0.6; margin-top: 4px;">Click column headers to sort.</p>

---

## 👑 Seasonal Giants

### 🍂 Bearger (Autumn)
**Spawn:** Days 20–25 of Autumn. Appears near groups of players (if multiple players, one per player after certain conditions).

| Stat | Value |
|:-----|:------|
| HP | 3,000 (6,000 in DST) |
| Damage | 100 (player), 200 (structures) |
| Attack Period | 3 seconds |
| Attack Range | 5 |
| Speed | 3 (walking) |
| Sanity Aura | -400/min (nearby) |
| Drops | 8 Meat, 1 Bearger Fur (→ Hibearnation Vest 480s warm / Insulated Pack) |
| Respawn | Yes (next Autumn) |

**Strategy:**
- Kiting: 6 hits → dodge (repeat)
- Lead into forest: Bearger destroys trees → treeguards spawn and fight it
- Or use: sleep darts, bee mines, gunpowder (20 = kill)
- Can be frozen for 2 hits with ice staff
- Bearger Fur crafts: Hibearnation Vest (240s warmth, sanity regen), Insulated Pack (food spoils 50% slower)

### ❄️ Deerclops (Winter)
**Spawn:** Days 30–35 of Winter. Appears near players.

| Stat | Value |
|:-----|:------|
| HP | 4,000 (DST) |
| Damage | 75 (player), 150 (structures) |
| Attack Period | 3 seconds |
| Range | 5 |
| Speed | 3 |
| Sanity Aura | -400/min |
| Drops | 8 Meat, 1 Deerclops Eyeball (→ Eyebrella) |
| Respawn | Yes (next Winter) |

**Strategy:**
- Kiting: 2–3 hits → dodge (short attack window)
- Freezing attack: Deerclops freezes players, dodge by moving away
- Insulated Vest / thermal stone required to survive cold while fighting
- Eyebrella (eyeball + dapper vest + bone shards) = 100% wetness resist + 120s summer protection
- Or loot: craft Houndius Shootius (turret)
- Pro tip: fight on a road for speed advantage

### 🌧️ Moose/Goose (Spring)
**Spawn:** Mid-to-late Spring. Nests in grassy/plains biomes. Returns to nest when player leaves aggro range.

| Stat | Value |
|:-----|:------|
| HP | 3,000 (6,000 DST) |
| Damage | 75 (melee), 150 (honk blast) |
| Attack Period | 3 seconds |
| Speed | 3 (ground), fast in air |
| Honk Blast | AoE knockback + 150 damage |
| Drops | 4 Meat, 2 Down Feathers (→ Weather Pain) + Mosling Egg |
| Respawn | Yes (next Spring) |

**Strategy:**
- Kiting: 3 hits → dodge the honk
- Honk tells: Moose stands up before blasting — run away
- Mosling egg → hatches in 2.5 days near fire → follower Mosling
- Weather Pain (3 down feathers + 6 eggs) = tornado projectile (5 uses)
- Moslings: can be raised to fight for you or turned into... more feathers

### ☀️ Dragonfly (Summer) — Surface Variant
**Spawn:** Lava biome in Summer. Does not despawn. Can be lured away.

| Stat | Value |
|:-----|:------|
| HP | 2,500 (surface), **27,500 (Dragonfly Desert variant / Raid)** |
| Damage | 75 (melee), 150 (fire AoE) |
| Speed | 7 (fast!) |
| Fire AoE | Spawns fire pools when enraged |
| Drops | 8 Meat, 1 Dragonfly Scale, 2–3 Dragonfly Gems |
| Respawn | Yes (scale version per Summer) |

**Strategy (Surface):**
- Kiting: extremely fast, use ice staff to freeze
- Bait with pan flute or sleep darts
- Gunpowder: 20 → freeze → ignite
- Scale crafts: Scalemail (fire immunity armor), Scaled Furnace (infinite light)

## 🧟 Seasonal Event Bosses

### 🦴 Klaus (Winter's Feast)
**Spawn:** Deerclops reskin during Winter's Feast event. Spawns from Loot Stash at random map location after Klaus spawns nearby.

| Stat | Value |
|:-----|:------|
| HP | 5,000 |
| Damage | 80 |
| Phases | 2 (first phase: 2 gem deer minions) |
| Drops | Bundled items, gem, bone shards |

**Strategy:**
- Kill the 2 gem deer first (they give Klaus abilities)
- Red gem deer: AOE fire attack
- Blue gem deer: AOE ice attack  
- Good loot: Magiluminescence, bundling wrap, life giving amulet
- Key to Loot Stash opens after Klaus dies

---

## 🕳️ Cave & Ruin Bosses

### 🐛 Ancient Guardian
**Spawn:** In the labyrinth of the Ruins. Stationary boss (guards the Ancient Pseudoscience Station).

| Stat | Value |
|:-----|:------|
| HP | 10,000 |
| Damage | 100 |
| Attack Period | 2 seconds |
| Speed | 7 |
| Drops | 8 Meat, 1 Guardian's Horn, Thulecite Fragments |
| Respawn | Yes (4 days after)

**Strategy:**
- Kiting: 3–4 hits → dodge the charge
- Charge attack: telegraphs — strafe sideways
- Horn crafts: Deconstruction Staff (un-crafts buildings/items)
- Bring: lantern, armor, healing, dark sword

### 🪨 Toadstool (Cave Mushlight)
**Spawn:** In the Mushroom Forest underground. Spawns when too many mushlights are active (5+). Also from Sporecap.

| Stat | Value |
|:-----|:------|
| HP | 5,250 (normal), **26,250 (misery)** |
| Damage | 100 (normal), 150 (misery) |
| Spore AOE | Spawns damaging spores and mushroom bombs |
| Phases | 1 (normal), 2 (misery: spawns spore bombs) |
| Drops | 8 Meat, Toadstool Cap (→ mushroom planter), Glowcap mushroom |
| Respawn | Yes |

**Strategy:**
- Fire + explosive damage bonus
- Misery variant: need multiple players or extremely good gear
- Lure to surface for easier fight
- Glowcap: wearable light source (craft with cap + glowberry)

### 🔥 Dragonfly (Raid Variant)
**Spawn:** Dragonfly Desert (lava biome) — the real DST boss fight. Does not despawn once engaged.

| Stat | Value |
|:-----|:------|
| HP | **27,500** |
| Damage | 75, 150 (fire AoE living lava) |
| Enrage | Spawns 7–9 lava pools that erupt when she enrages |
| Drops | 8 Meat, 1 Dragonfly Scale, 3 Dragonfly Gems, Dried Scale, Gold |

**Strategy (Raid / Multiplayer):**
- Enrage mechanic: hit her enough → she enrages → lava pools everywhere
- Lava pools: must be extinguished with ice staff or frozen
- Strategy: 1 tank takes aggro, others hit from behind
- Ice staff: freeze lava pools
- Pan flute to reset enrage
- Dried Scale → Scalemail (fire immunity) or Scalesmith anvil

### 🕷️ Queen Bee / Bee Queen
**Spawn:** Giant Bee Hive in the Grasslands (flower forest). Must attack the hive to spawn.

| Stat | Value |
|:-----|:------|
| HP | **22,500** |
| Damage | 80 (melee), 60 (stinger) |
| Adds | Spawns Grumble Bees (wave-based) |
| Speed | 5 |
| Drops | Royal Jelly, 4–6 Honeycomb, Bee Queen Crown blueprint |

**Strategy:**
- Don't fight near base next to bee hives (angry bees)
- Trust one player stands on flingo (extinguishes fires?)
- Bee Queen Crown crafts: uses it + honeycomb
- Best done with 3+ players
- Warly's Honey Spice helps teammates

### 🦴 Ancient Fuelweaver / Shadow Pieces
**Spawn:** At the Ancient Gateway in the Atrium (deep ruins). Must assemble Shadow Pieces first.

| Stat | Value |
|:-----|:------|
| HP | **16,000** |
| Damage | 100 (melee), 150 (shield), 75 (shadow tentacles) |
| Shield | Can become invulnerable — must destroy summoned hands to break shield |
| Phases | 3 (spawns shield, shadow tentacles, nightmare creatures) |
| Drops | 4 Dark Matters, 4 Monster Food, Shadow Atrium, Bone Armor blueprint |
| Respawn | Yes (20 days after) |

**Strategy (End-game / Multiplayer):**
- The hardest boss in DST
- Phase 1: Direct damage
- Phase 2: Spawns shield — destroy the Weaving Hands (3) before Fuelweaver is vulnerable again
- Phase 3: Shadow tentacles and nightmare creatures
- Must bring: tons of healing, dark sword, armor, sanity food
- Wickerbottom's books help (On Tentacles!)
- Weather Pain destroys Weaving Hands quickly
- Players should coordinate: 2 DPS + 1 healer/utility
- Bone Armor: craft from Dark Matter (absorbs damage for durability)

### 🦴 Celestial Champion
**Spawn:** After completing the Lunar line (reforming the Celestial Orb and Celestial Tribute at the Lunar Altar in the Archives / Lunar Grotto).

| Stat | Value |
|:-----|:------|
| HP | **14,000** |
| Damage | 120 (melee), 100–200 (lunar shards) |
| Phases | 3 (radiance → enlightenment → enlightenment enhanced) |
| Drops | Celestial Crown Pivot, Moon Shards, Pure Brilliance |

**Strategy:**
- Phase 1: Basic attacks + lunar shards
- Phase 2: Radiance — heals if player runs away (stay close!)
- Phase 3: Enhanced — homing lunar shards, more damage
- Bring: sanity-crushing protection, nightmare amulet

---

## 🗺️ Mini-Bosses & Other Notable Threats

| Boss | HP | Damage | Location | Drops | Notes |
|:-----|:---|:-------|:---------|:------|:------|
| **Treeguard** | 250–2,500 | 35–62 | Forest | 6 Living Logs | Spawns when cutting trees, more common with pine cones |
| **Spider Queen** | 1,250 | 80 | Forest/Grass | Spider Glands, Eggs | Spawns after spider den tier 3 |
| **Varg** | 600 | 50 | Forest | 6 Monster Meat | Hunting — spawns hounds when attacking |
| **Krampus** | 200 | 50 | Any | Coal, Krampus Sack (1%) | Spawns for each aggressive act (killing innocent creatures) |
| **McTusk** | 200 | 33 | Winter (Walrus Camp) | Walking Cane, Tam o' Shanter (50%) | Spawns with 2 ice hounds, respawns every 2.5 days |

---

## 📝 Quick Reference: Boss Prep Checklist

| Boss | Armor | Weapon | Healing | Special Items |
|:-----|:------|:-------|:--------|:-------------|
| Bearger | Log Suit | Hambat/Tentacle Spike | Pierogi | Beefalo Hat (cold battle) |
| Deerclops | Log Suit + Thermal | Dark Sword | Meatballs, Pierogi | Thermal Stone |
| Moose/Goose | Football Helmet | Dark Sword | Pierogi | Weather Pain |
| Dragonfly (surface) | Log Suit | Dark Sword | Pierogi | Ice Staff (extinguish fires) |
| Dragonfly (raid) | Thulecite + Scalemail | Dark Sword | Pierogi + Honey Poultice | Ice Staff, Pan Flute |
| Ancient Guardian | Football Helmet + Log Suit | Dark Sword | Pierogi | Lantern, Healing Salve |
| Bee Queen | Football Helmet + Log Suit | Dark Sword | Pierogi | Ice Staff, Pan Flute |
| Fuelweaver | Thulecite Crown + Bone Armor | Dark Sword, Weather Pain | Pierogi + Honey Poultice | Nightmare Amulet, Wicker's Tentacles |
| Toadstool | Thulecite Armor | Dark Sword + Fire Staff | Pierogi | Gunpowder |
| Celestial Champion | Thulecite Crown + Armor | Dark Sword | Pierogi | Nightmare Amulet |

---

> 💡 **Pro Tips:**
> - Always bring a **Pan Flute** or **Sleeping Dart** to reset boss enrage or survive
> - **Gunpowder** (30 = 3,000 damage) is cheap and effective for speed kills
> - Use **Roads** for speed advantage in kiting
> - **Bee Mines** are excellent against Bearger and Deerclops
> - **Weather Pain** is the best weapon for destroying Fuelweaver's hands

<style>
#boss-table tbody tr:hover { background: rgba(255,255,255,0.08); }
#boss-table td { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
#boss-table th { position: sticky; top: 0; background: rgba(255,255,255,0.1); }
.diff-easy { color: #4caf50; font-weight: bold; }
.diff-medium { color: #ff9800; font-weight: bold; }
.diff-hard { color: #f44336; font-weight: bold; }
.diff-raid { color: #e040fb; font-weight: bold; }
</style>

<script>
// Boss data
const bosses = [
  { name: "Bearger", hp: "6,000", dmg: "100", season: "Autumn", difficulty: "Easy", drops: "8 Meat, Bearger Fur" },
  { name: "Deerclops", hp: "4,000", dmg: "75", season: "Winter", difficulty: "Easy", drops: "8 Meat, Deerclops Eyeball" },
  { name: "Moose/Goose", hp: "6,000", dmg: "75–150", season: "Spring", difficulty: "Medium", drops: "4 Meat, Down Feathers, Mosling Egg" },
  { name: "Dragonfly (Surface)", hp: "2,500", dmg: "75", season: "Summer", difficulty: "Medium", drops: "8 Meat, Dragonfly Scale" },
  { name: "Klaus", hp: "5,000", dmg: "80", season: "Winter (Event)", difficulty: "Hard", drops: "Bundled Items, Gems, Bone Shard" },
  { name: "Ancient Guardian", hp: "10,000", dmg: "100", season: "Caves", difficulty: "Medium", drops: "8 Meat, Horn, Thulecite" },
  { name: "Toadstool", hp: "5,250–26,250", dmg: "100–150", season: "Caves", difficulty: "Hard", drops: "Cap, Spores, Glowcap" },
  { name: "Dragonfly (Raid)", hp: "27,500", dmg: "75–150", season: "Summer", difficulty: "Raid", drops: "Scale, Gems, Dried Scale" },
  { name: "Bee Queen", hp: "22,500", dmg: "80", season: "Any", difficulty: "Raid", drops: "Royal Jelly, Honeycomb, Crown BP" },
  { name: "Ancient Fuelweaver", hp: "16,000", dmg: "100–150", season: "Caves", difficulty: "Raid", drops: "Dark Matter, Bone Armor, Atrium" },
  { name: "Celestial Champion", hp: "14,000", dmg: "120+", season: "Caves", difficulty: "Raid", drops: "Crown Pivot, Moon Shards" },
  { name: "Treeguard", hp: "250–2,500", dmg: "35–62", season: "Any", difficulty: "Easy", drops: "6 Living Logs" },
  { name: "Spider Queen", hp: "1,250", dmg: "80", season: "Any", difficulty: "Easy", drops: "Spider Glands, Eggs" },
  { name: "Varg", hp: "600", dmg: "50", season: "Any", difficulty: "Medium", drops: "6 Monster Meat" },
  { name: "MacTusk", hp: "200", dmg: "33", season: "Winter", difficulty: "Medium", drops: "Walking Cane, Tam o' Shanter" }
];

function getDifficultyClass(d) {
  if (d === "Easy") return "diff-easy";
  if (d === "Medium") return "diff-medium";
  if (d === "Hard") return "diff-hard";
  return "diff-raid";
}

function renderBosses() {
  const search = document.getElementById("boss-search").value.toLowerCase();
  const season = document.getElementById("filter-season").value;
  const difficulty = document.getElementById("filter-difficulty").value;
  const tbody = document.querySelector("#boss-table tbody");
  
  const filtered = bosses.filter(b => {
    if (search && !b.name.toLowerCase().includes(search)) return false;
    if (season !== "all" && !b.season.includes(season)) return false;
    if (difficulty !== "all" && b.difficulty !== difficulty) return false;
    return true;
  });
  
  tbody.innerHTML = filtered.map(b => `
    <tr>
      <td style="font-weight:600;">${b.name}</td>
      <td style="text-align:center;">${b.hp}</td>
      <td style="text-align:center;">${b.dmg}</td>
      <td style="text-align:center;">${b.season}</td>
      <td style="text-align:center;"><span class="${getDifficultyClass(b.difficulty)}">${b.difficulty}</span></td>
      <td>${b.drops}</td>
    </tr>
  `).join("");
}

let sortDir = {};
function sortTable(col) {
  const tbody = document.querySelector("#boss-table tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  sortDir[col] = !sortDir[col];
  const dir = sortDir[col] ? 1 : -1;
  
  rows.sort((a, b) => {
    const va = a.cells[col].textContent.trim().toLowerCase();
    const vb = b.cells[col].textContent.trim().toLowerCase();
    const na = parseFloat(va.replace(/,/g,''));
    const nb = parseFloat(vb.replace(/,/g,''));
    if (!isNaN(na) && !isNaN(nb)) return (na - nb) * dir;
    return va.localeCompare(vb) * dir;
  });
  
  rows.forEach(r => tbody.appendChild(r));
}

document.addEventListener("DOMContentLoaded", () => {
  renderBosses();
  document.getElementById("boss-search").addEventListener("input", renderBosses);
  document.getElementById("filter-season").addEventListener("change", renderBosses);
  document.getElementById("filter-difficulty").addEventListener("change", renderBosses);
});
</script>
