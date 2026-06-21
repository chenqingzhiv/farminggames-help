---
title: "Stardew Valley NPC Friendship Optimizer"
description: "Interactive NPC gift guide for Stardew Valley 1.6 — find the fastest path to 10 hearts with every villager."
---

# 💞 Stardew Valley NPC Friendship Optimizer

Find the fastest way to everyone's heart. Search by NPC or gift name, track your weekly gifts, and plan your birthday presents.

---

## 🎂 Birthday Calendar

<div id="birthday-widget" class="info-card">
  <h4>🎂 Loading birthdays...</h4>
</div>

---

## 🔍 NPC Gift Finder

<div style="display:flex; flex-wrap:wrap; gap:12px; margin:16px 0; padding:16px; background:rgba(255,255,255,0.04); border-radius:12px; align-items:center;">
  <div>
    <label style="font-size:0.85em; opacity:0.7;">🔎 Search NPC or gift</label><br>
    <input type="text" id="npc-search" placeholder="Search name or gift..." style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; min-width:240px; font-size:0.95em;">
  </div>
  <div>
    <label style="font-size:0.85em; opacity:0.7;">🎂 Birthday season</label><br>
    <select id="season-filter" style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; font-size:0.95em;">
      <option value="all">All Seasons</option>
      <option value="Spring">🌸 Spring</option>
      <option value="Summer">☀️ Summer</option>
      <option value="Fall">🍂 Fall</option>
      <option value="Winter">❄️ Winter</option>
    </select>
  </div>
  <div id="gifted-count" style="font-size:0.9em; opacity:0.7; margin-left:auto;">Gifted: 0 NPCs today</div>
</div>

<div style="overflow-x:auto;">
  <table id="npc-table" class="datatable" style="width:100%;">
    <thead>
      <tr>
        <th>NPC</th>
        <th>Birthday</th>
        <th>💖 Loved Gifts</th>
        <th>👍 Liked Gifts</th>
        <th style="width:120px;">Track</th>
        <th style="width:100px;">Points</th>
      </tr>
    </thead>
    <tbody id="npc-tbody">
      <!-- Populated by JS -->
    </tbody>
  </table>
</div>

---

## 💰 Budget-Friendly Gift Strategy

### Cheap Loved Gifts (&lt;300g)

<div style="overflow-x:auto;">
  <table class="datatable" style="width:100%;">
    <thead>
      <tr>
        <th>Item</th>
        <th>Cost</th>
        <th>Source</th>
        <th>Who Loves It</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Amethyst</td><td>100g</td><td>Mines (1-40)</td><td>Abigail, Clint, Emily, Dwarf</td></tr>
      <tr><td>Topaz</td><td>80g</td><td>Mines (1-40)</td><td>Emily, Clint, Dwarf</td></tr>
      <tr><td>Frozen Tear</td><td>75g</td><td>Mines (40-80)</td><td>Sebastian</td></tr>
      <tr><td>Cactus Fruit</td><td>75g</td><td>Desert</td><td>Sam, Linus, Pam, Sandy</td></tr>
      <tr><td>Coconut</td><td>100g</td><td>Desert / Calico</td><td>Haley, Linus, Sandy</td></tr>
      <tr><td>Hot Pepper</td><td>40g</td><td>Summer Crop</td><td>Shane, Lewis</td></tr>
      <tr><td>Sunflower</td><td>80g</td><td>Summer/Fall Crop</td><td>Haley</td></tr>
      <tr><td>Jade</td><td>200g</td><td>Mines (40+)</td><td>Clint, Dwarf, Emily</td></tr>
      <tr><td>Summer Spangle</td><td>90g</td><td>Summer Crop</td><td>Caroline</td></tr>
    </tbody>
  </table>
</div>

### Universal Loved Items

| Item | Cost | Obtained |
|:-----|:-----|:---------|
| **Prismatic Shard** 🏆 | Free | Skull Cavern / Omni Geode |
| **Rabbit's Foot** 🐇 | 340g | Rabbit (mature) / Serpents |

> ⚠️ Penny hates Rabbit's Foot! Don't give it to her.

### Universal Liked Items (Easy, safe for everyone)

<div style="overflow-x:auto;">
  <table class="datatable" style="width:100%;">
    <thead>
      <tr><th>Item</th><th>Cost</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td>Mayonnaise</td><td>190g</td><td>Easy to produce</td></tr>
      <tr><td>Cheese</td><td>230g</td><td>From goat/cow milk</td></tr>
      <tr><td>Apple / Apricot / Peach</td><td>50-140g</td><td>Fruit trees</td></tr>
      <tr><td>Daffodil / Dandelion</td><td>Free</td><td>Forage in spring</td></tr>
      <tr><td>Sweet Pea</td><td>Free</td><td>Forage in summer</td></tr>
      <tr><td>Spring Onion</td><td>Free</td><td>Forage south of farm</td></tr>
      <tr><td>Crocus</td><td>Free</td><td>Forage in winter</td></tr>
    </tbody>
  </table>
</div>

---

## 💡 Friendship Mechanics

| Action | Points | Notes |
|:-------|:-------|:------|
| **Talk** | +20/day | Once per day per NPC |
| **Loved Gift** | +80 | 640 on birthday! |
| **Liked Gift** | +45 | 360 on birthday! |
| **Neutral Gift** | +20 | 160 on birthday |
| **Disliked Gift** | -20 | Avoid! |
| **Hated Gift** | -40 | Really avoid! |
| **Heart Event** | +250-1000 | Story events |
| **Marriage** | +250 | Proposal |

**Hearts required for marriage**: 10 hearts + Bouquet (for marriage candidates)

**Friendship decay**: -2/day if not talking (only for NPCs below 10 hearts)

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/) — Support the developer!
>
> *Data verified against Stardew Valley Wiki 1.6.15. These tools help new and veteran farmers optimize their social life.*

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="../../assets/js/tools/stardew-npc-optimizer.js"></script>

<style>
.info-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(201,169,110,0.3);
  border-radius: 12px;
  padding: 16px 20px;
  margin: 16px 0;
}
.loved-tag { color: #22c55e; }
.gift-btn {
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid rgba(201,169,110,0.4);
  background: transparent;
  color: #e8e6e1;
  cursor: pointer;
  font-size: 0.8em;
  transition: all 0.2s;
}
.gift-btn:hover { background: rgba(201,169,110,0.15); }
.gift-btn.gifted {
  background: rgba(34,197,94,0.2);
  border-color: #22c55e;
  color: #22c55e;
}
.datatable th { background: rgba(201,169,110,0.1); }
</style>
