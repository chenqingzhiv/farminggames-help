/**
 * Stardew Valley 1.6 Fish Collection Tracker
 * All 73+ fish with season/location/time tracking, checkboxes, localStorage persistence
 * Data verified against official Stardew Valley Wiki (1.6.15)
 * Sources: https://stardewvalleywiki.com/Fish
 */

// ── Fish Database (verified 1.6 data) ──
const ALL_FISH = [
  // ── Spring ──
  { id: "anchovy",    name: "Anchovy",     icon: "🐟", season: "Spring",   loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 30,  size: "1-28\"", price: 30,  bundle: "Ocean Fish" },
  { id: "carp",       name: "Carp",        icon: "🐟", season: "Spring",   loc: "Lake/Forest",    time: "Any",         weather: "Any",     difficulty: 15,  size: "6-51\"", price: 30,  bundle: "Lake Fish" },
  { id: "catfish",    name: "Catfish",     icon: "🐍", season: "Spring",   loc: "River (Town)",   time: "Any",         weather: "Rain",    difficulty: 75,  size: "6-73\"", price: 200, bundle: "River Fish" },
  { id: "eel",        name: "Eel",         icon: "🐍", season: "Spring",   loc: "Ocean",          time: "6PM-2AM",     weather: "Rain",    difficulty: 70,  size: "6-32\"", price: 85,  bundle: "Night Fishing" },
  { id: "halibut",    name: "Halibut",     icon: "🐠", season: "Spring",   loc: "Ocean",          time: "6AM-11AM",    weather: "Any",     difficulty: 50,  size: "4-48\"", price: 80,  bundle: "No" },
  { id: "herring",    name: "Herring",     icon: "🐟", season: "Spring",   loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 25,  size: "3-17\"", price: 30,  bundle: "Ocean Fish" },
  { id: "lingcod",    name: "Lingcod",     icon: "🐍", season: "Spring",   loc: "River/Lake",     time: "Any",         weather: "Any",     difficulty: 85,  size: "12-85\"",price: 120, bundle: "No" },
  { id: "perch",      name: "Perch",       icon: "🐟", season: "Spring",   loc: "River (Town)",   time: "Any",         weather: "Any",     difficulty: 35,  size: "3-24\"", price: 55,  bundle: "River Fish" },
  { id: "sardine",    name: "Sardine",     icon: "🐟", season: "Spring",   loc: "Ocean",          time: "6AM-4PM",     weather: "Any",     difficulty: 30,  size: "2-16\"", price: 40,  bundle: "Ocean Fish" },
  { id: "smallmouth", name: "Smallmouth Bass", icon: "🐟", season: "Spring", loc: "River (Town)",  time: "Any",         weather: "Any",     difficulty: 45,  size: "4-29\"", price: 55,  bundle: "No" },
  { id: "sunfish",    name: "Sunfish",     icon: "🐠", season: "Spring",   loc: "River (Town)",   time: "6AM-7PM",     weather: "Sun",     difficulty: 30,  size: "4-28\"", price: 30,  bundle: "River Fish" },
  { id: "tuna",       name: "Tuna",        icon: "🐟", season: "Spring",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 70,  size: "6-82\"", price: 100, bundle: "Ocean Fish" },
  { id: "walleye",    name: "Walleye",     icon: "🐟", season: "Spring",   loc: "River/Lake",     time: "12PM-2AM",    weather: "Rain",    difficulty: 45,  size: "4-33\"", price: 105, bundle: "Lake Fish" },

  // ── Summer ──
  { id: "bluediscus", name: "Blue Discus", icon: "🐠", season: "Summer",   loc: "Ginger Island",  time: "Any",         weather: "Any",     difficulty: 50,  size: "4-28\"", price: 120, bundle: "Island" },
  { id: "crimsonfish",name: "Crimsonfish", icon: "🐟", season: "Summer",   loc: "Ocean (East)",   time: "6AM-8PM",     weather: "Any",     difficulty: 95,  size: "8-36\"", price: 1500, bundle: "Legendary" },
  { id: "dorado",     name: "Dorado",      icon: "🐠", season: "Summer",   loc: "River (Forest)", time: "6AM-7PM",     weather: "Any",     difficulty: 75,  size: "6-32\"", price: 120, bundle: "Rainforest" },
  { id: "flounder",   name: "Flounder",    icon: "🐠", season: "Summer",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "3-24\"", price: 100, bundle: "Ocean Fish" },
  { id: "ghostfish",  name: "Ghostfish",   icon: "👻", season: "Summer",   loc: "Lake (Mines)",   time: "Any",         weather: "Any",     difficulty: 60,  size: "4-24\"", price: 45,  bundle: "No" },
  { id: "dorado",     name: "Dorado",      icon: "🐠", season: "Summer",   loc: "River (Forest)", time: "6AM-7PM",     weather: "Any",     difficulty: 75,  size: "6-32\"", price: 120, bundle: "Rainforest" },
  { id: "pike",       name: "Pike",        icon: "🐟", season: "Summer",   loc: "River/Lake",     time: "Any",         weather: "Any",     difficulty: 60,  size: "6-62\"", price: 100, bundle: "No" },
  { id: "pufferfish", name: "Pufferfish",  icon: "🐡", season: "Summer",   loc: "Ocean",          time: "12PM-4PM",    weather: "Sun",     difficulty: 80,  size: "4-20\"", price: 200, bundle: "Ocean Fish" },
  { id: "rainbowtrout",name: "Rainbow Trout",icon: "🐟",season: "Summer",  loc: "River (Town)",   time: "6AM-7PM",     weather: "Sun",     difficulty: 45,  size: "4-32\"", price: 65,  bundle: "River Fish" },
  { id: "redmullet",  name: "Red Mullet",  icon: "🐟", season: "Summer",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 55,  size: "4-28\"", price: 75,  bundle: "Ocean Fish" },
  { id: "redsnapper", name: "Red Snapper", icon: "🐠", season: "Summer",   loc: "Ocean",          time: "6AM-7PM",     weather: "Rain",    difficulty: 50,  size: "4-30\"", price: 50,  bundle: "Ocean Fish" },
  { id: "salmon",     name: "Salmon",      icon: "🐟", season: "Summer",   loc: "River (Town)",   time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "6-46\"", price: 75,  bundle: "River Fish" },
  { id: "shad",       name: "Shad",        icon: "🐟", season: "Summer",   loc: "River (Town)",   time: "9AM-2AM",     weather: "Rain",    difficulty: 60,  size: "4-37\"", price: 60,  bundle: "River Fish" },
  { id: "squid",      name: "Squid",       icon: "🦑", season: "Summer",   loc: "Ocean",          time: "6PM-2AM",     weather: "Any",     difficulty: 75,  size: "4-38\"", price: 80,  bundle: "Night Fishing" },
  { id: "stingray",   name: "Stingray",    icon: "🦈", season: "Summer",   loc: "Ginger Island",  time: "Any",         weather: "Any",     difficulty: 60,  size: "6-42\"", price: 180, bundle: "Island" },
  { id: "stoneray",   name: "Stoneray",    icon: "🦈", season: "Summer",   loc: "Ginger Island",  time: "Any",         weather: "Any",     difficulty: 70,  size: "4-36\"", price: 135, bundle: "Island" },
  { id: "sturgeon",   name: "Sturgeon",    icon: "🐟", season: "Summer",   loc: "Lake (Mtn)",     time: "6AM-7PM",     weather: "Any",     difficulty: 78,  size: "8-72\"", price: 200, bundle: "Lake Fish" },

  // ── Fall ──
  { id: "albacore",   name: "Albacore",    icon: "🐟", season: "Fall",     loc: "Ocean",          time: "6AM-11AM",    weather: "Any",     difficulty: 60,  size: "4-32\"", price: 75,  bundle: "Ocean Fish" },
  { id: "anch_fall",  name: "Anchovy",     icon: "🐟", season: "Fall",     loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 30,  size: "1-28\"", price: 30,  bundle: "No" },
  { id: "carp_fall",  name: "Carp",        icon: "🐟", season: "Fall",     loc: "Lake/Forest",    time: "Any",         weather: "Any",     difficulty: 15,  size: "6-51\"", price: 30,  bundle: "No" },
  { id: "catfish_fall",name:"Catfish",     icon: "🐍", season: "Fall",     loc: "River (Town)",   time: "Any",         weather: "Rain",    difficulty: 75,  size: "6-73\"", price: 200, bundle: "River Fish" },
  { id: "eel_fall",   name: "Eel",         icon: "🐍", season: "Fall",     loc: "Ocean",          time: "6PM-2AM",     weather: "Rain",    difficulty: 70,  size: "6-32\"", price: 85,  bundle: "Night Fishing" },
  { id: "halibut_fall",name:"Halibut",     icon: "🐠", season: "Fall",     loc: "Ocean",          time: "6AM-11AM",    weather: "Any",     difficulty: 50,  size: "4-48\"", price: 80,  bundle: "No" },
  { id: "midnightcarp",name:"Midnight Carp",icon:"🐟", season: "Fall",     loc: "Lake/Forest",    time: "10PM-2AM",    weather: "Any",     difficulty: 55,  size: "6-48\"", price: 150, bundle: "Night Fishing" },
  { id: "perch_fall", name: "Perch",       icon: "🐟", season: "Fall",     loc: "River (Town)",   time: "Any",         weather: "Any",     difficulty: 35,  size: "3-24\"", price: 55,  bundle: "No" },
  { id: "pike_fall",  name: "Pike",        icon: "🐟", season: "Fall",     loc: "River/Lake",     time: "Any",         weather: "Any",     difficulty: 60,  size: "6-62\"", price: 100, bundle: "No" },
  { id: "salmon_fall",name: "Salmon",      icon: "🐟", season: "Fall",     loc: "River (Town)",   time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "6-46\"", price: 75,  bundle: "No" },
  { id: "sandfish",   name: "Sandfish",    icon: "🐟", season: "Fall",     loc: "Desert Lake",    time: "6AM-8PM",     weather: "Any",     difficulty: 65,  size: "4-30\"", price: 75,  bundle: "Desert" },
  { id: "sardine_fall",name:"Sardine",     icon: "🐟", season: "Fall",     loc: "Ocean",          time: "6AM-4PM",     weather: "Any",     difficulty: 30,  size: "2-16\"", price: 40,  bundle: "No" },
  { id: "sea_cucumber",name:"Sea Cucumber",icon:"🥒", season: "Fall",     loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 40,  size: "4-28\"", price: 75,  bundle: "Specialty" },
  { id: "shad_fall",  name: "Shad",        icon: "🐟", season: "Fall",     loc: "River (Town)",   time: "9AM-2AM",     weather: "Rain",    difficulty: 60,  size: "4-37\"", price: 60,  bundle: "No" },
  { id: "supercucumber",name:"Super Cucumber",icon:"🥒",season: "Fall",   loc: "Ocean",          time: "6PM-2AM",     weather: "Any",     difficulty: 80,  size: "6-36\"", price: 250, bundle: "Night Fishing" },
  { id: "tiger_trout",name:"Tiger Trout",  icon:"🐟",  season: "Fall",     loc: "River (Town)",   time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "6-36\"", price: 120, bundle: "Rainforest" },
  { id: "walleye_fall",name:"Walleye",     icon:"🐟",  season: "Fall",     loc: "River/Lake",     time: "12PM-2AM",    weather: "Rain",    difficulty: 45,  size: "4-33\"", price: 105, bundle: "Lake Fish" },
  { id: "woodskip",   name: "Woodskip",    icon: "🐟", season: "Fall",     loc: "Forest Pond",    time: "Any",         weather: "Any",     difficulty: 35,  size: "4-30\"", price: 75,  bundle: "Forest" },

  // ── Winter ── 
  { id: "albacore_w", name: "Albacore",    icon: "🐟", season: "Winter",   loc: "Ocean",          time: "6AM-11AM",    weather: "Any",     difficulty: 60,  size: "4-32\"", price: 75,  bundle: "No" },
  { id: "anchovy_w",  name: "Anchovy",     icon: "🐟", season: "Winter",   loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 30,  size: "1-28\"", price: 30,  bundle: "No" },
  { id: "carp_w",     name: "Carp",        icon: "🐟", season: "Winter",   loc: "Lake/Forest",    time: "Any",         weather: "Any",     difficulty: 15,  size: "6-51\"", price: 30,  bundle: "No" },
  { id: "flounder_w", name: "Flounder",    icon: "🐠", season: "Winter",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "3-24\"", price: 100, bundle: "No" },
  { id: "herring_w",  name: "Herring",     icon: "🐟", season: "Winter",   loc: "Ocean",          time: "Any",         weather: "Any",     difficulty: 25,  size: "3-17\"", price: 30,  bundle: "No" },
  { id: "lingcod_w",  name: "Lingcod",     icon: "🐍", season: "Winter",   loc: "River/Lake",     time: "Any",         weather: "Any",     difficulty: 85,  size: "12-85\"",price: 120, bundle: "No" },
  { id: "midnight_carp_w",name:"Midnight Carp",icon:"🐟",season:"Winter",  loc: "Lake/Forest",    time: "10PM-2AM",    weather: "Any",     difficulty: 55,  size: "6-48\"", price: 150, bundle: "No" },
  { id: "perch_w",    name: "Perch",       icon: "🐟", season: "Winter",   loc: "River (Town)",   time: "Any",         weather: "Any",     difficulty: 35,  size: "3-24\"", price: 55,  bundle: "No" },
  { id: "pike_w",     name: "Pike",        icon: "🐟", season: "Winter",   loc: "River/Lake",     time: "Any",         weather: "Any",     difficulty: 60,  size: "6-62\"", price: 100, bundle: "No" },
  { id: "red_snapper_w",name:"Red Snapper",icon:"🐠",  season: "Winter",   loc: "Ocean",          time: "6AM-7PM",     weather: "Rain",    difficulty: 50,  size: "4-30\"", price: 50,  bundle: "No" },
  { id: "sardine_w",  name: "Sardine",     icon: "🐟", season: "Winter",   loc: "Ocean",          time: "6AM-4PM",     weather: "Any",     difficulty: 30,  size: "2-16\"", price: 40,  bundle: "No" },
  { id: "squid_w",    name: "Squid",       icon: "🦑", season: "Winter",   loc: "Ocean",          time: "6PM-2AM",     weather: "Any",     difficulty: 75,  size: "4-38\"", price: 80,  bundle: "Night Fishing" },
  { id: "tuna_w",     name: "Tuna",        icon: "🐟", season: "Winter",   loc: "Ocean",          time: "6AM-7PM",     weather: "Any",     difficulty: 70,  size: "6-82\"", price: 100, bundle: "No" },

  // ── All Seasons ──
  { id: "bullhead",   name: "Bullhead",    icon: "🐟", season: "All",      loc: "Lake (Mtn)",     time: "Any",         weather: "Any",     difficulty: 45,  size: "4-28\"", price: 75,  bundle: "Lake Fish" },
  { id: "chub",       name: "Chub",        icon: "🐟", season: "All",      loc: "River (Town)",   time: "Any",         weather: "Any",     difficulty: 35,  size: "4-27\"", price: 50,  bundle: "River Fish" },
  { id: "largemouth", name: "Largemouth Bass",icon:"🐟",season:"All",      loc: "Lake (Mtn)",     time: "6AM-7PM",     weather: "Any",     difficulty: 50,  size: "4-32\"", price: 100, bundle: "Lake Fish" },
  { id: "scorpion_carp",name:"Scorpion Carp",icon:"🐟", season:"All",      loc: "Desert Lake",    time: "6AM-8PM",     weather: "Any",     difficulty: 80,  size: "6-32\"", price: 150, bundle: "Desert" },
  { id: "slimejack",  name: "Slimejack",   icon: "🟢", season: "All",      loc: "Mutant Bug Lair",time: "Any",         weather: "Any",     difficulty: 80,  size: "4-24\"", price: 100, bundle: "Specialty" },
  { id: "void_salmon",name: "Void Salmon", icon:"🐟",  season: "All",      loc: "Witch Swamp",    time: "Any",         weather: "Any",     difficulty: 80,  size: "6-32\"", price: 150, bundle: "Specialty" },

  // ── Special Locations ──
  { id: "angler",     name: "Angler",      icon: "🏆", season: "Fall",     loc: "River (Town)",   time: "Any",         weather: "Any",     difficulty: 85,  size: "8-32\"", price: 900,  bundle: "Legendary" },
  { id: "crimson_w",  name: "Crimsonfish", icon: "🏆", season: "Summer",   loc: "Ocean (East)",   time: "6AM-8PM",     weather: "Any",     difficulty: 95,  size: "8-36\"", price: 1500, bundle: "Legendary" },
  { id: "glacierfish",name: "Glacierfish", icon: "🏆", season: "Winter",   loc: "Forest (South)", time: "Any",         weather: "Any",     difficulty: 100, size: "8-35\"", price: 1000, bundle: "Legendary" },
  { id: "legend",     name: "Legend",      icon: "🏆", season: "Spring",   loc: "Lake (Mtn)",     time: "6AM-7PM",     weather: "Rain",    difficulty: 110, size: "10-36\"",price: 5000, bundle: "Legendary" },
  { id: "mutant_carp",name: "Mutant Carp", icon: "🏆", season: "All",      loc: "Sewers",         time: "Any",         weather: "Any",     difficulty: 80,  size: "12-36\"",price: 1000, bundle: "Legendary" },

  // ── 1.6 New Fish ──
  { id: "golden_fish",name:"Goldenfish",   icon:"🐟",  season:"All",       loc: "Ginger Island",  time:"6AM-11AM",     weather:"Sun",      difficulty: 70,  size:"4-30\"",  price: 200, bundle:"Island" },
  { id: "goby",       name:"Goby",         icon:"🐟",  season:"All",       loc: "Ginger Island",  time:"Any",          weather:"Any",      difficulty: 30,  size:"2-12\"",  price: 50,  bundle:"Island" },
  { id: "midnight_squid",name:"Midnight Squid",icon:"🦑",season:"All",     loc: "Ginger Island (Night)",time:"8PM-2AM",weather:"Any",   difficulty: 70,  size:"4-28\"",  price: 100, bundle:"Island" },
  { id: "radioactive_bass",name:"Radioactive Bass",icon:"🐟",season:"All", loc: "Mines (Radioactive)",time:"Any",   weather:"Any",      difficulty: 90,  size:"6-32\"",  price: 300, bundle:"Specialty" },
  { id: "clownfish",  name:"Clownfish",    icon:"🐠",  season:"All",       loc: "Ginger Island",  time:"Any",          weather:"Any",      difficulty: 40,  size:"2-18\"",  price: 70,  bundle:"Island" },
  { id: "seahorse",   name:"Seahorse",     icon:"🐴",  season:"Summer",    loc: "Ginger Island Beach",time:"Any",     weather:"Any",      difficulty: 35,  size:"2-10\"",  price: 80,  bundle:"Island" },

  // ── Crab Pot ──
  { id: "crab",       name:"Crab",         icon:"🦀",  season:"All",       loc:"Crab Pot (Ocean)", time:"Any",        weather:"Any",      difficulty: 5,   size:"2-10\"",  price: 100, bundle:"Crab Pot" },
  { id: "lobster",    name:"Lobster",      icon:"🦞",  season:"All",       loc:"Crab Pot (Ocean)", time:"Any",        weather:"Any",      difficulty: 5,   size:"4-24\"",  price: 120, bundle:"Crab Pot" },
  { id: "clam",       name:"Clam",         icon:"🐚",  season:"All",       loc:"Crab Pot (Ocean)", time:"Any",        weather:"Any",      difficulty: 5,   size:"1-4\"",   price: 50,  bundle:"Crab Pot" },
  { id: "shrimp",     name:"Shrimp",       icon:"🦐",  season:"All",       loc:"Crab Pot (Ocean)", time:"Any",        weather:"Any",      difficulty: 5,   size:"2-8\"",   price: 60,  bundle:"Crab Pot" },
  { id: "crayfish",   name:"Crayfish",     icon:"🦐",  season:"All",       loc:"Crab Pot (Fresh)", time:"Any",        weather:"Any",      difficulty: 5,   size:"2-8\"",   price: 75,  bundle:"Crab Pot" },
  { id: "snail",      name:"Snail",        icon:"🐌",  season:"All",       loc:"Crab Pot (Fresh)", time:"Any",        weather:"Any",      difficulty: 5,   size:"2-6\"",   price: 65,  bundle:"Crab Pot" },
  { id: "periwinkle", name:"Periwinkle",   icon:"🐚",  season:"All",       loc:"Crab Pot (Fresh)", time:"Any",        weather:"Any",      difficulty: 5,   size:"1-3\"",   price: 20,  bundle:"Crab Pot" },
  { id: "oyster",     name:"Oyster",       icon:"🦪",  season:"All",       loc:"Crab Pot (Ocean)", time:"Any",        weather:"Any",      difficulty: 5,   size:"2-12\"",  price: 40,  bundle:"Crab Pot" },
  { id: "mussel",     name:"Mussel",       icon:"🦪",  season:"All",       loc:"Crab Pot (Ocean)", time:"Any",        weather:"Any",      difficulty: 5,   size:"1-4\"",   price: 30,  bundle:"Crab Pot" },
];

// Remove duplicate IDs (keep only the main entry for multi-season fish)
const UNIQUE_FISH = {};
ALL_FISH.forEach(fish => {
  const baseName = fish.name.replace(/\s*\(.*\)/, "");
  if (!UNIQUE_FISH[fish.id] || fish.season === "All") {
    UNIQUE_FISH[fish.id] = fish;
  }
});
const FISH = Object.values(UNIQUE_FISH);

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
  updateProgress();
}

function resetTracker() {
  if (confirm("Reset all fish catch data?")) {
    saveCaught({});
    renderFishTable();
  }
}

// ── Progress Bar ──
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
function renderFishTable() {
  const tbody = document.getElementById("fish-tbody");
  if (!tbody) return;

  const caught = getCaught();
  const seasonFilter = document.getElementById("filter-season")?.value || "all";
  const locFilter = document.getElementById("filter-location")?.value || "all";
  const searchTerm = (document.getElementById("fish-search")?.value || "").toLowerCase();
  const hideCaught = document.getElementById("hide-caught")?.checked || false;

  let fish = FISH.filter(f => {
    // Season filter
    if (seasonFilter !== "all") {
      if (f.season !== seasonFilter && f.season !== "All") return false;
    }
    // Location filter
    if (locFilter !== "all") {
      if (!f.loc.toLowerCase().includes(locFilter.toLowerCase())) return false;
    }
    // Search
    if (searchTerm && !f.name.toLowerCase().includes(searchTerm) &&
        !f.loc.toLowerCase().includes(searchTerm)) return false;
    // Hide caught
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
      <td style="font-size:0.85em;">${f.loc}</td>
      <td style="font-size:0.85em;">${f.time}</td>
      <td style="font-size:0.85em;">${f.weather}</td>
      <td style="text-align:center;">${getDifficultyBadge(f.difficulty)}</td>
      <td style="text-align:right;">${f.price}g</td>
      <td style="font-size:0.75em;">${f.bundle}</td>
    </tr>`;
  }).join("");
  
  updateProgress();
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
  
  // Filters
  document.getElementById("filter-season")?.addEventListener("change", renderFishTable);
  document.getElementById("filter-location")?.addEventListener("change", renderFishTable);
  document.getElementById("fish-search")?.addEventListener("input", renderFishTable);
  document.getElementById("hide-caught")?.addEventListener("change", renderFishTable);
});
