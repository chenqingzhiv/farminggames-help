---
title: "Stardew Valley Fish Collection Tracker"
description: "Interactive fish collection checklist for Stardew Valley 1.6 — track all 70+ fish by season, location, and time."
---

# 🐟 Stardew Valley Fish Collection Tracker

Track your progress toward catching every fish in Stardew Valley 1.6. Check off fish as you catch them — progress saves in your browser.

---

## 🏆 Master Angler Progress

<div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin:16px 0; padding:20px; background:rgba(255,255,255,0.04); border-radius:12px;">
  <div style="flex:1; min-width:200px;">
    <div style="height:24px; background:rgba(255,255,255,0.08); border-radius:12px; overflow:hidden;">
      <div id="progress-bar" style="height:100%; width:0%; background:#ef4444; border-radius:12px; transition:width 0.5s;"></div>
    </div>
  </div>
  <div style="text-align:center; min-width:80px;">
    <div id="progress-label" style="font-size:2em; font-weight:bold; color:#c9a96e;">0%</div>
  </div>
  <div id="progress-text" style="opacity:0.7;">0 / 0 fish caught</div>
  <button onclick="resetTracker()" style="padding:6px 16px; border-radius:8px; border:1px solid rgba(239,68,68,0.4); background:transparent; color:#ef4444; cursor:pointer; font-size:0.8em; margin-left:auto;">🔄 Reset</button>
</div>

### 🎣 Legendary Fish

<div id="legendary-list" style="margin-bottom:16px;"></div>

---

## 🔍 Filter

<div style="display:flex; flex-wrap:wrap; gap:12px; margin:16px 0; padding:16px; background:rgba(255,255,255,0.03); border-radius:12px; align-items:center;">
  <div>
    <label style="font-size:0.8em; opacity:0.7;">🔎 Search</label><br>
    <input type="text" id="fish-search" placeholder="Search fish or location..." style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; min-width:200px;">
  </div>
  <div>
    <label style="font-size:0.8em; opacity:0.7;">🌸 Season</label><br>
    <select id="filter-season" style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1;">
      <option value="all">All Seasons</option>
      <option value="Spring">🌸 Spring</option>
      <option value="Summer">☀️ Summer</option>
      <option value="Fall">🍂 Fall</option>
      <option value="Winter">❄️ Winter</option>
    </select>
  </div>
  <div>
    <label style="font-size:0.8em; opacity:0.7;">📍 Location</label><br>
    <select id="filter-location" style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1;">
      <option value="all">All Locations</option>
      <option value="Ocean">🌊 Ocean</option>
      <option value="River">🏞️ River</option>
      <option value="Lake">🏞️ Lake</option>
      <option value="Forest">🌲 Forest</option>
      <option value="Mtn">🏔️ Mountains</option>
      <option value="Desert">🏜️ Desert</option>
      <option value="Island">🏝️ Ginger Island</option>
      <option value="Crab">🦀 Crab Pot</option>
    </select>
  </div>
  <div>
    <label style="font-size:0.8em; opacity:0.7;">&nbsp;</label><br>
    <label style="font-size:0.85em;">
      <input type="checkbox" id="hide-caught"> Hide caught fish
    </label>
  </div>
</div>

---

## 📋 Fish Checklist

<div style="overflow-x:auto;">
  <table id="fish-table" class="datatable" style="width:100%;">
    <thead>
      <tr>
        <th style="width:40px;">🎣</th>
        <th>Fish</th>
        <th>Season</th>
        <th>Location</th>
        <th>Time</th>
        <th>Weather</th>
        <th style="width:80px;">Difficulty</th>
        <th style="width:60px;">Price</th>
        <th>Bundle</th>
      </tr>
    </thead>
    <tbody id="fish-tbody">
      <!-- Populated by JS -->
    </tbody>
  </table>
</div>

---

## 🎯 Difficulty Guide

| Badge | Difficulty | Description |
|:------|:-----------|:------------|
| ★★★ | **90+** | Legendary — need high fishing level + trap bobber |
| ★★ | **70-89** | Hard — need iridium rod + bait |
| ★ | **50-69** | Medium — fiberglass rod is enough |
| (none) | **0-49** | Easy — even bamboo pole works |

### 💡 Tips

- **Fishing skill** increases catch bar size and reduces bite time
- **Iridium Rod + Trap Bobber** makes hard fish much catchable
- **Level 10 + Dish O' The Sea (+3)** maxes your fishing temporarily
- **Curiosity Lure** (Qi's Walnut Room) increases chance of rare fish
- **Rain** = Catfish, Walleye, Eel, Shad become available
- **Ginger Island** fish are available year-round
- **Legendary fish** can only be caught once per save file!

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/) — Support the developer!
>
> *Data verified against Stardew Valley Wiki 1.6.15. Added 1.6 new fish including Goldenfish, Goby, Midnight Squid, Radioactive Bass, Clownfish, and Seahorse.*

<script src="../../assets/js/tools/stardew-fish-tracker.js"></script>

<style>
.caught { opacity: 0.45; }
.caught td:first-child { opacity: 1; }
.diff-legendary { color: #eab308; font-weight: bold; }
.diff-hard { color: #ef4444; }
.diff-medium { color: #f97316; }
.diff-easy { color: #22c55e; }
#fish-table tbody tr { transition: opacity 0.3s; }
#fish-table tbody tr:hover { opacity: 0.85; }
.datatable th { background: rgba(201,169,110,0.1); }
</style>
