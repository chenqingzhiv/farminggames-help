---
title: "Stardew Valley Crop Profit Comparison"
description: "Interactive crop profit comparison table for Stardew Valley 1.6 — compare all 50+ crops with quality prices, artisan products, and profit per day."
---

# 🧑‍🌾 Stardew Valley Crop Profit Comparison

Compare every crop in Stardew Valley 1.6 side-by-side. Sort by any column, filter by season, regrowth, or artisan products, and select 2–4 crops for a detailed profit comparison.

<small style="opacity:0.6;">Data source: Stardew Valley Wiki v1.6</small>

---

## 🔍 Filters

<div style="display:flex; flex-wrap:wrap; gap:12px; margin:16px 0; padding:16px; background:rgba(255,255,255,0.03); border-radius:12px; align-items:center;">
  <div>
    <label style="font-size:0.8em; opacity:0.7;">🔎 Search</label><br>
    <input type="text" id="crop-search" placeholder="Search crops..." style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; min-width:180px;">
  </div>
  <div>
    <label style="font-size:0.8em; opacity:0.7;">🌸 Season</label><br>
    <select id="filter-season" style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1;">
      <option value="all">All Seasons</option>
      <option value="Spring">🌸 Spring</option>
      <option value="Summer">☀️ Summer</option>
      <option value="Fall">🍂 Fall</option>
      <option value="Winter">❄️ Winter</option>
      <option value="Any">🌿 Greenhouse/Any</option>
      <option value="Island">🏝️ Ginger Island</option>
    </select>
  </div>
  <div>
    <label style="font-size:0.8em; opacity:0.7;">&nbsp;</label><br>
    <label style="font-size:0.85em;">
      <input type="checkbox" id="filter-regrow"> Regrowing only
    </label>
  </div>
  <div>
    <label style="font-size:0.8em; opacity:0.7;">🏭 Artisan</label><br>
    <select id="filter-artisan" style="padding:8px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1;">
      <option value="all">All</option>
      <option value="artisan">Has Artisan Product</option>
      <option value="none">No Artisan Product</option>
    </select>
  </div>
</div>

---

## 📋 Crop Comparison Table

<div style="overflow-x:auto;">
  <table id="crop-compare-table" class="datatable" style="width:100%;">
    <thead>
      <tr>
        <th style="width:36px;">🔍</th>
        <th class="sortable" data-col="name" onclick="sortCrop('name')" style="cursor:pointer;">🌱 Name ↕</th>
        <th class="sortable" data-col="season" onclick="sortCrop('season')" style="cursor:pointer;">🌸 Season ↕</th>
        <th class="sortable" data-col="seed" onclick="sortCrop('seed')" style="cursor:pointer;">💰 Seed Cost ↕</th>
        <th class="sortable" data-col="grow" onclick="sortCrop('grow')" style="cursor:pointer;">⏱️ Grow ↕</th>
        <th class="sortable" data-col="regrow" onclick="sortCrop('regrow')" style="cursor:pointer;">🔄 Regrow ↕</th>
        <th class="sortable" data-col="base" onclick="sortCrop('base')" style="cursor:pointer;">⭐ Base ↕</th>
        <th class="sortable" data-col="silver" onclick="sortCrop('silver')" style="cursor:pointer;">🥈 Silver ↕</th>
        <th class="sortable" data-col="gold" onclick="sortCrop('gold')" style="cursor:pointer;">🥇 Gold ↕</th>
        <th class="sortable" data-col="iridium" onclick="sortCrop('iridium')" style="cursor:pointer;">💎 Iridium ↕</th>
        <th class="sortable" data-col="artisan" onclick="sortCrop('artisan')" style="cursor:pointer;">🏭 Artisan ↕</th>
        <th class="sortable" data-col="profitPerDay" onclick="sortCrop('profitPerDay')" style="cursor:pointer;">📈 Profit/Day ↕</th>
      </tr>
    </thead>
    <tbody id="crop-tbody">
      <!-- Populated by JS -->
    </tbody>
  </table>
</div>

---

## 📊 Compare Mode

<div id="compare-panel" style="padding:16px; background:rgba(255,255,255,0.03); border-radius:12px; margin:16px 0; border:1px solid rgba(255,255,255,0.06); min-height:80px;">
  Select 2–4 crops to compare side-by-side (checkboxes on left).
</div>

---

## 💡 Tips

- **Profit/Day** is calculated assuming a standard 28-day season. For regrowing crops, it accounts for the initial grow time + multiple harvests.
- **Free seeds** (Seed Spots crops: Carrot, Summer Squash, Broccoli, Powdermelon) have zero seed cost — profit is pure income.
- **Quality prices**: Silver = 1.25×, Gold = 1.5×, Iridium = 2× base price.
- **Artisan** column shows the most profitable artisan product. Fruits make Wine (3×), Vegetables make Juice (2.25×) or Pickles (2× + 50g).
- **Greenhouse crops** (Ancient Fruit, Cactus Fruit, Pineapple, Taro Root, Tea Leaves) can be grown year-round — profit/day gets even better with continuous harvests.
- **Starfruit** at 750g base and 2250g as Wine is unmatched for single-harvest profit, and **Hops** with Pale Ale at 300g daily is the Keg efficiency king.
- **Sweet Gem Berry** (83.33g/day) is the highest profit-per-day crop but requires Rare Seeds from the Traveling Cart.

---

<h2 id="notes">📝 Usage Notes</h2>

- Quality prices (Silver/Gold/Iridium) are calculated from base price using the standard multipliers.
- Artisan prices shown reflect the **base** artisan product price before the Artisan profession (+40%) buff.
- Coffee Beans: 5 beans brew 1 Coffee. The seed cost shown (2500g) is for a single bean purchased at the Traveling Cart.
- Qi Fruit, Fiber, and Moss Soup Plant are special crops not typically grown for profit.

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/)
>
> *Data source: Stardew Valley Wiki v1.6*

<script src="../../assets/js/tools/crop-compare.js"></script>

<style>
.sortable { user-select: none; }
.sortable:hover { color: #22c55e; }
.sortable.sorted-asc::after { content: " ▲"; font-size: 0.7em; }
.sortable.sorted-desc::after { content: " ▼"; font-size: 0.7em; }
#crop-tbody tr { transition: background 0.2s; }
#crop-tbody tr:hover { background: rgba(34,197,94,0.06) !important; }
#crop-compare-table th { background: rgba(201,169,110,0.1); font-size: 0.78em; white-space: nowrap; padding: 8px 6px; }
#crop-compare-table td { padding: 6px; font-size: 0.85em; }
</style>
