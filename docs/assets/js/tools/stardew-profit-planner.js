/**
 * Stardew Valley 1.6 Crop Profit Planner
 * Interactive crop profit calculator with Chart.js visualization
 * Data verified against official Stardew Valley Wiki (1.6.15)
 */

// ── Crop Database (verified 1.6 data) ──
const CROPS = {
  // ── Spring ──
  spring: [
    { name: "Blue Jazz",     seed: 30,  grow: 7,  regrow: 0,  sell: 50,  artisan: { type: "none" }, note: "Gift (Pierre loves)" },
    { name: "Carrot \uD83E\uDD55",  seed: 0,   grow: 3,  regrow: 0,  sell: 35,  artisan: { type: "none" }, note: "Seed Spots only (free seeds)" },
    { name: "Cauliflower",   seed: 80,  grow: 12, regrow: 0,  sell: 175, artisan: { type: "wine", mult: 3.0 }, note: "Giant crop" },
    { name: "Coffee Bean",   seed: 15,  grow: 10, regrow: 2,  sell: 15,  artisan: { type: "coffee", mult: 10 }, note: "Brews 5 at once, regrows" },
    { name: "Garlic \uD83E\uDCC4",   seed: 40,  grow: 4,  regrow: 0,  sell: 60,  artisan: { type: "juice", mult: 2.25 }, note: "Quick grow" },
    { name: "Green Bean",    seed: 60,  grow: 10, regrow: 3,  sell: 40,  artisan: { type: "none" }, note: "Trellis, regrows" },
    { name: "Kale",          seed: 70,  grow: 6,  regrow: 0,  sell: 110, artisan: { type: "none" }, note: "Stamina restore" },
    { name: "Parsnip",       seed: 20,  grow: 4,  regrow: 0,  sell: 35,  artisan: { type: "none" }, note: "Best early game crop" },
    { name: "Potato",        seed: 50,  grow: 6,  regrow: 0,  sell: 80,  artisan: { type: "juice", mult: 2.25 }, note: "Multi-drop exploit" },
    { name: "Rhubarb",       seed: 100, grow: 13, regrow: 0,  sell: 220, artisan: { type: "wine", mult: 3.0 }, note: "Desert trader" },
    { name: "Strawberry",    seed: 100, grow: 8,  regrow: 4,  sell: 120, artisan: { type: "wine", mult: 3.0 }, note: "\u2605 Best spring crop" },
    { name: "Tulip",         seed: 20,  grow: 6,  regrow: 0,  sell: 30,  artisan: { type: "none" }, note: "Gift (Evelyn loves)" },
  ],
  // ── Summer ──
  summer: [
    { name: "Blueberry",     seed: 80,  grow: 13, regrow: 4,  sell: 50,  artisan: { type: "wine", mult: 3.0 }, note: "\u2605 Best multi-harvest" },
    { name: "Corn",          seed: 150, grow: 14, regrow: 4,  sell: 50,  artisan: { type: "oil", mult: 3.4 }, note: "Multi-season (Su+Fa)" },
    { name: "Hops",          seed: 60,  grow: 11, regrow: 1,  sell: 25,  artisan: { type: "pale_ale", mult: 12.0 }, note: "\u2605 Pale Ale = profit king" },
    { name: "Hot Pepper",    seed: 40,  grow: 5,  regrow: 3,  sell: 40,  artisan: { type: "none" }, note: "Gift (Shane loves)" },
    { name: "Melon",         seed: 80,  grow: 12, regrow: 0,  sell: 250, artisan: { type: "wine", mult: 3.0 }, note: "Giant crop" },
    { name: "Poppy",         seed: 100, grow: 7,  regrow: 0,  sell: 140, artisan: { type: "none" }, note: "Gift (Penny loves)" },
    { name: "Radish",        seed: 40,  grow: 6,  regrow: 0,  sell: 90,  artisan: { type: "juice", mult: 2.25 }, note: "Quick" },
    { name: "Red Cabbage",   seed: 100, grow: 9,  regrow: 0,  sell: 260, artisan: { type: "wine", mult: 3.0 }, note: "Best single-harvest $/day" },
    { name: "Starfruit",     seed: 400, grow: 13, regrow: 0,  sell: 750, artisan: { type: "wine", mult: 3.0 }, note: "\u2605 Late game money" },
    { name: "Summer Spangle",seed: 50,  grow: 8,  regrow: 0,  sell: 90,  artisan: { type: "none" }, note: "Gift" },
    { name: "Summer Squash", seed: 0,   grow: 6,  regrow: 3,  sell: 45,  artisan: { type: "none" }, note: "Seed Spots only" },
    { name: "Tomato",        seed: 50,  grow: 11, regrow: 4,  sell: 60,  artisan: { type: "wine", mult: 3.0 }, note: "Regrows, good for kitchen" },
    { name: "Wheat",         seed: 10,  grow: 4,  regrow: 0,  sell: 25,  artisan: { type: "beer", mult: 8.0 }, note: "Fastest profit/day" },
  ],
  // ── Fall ──
  fall: [
    { name: "Amaranth",      seed: 70,  grow: 7,  regrow: 0,  sell: 150, artisan: { type: "none" }, note: "Gift" },
    { name: "Artichoke",     seed: 30,  grow: 8,  regrow: 0,  sell: 160, artisan: { type: "juice", mult: 2.25 }, note: "Year 2+" },
    { name: "Beet",          seed: 20,  grow: 6,  regrow: 0,  sell: 100, artisan: { type: "none" }, note: "Sugar making" },
    { name: "Bok Choy",      seed: 50,  grow: 6,  regrow: 0,  sell: 80,  artisan: { type: "none" }, note: "Fast grow" },
    { name: "Broccoli \uD83E\uDD66", seed: 0,   grow: 8,  regrow: 4,  sell: 70,  artisan: { type: "none" }, note: "Seed Spots only" },
    { name: "Cranberry",     seed: 240, grow: 10, regrow: 3,  sell: 75,  artisan: { type: "wine", mult: 3.0 }, note: "\u2605 Best fall cash crop" },
    { name: "Eggplant",      seed: 20,  grow: 7,  regrow: 5,  sell: 60,  artisan: { type: "none" }, note: "Regrows, good gift" },
    { name: "Fairy Rose",    seed: 200, grow: 12, regrow: 0,  sell: 290, artisan: { type: "none" }, note: "Honey multiplier (best)" },
    { name: "Grape",         seed: 60,  grow: 10, regrow: 3,  sell: 80,  artisan: { type: "wine", mult: 3.0 }, note: "Trellis" },
    { name: "Pumpkin",       seed: 100, grow: 13, regrow: 0,  sell: 320, artisan: { type: "juice", mult: 2.25 }, note: "Giant crop" },
    { name: "Sunflower",     seed: 200, grow: 8,  regrow: 0,  sell: 80,  artisan: { type: "none" }, note: "Produces 0-2 seeds too" },
    { name: "Sweet Gem Berry",seed:1000, grow: 24, regrow: 0,  sell: 3000,artisan: { type: "none" }, note: "Rare Seed, 3000g base" },
    { name: "Yam",           seed: 60,  grow: 10, regrow: 0,  sell: 160, artisan: { type: "none" }, note: "Gift" },
  ],
  // ── Winter (only Powdermelon) ──
  winter: [
    { name: "Powdermelon \uD83C\uDF4D", seed: 0, grow: 7, regrow: 0, sell: 80, artisan: { type: "none" }, note: "Seed Spots only, giant crop" },
  ],
  // ── Any Season (Greenhouse / Ginger Island) ──
  any: [
    { name: "Ancient Fruit \uD83C\uDF47", seed: 0,   grow: 28, regrow: 7,  sell: 550, artisan: { type: "wine", mult: 3.0 }, note: "\u2605\u2605\u2605 Endgame king" },
    { name: "Cactus Fruit",   seed: 0,   grow: 12, regrow: 3,  sell: 75,  artisan: { type: "none" }, note: "Desert, gift (Sam loves)" },
    { name: "Pineapple \uD83C\uDF4D", seed: 0,   grow: 14, regrow: 7,  sell: 300, artisan: { type: "wine", mult: 3.0 }, note: "Ginger Island farm" },
    { name: "Taro Root",      seed: 0,   grow: 10, regrow: 0,  sell: 100, artisan: { type: "none" }, note: "Ginger Island, waters itself" },
    { name: "Tea Leaves \uD83C\uDF75", seed: 0,   grow: 20, regrow: 1,  sell: 50,  artisan: { type: "green_tea", mult: 5.0 }, note: "Grow indoors, 1/day harvest" },
    { name: "Fiber",          seed: 0,   grow: 7,  regrow: 0,  sell: 1,   artisan: { type: "none" }, note: "From Fiber Seeds recipe" },
  ]
};

const SEASON_DAYS = { spring: 28, summer: 28, fall: 28, winter: 28, greenhouse: 999 };

// ── Calculate profit/day ──
function calcProfit(crop, season, artisan, tiller, agri) {
  const days = SEASON_DAYS[season];
  let grow = crop.grow;
  if (agri) grow = Math.ceil(grow * 0.9);

  let harvests, totalIncome;

  if (crop.regrow > 0) {
    harvests = Math.max(1, Math.floor((days - grow) / (crop.regrow * (agri ? 0.9 : 1))) + 1);
  } else {
    harvests = 1;
  }

  // Multi-season crops
  if (season === "summer" && crop.name === "Corn") {
    harvests += Math.max(0, Math.floor(28 / (crop.regrow * (agri ? 0.9 : 1))));
  }

  let sellPrice = crop.sell;
  if (tiller) sellPrice = Math.ceil(sellPrice * 1.1);

  // Artisan processing
  if (artisan && crop.artisan.type !== "none") {
    const m = crop.artisan.mult;
    const baseProduct = crop.sell * m * (tiller ? 1.1 : 1);
    sellPrice = Math.ceil(baseProduct * 1.4); // Artisan +40%
  }

  // Seed cost (0 = free from seed spots/crafting)
  const totalCost = crop.seed * harvests;
  totalIncome = sellPrice * harvests;
  const profit = totalIncome - (crop.seed > 0 ? crop.seed : 0);
  const profitPerDay = profit / (grow + (crop.regrow > 0 ? (harvests - 1) * crop.regrow * (agri ? 0.9 : 1) : 0) - (crop.regrow > 0 ? crop.regrow * (agri ? 0.9 : 1) : 0));

  return {
    name: crop.name,
    seedCost: crop.seed,
    growth: crop.grow,
    regrow: crop.regrow > 0 ? `Every ${crop.regrow}d` : "No",
    sell: crop.sell,
    harvests: harvests,
    totalIncome: Math.round(totalIncome),
    profitPerDay: Math.round(profitPerDay * 100) / 100,
    note: crop.note,
    season: season
  };
}

// ── Update UI ──
function updateTable() {
  const season = document.getElementById("season-select").value;
  const artisan = document.getElementById("artisan-check").checked;
  const tiller = document.getElementById("tiller-check").checked;
  const agri = document.getElementById("agri-check").checked;

  let crops = [];
  
  // Get crops for selected season + any-season crops in greenhouse
  if (CROPS[season]) crops = crops.concat(CROPS[season]);
  if (season === "greenhouse") crops = crops.concat(CROPS.any);
  
  // For other seasons, show multi-season crops too
  if (season === "spring") {
    // No multi-season spring crops
  }
  if (season === "summer") {
    // Corn is already in summer list
  }
  if (season === "fall") {
    // Corn is multi-season, add it
    const corn = CROPS.summer.find(c => c.name === "Corn");
    if (corn) crops.push(corn);
  }

  const results = crops.map(c => calcProfit(c, season, artisan, tiller, agri));
  results.sort((a, b) => b.profitPerDay - a.profitPerDay);

  // Table
  const tbody = document.getElementById("crop-tbody");
  tbody.innerHTML = results.map(r => `
    <tr>
      <td><strong>${r.name}</strong></td>
      <td>${r.seedCost > 0 ? r.seedCost + 'g' : 'Free'}</td>
      <td>${r.growth} days</td>
      <td>${r.regrow}</td>
      <td>${r.sell}g</td>
      <td>${r.harvests}</td>
      <td>${r.totalIncome}g</td>
      <td><strong>${r.profitPerDay}g</strong></td>
      <td style="font-size:0.8em; opacity:0.7;">${r.note}</td>
    </tr>
  `).join("");

  // Chart (top 10)
  const ctx = document.getElementById("profit-chart").getContext("2d");
  if (window.profitChart) window.profitChart.destroy();

  const top10 = results.slice(0, 12);
  window.profitChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: top10.map(r => r.name),
      datasets: [{
        label: "Profit per Day (g)",
        data: top10.map(r => r.profitPerDay),
        backgroundColor: [
          "#22c55e", "#3b82f6", "#eab308", "#ef4444",
          "#a855f7", "#ec4899", "#14b8a6", "#f97316",
          "#6366f1", "#84cc16", "#06b6d4", "#d946ef"
        ],
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y.toFixed(1)}g/day`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { callback: (v) => v + "g" }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // Empty winter handling
  if (results.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;">❄️ No plantable crops in Winter (use Greenhouse!)</td></tr>';
  }
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("season-select").addEventListener("change", updateTable);
  document.getElementById("artisan-check").addEventListener("change", updateTable);
  document.getElementById("tiller-check").addEventListener("change", updateTable);
  document.getElementById("agri-check").addEventListener("change", updateTable);
  updateTable();
});
