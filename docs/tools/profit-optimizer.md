---
title: 💰 Stardew Valley Daily Profit Optimizer
description: Input your farming situation and get the best crop/animal combination for maximum daily gold. Interactive tool with real 1.6 data.
date: 2026-07-05
---

# 💰 Daily Profit Optimizer

> Find the **most profitable** crop or animal product for your situation. Adjust the inputs below and the optimizer does the rest.

<div class="optimizer-container">
  <div class="opt-form">
    <div class="opt-row">
      <label for="opt-season">🌾 Season</label>
      <select id="opt-season" onchange="optimize()">
        <option value="spring">Spring</option>
        <option value="summer" selected>Summer</option>
        <option value="fall">Fall</option>
        <option value="winter">Winter</option>
        <option value="greenhouse">Greenhouse (Any)</option>
        <option value="ginger">Ginger Island</option>
      </select>
    </div>

    <div class="opt-row">
      <label for="opt-farming">⭐ Farming Level</label>
      <select id="opt-farming" onchange="optimize()">
        <option value="0">0 (Start)</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 — Tiller</option>
        <option value="6">6 — Keg/Mayo</option>
        <option value="7">7</option>
        <option value="8">8 — Artisan</option>
        <option value="9">9</option>
        <option value="10" selected>10 — Artisan 🏆</option>
      </select>
    </div>

    <div class="opt-row">
      <label for="opt-goal">🎯 Your Goal</label>
      <select id="opt-goal" onchange="optimize()">
        <option value="profit">Max Daily Profit 💰</option>
        <option value="effort">Low Effort / Regrow 🌱</option>
        <option value="keg">Keg/Wine Production 🍷</option>
        <option value="cook">Cooking Ingredients 🍳</option>
        <option value="gift">Gift Favorites 🎁</option>
      </select>
    </div>

    <div class="opt-row">
      <label for="opt-budget">💰 Budget (Gold)</label>
      <input type="number" id="opt-budget" value="5000" min="0" step="1000" onchange="optimize()">
    </div>

    <div class="opt-row">
      <label for="opt-days">📅 Days Remaining</label>
      <input type="number" id="opt-days" value="28" min="1" max="28" onchange="optimize()">
    </div>

    <button class="md-button" onclick="optimize()">🔄 Optimize</button>
  </div>
</div>

<div id="opt-results">
  <div class="opt-loading">Adjust the settings above and click Optimize to see results.</div>
</div>

<script>
// ===== CROP DATABASE =====
const CROPS = {
  spring: [
    {name:'Strawberry 🍓', seed:100, days:8, regrow:4, sell:120, tag:'regrow', note:'🏆 Best Spring crop', keg:360, gift:'loved:Maru,Demetrius'},
    {name:'Cauliflower 🥦', seed:80, days:12, regrow:0, sell:175, tag:'giant', note:'Can form giant crop', keg:525, gift:'loved:no one'},
    {name:'Potato 🥔', seed:50, days:6, regrow:0, sell:80, tag:'multi', note:'Chance ×1-4', keg:240},
    {name:'Kale 🥬', seed:70, days:6, regrow:0, sell:110, tag:'', note:'', keg:248, gift:'loved:no one'},
    {name:'Parsnip 🌿', seed:20, days:4, regrow:0, sell:35, tag:'beginner', note:'Great start', keg:105},
    {name:'Garlic 🧄', seed:40, days:4, regrow:0, sell:60, tag:'', note:'Loved by several', keg:180},
    {name:'Green Bean 🫘', seed:60, days:10, regrow:3, sell:40, tag:'trellis', note:'Trellis — blocks path', keg:120},
    {name:'Tulip 🌷', seed:20, days:6, regrow:0, sell:30, tag:'decor', note:'Decorative', keg:90},
    {name:'Blue Jazz 💐', seed:30, days:7, regrow:0, sell:50, tag:'cooking', note:'Lucky Lunch ingredient', keg:150},
    {name:'Coffee Bean ☕', seed:2500, days:10, regrow:2, sell:15, tag:'buff', note:'Best daily drink!', keg:0, gift:'loved:Harvey'},
    {name:'Carrot 🥕', seed:0, days:3, regrow:0, sell:35, tag:'free', note:'🆕 1.6 Seed Spots only'},
    {name:'Rhubarb', seed:100, days:13, regrow:0, sell:220, tag:'', note:'Best raw profit', keg:660}
  ],
  summer: [
    {name:'Blueberry 🫐', seed:80, days:13, regrow:4, sell:50, tag:'regrow', note:'🏆 3 berries per harvest', keg:150, gift:'loved:no one'},
    {name:'Starfruit ⭐', seed:400, days:13, regrow:0, sell:750, tag:'keg', note:'🏆 Best Keg crop 2250g wine', keg:2250},
    {name:'Hops 🌿', seed:60, days:11, regrow:1, sell:25, tag:'keg', note:'Daily harvest → Pale Ale 300g', keg:300},
    {name:'Melon 🍈', seed:80, days:12, regrow:0, sell:250, tag:'giant', note:'Giant crop possible', keg:750},
    {name:'Hot Pepper 🌶️', seed:40, days:5, regrow:3, sell:40, tag:'regrow', note:'Loved by Shane', keg:120, gift:'loved:Shane'},
    {name:'Tomato 🍅', seed:50, days:11, regrow:4, sell:60, tag:'regrow', note:'Multiple per harvest', keg:180},
    {name:'Corn 🌽', seed:150, days:14, regrow:4, sell:50, tag:'multi', note:'Grows into Fall', keg:150},
    {name:'Red Cabbage 🥬', seed:100, days:9, regrow:0, sell:260, tag:'', note:'Great raw sell', keg:585},
    {name:'Sunflower 🌻', seed:200, days:8, regrow:0, sell:80, tag:'seeds', note:'Drops seeds on harvest', keg:240},
    {name:'Wheat 🌾', seed:10, days:4, regrow:0, sell:25, tag:'keg', note:'Beer 200g (20× return)', keg:200},
    {name:'Radish 🥕', seed:40, days:6, regrow:0, sell:90, tag:'', note:'', keg:270},
    {name:'Poppy 🌺', seed:100, days:7, regrow:0, sell:140, tag:'gift', note:'Loved by Penny', keg:420, gift:'loved:Penny'},
    {name:'Summer Squash 🥒', seed:0, days:6, regrow:3, sell:45, tag:'free', note:'🆕 1.6 Seed Spots only'}
  ],
  fall: [
    {name:'Cranberry 🫐', seed:240, days:10, regrow:3, sell:75, tag:'regrow', note:'🏆 2 berries harvest', keg:225},
    {name:'Pumpkin 🎃', seed:100, days:13, regrow:0, sell:320, tag:'giant', note:'Giant crop + Juice 720g', keg:720},
    {name:'Grape 🍇', seed:60, days:10, regrow:3, sell:80, tag:'regrow', note:'', keg:240},
    {name:'Eggplant 🍆', seed:20, days:7, regrow:5, sell:60, tag:'regrow', note:'Loved by Lewis', keg:180, gift:'loved:Lewis'},
    {name:'Yam 🫘', seed:60, days:10, regrow:0, sell:160, tag:'', note:'', keg:480},
    {name:'Artichoke 🌱', seed:30, days:8, regrow:0, sell:160, tag:'', note:'Year 2+', keg:480},
    {name:'Beet 🍠', seed:20, days:6, regrow:0, sell:100, tag:'sugar', note:'Sugar → 3× in mill', keg:300},
    {name:'Sweet Gem Berry 💎', seed:1000, days:24, regrow:0, sell:3000, tag:'rare', note:'Rare Seed (Traveling Cart only)'},
    {name:'Amaranth 🌿', seed:70, days:7, regrow:0, sell:150, tag:'', note:'', keg:338},
    {name:'Bok Choy 🥬', seed:50, days:6, regrow:0, sell:80, tag:'', note:'', keg:240},
    {name:'Fairy Rose 🌹', seed:200, days:12, regrow:0, sell:290, tag:'bee', note:'Best honey flowers', keg:870},
    {name:'Broccoli 🥦', seed:0, days:8, regrow:4, sell:70, tag:'free', note:'🆕 1.6 Seed Spots only'}
  ],
  winter: [
    {name:'Powdermelon 🍈', seed:0, days:7, regrow:0, sell:80, tag:'free', note:'🆕 1.6 Giant crop Seed Spots'}
  ],
  greenhouse: [
    {name:'Ancient Fruit 🍇', seed:0, days:28, regrow:7, sell:550, tag:'keg', note:'🏆 Best greenhouse crop', keg:1650},
    {name:'Starfruit ⭐', seed:400, days:13, regrow:0, sell:750, tag:'keg', note:'2250g wine', keg:2250},
    {name:'Coffee Bean ☕', seed:2500, days:10, regrow:2, sell:15, tag:'buff', note:'Daily coffee supply'},
    {name:'Hops 🌿', seed:60, days:11, regrow:1, sell:25, tag:'keg', note:'Daily Pale Ale 300g', keg:300},
    {name:'Blueberry 🫐', seed:80, days:13, regrow:4, sell:50, tag:'regrow', note:'3 berries per harvest', keg:150},
    {name:'Cranberry 🫐', seed:240, days:10, regrow:3, sell:75, tag:'regrow', note:'2 berries per harvest', keg:225},
    {name:'Strawberry 🍓', seed:100, days:8, regrow:4, sell:120, tag:'regrow', note:'', keg:360}
  ],
  ginger: [
    {name:'Pineapple 🍍', seed:80, days:14, regrow:6, sell:300, tag:'regrow', note:'🏆 Best Island crop', keg:900},
    {name:'Taro Root 🍠', seed:0, days:7, regrow:0, sell:100, tag:'free', note:'Grows in water/soil'},
    {name:'Starfruit ⭐', seed:400, days:13, regrow:0, sell:750, tag:'keg', note:'Same as mainland', keg:2250},
    {name:'Blueberry 🫐', seed:80, days:13, regrow:4, sell:50, tag:'regrow', note:'', keg:150},
    {name:'Cranberry 🫐', seed:240, days:10, regrow:3, sell:75, tag:'regrow', note:'', keg:225},
    {name:'Sweet Gem Berry 💎', seed:1000, days:24, regrow:0, sell:3000, tag:'rare', note:'Traveling Cart', keg:0}
  ]
};

// ===== PROFIT CALC =====
function calcDailyProfit(crop, daysLeft, farmingLevel, goal) {
  if (!crop) return {profit: 0};

  const artisanMul = farmingLevel >= 10 ? 1.4 : (farmingLevel >= 5 ? 1.1 : 1.0);
  const sellWithArtisan = Math.round(crop.sell * artisanMul);

  // Base raw profit
  let harvests = 1;
  if (crop.regrow > 0) {
    const firstDays = crop.days;
    if (firstDays <= daysLeft) {
      harvests = 1 + Math.floor((daysLeft - firstDays) / crop.regrow);
    }
  } else {
    harvests = Math.floor(daysLeft / crop.days);
  }

  if (harvests < 1) harvests = 1;

  // Estimate multiple yield
  let yieldMult = 1;
  if (crop.tag === 'multi' || crop.name === 'Potato 🥔') yieldMult = 1.2;
  if (crop.name === 'Blueberry 🫐') yieldMult = 3;
  if (crop.name === 'Cranberry 🫐') yieldMult = 2;
  if (crop.name === 'Tomato 🍅') yieldMult = 2.4;
  if (crop.name === 'Hot Pepper 🌶️') yieldMult = 1.5;
  if (crop.name === 'Eggplant 🍆') yieldMult = 1.2;

  // Seed cost per harvest
  const seedCostTotal = crop.seed;

  let totalRevenue, totalCost;
  let sellPrice;

  if (goal === 'keg' && crop.keg > 0) {
    sellPrice = Math.round(crop.keg * artisanMul);
    totalRevenue = sellPrice * harvests * yieldMult;
  } else if (crop.sell === 0) {
    sellPrice = 0;
    totalRevenue = 0;
  } else {
    sellPrice = sellWithArtisan;
    totalRevenue = sellWithArtisan * harvests * yieldMult;
  }

  totalCost = crop.seed;

  // If free seeds (Seed Spots)
  if (crop.seed === 0 && crop.tag === 'free') {
    totalCost = 0;
  }

  const netProfit = totalRevenue - totalCost;
  const perDay = netProfit / daysLeft;

  return {
    name: crop.name,
    rawProfit: netProfit,
    dailyProfit: perDay,
    harvests,
    sellPrice,
    seedCost: totalCost,
    yieldMult,
    note: crop.note || '',
    tag: crop.tag || '',
    keg: crop.keg || 0,
    gift: crop.gift || '',
    days: crop.days,
    regrow: crop.regrow
  };
}

function optimize() {
  const season = document.getElementById('opt-season').value;
  const farmingLevel = parseInt(document.getElementById('opt-farming').value);
  const goal = document.getElementById('opt-goal').value;
  const budget = parseInt(document.getElementById('opt-budget').value) || 5000;
  const daysLeft = parseInt(document.getElementById('opt-days').value) || 28;

  let crops = CROPS[season] || CROPS.summer;
  let results = crops.map(c => calcDailyProfit(c, daysLeft, farmingLevel, goal));

  // Sort by goal
  if (goal === 'profit') {
    results.sort((a, b) => b.dailyProfit - a.dailyProfit);
  } else if (goal === 'effort') {
    results.sort((a, b) => {
      // Prefer regrow + fewer days
      if (a.regrow > 0 && b.regrow === 0) return -1;
      if (a.regrow === 0 && b.regrow > 0) return 1;
      return b.dailyProfit - a.dailyProfit;
    });
  } else if (goal === 'gift') {
    results.sort((a, b) => {
      const aGift = a.gift ? 1 : 0;
      const bGift = b.gift ? 1 : 0;
      if (aGift !== bGift) return bGift - aGift;
      return b.dailyProfit - a.dailyProfit;
    });
  } else {
    // Default: profit sort
    results.sort((a, b) => b.dailyProfit - a.dailyProfit);
  }

  // Filter by budget
  const affordable = results.filter(r => r.seedCost <= budget || r.seedCost === 0);
  const unaffordable = results.filter(r => r.seedCost > budget && r.seedCost !== 0);

  // Render
  const container = document.getElementById('opt-results');

  const seasonNames = {
    spring: '🌸 Spring',
    summer: '☀️ Summer',
    fall: '🍂 Fall',
    winter: '❄️ Winter',
    greenhouse: '🏠 Greenhouse',
    ginger: '🏝️ Ginger Island'
  };

  const goalNames = {
    profit: 'Max Daily Profit 💰',
    effort: 'Low Effort/Regrow 🌱',
    keg: 'Keg/Wine Production 🍷',
    cook: 'Cooking 🍳',
    gift: 'Gift Favorites 🎁'
  };

  if (results.length === 0) {
    container.innerHTML = `<div class="opt-error">⚠️ No crops available for ${seasonNames[season]}. Consider foraging or mining.</div>`;
    return;
  }

  let html = `<div class="opt-results-table">
    <div class="opt-meta">
      <span>${seasonNames[season]} • ${goalNames[goal]} • Farming ${farmingLevel} • Budget ${budget}g • ${daysLeft} days</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Crop</th>
          <th>💰 Daily Profit</th>
          <th>💰 Total Profit</th>
          <th>🌾 Harvests</th>
          <th>📅 Days</th>
          <th>🔄 Regrow</th>
          <th>🏷️ Notes</th>
        </tr>
      </thead>
      <tbody>`;

  affordable.slice(0, 10).forEach((r, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`;
    const tagClass = r.tag ? `tag-${r.tag}` : '';
    const kegBonus = goal === 'keg' && r.keg > 0 ? `<span class="keg-tag">🍷 ${r.sellPrice}g</span>` : '';
    html += `<tr class="${tagClass} ${i === 0 ? 'top-row' : ''}">
      <td class="rank-cell">${medal}</td>
      <td><strong>${r.name}</strong> ${kegBonus}</td>
      <td class="num-cell">${r.dailyProfit.toFixed(0)}g/day</td>
      <td class="num-cell">${r.rawProfit.toFixed(0)}g</td>
      <td class="num-cell">×${r.harvests}${r.yieldMult > 1 ? ` (×${r.yieldMult})` : ''}</td>
      <td class="num-cell">${r.days}</td>
      <td class="num-cell">${r.regrow > 0 ? `Every ${r.regrow}d` : '—'}</td>
      <td class="note-cell">${r.note} ${r.gift ? '💝' : ''}</td>
    </tr>`;
  });

  html += '</tbody></table>';

  // Summary
  if (affordable.length > 0) {
    const top = affordable[0];
    const seedsCanBuy = Math.floor(budget / (top.seedCost || 1));
    const totalProjected = top.rawProfit * Math.max(seedsCanBuy, 1);
    html += `<div class="opt-summary">
      <h4>💡 Recommendation</h4>
      <p>With ${budget}g you can plant ~<strong>${seedsCanBuy}</strong> <strong>${top.name}</strong> seed${seedsCanBuy > 1 ? 's' : ''}.
      Projected total profit: <strong>${totalProjected.toLocaleString()}g</strong>
      over ${daysLeft} days (${(totalProjected/daysLeft).toFixed(0)}g/day).</p>
      <p class="opt-disclaimer">* Artisan profession (Lv10) applies 1.4× multiplier to sellable goods.
      * Multiple-yield crops (Blueberry, Cranberry, etc.) are estimated averages.
      * Prices in Stardew Valley 1.6.9.</p>
    </div>`;
  }

  container.innerHTML = html;
}

// Run on load
document.addEventListener('DOMContentLoaded', optimize);
</script>

<style>
.optimizer-container {
  margin: 20px 0;
}
.opt-form {
  background: var(--card, #24242b);
  border: 1px solid var(--bd, #35353e);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}
.opt-row {
  flex: 1;
  min-width: 140px;
}
.opt-row label {
  display: block;
  font-size: 0.85em;
  color: var(--t2, #9b9a95);
  margin-bottom: 6px;
}
.opt-row select, .opt-row input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--bd, #35353e);
  background: var(--bg, #1a1a23);
  color: var(--t1, #e8e6e1);
  font-size: 0.95em;
}
.opt-form button {
  padding: 10px 24px;
  background: var(--ac, #c9a96e);
  color: #1a1a23;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  min-width: 120px;
}
.opt-form button:hover {
  filter: brightness(1.1);
}
.opt-results-table {
  margin-top: 20px;
}
.opt-meta {
  background: var(--card, #24242b);
  border: 1px solid var(--bd, #35353e);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  color: var(--t2, #9b9a95);
  font-size: 0.9em;
}
.opt-results-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}
.opt-results-table th {
  text-align: left;
  padding: 10px 12px;
  background: var(--card, #24242b);
  border-bottom: 2px solid var(--bd, #35353e);
  color: var(--t2, #9b9a95);
  font-weight: normal;
  font-size: 0.85em;
  white-space: nowrap;
}
.opt-results-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--bd, #35353e);
}
.rank-cell {
  font-size: 1.2em;
  text-align: center;
}
.num-cell {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.note-cell {
  color: var(--t2, #9b9a95);
  font-size: 0.85em;
}
.top-row {
  background: rgba(201,169,110,0.08);
}
.tag-free td {
  color: #6a9a5a;
}
.tag-keg td, .keg-tag {
  color: #c9a96e;
}
.keg-tag {
  font-size: 0.85em;
  display: block;
}
.tag-gift td {
  color: #c97a9a;
}
.opt-summary {
  background: var(--card, #24242b);
  border: 1px solid var(--ac, #c9a96e);
  border-radius: 10px;
  padding: 20px;
  margin-top: 16px;
}
.opt-summary h4 {
  margin: 0 0 8px;
  color: var(--ac, #c9a96e);
}
.opt-summary p {
  margin: 6px 0;
  line-height: 1.6;
}
.opt-disclaimer {
  font-size: 0.85em;
  color: var(--t2, #9b9a95);
  margin-top: 12px !important;
}
.opt-loading, .opt-error {
  padding: 20px;
  color: var(--t2, #9b9a95);
  text-align: center;
}
.opt-error {
  color: #c95a5a;
}
@media (max-width: 700px) {
  .opt-row {
    min-width: 100%;
  }
  .opt-results-table table {
    font-size: 0.8em;
  }
  .opt-results-table td, .opt-results-table th {
    padding: 6px 8px;
  }
}
</style>

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/) — Support the developer!
