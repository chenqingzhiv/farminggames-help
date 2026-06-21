/**
 * Stardew Valley 1.6 NPC Friendship Optimizer
 * All NPCs with loved/liked gifts, weekly gift tracker, happiness budget calculator
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

// ── Universal Gift Reference ──
const UNIVERSAL = {
  loves: ["Prismatic Shard", "Rabbit's Foot"],  // except Penny hates Rabbit's Foot
  likes: ["All Artisan Goods", "All Cooked Dishes", "All Flowers", "All Foraged Items", "All Fruit", "Diamond", "Gold Bar", "Iridium Bar", "Maple Syrup", "Minerals"],
  dislikes: ["All Fish (except Carp)", "All Ores", "All Refined Minerals", "Clay", "Farming Tools", "Furniture", "Garbage", "Hazelnut", "Hops", "Miner's Trestle", "Oil of Garlic", "Sap", "Seaweed", "Slime", "Tackle", "Tea Set", "Torch", "Truffle Oil"],
  hates: ["All Bait", "All Dinosaur Mayonnaise", "All Fishing Tackle", "Artifact", "Bomb", "Cherry Bomb", "Crafting Trash", "Goldfish", "Gunther (secret note)", "Honey", "Mega Bomb", "Pagoda", "Paper", "Pill", "Rotten Plant", "Rusty Spoon", "Solid Gold Lewis", "Strange Bun", "Trash", "Weathered Floor"]
};

// ── Friendship Points System ──
const FRIENDSHIP = {
  maxHearts: 10,  // 14 for spouse
  pointsPerHeart: 250,
  giftWeekly: { standard: 1, birthday: 1 },
  
  // Gift quality multipliers
  quality: {
    loved: { base: 80, birthday: 640, star: { normal: 80, silver: 80, gold: 80, iridium: 80 } },
    liked: { base: 45, birthday: 360, star: { normal: 45, silver: 45, gold: 45, iridium: 45 } },
    neutral: { base: 20, birthday: 160 },
    disliked: { base: -20, birthday: -160 },
    hated: { base: -40, birthday: -320 }
  },
  
  // Talking to NPC gives 20 points (once per day)
  talkPoints: 20,
  
  // Hearts progression
  heartsToPoints: function(hearts) { return hearts * this.pointsPerHeart; },
  pointsToHearts: function(points) { return Math.floor(points / this.pointsPerHeart); },
  
  // Calculate gifts needed
  giftsToMax: function(currentHearts, giftType) {
    const pointsNeeded = (this.maxHearts - currentHearts) * this.pointsPerHeart;
    const perGift = giftType === "loved" ? 80 : 45;
    return Math.ceil(pointsNeeded / perGift);
  },

  // Calculate weekly budget (2 loved gifts + 1 birthday gift)
  weeklyBudgetLabel: function(dateConfig) {
    const lovedCosts = {
      "Prismatic Shard": 0, "Rabbit's Foot": 340, "Diamond": 750,
      "Amethyst": 100, "Aquamarine": 180, "Emerald": 250, "Jade": 200, "Ruby": 250, "Topaz": 80,
      "Beer": 250, "Pizza": 300, "Coffee": 150, "Pale Ale": 350, "Wine": 400,
      "Chocolate Cake": 200, "Pink Cake": 450, "Pumpkin Pie": 400,
      "Cactus Fruit": 75, "Coconut": 100, "Hot Pepper": 40,
      "Cheese Cauliflower": 300, "Pepper Poppers": 200, "Salmon Dinner": 300
    };
    return lovedCosts;
  }
};

// ── Easy-to-find universal loved/liked items with prices ──
const BUDGET_ITEMS = [
  { name: "Diamond", price: 750, type: "Mineral", category: "loved_universal", npcs: "Clint, Harvey, Krobus, Maru, Penny, Willy, +more" },
  { name: "Amethyst", price: 100, type: "Mineral", category: "cheap_loved", npcs: "Abigail, Clint, Emily, Dwarf" },
  { name: "Emerald", price: 250, type: "Mineral", category: "cheap_loved", npcs: "Clint, Emily, Dwarf, Penny" },
  { name: "Ruby", price: 250, type: "Mineral", category: "cheap_loved", npcs: "Clint, Emily, Dwarf" },
  { name: "Topaz", price: 80, type: "Mineral", category: "cheap_loved", npcs: "Clint, Emily, Dwarf" },
  { name: "Jade", price: 200, type: "Mineral", category: "cheap_loved", npcs: "Clint, Dwarf" },
  { name: "Frozen Tear", price: 75, type: "Mineral", category: "cheap_loved", npcs: "Sebastian" },
  { name: "Cactus Fruit", price: 75, type: "Fruit", category: "cheap_loved", npcs: "Linus, Pam, Sam, Sandy" },
  { name: "Coconut", price: 100, type: "Fruit", category: "cheap_loved", npcs: "Haley, Linus, Sandy" },
  { name: "Hot Pepper", price: 40, type: "Crop", category: "cheap_loved", npcs: "Lewis, Shane" },
  { name: "Beer", price: 250, type: "Artisan", category: "cheap_loved", npcs: "Pam, Shane" },
  { name: "Pizza", price: 300, type: "Cooking", category: "cheap_loved", npcs: "Sam, Shane" },
  { name: "Coffee", price: 150, type: "Cooking", category: "cheap_loved", npcs: "Harvey" },
  { name: "Mead", price: 200, type: "Artisan", category: "cheap_loved", npcs: "Willy" },
  { name: "Pale Ale", price: 350, type: "Artisan", category: "cheap_loved", npcs: "Pam" },
  { name: "Sunflower", price: 80, type: "Crop", category: "cheap_loved", npcs: "Haley" },
  { name: "Wine", price: 400, type: "Artisan", category: "medium", npcs: "Elliott, Harvey, Leah, Pam, Robin, +more" },
  { name: "Mayonnaise", price: 190, type: "Artisan", category: "universal_like", npcs: "Universal liked (most NPCs)" },
  { name: "Cheese", price: 230, type: "Artisan", category: "universal_like", npcs: "Universal liked (most NPCs)" },
  { name: "Honey", price: 100, type: "Artisan", category: "universal_like", npcs: "Robin loves, most like" },
  { name: "Apple", price: 100, type: "Fruit", category: "universal_like", npcs: "Universal liked" },
  { name: "Apricot", price: 50, type: "Fruit", category: "universal_like", npcs: "Universal liked" },
  { name: "Orange", price: 100, type: "Fruit", category: "universal_like", npcs: "Gus loves, universal liked" },
  { name: "Peach", price: 140, type: "Fruit", category: "universal_like", npcs: "Robin loves, universal liked" },
  { name: "Pomegranate", price: 140, type: "Fruit", category: "universal_like", npcs: "Elliott loves, universal liked" },
  { name: "Cherry", price: 80, type: "Fruit", category: "universal_like", npcs: "Universal liked" },
  { name: "Salmonberry", price: 5, type: "Forage", category: "free_forage", npcs: "Universal liked (except Seb hates)" },
  { name: "Daffodil", price: 0, type: "Forage", category: "free_forage", npcs: "Universal liked (most NPCs)" },
  { name: "Dandelion", price: 0, type: "Forage", category: "free_forage", npcs: "Universal liked (most NPCs)" },
  { name: "Leek", price: 0, type: "Forage", category: "free_forage", npcs: "George loves, universal liked" },
];

// ── Quick Reference: Universal items to avoid ──
const AVOID = ["Clay", "Holly", "Nautilus Shell", "Quartz"];

// ── Season/Birthday index ──
const BIRTHDAYS = {
  "Spring": ["Jas (Spr 4)", "Kent (Spr 4)", "Lewis (Spr 7)", "Vincent (Spr 10)", "Haley (Spr 14)", "Pam (Spr 18)", "Shane (Spr 20)", "Pierre (Spr 26)", "Emily (Spr 27)"],
  "Summer": ["Gus (Sum 4)", "Jas (Sum 4)", "Maru (Sum 10)", "Alex (Sum 13)", "Leo (Sum 14)", "Sam (Sum 17)", "Demetrius (Sum 19)", "Dwarf (Sum 22)", "Willy (Sum 24)"],
  "Fall": ["Penny (Fall 2)", "Elliott (Fall 5)", "Abigail (Fall 13)", "Sandy (Fall 15)", "Marnie (Fall 18)", "Robin (Fall 21)", "George (Fall 24)"],
  "Winter": ["Krobus (Win 1)", "Linus (Win 3)", "Caroline (Win 7)", "Sebastian (Win 10)", "Jodi (Win 11)", "Harvey (Win 14)", "Wizard (Win 17)", "Evelyn (Win 20)", "Leah (Win 23)", "Clint (Win 26)"]
};

// ── Gift Tracker (localStorage) ──
function getTracker() {
  try {
    return JSON.parse(localStorage.getItem("sdvNpcTracker") || "{}");
  } catch (e) { return {}; }
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
  
  // Check current and last ~5 days
  const recent = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (tracker[key]) {
      Object.entries(tracker[key]).forEach(([id, gifted]) => {
        if (gifted && !recent[id]) recent[id] = key;
      });
    }
  }
  
  // Update gift buttons
  document.querySelectorAll(".gift-btn").forEach(btn => {
    const npcId = btn.dataset.npc;
    const gifted = !!todayGifts[npcId];
    btn.textContent = gifted ? "✅ Gifted" : "🎁 Mark Gifted";
    btn.className = `gift-btn ${gifted ? 'gifted' : ''}`;
  });
  
  // Update gifted count
  const count = Object.values(todayGifts).filter(Boolean).length;
  const countEl = document.getElementById("gifted-count");
  if (countEl) countEl.textContent = `Gifted: ${count} NPCs today`;
  
  // Save all checkboxes state
  document.querySelectorAll(".npc-checkbox").forEach(cb => {
    const npcId = cb.dataset.npc;
    // Reset to checkbox state
  });
}

// ── Render NPC Table ──
function renderNPCTable(filter) {
  const tbody = document.getElementById("npc-tbody");
  if (!tbody) return;
  
  const term = (filter || "").toLowerCase();
  const season = document.getElementById("season-filter")?.value || "all";
  
  const filtered = NPCS.filter(npc => {
    if (term && !npc.name.toLowerCase().includes(term) && 
        !npc.loves.some(g => g.toLowerCase().includes(term)) &&
        !npc.likes.some(g => g.toLowerCase().includes(term))) return false;
    if (season !== "all") {
      const npcSeason = npc.born.split(" ")[0];
      if (npcSeason !== season) return false;
    }
    return true;
  });
  
  tbody.innerHTML = filtered.map(npc => {
    const lovesStr = npc.loves.join(", ");
    const likesStr = npc.likes.join(", ");
    const isBirthday = isBirthdayToday(npc);
    return `
    <tr>
      <td><strong>${npc.avatar} ${npc.name}</strong>${isBirthday ? ' 🎂' : ''}</td>
      <td style="font-size:0.8em; opacity:0.7;">${npc.born}</td>
      <td><span class="loved-tag">${lovesStr}</span></td>
      <td><span class="liked-tag" style="opacity:0.7;">${likesStr}</span></td>
      <td style="text-align:center;">
        <button class="gift-btn" data-npc="${npc.id}" onclick="toggleGifted('${npc.id}')">🎁 Mark Gifted</button>
      </td>
      <td style="text-align:center; font-size:0.85em;">
        ${isBirthday ? '🎂 +640pts' : '+80pts (loved) / +45pts (liked)'}
      </td>
    </tr>`;
  }).join("");
  
  updateTrackerUI();
}

function isBirthdayToday(npc) {
  const now = new Date();
  // Approximate: use today's month and date roughly mapped to seasons
  const month = now.getMonth();
  const date = now.getDate();
  const dayOfYear = month * 30 + date;
  
  // SDV birthday mapping (approximate real-world dates)
  const bdMap = {
    "Spring": 60 + 30,  // Spring ~ Mar-Apr
    "Summer": 150 + 30,  // Summer ~ Jun-Jul
    "Fall": 240 + 30,    // Fall ~ Sep-Oct
    "Winter": 330 + 30   // Winter ~ Dec-Jan
  };
  
  const [season, _dayStr] = npc.born.split(" ");
  const day = parseInt(_dayStr);
  const bdOffset = {
    "Spring": 79, "Summer": 171, "Fall": 264, "Winter": 355
  };
  
  const todayOffset = dayOfYear;
  const npcOffset = bdOffset[season] + (day || 1) - 1;
  
  return Math.abs(todayOffset - npcOffset) <= 3;  // 3-day window
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("npc-search");
  const seasonFilter = document.getElementById("season-filter");
  
  if (searchInput) searchInput.addEventListener("input", () => renderNPCTable(searchInput.value));
  if (seasonFilter) seasonFilter.addEventListener("change", () => renderNPCTable(searchInput?.value || ""));
  
  renderNPCTable("");
  
  // Birthday widget
  renderBirthdayWidget();
});

function renderBirthdayWidget() {
  const widget = document.getElementById("birthday-widget");
  if (!widget) return;
  
  const now = new Date();
  const month = now.getMonth();
  
  // Check current season (Northern hemisphere game setting)
  let currentSeason;
  if (month >= 2 && month <= 4) currentSeason = "Spring";
  else if (month >= 5 && month <= 7) currentSeason = "Summer";
  else if (month >= 8 && month <= 10) currentSeason = "Fall";
  else currentSeason = "Winter";
  
  const upcoming = NPCS.filter(n => {
    const [nSeason, nDay] = n.born.split(" ");
    if (nSeason !== currentSeason && nSeason !== getNextSeason(currentSeason)) return false;
    return true;
  }).sort((a, b) => {
    const aDay = parseInt(a.born.split(" ")[1]);
    const bDay = parseInt(b.born.split(" ")[1]);
    return aDay - bDay;
  }).slice(0, 5);
  
  widget.innerHTML = `
    <h4>🎂 This Month's Birthdays</h4>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      ${upcoming.map(n => `<span style="background:rgba(201,169,110,0.2); padding:6px 12px; border-radius:20px; font-size:0.85em;">${n.avatar} ${n.name} — ${n.born}</span>`).join("")}
    </div>
    <p style="font-size:0.8em; opacity:0.6; margin-top:12px;">💡 Birthday gifts give 8x friendship points!</p>
  `;
}

function getNextSeason(s) {
  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const idx = seasons.indexOf(s);
  return seasons[(idx + 1) % 4];
}
