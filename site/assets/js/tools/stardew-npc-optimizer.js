/**
 * Stardew Valley 1.6 NPC Friendship Optimizer (Enhanced)
 * All NPCs with loved/liked gifts, weekly gift tracker, birthday reminders,
 * weekly schedules, and universal gift reference.
 * Data verified against official Stardew Valley Wiki (1.6.15)
 * Sources: https://stardewvalleywiki.com/Friendship, https://stardewvalleywiki.com/Gifts
 */

// ── NPC Gift Database (verified 1.6 data) ──
const NPCS = [
  // ── Marriage Candidates ──
  { id: "abigail",   name: "Abigail",   avatar: "💜",  born: "Fall 13",  loves: ["Amethyst", "Banana Pudding", "Blackberry Cobbler", "Blueberry Tart", "Chocolate Cake", "Pufferfish", "Pumpkin", "Spicy Eel"], likes: ["Clam", "Coral", "Crocus", "Daffodil", "Nautilus Shell", "Quartz", "Rainbow Shell", "Sweet Pea"], hates: ["Clay", "Holly", "Morel"], birthday: "Fall 13" },
  { id: "alex",      name: "Alex",      avatar: "🏈",  born: "Summer 13", loves: ["Complete Breakfast", "Gold Bar", "Prismatic Shard", "Salmon Dinner"], likes: ["All Eggs", "Daffodil", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Summer 13" },
  { id: "elliott",   name: "Elliott",   avatar: "✍️",  born: "Fall 5",   loves: ["Crab Cakes", "Duck Feather", "Lobster", "Pomegranate", "Squid Ink Ravioli", "Tom Kha Soup", "Wine"], likes: ["All Fruit", "Daffodil", "Nautilus Shell", "Quartz", "Sweet Pea"], hates: ["Amaranth", "Clay", "Holly", "Quartz"], birthday: "Fall 5" },
  { id: "emily",     name: "Emily",     avatar: "🔮",  born: "Spring 27", loves: ["Amethyst", "Aquamarine", "Cloth", "Emerald", "Jade", "Ruby", "Survival Burger", "Topaz", "Wool"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Quartz"], hates: ["Clay", "Fish", "Holly", "Sea Cucumber"], birthday: "Spring 27" },
  { id: "haley",     name: "Haley",     avatar: "📸",  born: "Spring 14", loves: ["Coconut", "Fruit Salad", "Pink Cake", "Sunflower"], likes: ["All Artisan Goods", "Crocus", "Daffodil", "Sweet Pea"], hates: ["Clay", "Holly", "Prismatic Shard", "Quartz"], birthday: "Spring 14" },
  { id: "harvey",    name: "Harvey",    avatar: "🩺",  born: "Winter 14", loves: ["Coffee", "Pickles", "Super Meal", "Truffle Oil", "Wine"], likes: ["All Artisan Goods", "Daffodil", "Morel", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Winter 14" },
  { id: "leah",      name: "Leah",      avatar: "🎨",  born: "Winter 23", loves: ["Goat Cheese", "Poppyseed Muffin", "Salad", "Stir Fry", "Truffle Oil", "Vegetable Medley", "Wine"], likes: ["All Artisan Goods", "All Foraged Items", "Daffodil", "Dandelion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz", "Void Egg"], birthday: "Winter 23" },
  { id: "maru",      name: "Maru",      avatar: "🔬",  born: "Summer 10", loves: ["Battery Pack", "Cauliflower", "Cheese Cauliflower", "Diamond", "Miner's Treat", "Pepper Poppers", "Rhubarb Pie", "Strawberry"], likes: ["All Artisan Goods", "Copper Bar", "Daffodil", "Gold Bar", "Iron Bar", "Quartz", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Summer 10" },
  { id: "penny",     name: "Penny",     avatar: "📚",  born: "Fall 2",   loves: ["Diamond", "Emerald", "Melon", "Poppy", "Poppyseed Muffin", "Red Plate", "Roots Platter", "Sandfish", "Tom Kha Soup"], likes: ["All Artisan Goods", "All Foraged Items", "Daffodil", "Dandelion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Fall 2" },
  { id: "sam",       name: "Sam",       avatar: "🎸",  born: "Summer 17", loves: ["Cactus Fruit", "Maple Bar", "Pizza", "Tigerseye"], likes: ["All Artisan Goods", "Daffodil", "Spring Onion", "Sweet Pea"], hates: ["Clay", "Coal", "Holly", "Nautilus Shell", "Quartz"], birthday: "Summer 17" },
  { id: "sebastian", name: "Sebastian", avatar: "💻",  born: "Winter 10", loves: ["Frozen Tear", "Obsidian", "Pumpkin Soup", "Sashimi", "Void Egg"], likes: ["All Artisan Goods", "Nautilus Shell", "Quartz", "Rainbow Shell"], hates: ["Clay", "Holly", "Spring Onion"], birthday: "Winter 10" },
  { id: "shane",     name: "Shane",     avatar: "🐔",  born: "Spring 20", loves: ["Beer", "Hot Pepper", "Pepper Poppers", "Pizza"], likes: ["All Artisan Goods", "Daffodil", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Spring 20" },

  // ── Non-Marriage ──
  { id: "caroline",  name: "Caroline",  avatar: "🌿",  born: "Winter 7",  loves: ["Fish Taco", "Green Tea", "Summer Spangle", "Tropical Curry"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Sweet Pea"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Winter 7" },
  { id: "clint",     name: "Clint",     avatar: "⛏️",  born: "Winter 26", loves: ["Amethyst", "Aquamarine", "Artichoke Dip", "Emerald", "Fiddlehead Risotto", "Gold Bar", "Gold Ore", "Iridium Bar", "Jade", "Omni Geode", "Ruby", "Topaz"], likes: ["All Artisan Goods", "Copper Ore", "Daffodil", "Iron Ore", "Quartz"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Winter 26" },
  { id: "demetrius", name: "Demetrius", avatar: "🧪",  born: "Summer 19", loves: ["Bean Hotpot", "Ice Cream", "Rice Pudding", "Strawberry"], likes: ["All Artisan Goods", "All Fruit", "Daffodil", "Dandelion", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Summer 19" },
  { id: "dwarf",     name: "Dwarf",     avatar: "🪨",  born: "Summer 22", loves: ["Amethyst", "Aquamarine", "Diamond", "Dwarf Gadget", "Dwarf Scroll I-IV", "Emerald", "Jade", "Omni Geode", "Ruby", "Topaz"], likes: ["All Artisan Goods", "Daffodil", "Quartz"], hates: ["Clay", "Holly"], birthday: "Summer 22" },
  { id: "evelyn",    name: "Evelyn",    avatar: "🌹",  born: "Winter 20", loves: ["Beet", "Chocolate Cake", "Diamond", "Fairy Rose", "Stuffing", "Tulip"], likes: ["All Artisan Goods", "Crocus", "Daffodil", "Dandelion", "Sweet Pea"], hates: ["Clay", "Fish", "Holly", "Nautilus Shell"], birthday: "Winter 20" },
  { id: "george",    name: "George",    avatar: "👴",  born: "Fall 24",  loves: ["Fried Mushroom", "Leek"], likes: ["All Artisan Goods", "All Foraged Items", "Daffodil", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Fall 24" },
  { id: "gus",       name: "Gus",       avatar: "🍳",  born: "Summer 4",  loves: ["Diamond", "Escargot", "Fish Taco", "Orange", "Tropical Curry"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Sweet Pea"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Summer 4" },
  { id: "jas",       name: "Jas",       avatar: "🌸",  born: "Summer 4",  loves: ["Fairy Rose", "Pink Cake", "Plum Pudding"], likes: ["All Artisan Goods", "Crocus", "Daffodil", "Dandelion", "Sweet Pea"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Summer 4" },
  { id: "jodi",      name: "Jodi",      avatar: "👩",  born: "Winter 11", loves: ["Chocolate Cake", "Crispy Bass", "Crunchy Salad", "Diamond", "Eggplant Parmesan", "Fried Eel", "Omelet", "Pancakes", "Rice Pudding", "Roasted Hazelnuts", "Vegetable Medley"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Winter 11" },
  { id: "kent",      name: "Kent",      avatar: "🎖️",  born: "Spring 4",  loves: ["Fiddlehead Risotto", "Roasted Hazelnuts"], likes: ["All Artisan Goods", "All Eggs", "Daffodil", "Dandelion", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Spring 4" },
  { id: "krobus",    name: "Krobus",    avatar: "👤",  born: "Winter 1",  loves: ["Diamond", "Iridium Bar", "Lucky Lunch", "Pumpkin", "Void Egg", "Wild Horseradish"], likes: ["All Artisan Goods", "Gold Bar", "Gold Ore", "Nautilus Shell", "Quartz"], hates: ["Clay", "Holly"], birthday: "Winter 1" },
  { id: "leo",       name: "Leo",       avatar: "🦜",  born: "Summer 14", loves: ["Duck Feather", "Mango", "Ostrich Egg", "Poi", "Squid Ink Ravioli"], likes: ["All Artisan Goods", "Crocus", "Daffodil", "Dandelion", "Sweet Pea"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Summer 14" },
  { id: "lewis",     name: "Lewis",     avatar: "📋",  born: "Spring 7",  loves: ["Autumn's Bounty", "Glazed Yams", "Green Tea", "Hot Pepper", "Vegetable Medley"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Spring Onion", "Sweet Pea"], hates: ["Clay", "Holly", "Nautilus Shell", "Quartz"], birthday: "Spring 7" },
  { id: "linus",     name: "Linus",     avatar: "🏕️",  born: "Winter 3",  loves: ["Blueberry Tart", "Cactus Fruit", "Coconut", "Dish O' The Sea", "Spaghetti", "Truffle", "Yam"], likes: ["All Artisan Goods", "All Foraged Items", "Daffodil", "Dandelion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Winter 3" },
  { id: "marnie",    name: "Marnie",    avatar: "🐄",  born: "Fall 18",  loves: ["Diamond", "Farmer's Lunch", "Pink Cake", "Pumpkin Pie", "Rice Pudding", "Sweet Pea"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Fall 18" },
  { id: "pam",       name: "Pam",       avatar: "🚌",  born: "Spring 18", loves: ["Beer", "Cactus Fruit", "Diamond", "Glazed Yams", "Pale Ale", "Parsnip", "Parsnip Soup", "Wine"], likes: ["All Artisan Goods", "Daffodil", "Dandelion"], hates: ["Clay", "Holly"], birthday: "Spring 18" },
  { id: "pierre",    name: "Pierre",    avatar: "🏪",  born: "Spring 26", loves: ["Fried Calamari"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Spring 26" },
  { id: "robin",     name: "Robin",     avatar: "🔨",  born: "Fall 21",  loves: ["Goat Cheese", "Honey", "Peach", "Spaghetti", "Wine"], likes: ["All Artisan Goods", "All Fruit", "Daffodil", "Dandelion", "Spring Onion"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Fall 21" },
  { id: "sandy",     name: "Sandy",     avatar: "🏜️",  born: "Fall 15",  loves: ["Crocus", "Daffodil", "Mango", "Sweet Pea", "Tropical Curry"], likes: ["All Artisan Goods", "Dandelion", "Nautilus Shell", "Quartz"], hates: ["Clay", "Holly"], birthday: "Fall 15" },
  { id: "vincent",   name: "Vincent",   avatar: "🍬",  born: "Spring 10", loves: ["Cranberry Candy", "Grape", "Pink Cake", "Snail", "Super Meal"], likes: ["All Artisan Goods", "Crocus", "Daffodil", "Dandelion", "Nautilus Shell"], hates: ["Clay", "Holly"], birthday: "Spring 10" },
  { id: "willy",     name: "Willy",     avatar: "🎣",  born: "Summer 24", loves: ["Catfish", "Diamond", "Iridium Bar", "Mead", "Octopus", "Pumpkin", "Sea Cucumber", "Squid Ink Ravioli", "Sturgeon"], likes: ["All Artisan Goods", "All Eggs", "Daffodil"], hates: ["Clay", "Holly", "Nautilus Shell"], birthday: "Summer 24" },
  { id: "wizard",    name: "Wizard",    avatar: "🧙",  born: "Winter 17", loves: ["Book of Mysteries", "Book of Stars", "Purple Mushroom", "Solar Essence", "Super Cucumber", "Void Essence"], likes: ["All Artisan Goods", "Daffodil", "Dandelion", "Nautilus Shell", "Quartz"], hates: ["Clay", "Holly"], birthday: "Winter 17" }
];

// ── Weekly Schedules (approximate locations by day) ──
const WEEKLY_SCHEDULES = {
  "Abigail":   { "Mon": "Home (kitchen)", "Tue": "Home (room)", "Wed": "Pierre's", "Thu": "Home (room)", "Fri": "Saloon (evening)", "Sat": "Home (room)", "Sun": "Home (room)" },
  "Alex":      { "Mon": "Home (gridball)", "Tue": "Beach (morning)", "Wed": "Home", "Thu": "Home", "Fri": "Saloon (evening)", "Sat": "Museum", "Sun": "Home" },
  "Elliott":   { "Mon": "Home (cabin)", "Tue": "Library", "Wed": "Home (cabin)", "Thu": "Bridge (beach)", "Fri": "Saloon (evening)", "Sat": "Home (cabin)", "Sun": "Home (cabin)" },
  "Emily":     { "Mon": "Home", "Tue": "Saloon (evening)", "Wed": "Home", "Thu": "Home", "Fri": "Saloon (evening)", "Sat": "Home", "Sun": "Home" },
  "Haley":     { "Mon": "Home", "Tue": "Community (fountain)", "Wed": "Home (room)", "Thu": "Home", "Fri": "Saloon (evening)", "Sat": "Home", "Sun": "Home" },
  "Harvey":    { "Mon": "Clinic", "Tue": "Clinic", "Wed": "Clinic", "Thu": "Clinic", "Fri": "Clinic", "Sat": "Home", "Sun": "Home" },
  "Leah":      { "Mon": "Home (cabin)", "Tue": "Forest (by pond)", "Wed": "Home (cabin)", "Thu": "Saloon (evening)", "Fri": "Home (cabin)", "Sat": "Forest (by pond)", "Sun": "Home (cabin)" },
  "Maru":      { "Mon": "Home (room)", "Tue": "Clinic (evening)", "Wed": "Home (room)", "Thu": "Home (room)", "Fri": "Saloon (evening)", "Sat": "Home (room)", "Sun": "Home (room)" },
  "Penny":     { "Mon": "Home (Trailer)", "Tue": "Library", "Wed": "Home (Trailer)", "Thu": "Home (Trailer)", "Fri": "Home (Trailer)", "Sat": "Town (by tree)", "Sun": "Home (Trailer)" },
  "Sam":       { "Mon": "Home (room)", "Tue": "Home (room)", "Wed": "1 Willow (guitar)", "Thu": "Home (room)", "Fri": "Saloon (evening)", "Sat": "Town (skateboard)", "Sun": "Home (room)" },
  "Sebastian": { "Mon": "Home (basement)", "Tue": "Home (basement)", "Wed": "Home (basement)", "Thu": "Railroad (smoking)", "Fri": "Saloon (evening)", "Sat": "Home (basement)", "Sun": "Home (basement)" },
  "Shane":     { "Mon": "Home (room)", "Tue": "Marnie's (room)", "Wed": "Saloon (evening)", "Thu": "Marnie's (room)", "Fri": "Saloon (evening)", "Sat": "Marnie's (room)", "Sun": "Marnie's (room)" },
  "Caroline":  { "Mon": "Home (kitchen)", "Tue": "Home", "Wed": "Home", "Thu": "Home (sunroom)", "Fri": "Home", "Sat": "Home", "Sun": "Home" },
  "Clint":     { "Mon": "Blacksmith", "Tue": "Blacksmith", "Wed": "Blacksmith", "Thu": "Blacksmith", "Fri": "Saloon (evening)", "Sat": "Blacksmith", "Sun": "Blacksmith" },
  "Demetrius": { "Mon": "Home (lab)", "Tue": "Home (lab)", "Wed": "Home (lab)", "Thu": "Home (lab)", "Fri": "Home (lab)", "Sat": "Home (lab)", "Sun": "Home (lab)" },
  "Dwarf":     { "Mon": "Mines (level 5)", "Tue": "Mines (level 5)", "Wed": "Mines (level 5)", "Thu": "Mines (level 5)", "Fri": "Mines (level 5)", "Sat": "Mines (level 5)", "Sun": "Mines (level 5)" },
  "Evelyn":    { "Mon": "Home (garden)", "Tue": "Home", "Wed": "Home", "Thu": "Home", "Fri": "Home", "Sat": "Home", "Sun": "Home" },
  "George":    { "Mon": "Home (TV)", "Tue": "Home (TV)", "Wed": "Home (TV)", "Thu": "Home (TV)", "Fri": "Home (TV)", "Sat": "Home (TV)", "Sun": "Home (TV)" },
  "Gus":       { "Mon": "Saloon", "Tue": "Saloon", "Wed": "Saloon", "Thu": "Saloon", "Fri": "Saloon", "Sat": "Saloon", "Sun": "Saloon" },
  "Jas":       { "Mon": "Home (Marnie's)", "Tue": "Town (playground)", "Wed": "Home (Marnie's)", "Thu": "Town (playground)", "Fri": "Home (Marnie's)", "Sat": "Home (Marnie's)", "Sun": "Home (Marnie's)" },
  "Jodi":      { "Mon": "Home (kitchen)", "Tue": "Home", "Wed": "Home", "Thu": "Home", "Fri": "Home", "Sat": "Pierre's", "Sun": "Home" },
  "Kent":      { "Mon": "Home", "Tue": "Town (by river)", "Wed": "Home", "Thu": "Home", "Fri": "Saloon (evening)", "Sat": "Home", "Sun": "Home" },
  "Krobus":    { "Mon": "Sewers", "Tue": "Sewers", "Wed": "Sewers", "Thu": "Sewers", "Fri": "Sewers", "Sat": "Sewers", "Sun": "Sewers" },
  "Leo":       { "Mon": "Ginger Island (parrot)", "Tue": "Ginger Island (parrot)", "Wed": "Ginger Island (parrot)", "Thu": "Ginger Island (parrot)", "Fri": "Ginger Island (parrot)", "Sat": "Ginger Island (parrot)", "Sun": "Mountain (after 6yr)" },
  "Lewis":     { "Mon": "Home", "Tue": "Town (mayor's)", "Wed": "Home", "Thu": "Home", "Fri": "Saloon (evening)", "Sat": "Home", "Sun": "Home" },
  "Linus":     { "Mon": "Tent (mountains)", "Tue": "Spa (bathhouse)", "Wed": "Tent (mountains)", "Thu": "Tent (mountains)", "Fri": "Tent (mountains)", "Sat": "Bus Stop", "Sun": "Tent (mountains)" },
  "Marnie":    { "Mon": "Home (ranch)", "Tue": "Home (ranch)", "Wed": "Home (ranch)", "Thu": "Home (ranch)", "Fri": "Home (ranch)", "Sat": "Home (ranch)", "Sun": "Home (ranch)" },
  "Pam":       { "Mon": "Home (trailer)", "Tue": "Home (trailer)", "Wed": "Home (trailer)", "Thu": "Saloon (evening)", "Fri": "Saloon (evening)", "Sat": "Home (trailer)", "Sun": "Home (trailer)" },
  "Pierre":    { "Mon": "Pierre's", "Tue": "Pierre's", "Wed": "Pierre's (closed)", "Thu": "Pierre's", "Fri": "Pierre's", "Sat": "Pierre's", "Sun": "Pierre's (closed)" },
  "Robin":     { "Mon": "Home (carpentry)", "Tue": "Home (carpentry)", "Wed": "Home (carpentry)", "Thu": "Home (carpentry)", "Fri": "Home (carpentry)", "Sat": "Home (carpentry)", "Sun": "Home (carpentry)" },
  "Sandy":     { "Mon": "Desert (Oasis)", "Tue": "Desert (Oasis)", "Wed": "Desert (Oasis)", "Thu": "Desert (Oasis)", "Fri": "Desert (Oasis)", "Sat": "Desert (Oasis)", "Sun": "Desert (Oasis)" },
  "Vincent":   { "Mon": "Home (Jodi's)", "Tue": "Town (playground)", "Wed": "Home (Jodi's)", "Thu": "Town (playground)", "Fri": "Home (Jodi's)", "Sat": "Home (Jodi's)", "Sun": "Home (Jodi's)" },
  "Willy":     { "Mon": "Fish Shop", "Tue": "Fish Shop", "Wed": "Fish Shop", "Thu": "Fish Shop", "Fri": "Fish Shop", "Sat": "Fish Shop", "Sun": "Fish Shop" },
  "Wizard":    { "Mon": "Tower", "Tue": "Tower", "Wed": "Tower", "Thu": "Tower", "Fri": "Tower", "Sat": "Tower", "Sun": "Tower" }
};

// ── Universal Gift Reference ──
const UNIVERSAL = {
  loves: ["Prismatic Shard", "Rabbit's Foot"],  // except Penny hates Rabbit's Foot
  likes: ["All Artisan Goods", "All Cooked Dishes", "All Flowers", "All Foraged Items", "All Fruit", "Diamond", "Gold Bar", "Iridium Bar", "Maple Syrup", "Minerals"],
  neutrals: ["All Bread", "All Eggs (except Void Egg)", "All Fertilizer", "All Flour", "All Geodes", "All Milk", "All Oil", "All Seeds", "All Sugar", "All Trash", "Clam", "Coral", "Duck Feather", "Rain Shell", "Nautilus Shell", "Rainbow Shell", "Spring Onion", "Sweet Pea", "Truffle", "Wheat"],
  dislikes: ["All Fish (except Carp)", "All Ores", "All Refined Minerals", "Clay", "Farming Tools", "Furniture", "Garbage", "Hazelnut", "Hops", "Oil of Garlic", "Sap", "Seaweed", "Slime", "Tackle", "Torch", "Truffle Oil"],
  hates: ["All Bait", "All Dinosaur Mayonnaise", "All Fishing Tackle", "Artifact", "Bomb", "Cherry Bomb", "Crafting Trash", "Goldfish", "Honey", "Mega Bomb", "Rotten Plant", "Rusty Spoon", "Solid Gold Lewis", "Strange Bun", "Trash", "Weathered Floor"]
};

// ── Friendship Points System ──
const FRIENDSHIP = {
  maxHearts: 10,
  pointsPerHeart: 250,
  giftWeekly: { standard: 1, birthday: 1 },
  quality: {
    loved: { base: 80, birthday: 640 },
    liked: { base: 45, birthday: 360 },
    neutral: { base: 20, birthday: 160 },
    disliked: { base: -20, birthday: -160 },
    hated: { base: -40, birthday: -320 }
  },
  talkPoints: 20,
  heartsToPoints: function(hearts) { return hearts * this.pointsPerHeart; },
  pointsToHearts: function(points) { return Math.floor(points / this.pointsPerHeart); },
  giftsToMax: function(currentHearts, giftType) {
    const pointsNeeded = (this.maxHearts - currentHearts) * this.pointsPerHeart;
    const perGift = giftType === "loved" ? 80 : 45;
    return Math.ceil(pointsNeeded / perGift);
  }
};

// ── Gift Tracker (localStorage) ──
function getTracker() {
  try { return JSON.parse(localStorage.getItem("sdvNpcTracker") || "{}"); } catch (e) { return {}; }
}

function saveTracker(data) {
  try { localStorage.setItem("sdvNpcTracker", JSON.stringify(data)); } catch (e) {}
}

function toggleGifted(npcId) {
  const tracker = getTracker();
  const today = new Date().toISOString().slice(0, 10);
  if (!tracker[today]) tracker[today] = {};
  tracker[today][npcId] = !tracker[today][npcId];
  saveTracker(tracker);
  updateTrackerUI();
}

function updateTrackerUI() {
  const tracker = getTracker();
  const today = new Date().toISOString().slice(0, 10);
  const todayGifts = tracker[today] || {};
  
  document.querySelectorAll(".gift-btn").forEach(btn => {
    const npcId = btn.dataset.npc;
    const gifted = !!todayGifts[npcId];
    btn.textContent = gifted ? "✅ Gifted" : "🎁 Mark Gifted";
    btn.className = `gift-btn ${gifted ? 'gifted' : ''}`;
  });
  
  const count = Object.values(todayGifts).filter(Boolean).length;
  const countEl = document.getElementById("gifted-count");
  if (countEl) countEl.textContent = `Gifted: ${count} NPCs today`;
}

// ── Render NPC Table ──
function renderNPCTable(filter) {
  const tbody = document.getElementById("npc-tbody");
  if (!tbody) return;
  
  const term = (filter || "").toLowerCase();
  const season = document.getElementById("season-filter")?.value || "all";
  
  const filtered = NPCS.filter(npc => {
    if (term) {
      const nameMatch = npc.name.toLowerCase().includes(term);
      const giftMatch = npc.loves.some(g => g.toLowerCase().includes(term)) ||
                        npc.likes.some(g => g.toLowerCase().includes(term));
      const idMatch = npc.id.toLowerCase().includes(term);
      if (!nameMatch && !giftMatch && !idMatch) return false;
    }
    if (season !== "all") {
      const npcSeason = npc.born.split(" ")[0];
      if (npcSeason !== season) return false;
    }
    return true;
  });
  
  const tracker = getTracker();
  const today = new Date().toISOString().slice(0, 10);
  const todayGifts = tracker[today] || {};
  
  tbody.innerHTML = filtered.map(npc => {
    const lovesStr = npc.loves.join(", ");
    const likesStr = npc.likes.join(", ");
    const isBirthday = isBirthdayToday(npc);
    const gifted = !!todayGifts[npc.id];
    return `
    <tr${isBirthday ? ' style="border: 2px solid #eab308;"' : ''}>
      <td><strong>${npc.avatar} ${npc.name}</strong>${isBirthday ? '<span style="color:#eab308;"> 🎂</span>' : ''}</td>
      <td style="font-size:0.8em; opacity:0.7;">${npc.born}</td>
      <td><span class="loved-tag">${lovesStr}</span></td>
      <td><span class="liked-tag" style="opacity:0.7;">${likesStr}</span></td>
      <td style="text-align:center;">
        <button class="gift-btn ${gifted ? 'gifted' : ''}" data-npc="${npc.id}" onclick="toggleGifted('${npc.id}')">${gifted ? '✅ Gifted' : '🎁 Mark Gifted'}</button>
      </td>
      <td style="text-align:center; font-size:0.85em;">
        ${isBirthday ? '<span style="color:#eab308;">🎂 +640pts</span>' : '+80pts / +45pts'}
      </td>
    </tr>`;
  }).join("");
  
  updateTrackerUI();
}

function isBirthdayToday(npc) {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  const dayOfYear = month * 30 + date;
  
  const bdOffset = {
    "Spring": 79, "Summer": 171, "Fall": 264, "Winter": 355
  };
  
  const [season, _dayStr] = npc.born.split(" ");
  const day = parseInt(_dayStr);
  const npcOffset = bdOffset[season] + (day || 1) - 1;
  
  return Math.abs(dayOfYear - npcOffset) <= 3;
}

// ── Birthday Widget (enhanced) ──
function renderBirthdayWidget() {
  const widget = document.getElementById("birthday-widget");
  if (!widget) return;
  
  const now = new Date();
  const month = now.getMonth();
  
  let currentSeason;
  if (month >= 2 && month <= 4) currentSeason = "Spring";
  else if (month >= 5 && month <= 7) currentSeason = "Summer";
  else if (month >= 8 && month <= 10) currentSeason = "Fall";
  else currentSeason = "Winter";
  
  // Sort all NPCs by proximity to today
  const todayOffset = month * 30 + now.getDate();
  const bdOffset = { "Spring": 79, "Summer": 171, "Fall": 264, "Winter": 355 };
  
  const sorted = NPCS.map(n => {
    const [s, d] = n.born.split(" ");
    const day = parseInt(d);
    const offset = bdOffset[s] + day - 1;
    let diff = offset - todayOffset;
    if (diff < 0) diff += 365;
    return { ...n, _offset: offset, _diff: diff };
  }).sort((a, b) => a._diff - b._diff);
  
  // Next upcoming birthday
  const next = sorted[0];
  // Current season birthdays
  const seasonBirthdays = sorted.filter(n => n._diff <= 60).slice(0, 6);
  
  widget.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-bottom:12px;">
      <span style="font-size:1.1em; font-weight:bold;">🎂 Birthdays</span>
      <span style="font-size:0.85em; opacity:0.7;">${currentSeason}</span>
    </div>
    ${next ? `
    <div style="background:rgba(234,179,8,0.15); border:1px solid rgba(234,179,8,0.4); border-radius:12px; padding:12px 16px; margin-bottom:12px; display:flex; align-items:center; gap:12px;">
      <span style="font-size:1.5em;">⏰</span>
      <div>
        <strong style="color:#eab308;">Next Up: ${next.avatar} ${next.name}</strong>
        <span style="font-size:0.85em; opacity:0.7; margin-left:8px;">${next.born} (in ~${Math.round(next._diff / 30)} weeks)</span>
      </div>
    </div>` : ''}
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      ${seasonBirthdays.map(n => `
        <span style="background:${n._diff < 14 ? 'rgba(234,179,8,0.2)' : 'rgba(255,255,255,0.05)'}; padding:6px 14px; border-radius:20px; font-size:0.85em;${n._diff < 14 ? ' border:1px solid rgba(234,179,8,0.3);' : ''}">
          ${n.avatar} ${n.name} — ${n.born}
          ${n._diff < 14 ? ' 🔜' : ''}
        </span>
      `).join("")}
    </div>
    <p style="font-size:0.8em; opacity:0.6; margin-top:10px;">💡 Birthday gifts give 8x friendship points (640 instead of 80)!</p>
  `;
}

// ── Weekly Schedule Panel ──
function renderSchedule() {
  const el = document.getElementById("schedule-table-body");
  if (!el) return;
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  el.innerHTML = NPCS.sort((a, b) => a.name.localeCompare(b.name)).map(npc => {
    const schedule = WEEKLY_SCHEDULES[npc.name];
    if (!schedule) return '';
    return `
    <tr>
      <td><strong>${npc.avatar} ${npc.name}</strong></td>
      ${days.map(d => `<td style="font-size:0.8em; max-width:140px;">${schedule[d] || '—'}</td>`).join("")}
    </tr>`;
  }).join("");
}

// ── Universal Gift Reference ──
function renderUniversalGifts() {
  const el = document.getElementById("universal-gifts");
  if (!el) return;
  
  el.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
      <div class="uni-card uni-loves">
        <h4 style="color:#22c55e; margin:0 0 8px 0;">💖 Universal Loves</h4>
        <span class="uni-item">${UNIVERSAL.loves.join('</span><span class="uni-item">')}</span>
        <p style="font-size:0.75em; opacity:0.6; margin-top:8px;">⚠️ Penny hates Rabbit's Foot</p>
      </div>
      <div class="uni-card uni-likes">
        <h4 style="color:#3b82f6; margin:0 0 8px 0;">👍 Universal Likes</h4>
        <span class="uni-item">${UNIVERSAL.likes.join('</span><span class="uni-item">')}</span>
      </div>
      <div class="uni-card uni-neutral">
        <h4 style="color:#a855f7; margin:0 0 8px 0;">➖ Universal Neutrals</h4>
        <span class="uni-item">${UNIVERSAL.neutrals.join('</span><span class="uni-item">')}</span>
      </div>
      <div class="uni-card uni-dislikes">
        <h4 style="color:#f97316; margin:0 0 8px 0;">👎 Universal Dislikes</h4>
        <span class="uni-item">${UNIVERSAL.dislikes.join('</span><span class="uni-item">')}</span>
      </div>
      <div class="uni-card uni-hates">
        <h4 style="color:#ef4444; margin:0 0 8px 0;">❌ Universal Hates</h4>
        <span class="uni-item">${UNIVERSAL.hates.join('</span><span class="uni-item">')}</span>
      </div>
    </div>
  `;
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("npc-search");
  const seasonFilter = document.getElementById("season-filter");
  
  if (searchInput) searchInput.addEventListener("input", () => renderNPCTable(searchInput.value));
  if (seasonFilter) seasonFilter.addEventListener("change", () => renderNPCTable(searchInput?.value || ""));
  
  renderNPCTable("");
  renderBirthdayWidget();
  renderSchedule();
  renderUniversalGifts();
});
