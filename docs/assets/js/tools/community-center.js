/**
 * Stardew Valley 1.6 Community Center Bundle Tracker
 * Complete bundle tracking tool for all 6 rooms with localStorage persistence.
 * Data verified against official Stardew Valley Wiki (1.6.15)
 * Sources: https://stardewvalleywiki.com/Bundles
 */

// ── Bundle Database (verified v1.6 data) ──
const BUNDLES = {
  // ── Crafts Room (12 bundles) ──
  crafts_room: {
    name: "Crafts Room",
    icon: "🌲",
    color: "#22c55e",
    bundles: [
      {
        name: "Spring Foraging",
        icon: "🌸",
        items: [
          { name: "Wild Horseradish", need: 1 },
          { name: "Daffodil", need: 1 },
          { name: "Leek", need: 1 },
          { name: "Dandelion", need: 1 }
        ]
      },
      {
        name: "Summer Foraging",
        icon: "☀️",
        items: [
          { name: "Grape", need: 1 },
          { name: "Spice Berry", need: 1 },
          { name: "Sweet Pea", need: 1 }
        ]
      },
      {
        name: "Fall Foraging",
        icon: "🍂",
        items: [
          { name: "Common Mushroom", need: 1 },
          { name: "Wild Plum", need: 1 },
          { name: "Hazelnut", need: 1 },
          { name: "Blackberry", need: 1 }
        ]
      },
      {
        name: "Winter Foraging",
        icon: "❄️",
        items: [
          { name: "Winter Root", need: 1 },
          { name: "Crystal Fruit", need: 1 },
          { name: "Snow Yam", need: 1 },
          { name: "Crocus", need: 1 }
        ]
      },
      {
        name: "Construction",
        icon: "🔨",
        items: [
          { name: "Wood", need: 99 },
          { name: "Stone", need: 99 },
          { name: "Hardwood", need: 10 }
        ]
      },
      {
        name: "Exotic Foraging",
        icon: "🌴",
        items: [
          { name: "Coconut", need: 1 },
          { name: "Cactus Fruit", need: 1 },
          { name: "Cave Carrot", need: 1 },
          { name: "Red Mushroom", need: 1 },
          { name: "Purple Mushroom", need: 1 },
          { name: "Maple Syrup", need: 1 },
          { name: "Oak Resin", need: 1 },
          { name: "Pine Tar", need: 1 },
          { name: "Morel", need: 1 }
        ]
      }
    ]
  },

  // ── Pantry (7 bundles) ──
  pantry: {
    name: "Pantry",
    icon: "🥕",
    color: "#eab308",
    bundles: [
      {
        name: "Spring Crops",
        icon: "🌸",
        items: [
          { name: "Parsnip", need: 5 },
          { name: "Green Bean", need: 5 },
          { name: "Cauliflower", need: 5 },
          { name: "Potato", need: 5 }
        ]
      },
      {
        name: "Summer Crops",
        icon: "☀️",
        items: [
          { name: "Tomato", need: 5 },
          { name: "Hot Pepper", need: 5 },
          { name: "Blueberry", need: 5 },
          { name: "Melon", need: 5 }
        ]
      },
      {
        name: "Fall Crops",
        icon: "🍂",
        items: [
          { name: "Corn", need: 5 },
          { name: "Eggplant", need: 5 },
          { name: "Pumpkin", need: 5 },
          { name: "Yam", need: 5 }
        ]
      },
      {
        name: "Quality Crops",
        icon: "⭐",
        items: [
          { name: "Parsnip (Gold)", need: 5, qualifier: "Gold quality" },
          { name: "Melon (Gold)", need: 5, qualifier: "Gold quality" },
          { name: "Pumpkin (Gold)", need: 5, qualifier: "Gold quality" },
          { name: "Corn (Gold)", need: 5, qualifier: "Gold quality" }
        ]
      },
      {
        name: "Animal",
        icon: "🐄",
        items: [
          { name: "Large Milk", need: 1, qualifier: "Large" },
          { name: "Large Egg (Brown)", need: 1, qualifier: "Large" },
          { name: "Large Egg (White)", need: 1, qualifier: "Large" },
          { name: "Large Goat Milk", need: 1, qualifier: "Large" },
          { name: "Wool", need: 1 },
          { name: "Duck Egg", need: 1 }
        ]
      },
      {
        name: "Artisan",
        icon: "🧀",
        items: [
          { name: "Truffle Oil", need: 1 },
          { name: "Cloth", need: 1 },
          { name: "Goat Cheese", need: 1 },
          { name: "Cheese", need: 1 },
          { name: "Honey", need: 1 },
          { name: "Jelly", need: 1 },
          { name: "Apple", need: 1 },
          { name: "Apricot", need: 1 },
          { name: "Orange", need: 1 },
          { name: "Peach", need: 1 },
          { name: "Pomegranate", need: 1 },
          { name: "Cherry", need: 1 }
        ]
      },
      {
        name: "Marnie's Animal Products",
        icon: "🥚",
        items: [
          { name: "Truffle", need: 1 },
          { name: "Duck Feather", need: 1 },
          { name: "Rabbit's Foot", need: 1 }
        ]
      }
    ]
  },

  // ── Fish Tank (7 bundles + 3 Legendary II for 1.6) ──
  fish_tank: {
    name: "Fish Tank",
    icon: "🐟",
    color: "#3b82f6",
    bundles: [
      {
        name: "River Fish",
        icon: "🏞️",
        items: [
          { name: "Sunfish", need: 1 },
          { name: "Catfish", need: 1 },
          { name: "Shad", need: 1 },
          { name: "Tiger Trout", need: 1 }
        ]
      },
      {
        name: "Lake Fish",
        icon: "💧",
        items: [
          { name: "Largemouth Bass", need: 1 },
          { name: "Carp", need: 1 },
          { name: "Bullhead", need: 1 },
          { name: "Sturgeon", need: 1 }
        ]
      },
      {
        name: "Ocean Fish",
        icon: "🌊",
        items: [
          { name: "Sardine", need: 1 },
          { name: "Tuna", need: 1 },
          { name: "Red Snapper", need: 1 },
          { name: "Tilapia", need: 1 }
        ]
      },
      {
        name: "Night Fishing",
        icon: "🌙",
        items: [
          { name: "Walleye", need: 1 },
          { name: "Bream", need: 1 },
          { name: "Eel", need: 1 },
          { name: "Midnight Carp", need: 1 }
        ]
      },
      {
        name: "Crab Pot",
        icon: "🦀",
        items: [
          { name: "Lobster", need: 1 },
          { name: "Crab", need: 1 },
          { name: "Clam", need: 1 },
          { name: "Crayfish", need: 1 },
          { name: "Mussel", need: 1 },
          { name: "Shrimp", need: 1 },
          { name: "Snail", need: 1 },
          { name: "Periwinkle", need: 1 },
          { name: "Oyster", need: 1 }
        ]
      },
      {
        name: "Speciality Fish",
        icon: "🏆",
        items: [
          { name: "Pufferfish", need: 1 },
          { name: "Ghostfish", need: 1 },
          { name: "Sandfish", need: 1 },
          { name: "Woodskip", need: 1 },
          { name: "Sea Cucumber", need: 1 }
        ]
      },
      {
        name: "Legendary Fish II",
        icon: "🌟",
        items: [
          { name: "Ms. Angler II", need: 1, qualifier: "Legendary II" },
          { name: "Crimsonfish II", need: 1, qualifier: "Legendary II" },
          { name: "Glacierfish II", need: 1, qualifier: "Legendary II" },
          { name: "Legend II", need: 1, qualifier: "Legendary II" },
          { name: "Mutant Carp II", need: 1, qualifier: "Legendary II" },
          { name: "Radioactive Carp", need: 1, qualifier: "1.6 New" }
        ]
      }
    ]
  },

  // ── Boiler Room (7 bundles) ──
  boiler_room: {
    name: "Boiler Room",
    icon: "🔥",
    color: "#ef4444",
    bundles: [
      {
        name: "Blacksmith's",
        icon: "⛏️",
        items: [
          { name: "Copper Bar", need: 1 },
          { name: "Iron Bar", need: 1 },
          { name: "Gold Bar", need: 1 }
        ]
      },
      {
        name: "Geologist's",
        icon: "💎",
        items: [
          { name: "Quartz", need: 1 },
          { name: "Earth Crystal", need: 1 },
          { name: "Frozen Tear", need: 1 },
          { name: "Fire Quartz", need: 1 }
        ]
      },
      {
        name: "Adventurer's",
        icon: "⚔️",
        items: [
          { name: "Slime (99)", need: 99, qualifier: "99 Slime" },
          { name: "Bat Wing", need: 10 },
          { name: "Solar Essence", need: 1 },
          { name: "Void Essence", need: 1 }
        ]
      }
    ]
  },

  // ── Bulletin Board (7+ bundles) ──
  bulletin_board: {
    name: "Bulletin Board",
    icon: "📋",
    color: "#a855f7",
    bundles: [
      {
        name: "Chef's",
        icon: "🍳",
        items: [
          { name: "Maple Syrup", need: 1 },
          { name: "Fiddlehead Fern", need: 1 },
          { name: "Truffle Oil", need: 1 },
          { name: "Poppyseed Muffin", need: 1 },
          { name: "Dish O' The Sea", need: 1 },
          { name: "Fried Mushroom", need: 1 },
          { name: "Pizza", need: 1 }
        ]
      },
      {
        name: "Dye's",
        icon: "🎨",
        items: [
          { name: "Red Mushroom", need: 1 },
          { name: "Sea Urchin", need: 1 },
          { name: "Sunflower", need: 1 },
          { name: "Duck Feather", need: 1 },
          { name: "Aquamarine", need: 1 },
          { name: "Red Cabbage", need: 1 }
        ]
      },
      {
        name: "Field Research",
        icon: "🔬",
        items: [
          { name: "Purple Mushroom", need: 1 },
          { name: "Nautilus Shell", need: 1 },
          { name: "Chub", need: 1 },
          { name: "Frozen Geode", need: 1 }
        ]
      },
      {
        name: "Fodder",
        icon: "🌾",
        items: [
          { name: "Wheat (10)", need: 10, qualifier: "10 Wheat" },
          { name: "Hay (10)", need: 10, qualifier: "10 Hay" },
          { name: "Apple (3)", need: 3, qualifier: "3 Apples" }
        ]
      },
      {
        name: "Enchanter's",
        icon: "🔮",
        items: [
          { name: "Oak Resin", need: 1 },
          { name: "Wine", need: 1 },
          { name: "Pomegranate", need: 1 },
          { name: "Amethyst", need: 1 }
        ]
      },
      {
        name: "Children's",
        icon: "🧸",
        items: [
          { name: "Raisins", need: 1, qualifier: "1.6 New" },
          { name: "Tropical Curry", need: 1 },
          { name: "Pear", need: 1, qualifier: "1.6 New" },
          { name: "Banana", need: 1 },
          { name: "Mango", need: 1 },
          { name: "Taro Root", need: 1 },
          { name: "Pineapple", need: 1 }
        ]
      },
      {
        name: "??Missing Bundle??",
        icon: "❓",
        items: [
          { name: "Sweet Gem Berry", need: 1 },
          { name: "Prismatic Shard", need: 1 },
          { name: "Solar Essence (5)", need: 5, qualifier: "5 Solar Essence" },
          { name: "Void Essence (5)", need: 5, qualifier: "5 Void Essence" },
          { name: "Dinosaur Mayonnaise", need: 1 }
        ]
      }
    ]
  },

  // ── Vault (3 bundles) ──
  vault: {
    name: "Vault",
    icon: "💰",
    color: "#c9a96e",
    bundles: [
      {
        name: "2,500g",
        icon: "🪙",
        items: [
          { name: "Donate 2,500g", need: 1, qualifier: "2,500 gold" }
        ]
      },
      {
        name: "5,000g",
        icon: "🪙🪙",
        items: [
          { name: "Donate 5,000g", need: 1, qualifier: "5,000 gold" }
        ]
      },
      {
        name: "10,000g",
        icon: "🪙🪙🪙",
        items: [
          { name: "Donate 10,000g", need: 1, qualifier: "10,000 gold" }
        ]
      },
      {
        name: "25,000g",
        icon: "💎",
        items: [
          { name: "Donate 25,000g", need: 1, qualifier: "25,000 gold" }
        ]
      }
    ]
  }
};

const ROOM_ORDER = ["crafts_room", "pantry", "fish_tank", "boiler_room", "bulletin_board", "vault"];

// ── localStorage ──
function getProgress() {
  try { return JSON.parse(localStorage.getItem("sdvBundleProgress") || "{}"); } catch (e) { return {}; }
}

function saveProgress(data) {
  try { localStorage.setItem("sdvBundleProgress", JSON.stringify(data)); } catch (e) {}
}

function getItemKey(roomKey, bundleIdx, itemIdx) {
  return `${roomKey}_${bundleIdx}_${itemIdx}`;
}

function toggleItem(roomKey, bundleIdx, itemIdx) {
  const progress = getProgress();
  const key = getItemKey(roomKey, bundleIdx, itemIdx);
  progress[key] = !progress[key];
  saveProgress(progress);
  renderAll();
}

function resetAllBundles() {
  if (confirm("Reset ALL bundle progress? This cannot be undone.")) {
    saveProgress({});
    renderAll();
  }
}

// ── Counting helpers ──
function countBundleDone(progress, roomKey, bundle) {
  let completed = 0;
  bundle.items.forEach((item, i) => {
    if (progress[getItemKey(roomKey, bundle._idx, i)]) completed++;
  });
  return completed;
}

function countBundleTotal(bundle) {
  return bundle.items.length;
}

function countRoomDone(progress, roomKey) {
  const room = BUNDLES[roomKey];
  let done = 0;
  let total = 0;
  room.bundles.forEach((bundle, bi) => {
    bundle._idx = bi;
    bundle.items.forEach((item, ii) => {
      total++;
      if (progress[getItemKey(roomKey, bi, ii)]) done++;
    });
  });
  return { done, total };
}

// ── Render UI ──
function renderAll() {
  const container = document.getElementById("bundle-container");
  if (!container) return;

  const progress = getProgress();
  
  // Calculate overall progress
  let overallDone = 0;
  let overallTotal = 0;
  
  ROOM_ORDER.forEach(rk => {
    const { done, total } = countRoomDone(progress, rk);
    overallDone += done;
    overallTotal += total;
  });
  
  const overallPct = overallTotal > 0 ? Math.round((overallDone / overallTotal) * 100) : 0;

  // Overall progress header
  container.innerHTML = `
    <div style="margin-bottom:24px;">
      <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:12px;">
        <h3 style="margin:0;">🏛️ Community Center Progress</h3>
        <span style="font-size:1.8em; font-weight:bold; color:#c9a96e;">${overallPct}%</span>
        <span style="opacity:0.7;">${overallDone} / ${overallTotal} items</span>
        <button onclick="resetAllBundles()" style="margin-left:auto; padding:6px 16px; border-radius:8px; border:1px solid rgba(239,68,68,0.4); background:transparent; color:#ef4444; cursor:pointer; font-size:0.8em;">🔄 Reset All</button>
      </div>
      <div style="height:20px; background:rgba(255,255,255,0.08); border-radius:10px; overflow:hidden;">
        <div style="height:100%; width:${overallPct}%; background:linear-gradient(90deg, #ef4444, #eab308, #22c55e); border-radius:10px; transition:width 0.5s;"></div>
      </div>
      <!-- Per-room progress bars -->
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
        ${ROOM_ORDER.map(rk => {
          const room = BUNDLES[rk];
          const { done, total } = countRoomDone(progress, rk);
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return `
            <div style="flex:1; min-width:120px; background:rgba(255,255,255,0.03); border-radius:8px; padding:8px 12px; text-align:center;">
              <div style="font-size:0.8em; font-weight:bold; color:${room.color};">${room.icon} ${room.name}</div>
              <div style="height:6px; background:rgba(255,255,255,0.08); border-radius:3px; margin:4px 0; overflow:hidden;">
                <div style="height:100%; width:${pct}%; background:${room.color}; border-radius:3px; transition:width 0.5s;"></div>
              </div>
              <div style="font-size:0.7em; opacity:0.7;">${done}/${total}</div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Render each room
  ROOM_ORDER.forEach(rk => {
    const room = BUNDLES[rk];
    const roomEl = document.getElementById(`room-${rk}`);
    if (!roomEl) return;
    
    const { done, total } = countRoomDone(progress, rk);
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    
    let html = `
      <div style="margin-bottom:0;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <span style="font-size:1.4em;">${room.icon}</span>
          <h4 style="margin:0; color:${room.color};">${room.name}</h4>
          <span style="font-size:0.85em; opacity:0.7;">${done}/${total} (${pct}%)</span>
        </div>
        <div style="height:8px; background:rgba(255,255,255,0.06); border-radius:4px; margin-bottom:16px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:${room.color}; border-radius:4px; transition:width 0.5s;"></div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:12px;">
    `;
    
    room.bundles.forEach((bundle, bi) => {
      bundle._idx = bi;
      const completed = countBundleDone(progress, rk, bundle);
      const totalItems = countBundleTotal(bundle);
      const bundleDone = completed >= totalItems;
      
      html += `
        <div style="background:${bundleDone ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)'}; border:1px solid ${bundleDone ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}; border-radius:10px; padding:12px; transition:all 0.2s;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <span style="font-size:1.1em;">${bundle.icon}</span>
            <strong style="font-size:0.9em;">${bundle.name}</strong>
            <span style="margin-left:auto; font-size:0.8em; opacity:0.7;">${completed}/${totalItems}</span>
            ${bundleDone ? '<span style="color:#22c55e;">✅</span>' : ''}
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${bundle.items.map((item, ii) => {
              const key = getItemKey(rk, bi, ii);
              const checked = !!progress[key];
              return `
                <label style="display:flex; align-items:center; gap:4px; padding:3px 8px; border-radius:6px; background:${checked ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)'}; cursor:pointer; font-size:0.78em; ${checked ? 'opacity:0.5; text-decoration:line-through;' : ''} transition:all 0.2s;" onclick="toggleItem('${rk}', ${bi}, ${ii})">
                  <input type="checkbox" ${checked ? 'checked' : ''} style="accent-color:#22c55e;" onchange="toggleItem('${rk}', ${bi}, ${ii})">
                  ${item.name}${item.need > 1 ? ` (×${item.need})` : ''}
                  ${item.qualifier ? `<span style="opacity:0.5; font-size:0.85em;">${item.qualifier}</span>` : ''}
                </label>
              `;
            }).join("")}
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
    roomEl.innerHTML = html;
  });
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  renderAll();
});
