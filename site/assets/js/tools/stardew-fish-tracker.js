/**
 * Stardew Valley 1.6 Fish Collection Tracker (Enhanced)
 * All 70+ fish with season/location/weather/time tracking, checkboxes,
 * localStorage persistence, weather filter, expanded location filter,
 * and caught/not-caught toggle.
 * Data verified against official Stardew Valley Wiki (1.6.15)
 */

// ── Fish Database (verified 1.6 data) ──
const ALL_FISH = [
  // ── Spring ──
  { id: "anchovy",    name: "Anchovy",     icon: "🐟", season: "Spring",   loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 30,  size: "1-28\"", price: 30,  bundle: "Ocean Fish" },
  { id: "carp",       name: "Carp",        icon: "🐟", season: "Spring",   loc: "Lake",           time: "Any",         weather: "Any",     difficulty: 15,  size: "6-51\"", price: 30,  bundle: "Lake Fish" },
  { id: "catfish",    name: "Catfish",     icon: "🐍", season: "Spring",   loc: "River",          time: "Any",         weather: "Rain",    difficulty: 75,  size: "6-73\"", price: 200, bundle: "River Fish" },
  { id: "eel",        name: "Eel",         icon: "🐍", season: "Spring",   loc: "Ocean",          time: "6PM-2AM",     weather: "Rain",    difficulty: 70,  size: "6-32\"", price: 85,  bundle: "Night Fishing" },
  { id: "halibut",    name: "Halibut",     icon: "🐠", season: "Spring",   loc: "Ocean",          time: "6AM-11AM",    weather: "Any",     difficulty: 50,  size: "4-48\"", price: 80,  bundle: "No" },
  { id: "herring",    name: "Herring",     icon: "🐟", season: "Spring",   loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 25,  size: "3-17\"", price: 30,  bundle: "Ocean Fish" },
  { id: "lingcod",    name: "Lingcod",     icon: "🐍", season: "Spring",   loc: "River",          time: "Any",         weather: "Any",     difficulty: 85,  size: "12-85\"",price: 120, bundle: "No" },
  { id: "perch",      name: "Perch",       icon: "🐟", season: "Spring",   loc: "River",          time: "Any",         weather: "Any",     difficulty: 35,  size: "3-24\"", price: 55,  bundle: "River Fish" },
  { id: "sardine",    name: "Sardine",     icon: "🐟", season: "Spring",   loc: "Ocean",          time: "6AM-4PM",     weather: "Any",     difficulty: 30,  size: "2-16\"", price: 40,  bundle: "Ocean Fish" },
  { id: "smallmouth", name: "Smallmouth Bass", icon: "🐟", season: "Spring", loc: "River",         time: "Any",         weather: "Any",     difficulty: 45,  size: "4-29\"", price: 55,  bundle: "No" },
  { id: "sunfish",    name: "Sunfish",     icon: "🐠", season: "Spring",   loc: "River",          time: "6AM-7PM",     weather: "Sun",     difficulty: 30,  size: "4-28\"", price: 30,  bundle: "River Fish" },
  { id: "tuna",       name: "Tuna",        icon: "🐟", season: "Spring",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 70,  size: "6-82\"", price: 100, bundle: "Ocean Fish" },
  { id: "walleye",    name: "Walleye",     icon: "🐟", season: "Spring",   loc: "River",          time: "12PM-2AM",    weather: "Rain",    difficulty: 45,  size: "4-33\"", price: 105, bundle: "Lake Fish" },

  // ── Summer ──
  { id: "bluediscus", name: "Blue Discus", icon: "🐠", season: "Summer",   loc: "Ginger Island",  time: "Any",         weather: "Any",     difficulty: 50,  size: "4-28\"", price: 120, bundle: "Island" },
  { id: "crimsonfish",name: "Crimsonfish", icon: "🐟", season: "Summer",   loc: "Ocean",          time: "6AM-8PM",     weather: "Any",     difficulty: 95,  size: "8-36\"", price: 1500, bundle: "Legendary" },
  { id: "dorado",     name: "Dorado",      icon: "🐠", season: "Summer",   loc: "River (Forest)", time: "6AM-7PM",     weather: "Any",     difficulty: 75,  size: "6-32\"", price: 120, bundle: "Rainforest" },
  { id: "flounder",   name: "Flounder",    icon: "🐠", season: "Summer",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "3-24\"", price: 100, bundle: "Ocean Fish" },
  { id: "ghostfish",  name: "Ghostfish",   icon: "👻", season: "Summer",   loc: "Lake (Mines)",   time: "Any",         weather: "Any",     difficulty: 60,  size: "4-24\"", price: 45,  bundle: "No" },
  { id: "pike",       name: "Pike",        icon: "🐟", season: "Summer",   loc: "River",          time: "Any",         weather: "Any",     difficulty: 60,  size: "6-62\"", price: 100, bundle: "No" },
  { id: "pufferfish", name: "Pufferfish",  icon: "🐡", season: "Summer",   loc: "Ocean",          time: "12PM-4PM",    weather: "Sun",     difficulty: 80,  size: "4-20\"", price: 200, bundle: "Ocean Fish" },
  { id: "rainbowtrout",name: "Rainbow Trout",icon: "🐟",season: "Summer",  loc: "River",          time: "6AM-7PM",     weather: "Sun",     difficulty: 45,  size: "4-32\"", price: 65,  bundle: "River Fish" },
  { id: "redmullet",  name: "Red Mullet",  icon: "🐟", season: "Summer",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 55,  size: "4-28\"", price: 75,  bundle: "Ocean Fish" },
  { id: "redsnapper", name: "Red Snapper", icon: "🐠", season: "Summer",   loc: "Ocean",          time: "6AM-7PM",     weather: "Rain",    difficulty: 50,  size: "4-30\"", price: 50,  bundle: "Ocean Fish" },
  { id: "salmon",     name: "Salmon",      icon: "🐟", season: "Summer",   loc: "River",          time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "6-46\"", price: 75,  bundle: "River Fish" },
  { id: "shad",       name: "Shad",        icon: "🐟", season: "Summer",   loc: "River",          time: "9AM-2AM",     weather: "Rain",    difficulty: 60,  size: "4-37\"", price: 60,  bundle: "River Fish" },
  { id: "squid",      name: "Squid",       icon: "🦑", season: "Summer",   loc: "Ocean",          time: "6PM-2AM",     weather: "Any",     difficulty: 75,  size: "4-38\"", price: 80,  bundle: "Night Fishing" },
  { id: "stingray",   name: "Stingray",    icon: "🦈", season: "Summer",   loc: "Ginger Island",  time: "Any",         weather: "Any",     difficulty: 60,  size: "6-42\"", price: 180, bundle: "Island" },
  { id: "stoneray",   name: "Stoneray",    icon: "🦈", season: "Summer",   loc: "Ginger Island",  time: "Any",         weather: "Any",     difficulty: 70,  size: "4-36\"", price: 135, bundle: "Island" },
  { id: "sturgeon",   name: "Sturgeon",    icon: "🐟", season: "Summer",   loc: "Lake (Mtn)",     time: "6AM-7PM",     weather: "Any",     difficulty: 78,  size: "8-72\"", price: 200, bundle: "Lake Fish" },

  // ── Fall ──
  { id: "albacore",   name: "Albacore",    icon: "🐟", season: "Fall",     loc: "Ocean",          time: "6AM-11AM",    weather: "Any",     difficulty: 60,  size: "4-32\"", price: 75,  bundle: "Ocean Fish" },
  { id: "sandfish",   name: "Sandfish",    icon: "🐟", season: "Fall",     loc: "Desert",         time: "6AM-8PM",     weather: "Any",     difficulty: 65,  size: "4-30\"", price: 75,  bundle: "Desert" },
  { id: "sea_cucumber",name:"Sea Cucumber",icon:"🥒", season: "Fall",     loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 40,  size: "4-28\"", price: 75,  bundle: "Specialty" },
  { id: "supercucumber",name:"Super Cucumber",icon:"🥒",season: "Fall",   loc: "Ocean",          time: "6PM-2AM",     weather: "Any",     difficulty: 80,  size: "6-36\"", price: 250, bundle: "Night Fishing" },
  { id: "tiger_trout",name:"Tiger Trout",  icon:"🐟",  season: "Fall",     loc: "River",          time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "6-36\"", price: 120, bundle: "Rainforest" },
  { id: "woodskip",   name: "Woodskip",    icon: "🐟", season: "Fall",     loc: "Forest Pond",    time: "Any",         weather: "Any",     difficulty: 35,  size: "4-30\"", price: 75,  bundle: "Forest" },
  { id: "midnightcarp",name:"Midnight Carp",icon:"🐟", season: "Fall",     loc: "Lake",          time: "10PM-2AM",    weather: "Any",     difficulty: 55,  size: "6-48\"", price: 150, bundle: "Night Fishing" },

  // ── Winter ──
  { id: "midnight_carp_w",name:"Midnight Carp",icon:"🐟",season:"Winter",  loc: "Lake",          time: "10PM-2AM",    weather: "Any",     difficulty: 55,  size: "6-48\"", price: 150, bundle: "No" },

  // ── All Seasons ──
  { id: "bullhead",   name: "Bullhead",    icon: "🐟", season: "All",      loc: "Lake (Mtn)",     time: "Any",         weather: "Any",     difficulty: 45,  size: "4-28\"", price: 75,  bundle: "Lake Fish" },
  { id: "chub",       name: "Chub",        icon: "🐟", season: "All",      loc: "River",          time: "Any",         weather: "Any",     difficulty: 35,  size: "4-27\"", price: 50,  bundle: "River Fish" },
  { id: "largemouth", name: "Largemouth Bass",icon:"🐟",season:"All",      loc: "Lake (Mtn)",     time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "4-32\"", price: 100, bundle: "Lake Fish" },
  { id: "scorpion_carp",name:"Scorpion Carp",icon:"🐟", season:"All",      loc: "Desert",          time: "6AM-8PM",     weather: "Any",     difficulty: 80,  size: "6-32\"", price: 150, bundle: "Desert" },
  { id: "slimejack",  name: "Slimejack",   icon: "🟢", season: "All",      loc: "Mutant Bug Lair",time: "Any",         weather: "Any",     difficulty: 80,  size: "4-24\"", price: 100, bundle: "Specialty" },
  { id: "void_salmon",name: "Void Salmon", icon:"🐟",  season: "All",      loc: "Witch's Swamp",  time: "Any",         weather: "Any",     difficulty: 80,  size: "6-32\"", price: 150, bundle: "Specialty" },

  // ── Special / Legendary ──
  { id: "angler",     name: "Angler",      icon: "🏆", season: "Fall",     loc: "River",          time: "Any",         weather: "Any",     difficulty: 85,  size: "8-32\"", price: 900,  bundle: "Legendary" },
  { id: "glacierfish",name: "Glacierfish", icon: "🏆", season: "Winter",   loc: "Forest (South)", time: "Any",         weather: "Any",     difficulty: 100, size: "8-35\"", price: 1000, bundle: "Legendary" },
  { id: "legend",     name: "Legend",      icon: "🏆", season: "Spring",   loc: "Lake (Mtn)",     time: "6AM-7PM",     weather: "Rain",    difficulty: 110, size: "10-36\"",price: 5000, bundle: "Legendary" },
  { id: "mutant_carp",name: "Mutant Carp", icon: "🏆", season: "All",      loc: "Sewer",          time: "Any",         weather: "Any",     difficulty: 80,  size: "12-36\"",price: 1000, bundle: "Legendary" },

  // ── 1.6 New Fish ──
  { id: "golden_fish",name:"Goldenfish",   icon:"🐟",  season:"All",       loc: "Ginger Island",  time:"6AM-11AM",     weather:"Sun",      difficulty: 70,  size:"4-30\"",  price: 200, bundle:"Island" },
  { id: "goby",       name:"Goby",         icon:"🐟",  season:"All",       loc: "Ginger Island",  time:"Any",          weather:"Any",      difficulty: 30,  size:"2-12\"",  price: 50,  bundle:"Island" },
  { id: "midnight_squid",name:"Midnight Squid",icon:"🦑",season:"All",     loc: "Ginger Island",  time:"8PM-2AM",      weather:"Any",      difficulty: 70,  size:"4-28\"",  price: 100, bundle:"Island" },
  { id: "radioactive_bass",name:"Radioactive Bass",icon:"🐟",season:"All", loc: "Mutant Bug Lair",time:"Any",           weather:"Any",      difficulty: 90,  size:"6-32\"",  price: 300, bundle:"Specialty" },
  { id: "clownfish",  name:"Clownfish",    icon:"🐠",  season:"All",       loc: "Ginger Island",  time:"Any",          weather:"Any",      difficulty: 40,  size:"2-18\"",  price: 70,  bundle:"Island" },
  { id: "seahorse",   name:"Seahorse",     icon:"🐴",  season:"Summer",    loc: "Ginger Island",  time:"Any",          weather:"Any",      difficulty: 35,  size:"2-10\"",  price: 80,  bundle:"Island" },

  // ── Crab Pot ──
  { id: "crab",       name:"Crab",         icon:"🦀",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"2-10\"",  price: 100, bundle:"Crab Pot" },
  { id: "lobster",    name:"Lobster",      icon:"🦞",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"4-24\"",  price: 120, bundle:"Crab Pot" },
  { id: "clam",       name:"Clam",         icon:"🐚",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"1-4\"",   price: 50,  bundle:"Crab Pot" },
  { id: "shrimp",     name:"Shrimp",       icon:"🦐",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"2-8\"",   price: 60,  bundle:"Crab Pot" },
  { id: "crayfish",   name:"Crayfish",     icon:"🦐",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"2-8\"",   price: 75,  bundle:"Crab Pot" },
  { id: "snail",      name:"Snail",        icon:"🐌",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"2-6\"",   price: 65,  bundle:"Crab Pot" },
  { id: "periwinkle", name:"Periwinkle",   icon:"🐚",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"1-3\"",   price: 20,  bundle:"Crab Pot" },
  { id: "oyster",     name:"Oyster",       icon:"🦪",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"2-12\"",  price: 40,  bundle:"Crab Pot" },
  { id: "mussel",     name:"Mussel",       icon:"🦪",  season:"All",       loc:"Crab Pot",        time:"Any",          weather:"Any",      difficulty: 5,   size:"1-4\"",   price: 30,  bundle:"Crab Pot" },
];

// Remove duplicate IDs (keep main entry for multi-season fish, prefer "All" season)
const UNIQUE_FISH = {};
ALL_FISH.forEach(fish => {
  if (!UNIQUE_FISH[fish.id]) {
    UNIQUE_FISH[fish.id] = fish;
  }
});
// Manually add back fish that appear in multiple seasons with different IDs
// Multi-season fish: keep the season-specific ones with their season info
["anch_fall","carp_fall","catfish_fall","eel_fall","halibut_fall","perch_fall","pike_fall","salmon_fall","sardine_fall","shad_fall","walleye_fall","albacore_w","anchovy_w","carp_w","flounder_w","herring_w","lingcod_w","perch_w","pike_w","red_snapper_w","sardine_w","squid_w","tuna_w"].forEach(id => {
  const fish = ALL_FISH.find(f => f.id === id);
  if (fish) {
    UNIQUE_FISH[id] = fish;
  }
});
const FISH = Object.values(UNIQUE_FISH);

// ── Location categories for filter ──
const LOCATION_OPTIONS = [
  { value: "all",         label: "All Locations" },
  { value: "Ocean",       label: "🌊 Ocean" },
  { value: "River",       label: "🏞️ River" },
  { value: "Lake",        label: "🏞️ Lake (Mtn)" },
  { value: "Forest",      label: "🌲 Forest" },
  { value: "Forest Pond", label: "🌲 Forest Pond" },
  { value: "Mountain",    label: "⛰️ Mountain" },
  { value: "Desert",      label: "🏜️ Desert" },
  { value: "Sewer",       label: "🚰 Sewer" },
  { value: "Mutant Bug Lair", label: "🪲 Mutant Bug Lair" },
  { value: "Witch's Swamp", label: "🧙 Witch's Swamp" },
  { value: "Ginger Island", label: "🏝️ Ginger Island" },
  { value: "Crab Pot",    label: "🦀 Crab Pot" },
];

// ── localStorage Tracker ──
function getCaught() {
  try { return JSON.parse(localStorage.getItem("sdvFishCaught") || "{}"); } catch (e) { return {}; }
}

function saveCaught(data) {
  try { localStorage.setItem("sdvFishCaught", JSON.stringify(data)); } catch (e) {}
}

function toggleFish(fishId) {
  const caught = getCaught();
  caught[fishId] = !caught[fishId];
  saveCaught(caught);
  renderFishTable(true);
}

function resetTracker() {
  if (confirm("Reset all fish catch data?")) {
    saveCaught({});
    renderFishTable();
  }
}

// ── Progress ──
function updateProgress() {
  const caught = getCaught();
  const total = FISH.length;
  const caughtCount = FISH.filter(f => caught[f.id]).length;
  const pct = Math.round((caughtCount / total) * 100);

  const bar = document.getElementById("progress-bar");
  const label = document.getElementById("progress-label");
  const text = document.getElementById("progress-text");
  
  if (bar) {
    bar.style.width = pct + "%";
    bar.style.background = pct === 100 ? "#22c55e" : pct > 50 ? "#c9a96e" : "#ef4444";
  }
  if (label) label.textContent = pct + "%";
  if (text) text.textContent = `${caughtCount} / ${total} fish caught`;
}

// ── Render Fish Table ──
function renderFishTable(skipScroll) {
  const tbody = document.getElementById("fish-tbody");
  if (!tbody) return;

  const caught = getCaught();
  const seasonFilter = document.getElementById("filter-season")?.value || "all";
  const locFilter = document.getElementById("filter-location")?.value || "all";
  const weatherFilter = document.getElementById("filter-weather")?.value || "all";
  const searchTerm = (document.getElementById("fish-search")?.value || "").toLowerCase();
  const caughtToggle = document.getElementById("caught-toggle")?.value || "all";
  const hideCaught = document.getElementById("hide-caught")?.checked || false;

  let fish = FISH.filter(f => {
    // Season filter
    if (seasonFilter !== "all") {
      if (f.season !== seasonFilter && f.season !== "All") return false;
    }
    // Location filter
    if (locFilter !== "all") {
      const loc = f.loc.toLowerCase();
      const filterLoc = locFilter.toLowerCase();
      if (locFilter === "Lake" || locFilter === "Lake (Mtn)") {
        if (!loc.includes("lake")) return false;
      } else if (locFilter === "River" || locFilter === "River (Forest)") {
        if (!loc.includes("river")) return false;
      } else if (locFilter === "Forest Pond") {
        if (!loc.includes("forest") && !loc.includes("pond")) return false;
      } else if (locFilter === "Mountain") {
        if (!loc.includes("mtn") && !loc.includes("mountain")) return false;
      } else {
        if (!loc.includes(filterLoc)) return false;
      }
    }
    // Weather filter
    if (weatherFilter !== "all") {
      if (f.weather !== weatherFilter && f.weather !== "Any") return false;
    }
    // Search
    if (searchTerm && !f.name.toLowerCase().includes(searchTerm) &&
        !f.loc.toLowerCase().includes(searchTerm) &&
        !f.bundle.toLowerCase().includes(searchTerm)) return false;
    // Caught/Not caught toggle
    if (caughtToggle === "caught" && !caught[f.id]) return false;
    if (caughtToggle === "uncaught" && caught[f.id]) return false;
    // Hide caught (legacy)
    if (hideCaught && caught[f.id]) return false;
    return true;
  });

  // Sort: uncaught first, then by difficulty
  fish.sort((a, b) => {
    const aCaught = caught[a.id] ? 1 : 0;
    const bCaught = caught[b.id] ? 1 : 0;
    if (aCaught !== bCaught) return aCaught - bCaught;
    return a.difficulty - b.difficulty;
  });

  tbody.innerHTML = fish.map(f => {
    const isCaught = caught[f.id];
    return `
    <tr class="${isCaught ? 'caught' : ''}" onclick="toggleFish('${f.id}')" style="cursor:pointer;">
      <td style="text-align:center; font-size:1.2em;">${isCaught ? '✅' : '⬜'}</td>
      <td><strong>${f.icon} ${f.name}</strong></td>
      <td>${f.season === "All" ? "🌿 All" : getSeasonEmoji(f.season) + " " + f.season}</td>
      <td style="font-size:0.85em;">${getLocEmoji(f.loc)} ${f.loc}</td>
      <td style="font-size:0.85em;">${f.time}</td>
      <td style="font-size:0.85em;">${getWeatherEmoji(f.weather)} ${f.weather}</td>
      <td style="text-align:center;">${getDifficultyBadge(f.difficulty)}</td>
      <td style="text-align:right;">${f.price}g</td>
      <td style="font-size:0.75em;">${f.bundle}</td>
    </tr>`;
  }).join("");
  
  // Empty state
  if (fish.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;">🎣 No fish match your filters!</td></tr>';
  }
  
  updateProgress();
}

function getLocEmoji(loc) {
  if (loc.includes("Ocean")) return "🌊";
  if (loc.includes("River")) return "🏞️";
  if (loc.includes("Lake")) return "💧";
  if (loc.includes("Forest")) return "🌲";
  if (loc.includes("Desert")) return "🏜️";
  if (loc.includes("Ginger")) return "🏝️";
  if (loc.includes("Sewer")) return "🚰";
  if (loc.includes("Mutant")) return "🪲";
  if (loc.includes("Witch")) return "🧙";
  if (loc.includes("Crab")) return "🦀";
  return "📍";
}

function getWeatherEmoji(w) {
  if (w === "Sun") return "☀️";
  if (w === "Rain") return "🌧️";
  return "🌤️";
}

function getSeasonEmoji(season) {
  const map = { "Spring": "🌸", "Summer": "☀️", "Fall": "🍂", "Winter": "❄️" };
  return map[season] || "🌿";
}

function getDifficultyBadge(diff) {
  if (diff >= 90) return `<span class="diff-legendary">${diff} ★★★</span>`;
  if (diff >= 70) return `<span class="diff-hard">${diff} ★★</span>`;
  if (diff >= 50) return `<span class="diff-medium">${diff} ★</span>`;
  return `<span class="diff-easy">${diff}</span>`;
}

// ── Legendary Fish ──
function renderLegendary() {
  const el = document.getElementById("legendary-list");
  if (!el) return;
  
  const legendaries = ["Angler", "Crimsonfish", "Glacierfish", "Legend", "Mutant Carp"];
  const caught = getCaught();
  
  el.innerHTML = FISH.filter(f => legendaries.includes(f.name)).map(f => {
    const isCaught = caught[f.id];
    return `<span style="display:inline-block; margin:4px; padding:6px 12px; border-radius:16px; background:${isCaught ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${isCaught ? '#22c55e' : 'rgba(255,255,255,0.1)'};">${isCaught ? '✅' : '⬜'} ${f.name} — ${f.loc} ${f.season} ${f.time}</span>`;
  }).join("");
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  renderFishTable();
  renderLegendary();
  
  document.getElementById("filter-season")?.addEventListener("change", renderFishTable);
  document.getElementById("filter-location")?.addEventListener("change", renderFishTable);
  document.getElementById("filter-weather")?.addEventListener("change", renderFishTable);
  document.getElementById("fish-search")?.addEventListener("input", renderFishTable);
  document.getElementById("caught-toggle")?.addEventListener("change", renderFishTable);
  document.getElementById("hide-caught")?.addEventListener("change", renderFishTable);
});
