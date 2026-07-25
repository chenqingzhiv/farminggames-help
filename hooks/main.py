"""
Macros plugin module for farminggames.help
Provides template helpers for batch page generation.
"""

import re
from urllib.parse import quote, unquote

# ── Related Guides Mapping ──
# Maps page path → [(related_path, anchor_text), ...]
RELATED_GUIDES = {
    # ─── Home ───
    "": [
        ("stardew/", "Stardew Valley Complete Guide"),
        ("tools/", "Interactive Tools & Calculators"),
        ("guides/", "Latest Guides & Resources"),
    ],

    # ─── Stardew Valley ───
    "stardew/": [
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/fish/", "Fish Catalog & Locations"),
        ("stardew/npc-gifts/", "NPC Gift Preference Guide"),
    ],
    "stardew/crops/": [
        ("stardew/profit-calc/", "Money-Making Profit Calculator"),
        ("stardew/greenhouse-crops/", "Greenhouse Crops Strategy"),
        ("stardew/planting-calendar/", "Planting Calendar & Sowing Dates"),
    ],
    "stardew/greenhouse-crops/": [
        ("stardew/ancient-fruit-empire/", "Ancient Fruit Empire Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/wine-brewing/", "Wine & Brewing Guide"),
    ],
    "stardew/fruit-trees/": [
        ("stardew/greenhouse-crops/", "Greenhouse Crops Strategy"),
        ("stardew/farm-layout/", "Optimal Farm Layout & Automation"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
    ],
    "stardew/forage-guide/": [
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/crafting/", "Crafting Guide & Recipes"),
        ("stardew/spring-guide/", "Spring Detailed Guide"),
    ],
    "stardew/profit-calc/": [
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/wine-brewing/", "Wine & Brewing Guide"),
        ("stardew/animals/", "Animal Breeding Profit Analysis"),
    ],
    "stardew/planting-calendar/": [
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/spring-guide/", "Spring Detailed Guide"),
        ("stardew/summer-guide/", "Summer Detailed Guide"),
    ],
    "stardew/farm-layout/": [
        ("stardew/greenhouse-crops/", "Greenhouse Crops Strategy"),
        ("stardew/animals/", "Animal Breeding Profit Analysis"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
    ],
    "stardew/animals/": [
        ("stardew/artisan/", "Artisan Goods Profit Guide"),
        ("stardew/profit-calc/", "Money-Making Profit Calculator"),
        ("stardew/farm-layout/", "Optimal Farm Layout & Automation"),
    ],
    "stardew/artisan/": [
        ("stardew/wine-brewing/", "Wine & Brewing Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/animals/", "Animal Breeding Profit Analysis"),
    ],
    "stardew/skills/": [
        ("stardew/mining/", "Complete Mining Guide"),
        ("stardew/fishing/", "Complete Fishing Guide"),
        ("stardew/equipment/", "Equipment & Loadout Guide"),
    ],
    "stardew/mining/": [
        ("stardew/equipment/", "Equipment & Loadout Guide"),
        ("stardew/weapons/", "Weapon Catalog & Rankings"),
        ("stardew/ginger-island/", "Ginger Island Complete Guide"),
    ],
    "stardew/equipment/": [
        ("stardew/weapons/", "Weapon Catalog & Rankings"),
        ("stardew/boots/", "Boots Catalog & Stats"),
        ("stardew/rings/", "Rings Catalog & Combinations"),
    ],
    "stardew/weapons/": [
        ("stardew/equipment/", "Equipment & Loadout Guide"),
        ("stardew/trinkets/", "Trinkets Guide (1.6)"),
        ("stardew/mining/", "Complete Mining Guide"),
    ],
    "stardew/boots/": [
        ("stardew/equipment/", "Equipment & Loadout Guide"),
        ("stardew/rings/", "Rings Catalog & Combinations"),
        ("stardew/weapons/", "Weapon Catalog & Rankings"),
    ],
    "stardew/rings/": [
        ("stardew/equipment/", "Equipment & Loadout Guide"),
        ("stardew/trinkets/", "Trinkets Guide (1.6)"),
        ("stardew/boots/", "Boots Catalog & Stats"),
    ],
    "stardew/fish/": [
        ("stardew/fishing/", "Complete Fishing Guide"),
        ("stardew/fish-pond-guide/", "Fish Pond Guide"),
        ("stardew/profit-calc/", "Money-Making Profit Calculator"),
    ],
    "stardew/fishing/": [
        ("stardew/fish/", "Fish Catalog & Locations"),
        ("stardew/fish-pond-guide/", "Fish Pond Guide"),
        ("stardew/spring-guide/", "Spring Detailed Guide"),
    ],
    "stardew/fish-pond-guide/": [
        ("stardew/fish/", "Fish Catalog & Locations"),
        ("stardew/fishing/", "Complete Fishing Guide"),
        ("stardew/ancient-fruit-empire/", "Ancient Fruit Empire Guide"),
    ],
    "stardew/npc-gifts/": [
        ("stardew/schedule/", "NPC Schedule Guide"),
        ("stardew/festivals/", "Festival Calendar & Rewards"),
        ("stardew/fish/", "Fish Catalog & Locations"),
    ],
    "stardew/schedule/": [
        ("stardew/npc-gifts/", "NPC Gift Preference Guide"),
        ("stardew/festivals/", "Festival Calendar & Rewards"),
        ("stardew/spring-guide/", "Spring Detailed Guide"),
    ],
    "stardew/festivals/": [
        ("stardew/npc-gifts/", "NPC Gift Preference Guide"),
        ("stardew/schedule/", "NPC Schedule Guide"),
        ("stardew/spring-guide/", "Spring Detailed Guide"),
    ],
    "stardew/crafting/": [
        ("stardew/cooking/", "Cooking Guide & Recipes"),
        ("stardew/artisan/", "Artisan Goods Profit Guide"),
        ("stardew/totems/", "Totem Guide & Effects"),
    ],
    "stardew/cooking/": [
        ("stardew/crafting/", "Crafting Guide & Recipes"),
        ("stardew/fish/", "Fish Catalog & Locations"),
        ("stardew/artisan/", "Artisan Goods Profit Guide"),
    ],
    "stardew/hats/": [
        ("stardew/trinkets/", "Trinkets Guide (1.6)"),
        ("stardew/museum/", "Museum Donation Guide"),
        ("stardew/equipment/", "Equipment & Loadout Guide"),
    ],
    "stardew/totems/": [
        ("stardew/crafting/", "Crafting Guide & Recipes"),
        ("stardew/ginger-island/", "Ginger Island Complete Guide"),
        ("stardew/skills/", "Skills Guide"),
    ],
    "stardew/trinkets/": [
        ("stardew/equipment/", "Equipment & Loadout Guide"),
        ("stardew/weapons/", "Weapon Catalog & Rankings"),
        ("stardew/hats/", "Hat Catalog & Locations"),
    ],
    "stardew/wine-brewing/": [
        ("stardew/artisan/", "Artisan Goods Profit Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/greenhouse-crops/", "Greenhouse Crops Strategy"),
    ],
    "stardew/spring-guide/": [
        ("stardew/summer-guide/", "Summer Detailed Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/year-1-guide/", "Year 1 Complete Guide"),
    ],
    "stardew/summer-guide/": [
        ("stardew/fall-guide/", "Fall Detailed Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/summer-blueprint/", "Summer Blueprint & Planning"),
    ],
    "stardew/summer-blueprint/": [
        ("stardew/summer-guide/", "Summer Detailed Guide"),
        ("stardew/farm-layout/", "Optimal Farm Layout & Automation"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
    ],
    "stardew/fall-guide/": [
        ("stardew/winter/", "Winter Detailed Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/pumpkin-vs-cranberries/", "Pumpkin vs Cranberries Analysis"),
    ],
    "stardew/pumpkin-vs-cranberries/": [
        ("stardew/fall-guide/", "Fall Detailed Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/profit-calc/", "Money-Making Profit Calculator"),
    ],
    "stardew/winter/": [
        ("stardew/fall-guide/", "Fall Detailed Guide"),
        ("stardew/mining/", "Complete Mining Guide"),
        ("stardew/fishing/", "Complete Fishing Guide"),
    ],
    "stardew/year-1-guide/": [
        ("stardew/spring-guide/", "Spring Detailed Guide"),
        ("stardew/summer-guide/", "Summer Detailed Guide"),
        ("stardew/year-2-guide/", "Year 2+ Endgame Guide"),
    ],
    "stardew/ginger-island/": [
        ("stardew/walnuts/", "Golden Walnut Collection Guide"),
        ("stardew/mining/", "Complete Mining Guide"),
        ("stardew/ancient-fruit-empire/", "Ancient Fruit Empire Guide"),
    ],
    "stardew/1.6-update-guide/": [
        ("stardew/trinkets/", "Trinkets Guide (1.6)"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/year-1-guide/", "Year 1 Complete Guide"),
    ],
    "stardew/year-2-guide/": [
        ("stardew/ancient-fruit-empire/", "Ancient Fruit Empire Guide"),
        ("stardew/perfect-completion/", "100% Completion Guide"),
        ("stardew/wine-brewing/", "Wine & Brewing Guide"),
    ],
    "stardew/ancient-fruit-empire/": [
        ("stardew/wine-brewing/", "Wine & Brewing Guide"),
        ("stardew/greenhouse-crops/", "Greenhouse Crops Strategy"),
        ("stardew/ginger-island/", "Ginger Island Complete Guide"),
    ],
    "stardew/museum/": [
        ("stardew/walnuts/", "Golden Walnut Collection Guide"),
        ("stardew/bundle-reference/", "Community Center Bundle Reference"),
        ("stardew/encyclopedia/", "Complete Encyclopedia Catalog"),
    ],
    "stardew/walnuts/": [
        ("stardew/ginger-island/", "Ginger Island Complete Guide"),
        ("stardew/perfect-completion/", "100% Completion Guide"),
        ("stardew/museum/", "Museum Donation Guide"),
    ],
    "stardew/bundle-reference/": [
        ("stardew/perfect-completion/", "100% Completion Guide"),
        ("stardew/museum/", "Museum Donation Guide"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
    ],
    "stardew/tier-list/": [
        ("stardew/encyclopedia/", "Complete Encyclopedia Catalog"),
        ("stardew/equipment/", "Equipment & Loadout Guide"),
        ("stardew/weapons/", "Weapon Catalog & Rankings"),
    ],
    "stardew/encyclopedia/": [
        ("stardew/tier-list/", "Comprehensive Tier List"),
        ("stardew/museum/", "Museum Donation Guide"),
        ("stardew/fish/", "Fish Catalog & Locations"),
    ],
    "stardew/perfect-completion/": [
        ("stardew/bundle-reference/", "Community Center Bundle Reference"),
        ("stardew/museum/", "Museum Donation Guide"),
        ("stardew/walnuts/", "Golden Walnut Collection Guide"),
    ],
    "stardew/feedback/": [
        ("stardew/index/", "Stardew Valley Complete Guide"),
        ("stardew/encyclopedia/", "Complete Encyclopedia Catalog"),
        ("stardew/tier-list/", "Comprehensive Tier List"),
    ],

    # ─── Stardew Valley Tools ───
    "tools/bundle-tracker/": [
        ("tools/stardew-valley/community-center/", "Community Center Interactive Guide"),
        ("stardew/bundle-reference/", "Bundle Reference List"),
        ("stardew/perfect-completion/", "100% Completion Guide"),
    ],
    "tools/profit-optimizer/": [
        ("tools/stardew-valley/profit-planner/", "Crop Profit Planner"),
        ("tools/stardew-valley/crop-compare/", "Crop Compare Tool"),
        ("stardew/profit-calc/", "Money-Making Profit Calculator"),
    ],
    "tools/interactive-map/": [
        ("stardew/index/", "Stardew Valley Complete Guide"),
        ("tools/stardew-valley/mining-tracker/", "Mining Tracker"),
        ("tools/stardew-valley/fish-tracker/", "Fish Collection Tracker"),
    ],
    "tools/stardew-valley/community-center/": [
        ("tools/bundle-tracker/", "Bundle Tracker"),
        ("stardew/bundle-reference/", "Bundle Reference List"),
        ("stardew/perfect-completion/", "100% Completion Guide"),
    ],
    "tools/stardew-valley/crop-compare/": [
        ("tools/stardew-valley/profit-planner/", "Crop Profit Planner"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("tools/profit-calculator/", "Profit Calculator"),
    ],
    "tools/stardew-valley/fish-tracker/": [
        ("stardew/fish/", "Fish Catalog & Locations"),
        ("stardew/fishing/", "Complete Fishing Guide"),
        ("tools/interactive-map/", "Interactive Map"),
    ],
    "tools/stardew-valley/mining-tracker/": [
        ("stardew/mining/", "Complete Mining Guide"),
        ("tools/interactive-map/", "Interactive Map"),
        ("stardew/equipment/", "Equipment & Loadout Guide"),
    ],
    "tools/stardew-valley/npc-friendship/": [
        ("stardew/npc-gifts/", "NPC Gift Preference Guide"),
        ("stardew/schedule/", "NPC Schedule Guide"),
        ("stardew/festivals/", "Festival Calendar & Rewards"),
    ],
    "tools/stardew-valley/profit-planner/": [
        ("tools/stardew-valley/crop-compare/", "Crop Compare Tool"),
        ("stardew/crops/", "Complete Crop Profit Guide"),
        ("stardew/profit-calc/", "Money-Making Profit Calculator"),
    ],

    # ─── Farming Simulator 25 ───
    "farmingsim/": [
        ("farmingsim/getting-started/", "Getting Started Guide"),
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/machinery/", "Machinery Guide"),
    ],
    "farmingsim/getting-started/": [
        ("farmingsim/maps-guide/", "Maps & Field Guide"),
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/profit-guide/", "Profit Guide"),
    ],
    "farmingsim/maps-guide/": [
        ("farmingsim/getting-started/", "Getting Started Guide"),
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/forestry/", "Forestry Guide"),
    ],
    "farmingsim/crops/": [
        ("farmingsim/profit-guide/", "Profit Guide"),
        ("farmingsim/production-chains/", "Production Chains Guide"),
        ("farmingsim/machinery/", "Machinery Guide"),
    ],
    "farmingsim/machinery/": [
        ("farmingsim/vehicle-compare/", "Vehicle Compare Tool"),
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/contracts/", "Contracts Guide"),
    ],
    "farmingsim/profit-guide/": [
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/production-chains/", "Production Chains Guide"),
        ("farmingsim/animals/", "Animals Guide"),
    ],
    "farmingsim/production-chains/": [
        ("farmingsim/profit-guide/", "Profit Guide"),
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/forestry/", "Forestry Guide"),
    ],
    "farmingsim/vehicle-compare/": [
        ("farmingsim/machinery/", "Machinery Guide"),
        ("farmingsim/getting-started/", "Getting Started Guide"),
        ("farmingsim/contracts/", "Contracts Guide"),
    ],
    "farmingsim/animals/": [
        ("farmingsim/profit-guide/", "Profit Guide"),
        ("farmingsim/crops/", "Crops Guide"),
        ("farmingsim/production-chains/", "Production Chains Guide"),
    ],
    "farmingsim/forestry/": [
        ("farmingsim/maps-guide/", "Maps & Field Guide"),
        ("farmingsim/production-chains/", "Production Chains Guide"),
        ("farmingsim/profit-guide/", "Profit Guide"),
    ],
    "farmingsim/contracts/": [
        ("farmingsim/getting-started/", "Getting Started Guide"),
        ("farmingsim/machinery/", "Machinery Guide"),
        ("farmingsim/profit-guide/", "Profit Guide"),
    ],
    "farmingsim/feedback/": [
        ("farmingsim/index/", "Farming Simulator 25 Guide"),
        ("farmingsim/getting-started/", "Getting Started Guide"),
        ("farmingsim/crops/", "Crops Guide"),
    ],

    # ─── Palia ───
    "palia/": [
        ("palia/guide/", "Beginner Guide"),
        ("palia/beginner-tips/", "Quick Tips"),
        ("palia/crops/", "Crops Guide"),
    ],
    "palia/guide/": [
        ("palia/beginner-tips/", "Quick Tips"),
        ("palia/crops/", "Crops Guide"),
        ("palia/money-making/", "Money Making Guide"),
    ],
    "palia/beginner-tips/": [
        ("palia/guide/", "Beginner Guide"),
        ("palia/money-making/", "Money Making Guide"),
        ("palia/crops/", "Crops Guide"),
    ],
    "palia/maps-guide/": [
        ("palia/fish/", "Fish Guide"),
        ("palia/hunting/", "Hunting Guide"),
        ("palia/fish-guide/", "Fish Locations Guide"),
    ],
    "palia/crops/": [
        ("palia/crop-profit/", "Crop Profit Analysis"),
        ("palia/seasons/", "Seasons & Strategy"),
        ("palia/artisan/", "Artisan Goods Guide"),
    ],
    "palia/crop-profit/": [
        ("palia/crops/", "Crops Guide"),
        ("palia/money-making/", "Money Making Guide"),
        ("palia/seasons/", "Seasons & Strategy"),
    ],
    "palia/money-making/": [
        ("palia/crop-profit/", "Crop Profit Analysis"),
        ("palia/fish/", "Fish Guide"),
        ("palia/hunting/", "Hunting Guide"),
    ],
    "palia/seasons/": [
        ("palia/crops/", "Crops Guide"),
        ("palia/festivals/", "Festivals & Events"),
        ("palia/crop-profit/", "Crop Profit Analysis"),
    ],
    "palia/fish/": [
        ("palia/fish-guide/", "Fish Guide & Locations"),
        ("palia/cooking/", "Cooking Guide"),
        ("palia/money-making/", "Money Making Guide"),
    ],
    "palia/fish-guide/": [
        ("palia/fish/", "Fish Guide"),
        ("palia/cooking/", "Cooking Guide"),
        ("palia/money-making/", "Money Making Guide"),
    ],
    "palia/hunting/": [
        ("palia/guide/", "Beginner Guide"),
        ("palia/money-making/", "Money Making Guide"),
        ("palia/maps-guide/", "Maps & Zones Guide"),
    ],
    "palia/animals/": [
        ("palia/crops/", "Crops Guide"),
        ("palia/housing/", "Housing Guide"),
        ("palia/friendship/", "Friendship Guide"),
    ],
    "palia/cooking/": [
        ("palia/crops/", "Crops Guide"),
        ("palia/fish/", "Fish Guide"),
        ("palia/artisan/", "Artisan Goods Guide"),
    ],
    "palia/artisan/": [
        ("palia/crops/", "Crops Guide"),
        ("palia/cooking/", "Cooking Guide"),
        ("palia/money-making/", "Money Making Guide"),
    ],
    "palia/festivals/": [
        ("palia/seasons/", "Seasons & Strategy"),
        ("palia/friendship/", "Friendship Guide"),
        ("palia/guide/", "Beginner Guide"),
    ],
    "palia/friendship/": [
        ("palia/festivals/", "Festivals & Events"),
        ("palia/housing/", "Housing Guide"),
        ("palia/guide/", "Beginner Guide"),
    ],
    "palia/housing/": [
        ("palia/friendship/", "Friendship Guide"),
        ("palia/animals/", "Animals & Pets Guide"),
        ("palia/crops/", "Crops Guide"),
    ],
    "palia/redeem-codes/": [
        ("palia/guide/", "Beginner Guide"),
        ("palia/beginner-tips/", "Quick Tips"),
        ("palia/money-making/", "Money Making Guide"),
    ],
    "palia/feedback/": [
        ("palia/index/", "Palia Guide Hub"),
        ("palia/guide/", "Beginner Guide"),
        ("palia/crops/", "Crops Guide"),
    ],

    # ─── Coral Island ───
    "coral-island/": [
        ("coral-island/getting-started/", "Getting Started Guide"),
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/diving/", "Diving Guide"),
    ],
    "coral-island/getting-started/": [
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/mining/", "Mining Guide"),
        ("coral-island/diving/", "Diving Guide"),
    ],
    "coral-island/crops/": [
        ("coral-island/crop-profit/", "Crop Profit Analysis"),
        ("coral-island/seasonal-strategy/", "Seasonal Strategy Guide"),
        ("coral-island/artisan/", "Artisan Goods Guide"),
    ],
    "coral-island/crop-profit/": [
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/seasonal-strategy/", "Seasonal Strategy Guide"),
        ("tools/coral-island/crop-profit-calculator/", "Crop Profit Calculator Tool"),
    ],
    "coral-island/seasonal-strategy/": [
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/crop-profit/", "Crop Profit Analysis"),
        ("coral-island/festivals/", "Festivals & Events Guide"),
    ],
    "coral-island/mining/": [
        ("coral-island/diving/", "Diving Guide"),
        ("coral-island/getting-started/", "Getting Started Guide"),
        ("coral-island/forage-guide/", "Forage & Scavenge Guide"),
    ],
    "coral-island/diving/": [
        ("coral-island/mining/", "Mining Guide"),
        ("coral-island/fish-guide/", "Fish Guide"),
        ("coral-island/forage-guide/", "Forage & Scavenge Guide"),
    ],
    "coral-island/fish-guide/": [
        ("coral-island/diving/", "Diving Guide"),
        ("coral-island/cooking/", "Cooking Guide"),
        ("coral-island/crops/", "Crops Guide"),
    ],
    "coral-island/forage-guide/": [
        ("coral-island/diving/", "Diving Guide"),
        ("coral-island/mining/", "Mining Guide"),
        ("coral-island/crops/", "Crops Guide"),
    ],
    "coral-island/animals/": [
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/artisan/", "Artisan Goods Guide"),
        ("coral-island/housing/", "Housing Guide"),
    ],
    "coral-island/artisan/": [
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/animals/", "Animals Guide"),
        ("coral-island/crop-profit/", "Crop Profit Analysis"),
    ],
    "coral-island/festivals/": [
        ("coral-island/seasonal-strategy/", "Seasonal Strategy Guide"),
        ("coral-island/romance/", "Romance Guide"),
        ("coral-island/cooking/", "Cooking Guide"),
    ],
    "coral-island/cooking/": [
        ("coral-island/fish-guide/", "Fish Guide"),
        ("coral-island/crops/", "Crops Guide"),
        ("coral-island/festivals/", "Festivals & Events Guide"),
    ],
    "coral-island/romance/": [
        ("coral-island/festivals/", "Festivals & Events Guide"),
        ("coral-island/housing/", "Housing Guide"),
        ("coral-island/getting-started/", "Getting Started Guide"),
    ],
    "coral-island/housing/": [
        ("coral-island/romance/", "Romance Guide"),
        ("coral-island/animals/", "Animals Guide"),
        ("coral-island/crops/", "Crops Guide"),
    ],

    # ─── Fields of Mistria ───
    "fields-mistria/": [
        ("fields-mistria/getting-started/", "Getting Started Guide"),
        ("fields-mistria/crop-profit/", "Crop Profit Guide"),
        ("fields-mistria/mining/", "Mining & Combat Guide"),
    ],
    "fields-mistria/getting-started/": [
        ("fields-mistria/crop-profit/", "Crop Profit Guide"),
        ("fields-mistria/mining/", "Mining & Combat Guide"),
        ("fields-mistria/fish/", "Fish Guide"),
    ],
    "fields-mistria/crop-profit/": [
        ("fields-mistria/seasonal-strategy/", "Seasonal Crop Strategy"),
        ("fields-mistria/artisan-and-endgame/", "Artisan & Endgame Guide"),
        ("fields-mistria/getting-started/", "Getting Started Guide"),
    ],
    "fields-mistria/seasonal-strategy/": [
        ("fields-mistria/crop-profit/", "Crop Profit Guide"),
        ("fields-mistria/festivals/", "Festivals Guide"),
        ("fields-mistria/mining/", "Mining & Combat Guide"),
    ],
    "fields-mistria/mining/": [
        ("fields-mistria/getting-started/", "Getting Started Guide"),
        ("fields-mistria/crafting/", "Crafting Guide"),
        ("fields-mistria/artisan-and-endgame/", "Artisan & Endgame Guide"),
    ],
    "fields-mistria/fish/": [
        ("fields-mistria/cooking/", "Cooking Guide"),
        ("fields-mistria/getting-started/", "Getting Started Guide"),
        ("tools/fields-mistria-npc-gift-database/", "NPC Gift Database Tool"),
    ],
    "fields-mistria/gift-guide/": [
        ("tools/fields-mistria-npc-gift-database/", "NPC Gift Database Tool"),
        ("fields-mistria/festivals/", "Festivals Guide"),
        ("fields-mistria/housing/", "Housing Guide"),
    ],
    "fields-mistria/cooking/": [
        ("fields-mistria/fish/", "Fish Guide"),
        ("fields-mistria/crop-profit/", "Crop Profit Guide"),
        ("fields-mistria/crafting/", "Crafting Guide"),
    ],
    "fields-mistria/animals/": [
        ("fields-mistria/crop-profit/", "Crop Profit Guide"),
        ("fields-mistria/artisan-and-endgame/", "Artisan & Endgame Guide"),
        ("fields-mistria/housing/", "Housing Guide"),
    ],
    "fields-mistria/festivals/": [
        ("fields-mistria/gift-guide/", "Gift Guide"),
        ("fields-mistria/seasonal-strategy/", "Seasonal Crop Strategy"),
        ("fields-mistria/getting-started/", "Getting Started Guide"),
    ],
    "fields-mistria/crafting/": [
        ("fields-mistria/mining/", "Mining & Combat Guide"),
        ("fields-mistria/cooking/", "Cooking Guide"),
        ("fields-mistria/artisan-and-endgame/", "Artisan & Endgame Guide"),
    ],
    "fields-mistria/artisan-and-endgame/": [
        ("fields-mistria/crop-profit/", "Crop Profit Guide"),
        ("fields-mistria/crafting/", "Crafting Guide"),
        ("fields-mistria/mining/", "Mining & Combat Guide"),
    ],
    "fields-mistria/housing/": [
        ("fields-mistria/animals/", "Animals Guide"),
        ("fields-mistria/museum/", "Museum Guide"),
        ("fields-mistria/festivals/", "Festivals Guide"),
    ],
    "fields-mistria/museum/": [
        ("fields-mistria/getting-started/", "Getting Started Guide"),
        ("fields-mistria/mining/", "Mining & Combat Guide"),
        ("fields-mistria/festivals/", "Festivals Guide"),
    ],

    # ─── Sandrock ───
    "sandrock/": [
        ("sandrock/getting-started/", "Getting Started Guide"),
        ("sandrock/resources/", "Resources Guide"),
        ("sandrock/crops/", "Crops Guide"),
    ],
    "sandrock/getting-started/": [
        ("sandrock/resources/", "Resources Guide"),
        ("sandrock/workshop-optimization/", "Workshop Optimization Guide"),
        ("sandrock/crops/", "Crops Guide"),
    ],
    "sandrock/resources/": [
        ("sandrock/getting-started/", "Getting Started Guide"),
        ("sandrock/combat/", "Ruins & Combat Guide"),
        ("sandrock/workshop-optimization/", "Workshop Optimization Guide"),
    ],
    "sandrock/gift-guide/": [
        ("sandrock/festivals/", "Festivals Guide"),
        ("sandrock/animals/", "Animals & Mounts Guide"),
        ("sandrock/cooking/", "Cooking Guide"),
    ],
    "sandrock/crops/": [
        ("sandrock/seasonal-guide/", "Seasonal Guide"),
        ("sandrock/artisan/", "Artisan Processing Guide"),
        ("sandrock/getting-started/", "Getting Started Guide"),
    ],
    "sandrock/fishing/": [
        ("sandrock/cooking/", "Cooking Guide"),
        ("sandrock/getting-started/", "Getting Started Guide"),
        ("sandrock/resources/", "Resources Guide"),
    ],
    "sandrock/combat/": [
        ("sandrock/resources/", "Resources Guide"),
        ("sandrock/workshop-optimization/", "Workshop Optimization Guide"),
        ("sandrock/getting-started/", "Getting Started Guide"),
    ],
    "sandrock/workshop-optimization/": [
        ("sandrock/resources/", "Resources Guide"),
        ("sandrock/artisan/", "Artisan Processing Guide"),
        ("sandrock/getting-started/", "Getting Started Guide"),
    ],
    "sandrock/cooking/": [
        ("sandrock/fishing/", "Fishing Guide"),
        ("sandrock/gift-guide/", "Gift Guide"),
        ("sandrock/festivals/", "Festivals Guide"),
    ],
    "sandrock/animals/": [
        ("sandrock/crops/", "Crops Guide"),
        ("sandrock/housing/", "Housing Guide"),
        ("sandrock/artisan/", "Artisan Processing Guide"),
    ],
    "sandrock/housing/": [
        ("sandrock/animals/", "Animals & Mounts Guide"),
        ("sandrock/getting-started/", "Getting Started Guide"),
        ("sandrock/workshop-optimization/", "Workshop Optimization Guide"),
    ],
    "sandrock/festivals/": [
        ("sandrock/gift-guide/", "Gift Guide"),
        ("sandrock/seasonal-guide/", "Seasonal Guide"),
        ("sandrock/cooking/", "Cooking Guide"),
    ],
    "sandrock/artisan/": [
        ("sandrock/crops/", "Crops Guide"),
        ("sandrock/workshop-optimization/", "Workshop Optimization Guide"),
        ("sandrock/seasonal-guide/", "Seasonal Guide"),
    ],
    "sandrock/seasonal-guide/": [
        ("sandrock/crops/", "Crops Guide"),
        ("sandrock/festivals/", "Festivals Guide"),
        ("sandrock/artisan/", "Artisan Processing Guide"),
    ],

    # ─── Sun Haven ───
    "sun-haven/": [
        ("sun-haven/getting-started/", "Getting Started Guide"),
        ("sun-haven/crop-profit/", "Crop Profit Guide"),
        ("sun-haven/zones-guide/", "Zones & Map Guide"),
    ],
    "sun-haven/getting-started/": [
        ("sun-haven/crop-profit/", "Crop Profit Guide"),
        ("sun-haven/farming-deep-dive/", "Farming Deep Dive"),
        ("sun-haven/zones-guide/", "Zones & Map Guide"),
    ],
    "sun-haven/crop-profit/": [
        ("sun-haven/farming-deep-dive/", "Farming Deep Dive"),
        ("sun-haven/seasonal-strategy/", "Seasonal Strategy Guide"),
        ("tools/sun-haven-crop-database/", "Crop Database (All Biomes)"),
    ],
    "sun-haven/farming-deep-dive/": [
        ("sun-haven/crop-profit/", "Crop Profit Guide"),
        ("sun-haven/seasonal-strategy/", "Seasonal Strategy Guide"),
        ("sun-haven/animals/", "Animals Guide"),
    ],
    "sun-haven/combat/": [
        ("sun-haven/zones-guide/", "Zones & Map Guide"),
        ("sun-haven/getting-started/", "Getting Started Guide"),
        ("sun-haven/endgame-guide/", "Endgame Guide"),
    ],
    "sun-haven/fishing/": [
        ("sun-haven/cooking/", "Cooking Guide"),
        ("sun-haven/getting-started/", "Getting Started Guide"),
        ("sun-haven/zones-guide/", "Zones & Map Guide"),
    ],
    "sun-haven/animals/": [
        ("sun-haven/farming-deep-dive/", "Farming Deep Dive"),
        ("sun-haven/housing/", "Housing & Decorating Guide"),
        ("sun-haven/crafting/", "Crafting & Artisan Guide"),
    ],
    "sun-haven/festivals/": [
        ("sun-haven/npc-gifts/", "NPC Gifts Guide"),
        ("sun-haven/seasonal-strategy/", "Seasonal Strategy Guide"),
        ("sun-haven/getting-started/", "Getting Started Guide"),
    ],
    "sun-haven/npc-gifts/": [
        ("sun-haven/festivals/", "Festivals Guide"),
        ("sun-haven/cooking/", "Cooking Guide"),
        ("sun-haven/getting-started/", "Getting Started Guide"),
    ],
    "sun-haven/crafting/": [
        ("sun-haven/animals/", "Animals Guide"),
        ("sun-haven/housing/", "Housing & Decorating Guide"),
        ("sun-haven/endgame-guide/", "Endgame Guide"),
    ],
    "sun-haven/housing/": [
        ("sun-haven/animals/", "Animals Guide"),
        ("sun-haven/crafting/", "Crafting & Artisan Guide"),
        ("sun-haven/getting-started/", "Getting Started Guide"),
    ],
    "sun-haven/cooking/": [
        ("sun-haven/fishing/", "Fishing Guide"),
        ("sun-haven/crop-profit/", "Crop Profit Guide"),
        ("sun-haven/npc-gifts/", "NPC Gifts Guide"),
    ],
    "sun-haven/zones-guide/": [
        ("sun-haven/combat/", "Combat & Magic Guide"),
        ("sun-haven/getting-started/", "Getting Started Guide"),
        ("sun-haven/endgame-guide/", "Endgame Guide"),
    ],
    "sun-haven/endgame-guide/": [
        ("sun-haven/combat/", "Combat & Magic Guide"),
        ("sun-haven/crafting/", "Crafting & Artisan Guide"),
        ("sun-haven/zones-guide/", "Zones & Map Guide"),
    ],
    "sun-haven/seasonal-strategy/": [
        ("sun-haven/crop-profit/", "Crop Profit Guide"),
        ("sun-haven/farming-deep-dive/", "Farming Deep Dive"),
        ("sun-haven/festivals/", "Festivals Guide"),
    ],

    # ─── Core Keeper ───
    "core-keeper/": [
        ("core-keeper/getting-started/", "Getting Started Guide"),
        ("core-keeper/crops/", "Crop & Farming Guide"),
        ("core-keeper/boss-guide/", "Boss Progression Guide"),
    ],
    "core-keeper/getting-started/": [
        ("core-keeper/crops/", "Crop & Farming Guide"),
        ("core-keeper/mining-automation/", "Mining & Automation Guide"),
        ("core-keeper/boss-guide/", "Boss Progression Guide"),
    ],
    "core-keeper/crops/": [
        ("core-keeper/mining-automation/", "Mining & Automation Guide"),
        ("core-keeper/cooking-guide/", "Cooking Guide"),
        ("core-keeper/getting-started/", "Getting Started Guide"),
    ],
    "core-keeper/mining-automation/": [
        ("core-keeper/crops/", "Crop & Farming Guide"),
        ("core-keeper/boss-guide/", "Boss Progression Guide"),
        ("core-keeper/getting-started/", "Getting Started Guide"),
    ],
    "core-keeper/fishing-guide/": [
        ("core-keeper/cooking-guide/", "Cooking Guide"),
        ("core-keeper/getting-started/", "Getting Started Guide"),
        ("tools/core-keeper-fish-profit/", "Fish Profit Calculator"),
    ],
    "core-keeper/cooking-guide/": [
        ("core-keeper/fishing-guide/", "Fishing Guide"),
        ("core-keeper/crops/", "Crop & Farming Guide"),
        ("core-keeper/getting-started/", "Getting Started Guide"),
    ],
    "core-keeper/boss-guide/": [
        ("core-keeper/mining-automation/", "Mining & Automation Guide"),
        ("core-keeper/getting-started/", "Getting Started Guide"),
        ("core-keeper/crops/", "Crop & Farming Guide"),
    ],

    # ─── Palworld ───
    "palworld/": [
        ("palworld/getting-started/", "Getting Started Guide"),
        ("palworld/work-suitability/", "Work Suitability Guide"),
        ("palworld/pal-database/", "Pal Database"),
    ],
    "palworld/getting-started/": [
        ("palworld/work-suitability/", "Work Suitability Guide"),
        ("palworld/base-building-defense/", "Base Building & Defense Guide"),
        ("palworld/pal-database/", "Pal Database"),
    ],
    "palworld/work-suitability/": [
        ("palworld/pal-database/", "Pal Database"),
        ("palworld/breeding-tool/", "Breeding Calculator"),
        ("palworld/base-building-defense/", "Base Building & Defense Guide"),
    ],
    "palworld/base-building-defense/": [
        ("palworld/getting-started/", "Getting Started Guide"),
        ("palworld/work-suitability/", "Work Suitability Guide"),
        ("palworld/breeding-tool/", "Breeding Calculator"),
    ],
    "palworld/breeding-tool/": [
        ("palworld/pal-database/", "Pal Database"),
        ("palworld/work-suitability/", "Work Suitability Guide"),
        ("palworld/getting-started/", "Getting Started Guide"),
    ],
    "palworld/pal-database/": [
        ("palworld/work-suitability/", "Work Suitability Guide"),
        ("palworld/breeding-tool/", "Breeding Calculator"),
        ("palworld/getting-started/", "Getting Started Guide"),
    ],

    # ─── Don't Starve Together ───
    "dst/": [
        ("dst/farming-guide/", "Farming Guide"),
        ("dst/seasons-guide/", "Seasons & Survival Guide"),
        ("dst/characters/", "Characters Guide"),
    ],
    "dst/farming-guide/": [
        ("dst/seasons-guide/", "Seasons & Survival Guide"),
        ("dst/bosses/", "Bosses & Giants Guide"),
        ("dst/characters/", "Characters Guide"),
    ],
    "dst/characters/": [
        ("dst/seasons-guide/", "Seasons & Survival Guide"),
        ("dst/farming-guide/", "Farming Guide"),
        ("dst/bosses/", "Bosses & Giants Guide"),
    ],
    "dst/seasons-guide/": [
        ("dst/farming-guide/", "Farming Guide"),
        ("dst/bosses/", "Bosses & Giants Guide"),
        ("dst/characters/", "Characters Guide"),
    ],
    "dst/bosses/": [
        ("dst/seasons-guide/", "Seasons & Survival Guide"),
        ("dst/farming-guide/", "Farming Guide"),
        ("dst/characters/", "Characters Guide"),
    ],

    # ─── Tools ───
    "tools/": [
        ("tools/profit-calculator/", "Profit Calculator"),
        ("tools/bundle-tracker/", "Bundle Tracker"),
        ("tools/interactive-map/", "Interactive Map"),
    ],
    "tools/profit-calculator/": [
        ("tools/crop-profit-comparison/", "Crop Profit Comparison"),
        ("tools/animal-profit-comparison/", "Animal Profit Comparison"),
        ("stardew/profit-calc/", "Stardew Profit Calculator"),
    ],
    "tools/mods/": [
        ("tools/saves/", "Saves Guide"),
        ("stardew/index/", "Stardew Valley Complete Guide"),
        ("tools/game-comparison/", "Game Comparison"),
    ],
    "tools/saves/": [
        ("tools/mods/", "Mods Guide"),
        ("tools/index/", "All Tools Index"),
        ("tools/game-comparison/", "Game Comparison"),
    ],
    "tools/game-comparison/": [
        ("tools/release-calendar/", "Release Calendar"),
        ("tools/index/", "All Tools Index"),
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
    ],
    "tools/release-calendar/": [
        ("tools/game-comparison/", "Game Comparison"),
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
        ("tools/index/", "All Tools Index"),
    ],
    "tools/coral-island/crop-profit-calculator/": [
        ("coral-island/crop-profit/", "Coral Island Crop Profit Guide"),
        ("coral-island/crops/", "Coral Island Crops Guide"),
        ("tools/profit-calculator/", "Profit Calculator"),
    ],
    "tools/core-keeper-fish-profit/": [
        ("core-keeper/fishing-guide/", "Core Keeper Fishing Guide"),
        ("core-keeper/cooking-guide/", "Core Keeper Cooking Guide"),
        ("tools/profit-calculator/", "Profit Calculator"),
    ],
    "tools/dst/crock-pot-recipe-finder/": [
        ("dst/farming-guide/", "DST Farming Guide"),
        ("dst/characters/", "DST Characters Guide"),
        ("dst/seasons-guide/", "DST Seasons & Survival Guide"),
    ],
    "tools/fields-mistria-npc-gift-database/": [
        ("fields-mistria/gift-guide/", "Fields of Mistria Gift Guide"),
        ("fields-mistria/festivals/", "Fields of Mistria Festivals"),
        ("fields-mistria/getting-started/", "Fields of Mistria Getting Started"),
    ],
    "tools/sun-haven-crop-database/": [
        ("sun-haven/crop-profit/", "Sun Haven Crop Profit Guide"),
        ("sun-haven/farming-deep-dive/", "Sun Haven Farming Deep Dive"),
        ("sun-haven/seasonal-strategy/", "Sun Haven Seasonal Strategy"),
    ],
    "tools/crop-profit-comparison/": [
        ("tools/profit-calculator/", "Profit Calculator"),
        ("tools/animal-profit-comparison/", "Animal Profit Comparison"),
        ("stardew/profit-calc/", "Stardew Profit Calculator"),
    ],
    "tools/animal-profit-comparison/": [
        ("tools/crop-profit-comparison/", "Crop Profit Comparison"),
        ("tools/profit-calculator/", "Profit Calculator"),
        ("farmingsim/animals/", "FS25 Animals Guide"),
    ],

    # ─── Guides ───
    "guides/": [
        ("guides/newbie/", "New Player Starter Guide"),
        ("guides/stardew-valley-beginners-guide/", "Stardew Valley Beginner Guide"),
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
    ],
    "guides/newbie/": [
        ("guides/stardew-valley-beginners-guide/", "Stardew Valley Beginner Guide"),
        ("stardew/year-1-guide/", "Stardew Year 1 Complete Guide"),
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
    ],
    "guides/stardew-valley-beginners-guide/": [
        ("guides/newbie/", "New Player Starter Guide"),
        ("stardew/spring-guide/", "Stardew Spring Detailed Guide"),
        ("stardew/crops/", "Stardew Crop Profit Guide"),
    ],
    "guides/best-farming-games-2026/": [
        ("tools/game-comparison/", "Game Comparison Tool"),
        ("tools/release-calendar/", "Release Calendar"),
        ("guides/newbie/", "New Player Starter Guide"),
    ],
    "guides/best-gaming-gear/": [
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
        ("tools/mods/", "Mods Guide"),
        ("tools/index/", "All Tools & Resources"),
    ],
    "guides/stardew-valley-2026-beginners-guide/": [
        ("guides/stardew-valley-beginners-guide/", "Stardew Valley Beginner Guide"),
        ("stardew/year-1-guide/", "Stardew Year 1 Complete Guide"),
        ("stardew/crops/", "Stardew Crop Profit Guide"),
    ],
    "guides/sunflower-land-saltwort-crop-week/": [
        ("guides/index/", "All Guides"),
        ("tools/game-comparison/", "Game Comparison Tool"),
        ("tools/release-calendar/", "Release Calendar"),
    ],

    # Chinese-language guides → Stardew section
    "guides/成功培育必爆钻石的白色史莱姆/": [
        ("stardew/animals/", "动物养殖利润分析"),
        ("stardew/1.6-update-guide/", "1.6 更新指南"),
        ("stardew/index/", "星露谷物语攻略汇总"),
    ],
    "guides/12月份人气最高的五个modn网/": [
        ("guides/星露谷物语5个极其伟大mod/", "5 个极其伟大 Mod"),
        ("tools/mods/", "Mods 指南"),
        ("stardew/index/", "星露谷物语攻略汇总"),
    ],
    "guides/星露谷物语5个极其伟大mod/": [
        ("guides/12月份人气最高的五个modn网/", "12 月人气最高的五个 Mod"),
        ("tools/mods/", "Mods 指南"),
        ("stardew/index/", "星露谷物语攻略汇总"),
    ],
    "guides/星露谷物语-自动抚摸机/": [
        ("stardew/animals/", "动物养殖利润分析"),
        ("stardew/1.6-update-guide/", "1.6 更新指南"),
        ("stardew/farm-layout/", "农场布局与自动化"),
    ],
    "guides/星露谷物语新手所应了解并避免的事项/": [
        ("guides/stardew-valley-beginners-guide/", "Stardew Valley Beginner Guide"),
        ("guides/星露谷物语新手攻略最好的农作物上古果/", "最好的农作物·上古果"),
        ("stardew/year-1-guide/", "星露谷第一年完整指南"),
    ],
    "guides/星露谷物语新手攻略最好的农作物上古果/": [
        ("stardew/ancient-fruit-empire/", "上古果帝国指南"),
        ("stardew/crops/", "农作物利润完整指南"),
        ("stardew/greenhouse-crops/", "温室作物策略"),
    ],

    # ─── Database / Codes / News ───
    "database/games/": [
        ("tools/game-comparison/", "Game Comparison Tool"),
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
        ("tools/release-calendar/", "Release Calendar"),
    ],
    "codes/": [
        ("palia/redeem-codes/", "Palia Redeem Codes"),
        ("tools/mods/", "Mods Guide"),
        ("tools/index/", "All Tools & Resources"),
    ],
    "news/": [
        ("guides/index/", "Latest Guides"),
        ("tools/release-calendar/", "Release Calendar"),
        ("guides/best-farming-games-2026/", "Best Farming Games 2026"),
    ],

    # ─── About pages ───
    "about/": [
        ("tools/index/", "Interactive Tools"),
        ("guides/index/", "Latest Guides"),
        ("privacy-policy/", "Privacy Policy"),
    ],
    "privacy-policy/": [
        ("affiliate-disclosure/", "Affiliate Disclosure"),
        ("about/", "About Farming Games Help"),
        ("tools/index/", "Interactive Tools"),
    ],
    "affiliate-disclosure/": [
        ("privacy-policy/", "Privacy Policy"),
        ("about/", "About Farming Games Help"),
        ("guides/best-gaming-gear/", "Best Gaming Gear"),
    ],
}


def on_post_page_macros(env):
    """Append Related Guides section to every page's markdown content.
    Runs after all macros are expanded but before Markdown → HTML rendering.
    """
    page = env.page
    # page.url may be URL-encoded (e.g. Chinese filenames), decode to match dict keys
    raw_path = unquote(page.url).rstrip("/")
    if not raw_path:
        raw_path = unquote(page.url)

    guides = (RELATED_GUIDES.get(raw_path)
              or RELATED_GUIDES.get(raw_path + "/"))
    if not guides:
        return

    # URL-encode hrefs for generated links (browsers need encoded paths)
    def link_href(path):
        parts = path.split("/")
        return "/".join(quote(p) for p in parts)

    links_html = "\n".join(
        f'- <a href="/{link_href(href)}">{text}</a>'
        for href, text in guides
    )

    related = f"""
---

## 📖 Related Guides

{links_html}
"""
    env.markdown = env.markdown + related


def define_env(env):
    """Define template variables and functions for MkDocs macros plugin."""

    # ── Tier Ranking Helpers ──

    @env.macro
    def tier_badge(tier):
        """Render a tier ranking badge (S/A/B/C/D/F)."""
        colors = {
            "S": "#FF4444", "A": "#FF8C00", "B": "#FFD700",
            "C": "#44AA44", "D": "#4488FF", "F": "#888888"
        }
        color = colors.get(tier.upper(), "#888")
        return f'<span style="display:inline-block;padding:2px 8px;border-radius:4px;background:{color};color:#fff;font-weight:bold;font-size:0.85em">{tier.upper()}</span>'

    @env.macro
    def stat_bar(value, max_val=100, color="#4CAF50"):
        """Render a horizontal stat bar."""
        pct = min(100, int(value / max_val * 100))
        return (
            f'<div style="background:#333;border-radius:4px;overflow:hidden;height:20px;min-width:120px">'
            f'<div style="width:{pct}%;background:{color};height:100%;display:flex;align-items:center;padding-left:6px;font-size:0.75em;color:#fff;font-weight:bold">{value}</div>'
            f'</div>'
        )

    @env.macro
    def star_rating(rating):
        """Render star rating (0-5)."""
        full = "★" * int(rating)
        half = "½" if rating - int(rating) >= 0.5 else ""
        empty = "☆" * max(0, 5 - int(rating) - (1 if half else 0))
        return f'<span style="color:#FFD700;font-size:1.1em">{full}{half}{empty}</span>'

    @env.macro
    def profit_table(items, title="Profit Comparison"):
        """Generate a styled profit comparison table from a list of dicts.
        Each item should have: name, seed_cost, grow_days, regrow, sell_price, profit_per_day, notes
        """
        if not items:
            return "<p>No data available</p>"

        rows = ""
        best = max(float(i.get("profit_per_day", 0)) for i in items)

        for item in sorted(items, key=lambda x: float(x.get("profit_per_day", 0)), reverse=True):
            p = float(item.get("profit_per_day", 0))
            bar_pct = min(100, int(p / best * 100)) if best > 0 else 0
            is_best = p >= best and best > 0
            row_class = 'style="background:rgba(76,175,80,0.15)"' if is_best else ""

            rows += f"""<tr {row_class}>
                <td><strong>{item.get("name", "")}</strong></td>
                <td>{item.get("seed_cost", "-")}g</td>
                <td>{item.get("grow_days", "-")}d</td>
                <td>{item.get("regrow", "No")}</td>
                <td>{item.get("sell_price", "-")}g</td>
                <td><div style="display:flex;align-items:center;gap:6px"><div style="background:#333;border-radius:3px;overflow:hidden;height:16px;width:80px"><div style="width:{bar_pct}%;background:{'#FFD700' if is_best else '#4CAF50'};height:100%"></div></div><strong>{p}g</strong></div></td>
                <td>{item.get("notes", "")}</td>
            </tr>"""

        return f"""<table class="datatable" style="width:100%">
            <thead><tr>
                <th>Crop</th><th>Seed Cost</th><th>Grow Days</th><th>Regrow</th><th>Sell Price</th><th>Profit/Day</th><th>Notes</th>
            </tr></thead>
            <tbody>{rows}</tbody>
        </table>"""

    @env.macro
    def affiliate_button(store, game, url, price=""):
        """Generate an affiliate purchase button."""
        store_icons = {
            "steam": "🎮 Steam",
            "humble": "📦 Humble Bundle",
            "amazon": "📦 Amazon",
            "gog": "🟡 GOG",
            "epic": "⭐ Epic Games"
        }
        label = store_icons.get(store.lower(), store)
        price_text = f" - {price}" if price else ""
        return (
            f'<a href="{url}" target="_blank" rel="nofollow sponsored" '
            f'style="display:inline-block;padding:8px 16px;margin:4px;background:#2e7d32;color:#fff;'
            f'border-radius:8px;text-decoration:none;font-size:0.9em">'
            f'{label}{price_text} 🛒</a>'
        )

    @env.macro
    def tier_table(items, title="Tier Ranking"):
        """Generate a tier ranking table from a list of dicts.
        Each item: name, tier, description, icon
        """
        if not items:
            return "<p>No data available</p>"

        tier_order = {"S": 0, "A": 1, "B": 2, "C": 3, "D": 4, "F": 5}
        rows = ""
        for item in sorted(items, key=lambda x: tier_order.get(x.get("tier", "F").upper(), 9)):
            t = item.get("tier", "?").upper()
            rows += f"""<tr>
                <td>{tier_badge(t)}</td>
                <td><strong>{item.get("icon", "")} {item.get("name", "")}</strong></td>
                <td>{item.get("description", "")}</td>
            </tr>"""

        return f"""<table class="datatable" style="width:100%">
            <thead><tr><th>Tier</th><th>Name</th><th>Description</th></tr></thead>
            <tbody>{rows}</tbody>
        </table>"""

    @env.macro
    def affiliate_section(game_name, steam_id="", humble_url=""):
        """Standard affiliate section for bottom of guides."""
        html = '\n---\n\n### 🛒 Where to Buy\n\n'
        if steam_id:
            html += affiliate_button("steam", game_name, f"https://store.steampowered.com/app/{steam_id}/") + "\n"
        if humble_url:
            html += affiliate_button("humble", game_name, humble_url) + "\n"
        html += '\n\n*Disclosure: Affiliate links. We may earn a small commission at no extra cost to you.*\n'
        return html
