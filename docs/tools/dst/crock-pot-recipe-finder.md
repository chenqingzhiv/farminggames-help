---
title: "Don't Starve Together — Crock Pot Recipe Finder"
description: "Interactive Don't Starve Together Crock Pot recipe finder. Select ingredients to discover what dishes you can cook. Sortable, filterable recipe database."
date: 2026-07-13
---

# 🍲 DST Crock Pot Recipe Finder

> Select ingredients from your inventory and find every dish you can cook in the Crock Pot. Sortable, searchable, and filtered by what you actually have.

<div id="crock-pot-app" class="cp-app">
  <div class="cp-loading">Loading recipe database...</div>
</div>

<style>
/* ── DST Crock Pot Recipe Finder — Embedded Dark Tool Theme ── */
:root {
  --cp-bg: #1a1a23;
  --cp-card: #24242b;
  --cp-border: #35353e;
  --cp-text: #e8e6e1;
  --cp-text2: #9b9a95;
  --cp-text3: #6b6a75;
  --cp-accent: #c9a96e;
  --cp-accent-hover: #d9b97e;
  --cp-green: #4ade80;
  --cp-green-bg: rgba(74,222,128,0.12);
  --cp-red: #f87171;
  --cp-red-bg: rgba(248,113,113,0.12);
  --cp-amber: #fbbf24;
  --cp-amber-bg: rgba(251,191,36,0.12);
  --cp-blue: #60a5fa;
  --cp-blue-bg: rgba(96,165,250,0.12);
  --cp-purple: #a78bfa;
}

.cp-app {
  background: var(--cp-bg);
  border: 1px solid var(--cp-border);
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  color: var(--cp-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.cp-loading, .cp-error {
  text-align: center;
  padding: 40px;
  color: var(--cp-text2);
}
.cp-error { color: var(--cp-red); }

/* ── Controls Bar ── */
.cp-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

.cp-search-wrapper {
  flex: 1;
  min-width: 200px;
  position: relative;
}
.cp-search-wrapper::before {
  content: '🔍';
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  opacity: 0.5;
}
.cp-search {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border-radius: 8px;
  border: 1px solid var(--cp-border);
  background: var(--cp-card);
  color: var(--cp-text);
  font-size: 0.9em;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.cp-search:focus {
  border-color: var(--cp-accent);
}
.cp-search::placeholder { color: var(--cp-text3); }

.cp-cook-btn {
  padding: 10px 24px;
  background: var(--cp-accent);
  color: #1a1a23;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95em;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-family: inherit;
}
.cp-cook-btn:hover {
  background: var(--cp-accent-hover);
  transform: translateY(-1px);
}
.cp-cook-btn:active {
  transform: translateY(0);
}
.cp-cook-btn.cp-active {
  box-shadow: 0 0 0 2px var(--cp-accent), 0 0 0 4px rgba(201,169,110,0.3);
}

.cp-reset-btn {
  padding: 10px 18px;
  background: transparent;
  color: var(--cp-text2);
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-family: inherit;
}
.cp-reset-btn:hover {
  background: var(--cp-card);
  color: var(--cp-text);
  border-color: var(--cp-text3);
}

/* ── Stats Bar ── */
.cp-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: var(--cp-card);
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  font-size: 0.85em;
  color: var(--cp-text2);
}
.cp-stat-item { display: flex; align-items: center; gap: 6px; }
.cp-stat-num {
  font-weight: 700;
  color: var(--cp-text);
}
.cp-stat-found { color: var(--cp-green); font-weight: 700; }

/* ── Ingredient Selector ── */
.cp-ingredients-section {
  margin-bottom: 20px;
}
.cp-ingredients-title {
  font-size: 0.9em;
  font-weight: 600;
  color: var(--cp-text2);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cp-ingredients-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cp-ingredient-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--cp-card);
  border: 1px solid var(--cp-border);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.82em;
  color: var(--cp-text2);
  user-select: none;
}
.cp-ingredient-tag:hover {
  border-color: var(--cp-text3);
  color: var(--cp-text);
}
.cp-ingredient-tag.cp-selected {
  background: var(--cp-accent);
  border-color: var(--cp-accent);
  color: #1a1a23;
  font-weight: 600;
}
.cp-ingredient-tag .cp-ing-icon {
  font-size: 1.1em;
}
.cp-ing-badge {
  display: inline-block;
  background: var(--cp-border);
  color: var(--cp-text3);
  font-size: 0.7em;
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 500;
}
.cp-ingredient-tag.cp-selected .cp-ing-badge {
  background: rgba(26,26,35,0.2);
  color: #1a1a23;
}

/* ── Sort Controls ── */
.cp-sort-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
}
.cp-sort-label {
  font-size: 0.8em;
  color: var(--cp-text3);
  font-weight: 500;
  margin-right: 4px;
}
.cp-sort-btn {
  padding: 5px 12px;
  background: var(--cp-card);
  border: 1px solid var(--cp-border);
  border-radius: 6px;
  color: var(--cp-text2);
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.cp-sort-btn:hover {
  border-color: var(--cp-text3);
  color: var(--cp-text);
}
.cp-sort-btn.cp-sort-active {
  background: var(--cp-accent);
  border-color: var(--cp-accent);
  color: #1a1a23;
  font-weight: 600;
}
.cp-sort-dir {
  font-size: 0.7em;
  margin-left: 2px;
}

/* ── Recipe Table ── */
.cp-table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--cp-border);
}
.cp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85em;
  min-width: 650px;
}
.cp-table thead {
  position: sticky;
  top: 0;
  z-index: 2;
}
.cp-table th {
  background: var(--cp-card);
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: var(--cp-text2);
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--cp-border);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
}
.cp-table th:hover {
  color: var(--cp-text);
}
.cp-table th .cp-sort-indicator {
  display: inline-block;
  margin-left: 4px;
  opacity: 0.3;
}
.cp-table th.cp-sort-active .cp-sort-indicator {
  opacity: 1;
  color: var(--cp-accent);
}
.cp-table tr {
  transition: background 0.15s;
}
.cp-table tbody tr:hover {
  background: rgba(255,255,255,0.03);
}
.cp-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--cp-border);
  vertical-align: middle;
}
.cp-table tr:last-child td {
  border-bottom: none;
}

/* Recipe name + icon */
.cp-rec-name {
  font-weight: 600;
  color: var(--cp-text);
  display: flex;
  align-items: center;
  gap: 8px;
}
.cp-rec-icon { font-size: 1.2em; }

/* Recipe description tooltip row */
.cp-rec-desc {
  font-size: 0.8em;
  color: var(--cp-text3);
  font-style: italic;
  margin-top: 2px;
}
.cp-rec-ingredients {
  font-size: 0.78em;
  color: var(--cp-text3);
  white-space: nowrap;
}

/* Stat cells — color coded */
.cp-stat-val { font-weight: 600; font-variant-numeric: tabular-nums; }
.cp-stat-good { color: var(--cp-green); }
.cp-stat-bad { color: var(--cp-red); }
.cp-stat-neutral { color: var(--cp-text2); }
.cp-stat-verygood { color: var(--cp-green); font-weight: 700; }
.cp-stat-verybad { color: var(--cp-red); font-weight: 700; }

/* Tags */
.cp-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 500;
}
.cp-tag-meat { background: var(--cp-red-bg); color: var(--cp-red); }
.cp-tag-veg { background: var(--cp-green-bg); color: var(--cp-green); }
.cp-tag-dessert { background: var(--cp-amber-bg); color: var(--cp-amber); }
.cp-tag-drink { background: var(--cp-blue-bg); color: var(--cp-blue); }
.cp-tag-monster { background: rgba(167,139,250,0.12); color: var(--cp-purple); }
.cp-tag-fish { background: rgba(96,165,250,0.15); color: var(--cp-blue); }

/* Match highlight */
.cp-row-match {
  border-left: 3px solid var(--cp-accent);
}
.cp-row-match td:first-child {
  padding-left: 9px;
}
.cp-match-badge {
  display: inline-block;
  background: var(--cp-accent);
  color: #1a1a23;
  font-size: 0.65em;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* No results */
.cp-no-results {
  text-align: center;
  padding: 40px 20px;
  color: var(--cp-text3);
}
.cp-no-results .cp-nr-icon { font-size: 2.5em; margin-bottom: 12px; }
.cp-no-results .cp-nr-text { font-size: 1.1em; margin-bottom: 6px; }
.cp-no-results .cp-nr-hint { font-size: 0.85em; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .cp-app { padding: 16px; }
  .cp-controls { flex-direction: column; }
  .cp-search-wrapper { min-width: 100%; }
  .cp-cook-btn, .cp-reset-btn { width: 100%; text-align: center; }
  .cp-ingredients-grid { gap: 6px; }
  .cp-ingredient-tag { padding: 5px 10px; font-size: 0.78em; }
  .cp-table { font-size: 0.78em; min-width: 500px; }
  .cp-table th, .cp-table td { padding: 7px 8px; }
  .cp-stats { gap: 10px; font-size: 0.8em; padding: 10px 12px; }
  .cp-sort-bar { gap: 4px; }
  .cp-sort-btn { padding: 4px 8px; font-size: 0.75em; }
}

@media (max-width: 480px) {
  .cp-app { padding: 12px; border-radius: 8px; }
  .cp-table { min-width: 400px; font-size: 0.72em; }
  .cp-table th, .cp-table td { padding: 5px 6px; }
  .cp-rec-ingredients { display: none; }
}
</style>

<script>
(function() {
  'use strict';

  // ── Recipe Database (accurate DST data) ──
  const RECIPES = [
    {
      id: 'meatballs',
      name: 'Meatballs',
      icon: '🍖',
      desc: 'A plate of meatballs!',
      category: 'meat',
      hp: 3, hunger: 62.5, sanity: 5,
      cookTime: 15,
      ingredients: ['Meat', 'Filler', 'Filler', 'Filler'],
      ingredientTags: ['meat', 'filler', 'filler', 'filler'],
      spoilTime: 15
    },
    {
      id: 'bacon-eggs',
      name: 'Bacon and Eggs',
      icon: '🥓',
      desc: 'Bacon and eggs.',
      category: 'meat',
      hp: 20, hunger: 75, sanity: 5,
      cookTime: 40,
      ingredients: ['Meat', 'Egg', 'Egg', 'Filler'],
      ingredientTags: ['meat', 'egg', 'egg', 'filler'],
      spoilTime: 20
    },
    {
      id: 'honey-ham',
      name: 'Honey Ham',
      icon: '🍯',
      desc: 'A great source of honey and meat together.',
      category: 'meat',
      hp: 30, hunger: 75, sanity: 5,
      cookTime: 40,
      ingredients: ['Meat', 'Honey', '≥2 Honey Value'],
      ingredientTags: ['meat', 'honey', 'honey_value'],
      spoilTime: 40,
      note: '≥ 1 Honey, rest fillers with ≥ 2 honey value total'
    },
    {
      id: 'meat-stew',
      name: 'Meat Stew',
      icon: '🍲',
      desc: "It's a stew.",
      category: 'meat',
      hp: 12, hunger: 150, sanity: 5,
      cookTime: 20,
      ingredients: ['Meat', 'Meat', 'Meat', 'Filler'],
      ingredientTags: ['meat', 'meat', 'meat', 'filler'],
      spoilTime: 15
    },
    {
      id: 'turkey-dinner',
      name: 'Turkey Dinner',
      icon: '🦃',
      desc: 'Turkey dinner!',
      category: 'meat',
      hp: 20, hunger: 75, sanity: 5,
      cookTime: 20,
      ingredients: ['2 Meat', '2 Berry/Horn'],
      ingredientTags: ['meat_double', 'berry_horn_double'],
      spoilTime: 10
    },
    {
      id: 'pierogi',
      name: 'Pierogi',
      icon: '🥟',
      desc: "Don't ask about the name.",
      category: 'meat',
      hp: 40, hunger: 37.5, sanity: 5,
      cookTime: 20,
      ingredients: ['Meat', 'Egg', 'Veg', 'Filler'],
      ingredientTags: ['meat', 'egg', 'veg', 'filler'],
      spoilTime: 20
    },
    {
      id: 'fishsticks',
      name: 'Fishsticks',
      icon: '🐟',
      desc: 'Would you like some chips?',
      category: 'fish',
      hp: 40, hunger: 37.5, sanity: 5,
      cookTime: 40,
      ingredients: ['Fish', 'Twig', 'Filler', 'Filler'],
      ingredientTags: ['fish', 'twig', 'filler', 'filler'],
      spoilTime: 10
    },
    {
      id: 'surf-n-turf',
      name: "Surf n' Turf",
      icon: '🌊',
      desc: 'Surf and turf!',
      category: 'meat',
      hp: 60, hunger: 37.5, sanity: 33,
      cookTime: 20,
      ingredients: ['2.5 Meat Value', '1.5 Fish Value', 'Filler'],
      ingredientTags: ['meat_high', 'fish_med', 'filler'],
      spoilTime: 10
    },
    {
      id: 'ratatouille',
      name: 'Ratatouille',
      icon: '🥗',
      desc: 'A classic!',
      category: 'veg',
      hp: 20, hunger: 25, sanity: 5,
      cookTime: 20,
      ingredients: ['Veg', 'Veg', 'Veg', 'Filler'],
      ingredientTags: ['veg', 'veg', 'veg', 'filler'],
      spoilTime: 15
    },
    {
      id: 'stuffed-eggplant',
      name: 'Stuffed Eggplant',
      icon: '🍆',
      desc: 'A healthy dish for veggie lovers.',
      category: 'veg',
      hp: 3, hunger: 37.5, sanity: 5,
      cookTime: 40,
      ingredients: ['Egg', 'Eggplant', 'Filler', 'Filler'],
      ingredientTags: ['egg', 'eggplant', 'filler', 'filler'],
      spoilTime: 15
    },
    {
      id: 'fist-full-jam',
      name: 'Fist Full of Jam',
      icon: '🍓',
      desc: "It's jam.",
      category: 'veg',
      hp: 3, hunger: 37.5, sanity: 5,
      cookTime: 10,
      ingredients: ['≥2.5 Fruit', 'Filler'],
      ingredientTags: ['fruit_high', 'filler'],
      spoilTime: 15,
      note: 'Any berries / mango / durian'
    },
    {
      id: 'butter-muffin',
      name: 'Butter Muffin',
      icon: '🧁',
      desc: 'Mmm, muffin.',
      category: 'veg',
      hp: 20, hunger: 37.5, sanity: 5,
      cookTime: 40,
      ingredients: ['Butterfly Wing', 'Veg', 'Filler', 'Filler'],
      ingredientTags: ['butterfly_wing', 'veg', 'filler', 'filler'],
      spoilTime: 15
    },
    {
      id: 'pumpkin-cookies',
      name: 'Pumpkin Cookies',
      icon: '🎃',
      desc: 'Are these pumpkins cookies?',
      category: 'dessert',
      hp: 0, hunger: 37.5, sanity: 15,
      cookTime: 40,
      ingredients: ['Pumpkin', 'Honey', 'Honey', 'Twig'],
      ingredientTags: ['pumpkin', 'honey', 'honey', 'twig'],
      spoilTime: 15
    },
    {
      id: 'ice-cream',
      name: 'Ice Cream',
      icon: '🍦',
      desc: "It's soft serve!",
      category: 'dessert',
      hp: 0, hunger: 25, sanity: 50,
      cookTime: 10,
      ingredients: ['Dairy', 'Sweetener', 'Ice', 'Filler'],
      ingredientTags: ['dairy', 'sweetener', 'ice', 'filler'],
      spoilTime: 3,
      note: 'Spoils in 3 days'
    },
    {
      id: 'melonsicle',
      name: 'Melonsicle',
      icon: '🍉',
      desc: 'Cold and refreshing.',
      category: 'dessert',
      hp: 3, hunger: 12.5, sanity: 20,
      cookTime: 10,
      ingredients: ['Watermelon', 'Ice', 'Twig', 'Filler'],
      ingredientTags: ['watermelon', 'ice', 'twig', 'filler'],
      spoilTime: 3,
      note: 'Spoils in 3 days'
    },
    {
      id: 'pumpkin-bisque',
      name: 'Pumpkin Bisque',
      icon: '🥣',
      desc: 'A creamy bisque.',
      category: 'drink',
      hp: 20, hunger: 37.5, sanity: 15,
      cookTime: 10,
      ingredients: ['Pumpkin', 'Honey', 'Honey', 'Veg'],
      ingredientTags: ['pumpkin', 'honey', 'honey', 'veg'],
      spoilTime: 15
    },
    {
      id: 'hot-chili',
      name: 'Hot Chili',
      icon: '🌶️',
      desc: "It's steaming hot.",
      category: 'drink',
      hp: 20, hunger: 37.5, sanity: 5,
      cookTime: 10,
      ingredients: ['1.5 Meat', '1.5 Veg', 'Spice'],
      ingredientTags: ['meat_high', 'veg_high', 'spice'],
      spoilTime: 10
    },
    {
      id: 'monster-tartare',
      name: 'Monster Tartare',
      icon: '👹',
      desc: 'Gross.',
      category: 'monster',
      hp: 3, hunger: 62.5, sanity: -20,
      cookTime: 10,
      ingredients: ['Monster', 'Monster', 'Egg', 'Filler'],
      ingredientTags: ['monster', 'monster', 'egg', 'filler'],
      spoilTime: 10
    },
    {
      id: 'soothing-tea',
      name: 'Soothing Tea',
      icon: '🍵',
      desc: 'A soothing cup of tea.',
      category: 'monster',
      hp: 3, hunger: 12.5, sanity: 15,
      cookTime: 10,
      ingredients: ['Soothing Ingredient', 'Filler', 'Filler', 'Ice'],
      ingredientTags: ['soothing', 'filler', 'filler', 'ice'],
      spoilTime: 6,
      note: 'Uses Forgetting/Soothing Liquid'
    }
  ];

  // ── Ingredient definitions ──
  const INGREDIENT_GROUPS = {
    meats: [
      { id: 'meat', name: 'Meat', icon: '🥩', tags: ['meat', 'meat_double'], category: 'Meat' },
      { id: 'monster', name: 'Monster Meat', icon: '💀', tags: ['monster', 'meat'], category: 'Meat' },
      { id: 'fish', name: 'Fish', icon: '🐟', tags: ['fish', 'fish_med'], category: 'Meat' },
      { id: 'egg', name: 'Egg', icon: '🥚', tags: ['egg'], category: 'Meat' },
      { id: 'butterfly_wing', name: 'Butterfly Wing', icon: '🦋', tags: ['butterfly_wing', 'meat', 'meat_double'], category: 'Meat' },
    ],
    veg: [
      { id: 'veg', name: 'Vegetable', icon: '🥕', tags: ['veg', 'veg_high'], category: 'Vegetable' },
      { id: 'eggplant', name: 'Eggplant', icon: '🍆', tags: ['eggplant', 'veg'], category: 'Vegetable' },
      { id: 'pumpkin', name: 'Pumpkin', icon: '🎃', tags: ['pumpkin', 'veg'], category: 'Vegetable' },
      { id: 'watermelon', name: 'Watermelon', icon: '🍉', tags: ['watermelon', 'fruit', 'fruit_high'], category: 'Vegetable' },
    ],
    fruit: [
      { id: 'berry', name: 'Berries', icon: '🫐', tags: ['fruit', 'fruit_high', 'berry_horn_double'], category: 'Fruit' },
      { id: 'honey', name: 'Honey', icon: '🍯', tags: ['honey', 'sweetener', 'honey_value'], category: 'Fruit' },
    ],
    specialty: [
      { id: 'dairy', name: 'Dairy', icon: '🥛', tags: ['dairy'], category: 'Specialty' },
      { id: 'twig', name: 'Twig', icon: '🌿', tags: ['twig'], category: 'Specialty' },
      { id: 'ice', name: 'Ice', icon: '🧊', tags: ['ice', 'filler'], category: 'Specialty' },
      { id: 'filler', name: 'Filler (any)', icon: '📦', tags: ['filler'], category: 'Specialty' },
      { id: 'spice', name: 'Spice', icon: '🌶️', tags: ['spice'], category: 'Specialty' },
      { id: 'soothing', name: 'Soothing Liquid', icon: '💧', tags: ['soothing'], category: 'Specialty' },
    ]
  };

  // Flatten all ingredients
  const ALL_INGREDIENTS = Object.values(INGREDIENT_GROUPS).flat();

  // ── Ingredient → Recipe matching logic ──
  function recipeHasIngredient(recipe, tag) {
    return recipe.ingredientTags.includes(tag);
  }

  function canMakeRecipe(recipe, selectedTags) {
    // Make a copy of selected tags to work with
    const available = [...selectedTags];

    // For each ingredient slot in the recipe, check if we have matching ingredients
    // Simple matching: see if all required tags exist in the available set
    for (const requiredTag of recipe.ingredientTags) {
      const idx = available.indexOf(requiredTag);
      if (idx !== -1) {
        available.splice(idx, 1);
      } else {
        return false;
      }
    }
    return true;
  }

  // ── Sort recipes ──
  function sortRecipes(recipes, key, ascending) {
    return [...recipes].sort((a, b) => {
      let valA = a[key];
      let valB = b[key];
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return ascending ? -1 : 1;
      if (valA > valB) return ascending ? 1 : -1;
      return 0;
    });
  }

  // ── Reactivity ──
  let state = {
    selectedIngredients: [],
    searchQuery: '',
    showOnlyMatch: false,
    sortKey: 'name',
    sortAsc: true
  };

  function toggleIngredient(ingId) {
    const idx = state.selectedIngredients.indexOf(ingId);
    if (idx === -1) {
      state.selectedIngredients.push(ingId);
    } else {
      state.selectedIngredients.splice(idx, 1);
    }
    render();
  }

  function setSearch(val) {
    state.searchQuery = val.toLowerCase().trim();
    render();
  }

  function toggleMatchOnly() {
    state.showOnlyMatch = !state.showOnlyMatch;
    render();
  }

  function setSort(key) {
    if (state.sortKey === key) {
      state.sortAsc = !state.sortAsc;
    } else {
      state.sortKey = key;
      state.sortAsc = true;
    }
    render();
  }

  function resetAll() {
    state.selectedIngredients = [];
    state.searchQuery = '';
    state.showOnlyMatch = false;
    state.sortKey = 'name';
    state.sortAsc = true;
    document.getElementById('cp-search-input').value = '';
    render();
  }

  // ── Render UI ──
  function render() {
    const app = document.getElementById('crock-pot-app');
    if (!app) return;

    // Collect tags from selected ingredients
    const selectedTags = [];
    for (const ingId of state.selectedIngredients) {
      const ing = ALL_INGREDIENTS.find(i => i.id === ingId);
      if (ing) {
        selectedTags.push(...ing.tags);
      }
    }

    // Determine matched recipes
    const matchedRecipes = selectedTags.length > 0
      ? RECIPES.filter(r => canMakeRecipe(r, selectedTags))
      : [];

    // Filter the main display
    let displayRecipes = state.showOnlyMatch && selectedTags.length > 0
      ? matchedRecipes
      : RECIPES;

    // Apply search filter
    if (state.searchQuery) {
      displayRecipes = displayRecipes.filter(r =>
        r.name.toLowerCase().includes(state.searchQuery) ||
        r.desc.toLowerCase().includes(state.searchQuery) ||
        r.category.toLowerCase().includes(state.searchQuery) ||
        r.ingredients.some(i => i.toLowerCase().includes(state.searchQuery))
      );
    }

    // Apply sort
    displayRecipes = sortRecipes(displayRecipes, state.sortKey, state.sortAsc);

    const sortIndicator = (key) => {
      if (state.sortKey !== key) return '';
      return state.sortAsc ? ' ▲' : ' ▼';
    };

    // Build ingredient tags
    let ingredientsHTML = '';
    for (const [groupKey, groupItems] of Object.entries(INGREDIENT_GROUPS)) {
      const groupLabel = { meats: '🥩 Meat', veg: '🥕 Vegetable', fruit: '🍓 Fruit', specialty: '✨ Specialty' }[groupKey] || groupKey;
      ingredientsHTML += `<div style="margin-bottom:8px"><span style="font-size:0.75em;color:var(--cp-text3);font-weight:500;margin-right:8px">${groupLabel}</span>`;
      for (const ing of groupItems) {
        const selected = state.selectedIngredients.includes(ing.id);
        ingredientsHTML += `<span class="cp-ingredient-tag${selected ? ' cp-selected' : ''}" onclick="window.__cpToggle('${ing.id}')">
          <span class="cp-ing-icon">${ing.icon}</span> ${ing.name}
        </span>`;
      }
      ingredientsHTML += '</div>';
    }

    // Build recipe table rows
    let tableRows = '';
    for (const recipe of displayRecipes) {
      const isMatch = matchedRecipes.includes(recipe);
      const rowClass = isMatch && selectedTags.length > 0 ? ' cp-row-match' : '';

      // Color-code stats
      const hpClass = recipe.hp >= 40 ? 'cp-stat-verygood' : recipe.hp >= 20 ? 'cp-stat-good' : recipe.hp <= 0 ? 'cp-stat-bad' : 'cp-stat-neutral';
      const hungerClass = recipe.hunger >= 75 ? 'cp-stat-verygood' : recipe.hunger >= 37.5 ? 'cp-stat-good' : 'cp-stat-neutral';
      const sanityClass = recipe.sanity >= 33 ? 'cp-stat-verygood' : recipe.sanity >= 15 ? 'cp-stat-good' : recipe.sanity < 0 ? 'cp-stat-verybad' : 'cp-stat-neutral';

      const catClass = `cp-tag-${recipe.category}`;
      const matchBadge = isMatch && selectedTags.length > 0 ? `<span class="cp-match-badge">✓ Can Cook</span>` : '';

      tableRows += `<tr class="${rowClass}">
        <td>
          <div class="cp-rec-name">
            <span class="cp-rec-icon">${recipe.icon}</span>
            ${recipe.name} ${matchBadge}
          </div>
          <div class="cp-rec-desc">${recipe.desc}</div>
          <div class="cp-rec-ingredients">${recipe.ingredients.join(' + ')}${recipe.note ? ` — ${recipe.note}` : ''}</div>
        </td>
        <td><span class="cp-stat-val ${hpClass}">${recipe.hp}</span></td>
        <td><span class="cp-stat-val ${hungerClass}">${recipe.hunger}</span></td>
        <td><span class="cp-stat-val ${sanityClass}">${recipe.sanity}</span></td>
        <td>${recipe.cookTime}s</td>
        <td><span class="cp-tag ${catClass}">${recipe.category}</span></td>
      </tr>`;
    }

    if (tableRows === '') {
      tableRows = `<tr><td colspan="6">
        <div class="cp-no-results">
          <div class="cp-nr-icon">🔍</div>
          <div class="cp-nr-text">No recipes found</div>
          <div class="cp-nr-hint">Try adjusting your ingredient selection or search terms</div>
        </div>
      </td></tr>`;
    }

    // Count matched recipes for stats
    const matchCount = state.showOnlyMatch && selectedTags.length > 0
      ? displayRecipes.length
      : matchedRecipes.length;

    app.innerHTML = `
      <div class="cp-controls">
        <div class="cp-search-wrapper">
          <input type="text" class="cp-search" id="cp-search-input"
            placeholder="Search recipes..." value="${state.searchQuery ? escapeHtml(state.searchQuery) : ''}"
            oninput="window.__cpSearch(this.value)">
        </div>
        <button class="cp-cook-btn${state.showOnlyMatch ? ' cp-active' : ''}" onclick="window.__cpToggleMatch()">
          ${state.showOnlyMatch ? '🔍 Showing Matches' : '👨‍🍳 Find Recipes'}
        </button>
        <button class="cp-reset-btn" onclick="window.__cpReset()">↺ Reset</button>
      </div>

      <div class="cp-stats">
        <span class="cp-stat-item">📊 Total Recipes: <span class="cp-stat-num">${RECIPES.length}</span></span>
        ${selectedTags.length > 0 ? `<span class="cp-stat-item">✅ Can Cook: <span class="cp-stat-found">${matchedRecipes.length}</span> recipes</span>` : ''}
        <span class="cp-stat-item">📦 Ingredients Selected: <span class="cp-stat-num">${state.selectedIngredients.length}</span></span>
        ${state.searchQuery ? `<span class="cp-stat-item">🔍 Filtered: <span class="cp-stat-num">${displayRecipes.length}</span> recipes</span>` : ''}
        <span class="cp-stat-item">⚡ Cook Time: <span class="cp-stat-num">${state.sortKey === 'cookTime' ? (state.sortAsc ? 'Shortest First' : 'Longest First') : ''}</span></span>
      </div>

      <div class="cp-ingredients-section">
        <div class="cp-ingredients-title">🧺 Your Ingredients — click to select what you have in inventory</div>
        <div class="cp-ingredients-grid">
          ${ingredientsHTML}
        </div>
      </div>

      <div class="cp-sort-bar">
        <span class="cp-sort-label">Sort by:</span>
        <button class="cp-sort-btn${state.sortKey === 'name' ? ' cp-sort-active' : ''}" onclick="window.__cpSort('name')">Name<span class="cp-sort-dir">${sortIndicator('name')}</span></button>
        <button class="cp-sort-btn${state.sortKey === 'hp' ? ' cp-sort-active' : ''}" onclick="window.__cpSort('hp')">❤️ Health<span class="cp-sort-dir">${sortIndicator('hp')}</span></button>
        <button class="cp-sort-btn${state.sortKey === 'hunger' ? ' cp-sort-active' : ''}" onclick="window.__cpSort('hunger')">🍔 Hunger<span class="cp-sort-dir">${sortIndicator('hunger')}</span></button>
        <button class="cp-sort-btn${state.sortKey === 'sanity' ? ' cp-sort-active' : ''}" onclick="window.__cpSort('sanity')">🧠 Sanity<span class="cp-sort-dir">${sortIndicator('sanity')}</span></button>
        <button class="cp-sort-btn${state.sortKey === 'cookTime' ? ' cp-sort-active' : ''}" onclick="window.__cpSort('cookTime')">⏱️ Cook Time<span class="cp-sort-dir">${sortIndicator('cookTime')}</span></button>
        <button class="cp-sort-btn${state.sortKey === 'category' ? ' cp-sort-active' : ''}" onclick="window.__cpSort('category')">🏷️ Category<span class="cp-sort-dir">${sortIndicator('category')}</span></button>
      </div>

      <div class="cp-table-wrapper">
        <table class="cp-table">
          <thead>
            <tr>
              <th onclick="window.__cpSort('name')">Recipe ${sortIndicator('name')}</th>
              <th onclick="window.__cpSort('hp')">❤️ HP ${sortIndicator('hp')}</th>
              <th onclick="window.__cpSort('hunger')">🍔 Hunger ${sortIndicator('hunger')}</th>
              <th onclick="window.__cpSort('sanity')">🧠 Sanity ${sortIndicator('sanity')}</th>
              <th onclick="window.__cpSort('cookTime')">⏱️ Cook ${sortIndicator('cookTime')}</th>
              <th onclick="window.__cpSort('category')">Type ${sortIndicator('category')}</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>

      <div style="margin-top:16px;font-size:0.75em;color:var(--cp-text3);text-align:center;border-top:1px solid var(--cp-border);padding-top:12px;">
        Data sourced from <a href="https://dontstarve.fandom.com" target="_blank" style="color:var(--cp-accent)">Don't Starve Wiki</a> (Klei Entertainment).
        Click ingredients to add them to your virtual inventory, then press <strong>"Find Recipes"</strong> to see what you can cook!
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Expose handlers to global scope ──
  window.__cpToggle = toggleIngredient;
  window.__cpSearch = setSearch;
  window.__cpToggleMatch = toggleMatchOnly;
  window.__cpSort = setSort;
  window.__cpReset = resetAll;

  // ── Initial render ──
  render();
})();
</script>

---

## How It Works

1. **Select Ingredients** — Click on ingredient tags to build your virtual inventory. Each click adds/removes that ingredient.
2. **Find Recipes** — Click the **"Find Recipes"** button to filter the table and show only dishes you can make with your selected ingredients.
3. **Sort** — Click any column header (HP, Hunger, Sanity, Cook Time) or use the sort buttons to reorder the list.
4. **Search** — Type in the search bar to find recipes by name, description, or ingredient.

## 💡 Pro Tips

| Tip | Detail |
|:----|:-------|
| **📦 Fillers** | Most recipes accept "Filler" ingredients — berries, ice, twigs, mushrooms, etc. Select "Filler (any)" to represent whatever filler you have. |
| **🍖 Meat Values** | 1 Monster Meat = 0.5 meat value for non-monster recipes. Cook times assume standard Crock Pot. |
| **🍯 Honey Value** | Honey Ham needs ≥ 2.0 honey value total. Each honey = 1.0 honey value. |
| **🐟 Fish Value** | Surf 'n Turf needs ≥ 1.5 fish value. Most fish = 1.0, but some = 0.5. |
| **🥶 Spoilage** | Ice Cream and Melonsicle only last 3 days. Cook what you'll eat soon! |

> 🎮 [**Buy Don't Starve Together on Steam**](https://store.steampowered.com/app/322330) — Support Klei Entertainment!
