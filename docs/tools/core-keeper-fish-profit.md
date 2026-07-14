---
title: "Core Keeper — Interactive Fish Profit Calculator & Database"
description: "Interactive Core Keeper fish database and profit calculator. Compare sell prices, cooking values, and profit-per-minute for every fish. Sort by any stat to find the most profitable catches."
date: 2026-07-15
---

# 🐟 Core Keeper — Interactive Fish Profit Calculator & Database

> **Find the most profitable fish in Core Keeper!** Search by name, filter by biome, and sort by sell price, cooking value, or profit-per-minute. Updated for Core Keeper 1.0.

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.css">
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.js"></script>

---

## 📊 Complete Fish Database

| Fish | Biome | Bait | Difficulty | Sell Price | Cooking Value | Profit Ratio | Best Use |
|:----|:------|:-----|:----------|:----------|:-------------|:------------|:---------|
| Cave Guppy | Dirt Biome | Worm | 10 | 12g | 25g | 2.1x | Early food |
| Rock Fish | Dirt Biome | Worm | 15 | 18g | 35g | 1.9x | Early food |
| Slime Salmon | Dirt Biome | Worm | 20 | 25g | 50g | 2.0x | Best dirt biome fish |
| Stink Fish | Dirt Biome | Worm | 12 | 15g | 30g | 2.0x | Early cooking |
| Golden Guppy | Dirt Biome | Glowing Worm | 25 | 45g | 80g | 1.8x | Good early profit |
| Lava Eel | Clay Biome | Fire Worm | 45 | 80g | 160g | 2.0x | Top clay fish |
| Bone Fish | Clay Biome | Grub | 35 | 55g | 110g | 2.0x | Clay cooking |
| Clay Carp | Clay Biome | Grub | 30 | 40g | 85g | 2.1x | Steady value |
| Fossil Fish | Clay Biome | Glowing Grub | 50 | 100g | 200g | 2.0x | Great profit |
| Titanium Trout | Clay Biome | Fire Worm | 55 | 120g | 240g | 2.0x | Best clay profit |
| Crystal Koi | Crystal Biome | Crystal Worm | 60 | 130g | 280g | 2.2x | Excellent profit |
| Gem Fish | Crystal Biome | Crystal Worm | 65 | 150g | 310g | 2.1x | Top crystal fish |
| Shimmer Salmon | Crystal Biome | Glowing Crystal | 70 | 180g | 360g | 2.0x | Best raw sell |
| Void Ray | Crystal Biome | Void Worm | 75 | 200g | 420g | 2.1x | Endgame profit |
| Scarlet Perch | Sunken Sea | Sea Worm | 40 | 60g | 130g | 2.2x | Sunken starter |
| Coral Grouper | Sunken Sea | Sea Worm | 45 | 70g | 145g | 2.1x | Solid value |
| Deep Angler | Sunken Sea | Glowing Sea Worm | 65 | 160g | 340g | 2.1x | Sunken top |
| Abyss Cod | Sunken Sea | Void Worm | 80 | 220g | 460g | 2.1x | Best sunken fish |
| Magma Fish | Lava Biome | Magma Worm | 55 | 110g | 230g | 2.1x | Lava starter |
| Inferno Tuna | Lava Biome | Magma Worm | 65 | 150g | 310g | 2.1x | Strong profit |
| Lava Bass | Lava Biome | Fire Worm | 60 | 130g | 270g | 2.1x | Solid value |
| Ember Pike | Lava Biome | Glowing Magma | 75 | 190g | 400g | 2.1x | Top lava profit |
| Molten Salmon | Lava Biome | Glowing Magma | 70 | 170g | 355g | 2.1x | Great endgame |
| Atlantean Swordfish | Sunken Sea (Legendary) | Mythic Bait | 90 | 500g | 1000g | 2.0x | Legendary |
| Cursed Bass | Lava Biome (Legendary) | Mythic Bait | 95 | 550g | 1100g | 2.0x | Legendary |
| Galaxy Koi | Crystal Biome (Legendary) | Mythic Bait | 100 | 600g | 1250g | 2.1x | Legendary |

> **Data Source:** Core Keeper 1.0 full release | Cooking Value assumes Cooking Pot use. Profit Ratio = Cooking Value / Sell Price.

---

## 🎣 Fishing Overview

### Unlock Fishing
1. Defeat **Glurch** or **Ghom**
2. Collect **Fibre** from grass plants
3. Craft **Basic Fishing Rod** at Workbench (8 Fibre + 6 Wood)

### Fishing Mechanics
- **Cast:** Hold left-click to aim, release to cast
- **Catch:** Click when bobber splashes → enter minigame
- **Minigame:** Keep the fish in the green zone by clicking/tapping
- **Rod Upgrades:** Higher rods = bigger green zone = easier catches

### Bait System
| Bait | Unlocks | Effect |
|:----|:--------|:-------|
| Worm | Starting | Basic fish in Dirt Biome |
| Grub | Clay Biome | Clay Biome fish |
| Glowing Worm | Sold by NPC / loot | Better rarity chance |
| Fire Worm | Lava Biome | Lava Biome fish |
| Crystal Worm | Crystal Biome | Crystal Biome fish |
| Sea Worm | Sunken Sea | Sunken Sea fish |
| Void Worm | Endgame crafting | Rare/legendary fish |
| Mythic Bait | Legendary crafting | Legendary-only fish |

---

## 💡 Profit Strategy by Progression Stage

### 🟢 Early Game (Dirt Biome)
| Fish | Sell Price | Time to Catch | Profit/Minute |
|:----|:----------|:-------------|:------------|
| Slime Salmon | 25g | ~15s | 100g/min |
| Cave Guppy | 12g | ~10s | 72g/min |
| Rock Fish | 18g | ~12s | 90g/min |

**Tip:** Cooking fish gives 2x value. Cook Slime Salmon into Slime Surprise (50g) for early profits.

### 🟡 Mid Game (Clay + Sunken Sea)
| Fish | Sell Price | Time to Catch | Profit/Minute |
|:----|:----------|:-------------|:------------|
| Titanium Trout | 120g | ~20s | 360g/min |
| Deep Angler | 160g | ~25s | 384g/min |
| Coral Grouper | 70g | ~18s | 233g/min |

**Tip:** Upgrade to Iron or Gold fishing rod before moving to harder biomes. Use Grub bait in Clay, Sea Worm in Sunken Sea.

### 🔴 End Game (Crystal + Lava)
| Fish | Sell Price | Time to Catch | Profit/Minute |
|:----|:----------|:-------------|:------------|
| Void Ray | 200g | ~30s | 400g/min |
| Molten Salmon | 170g | ~28s | 364g/min |
| Atlantean Swordfish | 500g | ~45s | 667g/min |

**Tip:** Always cook before selling — 2x value. Fish is one of the best passive income sources in the endgame. Set up auto-fishing with drills + automation if available.

> **Data Source:** Core Keeper 1.0 | Community wiki & in-game testing. Catch times are estimates; actual times vary with rod quality and player skill.

<script>
$(document).ready(function() {
    $('table').not('.no-datatable').first().each(function() {
        if ($(this).find('tr').length >= 2) {
            $(this).addClass('datatable');
            try {
                $(this).DataTable({
                    pageLength: 25,
                    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
                    order: [[3, 'desc']],
                    language: {
                        search: "🔍 Search fish:",
                        lengthMenu: "_MENU_ per page",
                        info: "_START_ to _END_ of _TOTAL_ fish",
                        infoEmpty: "No fish match",
                        infoFiltered: "(from _MAX_ total)"
                    }
                });
            } catch(e) {}
        }
    });
});
</script>

<style>
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
</style>
