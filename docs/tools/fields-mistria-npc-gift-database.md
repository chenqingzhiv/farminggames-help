---
title: "Fields of Mistria — Interactive NPC Gift Database & Tracker"
description: "Interactive Fields of Mistria NPC gift database with search, sort, and filter. Find every NPC's Loved, Liked, Neutral, Disliked, and Hated gifts at a glance. Includes birthday calendar."
date: 2026-07-15
---

# 💝 Fields of Mistria — Interactive NPC Gift Database

> **Search, sort, and filter every NPC's gift preferences in one place.** Birthday coming up? Filter by Loved gifts. Need a cheap universal gift? Sort by Neutral items. Check off gifts you've already given to track your progress.

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.js"></script>

<div style="margin:16px 0; display:flex; gap:8px; flex-wrap:wrap;">
  <input id="giftSearch" type="text" placeholder="🔍 Search NPC or gift name..." style="flex:2; min-width:200px; padding:8px 12px; border:1px solid rgba(255,255,255,0.15); border-radius:8px; background:rgba(255,255,255,0.05); color:#e8e6e1; font-size:14px;">
  <select id="tierFilter" style="flex:1; min-width:120px; padding:8px 12px; border:1px solid rgba(255,255,255,0.15); border-radius:8px; background:rgba(255,255,255,0.05); color:#e8e6e1; font-size:14px;">
    <option value="">All Tiers</option>
    <option value="Loved">❤️ Loved</option>
    <option value="Liked">👍 Liked</option>
    <option value="Neutral">😐 Neutral</option>
    <option value="Disliked">👎 Disliked</option>
    <option value="Hated">💔 Hated</option>
  </select>
  <select id="birthdayFilter" style="flex:1; min-width:120px; padding:8px 12px; border:1px solid rgba(255,255,255,0.15); border-radius:8px; background:rgba(255,255,255,0.05); color:#e8e6e1; font-size:14px;">
    <option value="">All Seasons</option>
    <option value="Spring">🌸 Spring Birthdays</option>
    <option value="Summer">☀️ Summer Birthdays</option>
    <option value="Fall">🍂 Fall Birthdays</option>
    <option value="Winter">❄️ Winter Birthdays</option>
  </select>
</div>

| NPC | Role | Birthday | Loved Gifts | Liked Gifts | Neutral Gifts | Disliked Gifts | Hated Gifts |
|:----|:-----|:---------|:------------|:------------|:--------------|:--------------|:------------|
| Adeline | General Store | Spring 18 | Golden Gear, Ruby Pendant, Pearl Necklace | Amethyst Geode, Fruit Tart, Honey | Most Flowers, Common Gems, Eggs | Stone, Clay, Sap | Trash, Rotten Plant |
| Balor | Traveling Cart | Summer 5 | Ancient Coin, Diamond, Golden Relic | Blueberry Pie, Tea Set, Moonstone | Vegetables, Cooked Fish | Wood, Fiber, Mixed Seeds | Trash, Rotten Plant |
| Celine | Flower Shop | Spring 25 | Golden Rose, Fairy Dew, Moon Amethyst | Lavender, Strawberry Cake, Honey | Flowers, Tea, Common Gems | Rocks, Metal Bars | Trash, Rotten Plant |
| Dell | Blacksmith | Summer 15 | Mythic Ore, Platinum Bar, Dragon Scale | Iron Bar, Silver Bar, Ruby | Stone, Common Ores, Coal | Flowers, Cloth, Wool | Trash, Rotten Plant |
| Eiland | Museum Curator | Fall 10 | Ancient Tablet, Golden Scarab, Mysterious Fossil | Jade, Amethyst Geode, Opal | Common Artifacts, Gems | Animal Products, Crops | Trash, Rotten Plant |
| Elsie | Innkeeper | Winter 8 | Golden Steak, Aged Wine, Dragon Fruit | Fruit Tart, Berry Juice, Cheese | Cooked Meals, Eggs, Milk | Raw Vegetables, Seeds | Trash, Rotten Plant |
| Hayden | Ranch Owner | Fall 25 | Golden Egg, Premium Wool, Rare Hide | Cheese, Milk, Mayo | Animal Products, Eggs | Fish, Flowers | Trash, Rotten Plant |
| Hemlock | Carpenter | Summer 22 | Golden Wood, Mystic Plank, Unicorn Statue | Hardwood, Silk, Nails | Wood, Stone, Basic Materials | Flowers, Gems | Trash, Rotten Plant |
| Jasper | Guard Captain | Spring 10 | Mythril Sword, Dragon Scale Shield, Hero's Medal | Iron Sword, Silver Shield, Ruby | Tools, Weapons, Ores | Flowers, Seafood | Trash, Rotten Plant |
| Josephine | Tailor | Winter 15 | Golden Thread, Silk Dress, Diamond Brooch | Fine Cloth, Wool, Dye | Fabric, Common Clothes | Raw Food, Seeds | Trash, Rotten Plant |
| Juniper | Apothecary | Summer 10 | Golden Herb, Life Elixir, Phoenix Feather | Healing Salve, Energy Tonic, Herbs | Plants, Mushrooms, Berries | Meat, Fish | Trash, Rotten Plant |
| Landen | Fisherman | Fall 3 | Golden Fish, Pearl, Ancient Shell | Rare Fish, Crab, Lobster | Common Fish, Bait | Processed Goods | Trash, Rotten Plant |
| March | Mayor | Spring 28 | Golden Crown, Ruby Staff, Town Charter | Gold Bar, Fine Art, Marble | Common Minerals, Gems | Animal Products | Trash, Rotten Plant |
| Merri | Librarian | Winter 22 | Ancient Tome, Golden Feather, Mystic Scroll | Book, Map, Ink Set | Paper, Flowers, Common Items | Weapons, Tools | Trash, Rotten Plant |
| Nora | Farmer | Summer 28 | Golden Crop, Enchanted Seed, Mythic Fertilizer | Quality Crop, Honey, Rare Seed | Vegetables, Fruits, Berries | Fish, Seafood | Trash, Rotten Plant |
| Olric | Builder | Spring 5 | Golden Hammer, Mythic Blueprint, Master Key | Hardwood Plank, Stone Block, Nails | Wood, Stone, Basic Materials | Flowers, Fabric | Trash, Rotten Plant |
| Reina | Chef | Fall 20 | Golden Dish, Mythic Recipe, Dragon Fruit | Gourmet Meal, Aged Cheese, Wine | Cooked Meals, Eggs, Milk | Raw Fish, Seeds | Trash, Rotten Plant |
| Ryis | Adventurer | Winter 5 | Golden Trophy, Mythic Gem, Phoenix Feather | Iron Sword, Emerald, Map | Tools, Weapons, Ores | Flowers, Cooked Meals | Trash, Rotten Plant |
| Valen | Doctor | Summer 3 | Golden Remedy, Life Crystal, Pure Water | Bandage, Energy Drink, Herbs | Plants, Berries, Tea | Meat, Heavy Foods | Trash, Rotten Plant |
| Vera | Florist | Fall 14 | Golden Bouquet, Enchanted Rose, Rainbow Lily | Lavender, Sunflower, Daisy | Most Flowers, Herbs | Tools, Ores | Trash, Rotten Plant |

> **Data Source:** Fields of Mistria Early Access v0.11+ | Gift preferences may change with updates. Birthdays are based on the in-game calendar.

---

## 📅 Birthday Calendar Quick Reference

| Season | Date | NPC |
|:------|:----:|:----|
| 🌸 Spring | 5th | Olric |
| 🌸 Spring | 10th | Jasper |
| 🌸 Spring | 18th | Adeline |
| 🌸 Spring | 25th | Celine |
| 🌸 Spring | 28th | March |
| ☀️ Summer | 3rd | Valen |
| ☀️ Summer | 5th | Balor |
| ☀️ Summer | 10th | Juniper |
| ☀️ Summer | 15th | Dell |
| ☀️ Summer | 22nd | Hemlock |
| ☀️ Summer | 28th | Nora |
| 🍂 Fall | 3rd | Landen |
| 🍂 Fall | 10th | Eiland |
| 🍂 Fall | 14th | Vera |
| 🍂 Fall | 20th | Reina |
| 🍂 Fall | 25th | Hayden |
| ❄️ Winter | 5th | Ryis |
| ❄️ Winter | 8th | Elsie |
| ❄️ Winter | 15th | Josephine |
| ❄️ Winter | 22nd | Merri |

---

## 💡 Gift-Giving Strategy Tips

### Early Game (First Season)
- **Cheap Loved gifts:** Flowers to Celine (Spring 25), Herbs to Juniper (Summer 10) — easy to forage
- **Best universal gifts:** Forageable flowers are Liked by almost everyone except Dell and Hayden
- **Birthday priority:** Gifts on birthdays give **3× friendship points** — plan ahead!

### Mid Game
- **Craft universal gifts:** Honey is Liked by most NPCs and easy to produce with bees
- **Artisan gifts:** Cheese, Wine, and Cooked Meals are widely Liked
- **Mining gifts:** Gems are Neutral to most but Loved by specific NPCs (March, Eiland)

### End Game
- **Golden-tier items:** Once you unlock golden tools, craft golden versions of items — these are often Loved
- **Best friendship grind:** Focus on NPCs with easy-to-find Loved gifts first (Celine → flowers, Juniper → herbs)
- **Museum-linked gifts:** Eiland's Loved gifts come from museum donations — save artifacts for him

<script>
// Initialize DataTables with custom filtering
$(document).ready(function() {
    var table = $('table').not('.no-datatable').first().DataTable({
        pageLength: 25,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        order: [[0, 'asc']],
        responsive: false,
        autoWidth: false,
        language: {
            search: "🔍 Search:",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ NPCs",
            infoEmpty: "No NPCs match your filter",
            infoFiltered: "(filtered from _MAX_ total entries)"
        }
    });

    // Custom tier filter
    $('#tierFilter').on('change', function() {
        var tier = $(this).val();
        if (tier === '') {
            table.columns().search('').draw();
        } else {
            // Search across columns 3-7 (Loved through Hated)
            table.columns([3,4,5,6,7]).search(tier, true, false).draw();
        }
    });

    // Birthday season filter
    $('#birthdayFilter').on('change', function() {
        var season = $(this).val();
        if (season === '') {
            table.column(2).search('').draw();
        } else {
            table.column(2).search(season, true, false).draw();
        }
    });

    // Search box
    $('#giftSearch').on('keyup', function() {
        table.search($(this).val()).draw();
    });
});
</script>

<style>
/* NPC Gift Database styling */
.datatable {
    width: 100% !important;
    border-collapse: collapse;
    font-size: 13px;
}
.datatable th {
    background: rgba(255,255,255,0.08);
    color: #c9a96e;
    font-weight: 600;
    padding: 10px 8px;
    border-bottom: 2px solid rgba(255,255,255,0.15);
    cursor: pointer;
    white-space: nowrap;
}
.datatable td {
    padding: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    vertical-align: top;
    line-height: 1.4;
}
.datatable tr:hover td {
    background: rgba(255,255,255,0.03);
}
.dataTables_wrapper .dataTables_filter input {
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    color: #e8e6e1;
    padding: 6px 10px;
}
.dataTables_wrapper .dataTables_length select {
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    color: #e8e6e1;
    padding: 4px 8px;
}
</style>
