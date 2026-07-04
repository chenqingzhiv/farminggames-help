/**
 * Stardew Valley 1.6 Crop Profit Planner (Enhanced)
 * Interactive crop profit calculator with season filter, fertilizer comparison,
 * batch selection, and clear profit/day calculations.
 * Data verified against official Stardew Valley Wiki (1.6.15)
 */

// ── Crop Database (verified 1.6 data) ──
const CROPS = {
  // ── Spring ──
  spring: [
    { name: "Blue Jazz",     seed: 30,  grow: 7,  regrow: 0,  sell: 50,  artisan: { type: "none" }, note: "Gift (Pierre loves)" },
    { name: "Carrot 🥕",     seed: 0,   grow: 3,  regrow: 0,  sell: 35,  artisan: { type: "none" }, note: "Seed Spots only (free seeds)" },
    { name: "Cauliflower",   seed: 80,  grow: 12, regrow: 0,  sell: 175, artisan: { type: "wine", mult: 3.0 }, note: "Giant crop" },
    { name: "Coffee Bean",   seed: 15,  grow: 10, regrow: 2,  sell: 15,  artisan: { type: "coffee", mult: 10 }, note: "Brews 5 at once, regrows" },
    { name: "Garlic 🧄",     seed: 40,  grow: 4,  regrow: 0,  sell: 60,  artisan: { type: "juice", mult: 2.25 }, note: "Quick grow" },
    { name: "Green Bean",    seed: 60,  grow: 10, regrow: 3,  sell: 40,  artisan: { type: "none" }, note: "Trellis, regrows" },
    { name: "Kale",          seed: 70,  grow: 6,  regrow: 0,  sell: 110, artisan: { type: "none" }, note: "Stamina restore" },
    { name: "Parsnip",       seed: 20,  grow: 4,  regrow: 0,  sell: 35,  artisan: { type: "none" }, note: "Best early game crop" },
    { name: "Potato",        seed: 50,  grow: 6,  regrow: 0,  sell: 80,  artisan: { type: "juice", mult: 2.25 }, note: "Multi-drop exploit" },
    { name: "Rhubarb",       seed: 100, grow: 13, regrow: 0,  sell: 220, artisan: { type: "wine", mult: 3.0 }, note: "Desert trader" },
    { name: "Strawberry",    seed: 100, grow: 8,  regrow: 4,  sell: 120, artisan: { type: "wine", mult: 3.0 }, note: "★ Best spring crop" },
    { name: "Tulip",         seed: 20,  grow: 6,  regrow: 0,  sell: 30,  artisan: { type: "none" }, note: "Gift (Evelyn loves)" },
  ],
  // ── Summer ──
  summer: [
    { name: "Blueberry",     seed: 80,  grow: 13, regrow: 4,  sell: 50,  artisan: { type: "wine", mult: 3.0 }, note: "★ Best multi-harvest" },
    { name: "Corn",          seed: 150, grow: 14, regrow: 4,  sell: 50,  artisan: { type: "oil", mult: 3.4 }, note: "Multi-season (Su+Fa)" },
    { name: "Hops",          seed: 60,  grow: 11, regrow: 1,  sell: 25,  artisan: { type: "pale_ale", mult: 12.0 }, note: "★ Pale Ale = profit king" },
    { name: "Hot Pepper",    seed: 40,  grow: 5,  regrow: 3,  sell: 40,  artisan: { type: "none" }, note: "Gift (Shane loves)" },
    { name: "Melon",         seed: 80,  grow: 12, regrow: 0,  sell: 250, artisan: { type: "wine", mult: 3.0 }, note: "Giant crop" },
    { name: "Poppy",         seed: 100, grow: 7,  regrow: 0,  sell: 140, artisan: { type: "none" }, note: "Gift (Penny loves)" },
    { name: "Radish",        seed: 40,  grow: 6,  regrow: 0,  sell: 90,  artisan: { type: "juice", mult: 2.25 }, note: "Quick" },
    { name: "Red Cabbage",   seed: 100, grow: 9,  regrow: 0,  sell: 260, artisan: { type: "wine", mult: 3.0 }, note: "Best single-harvest $/day" },
    { name: "Starfruit",     seed: 400, grow: 13, regrow: 0,  sell: 750, artisan: { type: "wine", mult: 3.0 }, note: "★ Late game money" },
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
    { name: "Broccoli 🥦",   seed: 0,   grow: 8,  regrow: 4,  sell: 70,  artisan: { type: "none" }, note: "Seed Spots only" },
    { name: "Cranberry",     seed: 240, grow: 10, regrow: 3,  sell: 75,  artisan: { type: "wine", mult: 3.0 }, note: "★ Best fall cash crop" },
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
    { name: "Powdermelon 🍑", seed: 0, grow: 7, regrow: 0, sell: 80, artisan: { type: "none" }, note: "Seed Spots only, giant crop" },
  ],
  // ── Any Season (Greenhouse / Ginger Island) ──
  any: [
    { name: "Ancient Fruit 🍇", seed: 0,   grow: 28, regrow: 7,  sell: 550, artisan: { type: "wine", mult: 3.0 }, note: "★★★ Endgame king" },
    { name: "Cactus Fruit",   seed: 0,   grow: 12, regrow: 3,  sell: 75,  artisan: { type: "none" }, note: "Desert, gift (Sam loves)" },
    { name: "Pineapple 🍍",   seed: 0,   grow: 14, regrow: 7,  sell: 300, artisan: { type: "wine", mult: 3.0 }, note: "Ginger Island farm" },
    { name: "Taro Root",      seed: 0,   grow: 10, regrow: 0,  sell: 100, artisan: { type: "none" }, note: "Ginger Island, waters itself" },
    { name: "Tea Leaves 🍵",  seed: 0,   grow: 20, regrow: 1,  sell: 50,  artisan: { type: "green_tea", mult: 5.0 }, note: "Grow indoors, 1/day harvest" },
    { name: "Fiber",          seed: 0,   grow: 7,  regrow: 0,  sell: 1,   artisan: { type: "none" }, note: "From Fiber Seeds recipe" },
  ]
};

const SEASON_DAYS = { spring: 28, summer: 28, fall: 28, winter: 28, greenhouse: 999 };

// ── Fertilizer definitions ──
const FERTILIZERS = {
  "none":            { label: "None",             qualityBoost: 0,   speedBoost: 0    },
  "basic":           { label: "Basic Fertilizer",  qualityBoost: 0.10, speedBoost: 0   },
  "quality":         { label: "Quality Fertilizer",qualityBoost: 0.25, speedBoost: 0   },
  "deluxe":          { label: "Deluxe Fertilizer", qualityBoost: 0.50, speedBoost: 0   },
  "speedgro":        { label: "Speed-Gro",         qualityBoost: 0,   speedBoost: 0.10 },
  "deluxe_speedgro": { label: "Deluxe Speed-Gro",  qualityBoost: 0,   speedBoost: 0.25 },
  "hyper_speedgro":  { label: "Hyper Speed-Gro",   qualityBoost: 0,   speedBoost: 0.33 },
};

// ── Calculate profit/day ──
function calcProfit(crop, season, artisan, tiller, agri, fertilizer) {
  const days = SEASON_DAYS[season];
  const fert = FERTILIZERS[fertilizer] || FERTILIZERS.none;
  
  let grow = crop.grow;
  if (agri) grow = Math.ceil(grow * 0.9);
  if (fert.speedBoost > 0) grow = Math.ceil(grow * (1 - fert.speedBoost));
  grow = Math.max(1, grow);

  let harvests;
  if (crop.regrow > 0) {
    const regrowInterval = crop.regrow * (agri ? 0.9 : 1);
    harvests = Math.max(1, Math.floor((days - grow) / regrowInterval) + 1);
  } else {
    harvests = 1;
  }

  // Multi-season: Corn in Summer+Fall
  if (season === "summer" && crop.name === "Corn") {
    harvests += Math.max(0, Math.floor(28 / (crop.regrow * (agri ? 0.9 : 1))));
  }

  let sellPrice = crop.sell;
  if (tiller) sellPrice = Math.ceil(sellPrice * 1.1);

  // Quality boost from fertilizer (applied to base sell price)
  if (fert.qualityBoost > 0) {
    // Average quality multiplier: ~1.0 * (1 - qualityBoost) + 1.25 * qualityBoost for silver
    const qualityMult = 1 + (fert.qualityBoost * 0.50); // simplified model
    sellPrice = Math.ceil(sellPrice * qualityMult);
  }

  // Artisan processing
  let displaySell = sellPrice;
  if (artisan && crop.artisan.type !== "none") {
    const baseProduct = crop.sell * crop.artisan.mult * (tiller ? 1.1 : 1);
    sellPrice = Math.ceil(baseProduct * 1.4); // Artisan +40%
    displaySell = Math.ceil(crop.sell * crop.artisan.mult * (tiller ? 1.1 : 1));
  }

  const totalSeedCost = crop.seed * Math.max(1, harvests);
  totalIncome = sellPrice * harvests;
  const profit = totalIncome - (crop.seed > 0 ? crop.seed : 0);

  // Calculate total days from planting to last harvest
  let totalDays;
  if (crop.regrow > 0) {
    totalDays = grow + (harvests - 1) * (crop.regrow * (agri ? 0.9 : 1));
  } else {
    totalDays = grow;
  }
  totalDays = Math.max(1, totalDays);
  
  const profitPerDay = profit / totalDays;

  // Per-day with no seed cost factored (for display)
  const grossPerDay = totalIncome / totalDays;

  return {
    name: crop.name,
    seedCost: crop.seed,
    growth: crop.grow,
    effectiveGrowth: grow,
    regrow: crop.regrow > 0 ? `Every ${crop.regrow}d` : "No",
    regrowNum: crop.regrow,
    baseSell: crop.sell,
    displaySell: displaySell,
    harvests: harvests,
    totalSeedCost: totalSeedCost,
    totalIncome: Math.round(totalIncome),
    profit: Math.round(profit),
    profitPerDay: Math.round(profitPerDay * 100) / 100,
    grossPerDay: Math.round(grossPerDay * 100) / 100,
    note: crop.note,
    season: season,
    id: crop.name.replace(/[^a-zA-Z0-9]/g, '_') + '_' + season,
    fertilizer: fertilizer
  };
}

// ── Update UI ──
function updateTable() {
  const season = document.getElementById("season-select").value;
  const artisan = document.getElementById("artisan-check").checked;
  const tiller = document.getElementById("tiller-check").checked;
  const agri = document.getElementById("agri-check").checked;
  const fertilizer = document.getElementById("fertilizer-select").value;

  let crops = [];
  
  // Get crops
  if (season === "all") {
    for (const s of ["spring", "summer", "fall", "winter"]) {
      if (CROPS[s]) crops = crops.concat(CROPS[s].map(c => ({ ...c, _season: s })));
    }
    crops = crops.concat(CROPS.any.map(c => ({ ...c, _season: "any" })));
  } else {
    if (CROPS[season]) crops = crops.concat(CROPS[season].map(c => ({ ...c, _season: season })));
    if (season === "greenhouse") crops = crops.concat(CROPS.any.map(c => ({ ...c, _season: "any" })));
    if (season === "fall") {
      const corn = CROPS.summer.find(c => c.name === "Corn");
      if (corn) crops.push({ ...corn, _season: "fall" });
    }
  }

  const results = crops.map(c => calcProfit(c, c._season || season, artisan, tiller, agri, fertilizer));
  results.sort((a, b) => b.profitPerDay - a.profitPerDay);

  // Get checked batch items
  const checked = new Set();
  document.querySelectorAll(".batch-checkbox:checked").forEach(cb => checked.add(cb.dataset.cropId));

  // Table
  const tbody = document.getElementById("crop-tbody");
  tbody.innerHTML = results.map((r, idx) => {
    const cropId = r.id + '_' + idx;
    const isChecked = checked.has(cropId);
    const fertLabel = FERTILIZERS[fertilizer]?.label || "None";
    return `
    <tr class="${isChecked ? 'batch-selected' : ''}">
      <td><input type="checkbox" class="batch-checkbox" data-crop-id="${cropId}" ${isChecked ? 'checked' : ''} onchange="updateBatchSummary()"></td>
      <td><strong>${r.name}</strong></td>
      <td>${r.seedCost > 0 ? r.seedCost + 'g' : 'Free'}</td>
      <td>${r.growth}d${r.effectiveGrowth !== r.growth ? ' → ' + r.effectiveGrowth + 'd' : ''}</td>
      <td>${r.regrow}</td>
      <td>${r.baseSell}g</td>
      <td>${r.harvests}</td>
      <td>${r.totalIncome}g</td>
      <td><strong>${r.profitPerDay}g</strong></td>
      <td style="font-size:0.75em;color:rgba(255,255,255,0.5);">${fertLabel}</td>
      <td style="font-size:0.8em; opacity:0.7;">${r.note}</td>
    </tr>`;
  }).join("");

  // Chart (top 12)
  const ctx = document.getElementById("profit-chart")?.getContext("2d");
  if (ctx) {
    if (window.profitChart) window.profitChart.destroy();

    const top12 = results.slice(0, 12);
    window.profitChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: top12.map(r => r.name),
        datasets: [{
          label: "Profit per Day (g)",
          data: top12.map(r => r.profitPerDay),
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
  }

  // Empty handling
  if (results.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:40px;">❄️ No plantable crops in this filter (try a different season!)</td></tr>';
  }

  updateBatchSummary();
}

// ── Batch Selection Summary ──
function updateBatchSummary() {
  const els = document.querySelector(".batch-summary");
  if (!els) return;

  const table = document.getElementById("crop-tbody");
  if (!table) return;

  let totalIncome = 0;
  let totalSeedCost = 0;
  let totalProfit = 0;
  let count = 0;

  document.querySelectorAll(".batch-checkbox:checked").forEach(cb => {
    const row = cb.closest("tr");
    if (!row) return;
    const cells = row.querySelectorAll("td");
    if (cells.length < 9) return;
    // Total income is in cell index 7
    const income = parseInt(cells[7].textContent.replace(/[^0-9]/g, ""));
    const seedCost = parseInt(cells[2].textContent.replace(/[^0-9]/g, ""));
    if (!isNaN(income)) totalIncome += income;
    if (!isNaN(seedCost)) totalSeedCost += seedCost;
    count++;
  });

  totalProfit = totalIncome - totalSeedCost;

  document.getElementById("batch-count").textContent = count;
  document.getElementById("batch-seed-cost").textContent = totalSeedCost + "g";
  document.getElementById("batch-income").textContent = totalIncome + "g";
  document.getElementById("batch-profit").textContent = totalProfit + "g";
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("season-select")?.addEventListener("change", updateTable);
  document.getElementById("fertilizer-select")?.addEventListener("change", updateTable);
  document.getElementById("artisan-check")?.addEventListener("change", updateTable);
  document.getElementById("tiller-check")?.addEventListener("change", updateTable);
  document.getElementById("agri-check")?.addEventListener("change", updateTable);
  updateTable();
});
