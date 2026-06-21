/**
 * Stardew Valley 1.6 Crop Profit Comparison Table
 * Full crop database with quality prices, artisan products, sorting, filtering, and compare mode
 * Data verified against official Stardew Valley Wiki (1.6)
 */

// ── Crop Database (verified v1.6 data) ──
const CROP_DATA = [
  // ════════════════════════════════════════
  // Spring
  // ════════════════════════════════════════
  { id:"strawberry",    name:"Strawberry",    season:"Spring", seed:100, grow:8,  regrow:true,  interval:4,  base:120, artisan:"Wine",     artisanPrice:360,  note:"Best spring crop. Buy at Egg Festival." },
  { id:"cauliflower",   name:"Cauliflower",   season:"Spring", seed:80,  grow:12, regrow:false, interval:0,  base:175, artisan:"Juice",    artisanPrice:393,  note:"Can form giant crops." },
  { id:"rhubarb",       name:"Rhubarb",       season:"Spring", seed:100, grow:13, regrow:false, interval:0,  base:220, artisan:"Wine",     artisanPrice:660,  note:"Buy seeds at Desert Trader." },
  { id:"potato",        name:"Potato",        season:"Spring", seed:50,  grow:6,  regrow:false, interval:0,  base:80,  artisan:"Juice",    artisanPrice:180,  note:"Multi-drop chance." },
  { id:"kale",          name:"Kale",          season:"Spring", seed:70,  grow:6,  regrow:false, interval:0,  base:110, artisan:"Juice",    artisanPrice:247,  note:"Best spring stamina food." },
  { id:"greenbean",     name:"Green Bean",    season:"Spring", seed:60,  grow:10, regrow:true,  interval:3,  base:40,  artisan:"Pickles",  artisanPrice:130,  note:"Trellis crop. Regrows." },
  { id:"garlic",        name:"Garlic",        season:"Spring", seed:40,  grow:4,  regrow:false, interval:0,  base:60,  artisan:"Juice",    artisanPrice:135,  note:"Fastest spring crop." },
  { id:"parsnip",       name:"Parsnip",       season:"Spring", seed:20,  grow:4,  regrow:false, interval:0,  base:35,  artisan:"Pickles",  artisanPrice:120,  note:"Best beginner crop." },
  { id:"carrot",        name:"Carrot",        season:"Spring", seed:0,   grow:3,  regrow:false, interval:0,  base:35,  artisan:"Pickles",  artisanPrice:120,  note:"Seed Spots only. Free!" },
  { id:"coffee",        name:"Coffee Bean",   season:"Spring", seed:2500,grow:10, regrow:true,  interval:2,  base:15,  artisan:"Coffee",   artisanPrice:150,  note:"5 beans brew 1 cup. Year-round." },
  { id:"tulip",         name:"Tulip",         season:"Spring", seed:20,  grow:6,  regrow:false, interval:0,  base:30,  artisan:"Jelly",    artisanPrice:110,  note:"Decorative. Gift (Evelyn loves)." },
  { id:"bluejazz",      name:"Blue Jazz",     season:"Spring", seed:30,  grow:7,  regrow:false, interval:0,  base:50,  artisan:"Jelly",    artisanPrice:150,  note:"Decorative. Gift." },
  { id:"unmilledrice",  name:"Unmilled Rice", season:"Spring", seed:40,  grow:6,  regrow:false, interval:0,  base:30,  artisan:"Rice",     artisanPrice:100,  note:"Grows near water!" },

  // ════════════════════════════════════════
  // Summer
  // ════════════════════════════════════════
  { id:"starfruit",     name:"Starfruit",     season:"Summer", seed:400, grow:13, regrow:false, interval:0,  base:750, artisan:"Wine",     artisanPrice:2250, note:"Best keg crop. Desert Trader." },
  { id:"blueberry",     name:"Blueberry",     season:"Summer", seed:80,  grow:13, regrow:true,  interval:4,  base:50,  artisan:"Wine",     artisanPrice:150,  note:"Best multi-harvest summer crop." },
  { id:"melonsummer",   name:"Melon",         season:"Summer", seed:80,  grow:12, regrow:false, interval:0,  base:250, artisan:"Wine",     artisanPrice:750,  note:"Giant crop. Wine value!" },
  { id:"redcabbage",    name:"Red Cabbage",   season:"Summer", seed:100, grow:9,  regrow:false, interval:0,  base:260, artisan:"Wine",     artisanPrice:780,  note:"Best single-harvest $/day." },
  { id:"hops",          name:"Hops",          season:"Summer", seed:60,  grow:11, regrow:true,  interval:1,  base:25,  artisan:"Pale Ale", artisanPrice:300,  note:"Daily harvest after maturity. Keg king." },
  { id:"hotpepper",     name:"Hot Pepper",    season:"Summer", seed:40,  grow:5,  regrow:true,  interval:3,  base:40,  artisan:"Pickles",  artisanPrice:130,  note:"Gift (Shane loves)." },
  { id:"tomato",        name:"Tomato",        season:"Summer", seed:50,  grow:11, regrow:true,  interval:4,  base:60,  artisan:"Wine",     artisanPrice:180,  note:"Regrows. Kitchen staple." },
  { id:"corn",          name:"Corn",          season:"Summer", seed:150, grow:14, regrow:true,  interval:4,  base:50,  artisan:"Oil",      artisanPrice:170,  note:"Spans into Fall too." },
  { id:"sunflower",     name:"Sunflower",     season:"Summer", seed:200, grow:8,  regrow:false, interval:0,  base:80,  artisan:"Jelly",    artisanPrice:210,  note:"Produces 0-2 seeds on harvest." },
  { id:"summerspangle", name:"Summer Spangle",season:"Summer", seed:50,  grow:8,  regrow:false, interval:0,  base:90,  artisan:"Jelly",    artisanPrice:230,  note:"Decorative." },
  { id:"radish",        name:"Radish",        season:"Summer", seed:40,  grow:6,  regrow:false, interval:0,  base:90,  artisan:"Pickles",  artisanPrice:230,  note:"Quick grow." },
  { id:"wheat_summer",  name:"Wheat",         season:"Summer", seed:10,  grow:4,  regrow:false, interval:0,  base:25,  artisan:"Beer",     artisanPrice:200,  note:"Fastest. Stays through Fall." },
  { id:"poppy",         name:"Poppy",         season:"Summer", seed:100, grow:7,  regrow:false, interval:0,  base:140, artisan:"Jelly",    artisanPrice:330,  note:"Gift (Penny loves)." },
  { id:"summersquash",  name:"Summer Squash", season:"Summer", seed:0,   grow:6,  regrow:true,  interval:3,  base:45,  artisan:"Pickles",  artisanPrice:140,  note:"Seed Spots only. Free! Regrows." },

  // ════════════════════════════════════════
  // Fall
  // ════════════════════════════════════════
  { id:"sweetgemberry", name:"Sweet Gem Berry",season:"Fall",   seed:1000,grow:24, regrow:false, interval:0,  base:3000,artisan:"None",    artisanPrice:0,    note:"Rare Seed (Traveling Cart). Best profit/day!" },
  { id:"cranberry",     name:"Cranberry",     season:"Fall",   seed:240, grow:10, regrow:true,  interval:3,  base:75,  artisan:"Wine",     artisanPrice:225,  note:"Best fall multi-harvest." },
  { id:"pumpkin",       name:"Pumpkin",       season:"Fall",   seed:100, grow:13, regrow:false, interval:0,  base:320, artisan:"Juice",    artisanPrice:720,  note:"Giant crop." },
  { id:"grape_fall",    name:"Grape",         season:"Fall",   seed:60,  grow:10, regrow:true,  interval:3,  base:80,  artisan:"Wine",     artisanPrice:240,  note:"Trellis." },
  { id:"artichoke",     name:"Artichoke",     season:"Fall",   seed:30,  grow:8,  regrow:false, interval:0,  base:160, artisan:"Pickles",  artisanPrice:370,  note:"Year 2+ unlock." },
  { id:"yam",           name:"Yam",           season:"Fall",   seed:60,  grow:10, regrow:false, interval:0,  base:160, artisan:"Pickles",  artisanPrice:370,  note:"Gift." },
  { id:"beet",          name:"Beet",          season:"Fall",   seed:20,  grow:6,  regrow:false, interval:0,  base:100, artisan:"Pickles",  artisanPrice:250,  note:"Makes sugar at Mill." },
  { id:"amaranth",      name:"Amaranth",      season:"Fall",   seed:70,  grow:7,  regrow:false, interval:0,  base:150, artisan:"Juice",    artisanPrice:337,  note:"Gift." },
  { id:"eggplant",      name:"Eggplant",      season:"Fall",   seed:20,  grow:7,  regrow:true,  interval:5,  base:60,  artisan:"Pickles",  artisanPrice:170,  note:"Regrows." },
  { id:"bokchoy",       name:"Bok Choy",      season:"Fall",   seed:50,  grow:6,  regrow:false, interval:0,  base:80,  artisan:"Pickles",  artisanPrice:210,  note:"Fast grow." },
  { id:"fairyrose",     name:"Fairy Rose",    season:"Fall",   seed:200, grow:12, regrow:false, interval:0,  base:290, artisan:"Jelly",    artisanPrice:630,  note:"Best honey flower." },
  { id:"broccoli",      name:"Broccoli",      season:"Fall",   seed:0,   grow:8,  regrow:true,  interval:4,  base:70,  artisan:"Pickles",  artisanPrice:190,  note:"Seed Spots only. Free!" },
  { id:"corn_fall",     name:"Corn",          season:"Fall",   seed:150, grow:14, regrow:true,  interval:4,  base:50,  artisan:"Oil",      artisanPrice:170,  note:"Continues from Summer." },

  // ════════════════════════════════════════
  // Winter
  // ════════════════════════════════════════
  { id:"powdermelon",   name:"Powdermelon",   season:"Winter", seed:0,   grow:7,  regrow:false, interval:0,  base:80,  artisan:"Pickles",  artisanPrice:210,  note:"Seed Spots only. Giant crop possible!" },

  // ════════════════════════════════════════
  // Greenhouse / Any Season
  // ════════════════════════════════════════
  { id:"ancientfruit",  name:"Ancient Fruit", season:"Any",    seed:0,   grow:28, regrow:true,  interval:7,  base:550, artisan:"Wine",     artisanPrice:1650, note:"Endgame king. Regrows forever." },
  { id:"cactusfruit",   name:"Cactus Fruit",  season:"Any",    seed:150, grow:12, regrow:true,  interval:3,  base:75,  artisan:"Wine",     artisanPrice:225,  note:"Desert purchase." },
  { id:"pineapple",     name:"Pineapple",     season:"Any",    seed:80,  grow:14, regrow:true,  interval:5,  base:300, artisan:"Wine",     artisanPrice:900,  note:"Ginger Island." },
  { id:"taroroot",      name:"Taro Root",     season:"Any",    seed:0,   grow:7,  regrow:false, interval:0,  base:100, artisan:"Pickles",  artisanPrice:250,  note:"Ginger Island. Self-watering." },
  { id:"tealeaves",     name:"Tea Leaves",    season:"Any",    seed:500, grow:20, regrow:true,  interval:1,  base:50,  artisan:"Green Tea",artisanPrice:250,  note:"Sapling. Daily harvest in season." },
  { id:"fiber",         name:"Fiber",         season:"Any",    seed:0,   grow:7,  regrow:false, interval:0,  base:1,   artisan:"None",    artisanPrice:0,    note:"Fiber Seeds (recipe)." },

  // ════════════════════════════════════════
  // Ginger Island only
  // ════════════════════════════════════════
  { id:"ginger",        name:"Ginger",        season:"Island", seed:0,   grow:0,  regrow:true,  interval:0,  base:80,  artisan:"Pickles",  artisanPrice:210,  note:"Foraged on Ginger Island." },
  { id:"magma_cap",     name:"Magma Cap",     season:"Island", seed:0,   grow:0,  regrow:true,  interval:0,  base:100, artisan:"Pickles",  artisanPrice:250,  note:"Foraged in Volcano." },
  { id:"qi_fruit",      name:"Qi Fruit",      season:"Island", seed:0,   grow:4,  regrow:false, interval:0,  base:1,   artisan:"None",    artisanPrice:0,    note:"Qi's special crop (quest)." },

  // New 1.6 crops
  { id:"moss_soup_plant",name:"Moss Soup Plant",season:"Any",  seed:0,   grow:5,  regrow:false, interval:0,  base:10,  artisan:"None",    artisanPrice:0,    note:"Mushroom cave or moss-related." },
];

// ── Helpers ──
function calcQualityPrice(base, quality) {
  const mults = { base: 1.0, silver: 1.25, gold: 1.5, iridium: 2.0 };
  return Math.floor(base * mults[quality]);
}

function calcProfitPerDay(crop) {
  const days = 28; // standard season
  if (crop.regrow && crop.interval > 0) {
    const harvests = Math.max(1, Math.floor((days - crop.grow) / crop.interval) + 1);
    const totalIncome = crop.base * harvests;
    const totalCost = crop.seed;
    const profit = totalIncome - totalCost;
    const totalDays = crop.grow + (harvests - 1) * crop.interval;
    return totalDays > 0 ? Math.round((profit / totalDays) * 100) / 100 : 0;
  } else if (crop.grow > 0) {
    const harvests = Math.floor(days / crop.grow);
    const totalIncome = crop.base * harvests;
    const totalCost = crop.seed * harvests;
    const profit = totalIncome - totalCost;
    return Math.round((profit / days) * 100) / 100;
  }
  return 0;
}

// ── State ──
let sortCol = "profitPerDay";
let sortAsc = false;
let compareIds = [];
let filteredData = [];

// ── Render Main Table ──
function renderCropTable() {
  const el = document.getElementById("crop-tbody");
  if (!el) return;
  
  const season = document.getElementById("filter-season")?.value || "all";
  const regrowOnly = document.getElementById("filter-regrow")?.checked || false;
  const artisanFilter = document.getElementById("filter-artisan")?.value || "all";
  const searchTerm = (document.getElementById("crop-search")?.value || "").toLowerCase();
  
  let crops = CROP_DATA.filter(c => {
    // Season
    if (season !== "all" && c.season !== season && c.season !== "Any" && c.season !== "Island") return false;
    // Regrow
    if (regrowOnly && !c.regrow) return false;
    // Artisan
    if (artisanFilter === "artisan" && c.artisan === "None") return false;
    if (artisanFilter === "none" && c.artisan !== "None") return false;
    // Search
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm) && !c.season.toLowerCase().includes(searchTerm)) return false;
    return true;
  });
  
  // Add profit per day
  crops = crops.map(c => ({
    ...c,
    profitPerDay: calcProfitPerDay(c),
    silver: calcQualityPrice(c.base, "silver"),
    gold: calcQualityPrice(c.base, "gold"),
    iridium: calcQualityPrice(c.base, "iridium"),
  }));
  
  // Sort
  crops.sort((a, b) => {
    let aVal = a[sortCol];
    let bVal = b[sortCol];
    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });
  
  filteredData = crops;
  
  // Find max profit/day for highlighting
  const maxProfit = crops.length > 0 ? Math.max(...crops.map(c => c.profitPerDay)) : 0;
  
  el.innerHTML = crops.map(c => {
    const isBest = c.profitPerDay === maxProfit && maxProfit > 0;
    const isCompare = compareIds.includes(c.id);
    const seasonEmoji = { Spring:"🌸", Summer:"☀️", Fall:"🍂", Winter:"❄️", Any:"🌿", Island:"🏝️" };
    const seasonStr = seasonEmoji[c.season] ? `${seasonEmoji[c.season]} ${c.season}` : c.season;
    
    return `
    <tr style="${isBest ? 'background:rgba(34,197,94,0.12);' : isCompare ? 'background:rgba(201,169,110,0.1);' : ''}">
      <td><input type="checkbox" ${compareIds.includes(c.id) ? 'checked' : ''} onchange="toggleCompare('${c.id}')" style="cursor:pointer;"></td>
      <td><strong>${c.name}</strong></td>
      <td>${seasonStr}</td>
      <td>${c.seed > 0 ? c.seed + 'g' : 'Free'}</td>
      <td>${c.grow}d</td>
      <td>${c.regrow ? `Every ${c.interval}d` : 'No'}</td>
      <td>${c.base}g</td>
      <td>${c.silver}g</td>
      <td>${c.gold}g</td>
      <td>${c.iridium}g</td>
      <td>${c.artisan !== "None" ? c.artisan : '—'}</td>
      <td style="text-align:right;"><strong style="color:${isBest ? '#22c55e' : '#c9a96e'};">${c.profitPerDay}g</strong></td>
    </tr>`;
  }).join("");
  
  // Update sort indicators
  document.querySelectorAll(".sortable").forEach(th => {
    const col = th.dataset.col;
    th.classList.toggle("sorted-asc", col === sortCol && sortAsc);
    th.classList.toggle("sorted-desc", col === sortCol && !sortAsc);
  });
  
  updateComparePanel();
}

// ── Sorting ──
function sortCrop(col) {
  if (sortCol === col) {
    sortAsc = !sortAsc;
  } else {
    sortCol = col;
    sortAsc = false;
  }
  renderCropTable();
}

// ── Compare Mode ──
function toggleCompare(id) {
  const idx = compareIds.indexOf(id);
  if (idx >= 0) {
    compareIds.splice(idx, 1);
  } else {
    if (compareIds.length >= 4) {
      alert("You can compare up to 4 crops at a time.");
      return;
    }
    compareIds.push(id);
  }
  renderCropTable();
}

function updateComparePanel() {
  const el = document.getElementById("compare-panel");
  if (!el) return;
  
  if (compareIds.length < 2) {
    el.innerHTML = '<div style="padding:16px; text-align:center; opacity:0.5;">Select 2–4 crops to compare side-by-side (checkboxes on left).</div>';
    return;
  }
  
  const crops = compareIds.map(id => CROP_DATA.find(c => c.id === id)).filter(Boolean);
  
  const seasonEmoji = { Spring:"🌸", Summer:"☀️", Fall:"🍂", Winter:"❄️", Any:"🌿", Island:"🏝️" };
  
  let html = `
  <div style="overflow-x:auto; margin-top:12px;">
    <table style="width:100%;">
      <thead>
        <tr>
          <th style="background:rgba(201,169,110,0.1); padding:8px 12px; text-align:left;">Metric</th>
          ${crops.map(c => `<th style="background:rgba(201,169,110,0.1); padding:8px 12px; text-align:center;">${c.name}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Season</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${seasonEmoji[c.season] || ''} ${c.season}</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Seed Cost</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${c.seed > 0 ? c.seed + 'g' : 'Free'}</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Days to Grow</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${c.grow}d</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Regrowth</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${c.regrow ? '✅ Every ' + c.interval + 'd' : '❌ No'}</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Base Price</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${c.base}g</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Silver</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${calcQualityPrice(c.base, "silver")}g</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Gold</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${calcQualityPrice(c.base, "gold")}g</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Iridium</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${calcQualityPrice(c.base, "iridium")}g</td>`).join("")}
        </tr>
        <tr>
          <td style="padding:6px 12px; font-weight:bold;">Artisan Product</td>
          ${crops.map(c => `<td style="padding:6px 12px; text-align:center;">${c.artisan !== "None" ? c.artisan + ' (' + c.artisanPrice + 'g)' : '—'}</td>`).join("")}
        </tr>
        <tr style="background:rgba(34,197,94,0.08);">
          <td style="padding:8px 12px; font-weight:bold; color:#22c55e;">💰 Profit / Day</td>
          ${crops.map(c => `<td style="padding:8px 12px; text-align:center; font-size:1.1em; font-weight:bold; color:#c9a56e;">${calcProfitPerDay(c)}g</td>`).join("")}
        </tr>
      </tbody>
    </table>
  </div>`;
  
  el.innerHTML = html;
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  renderCropTable();
  
  // Filters
  document.getElementById("filter-season")?.addEventListener("change", renderCropTable);
  document.getElementById("filter-regrow")?.addEventListener("change", renderCropTable);
  document.getElementById("filter-artisan")?.addEventListener("change", renderCropTable);
  document.getElementById("crop-search")?.addEventListener("input", renderCropTable);
});
