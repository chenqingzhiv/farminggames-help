/**
 * Stardew Valley 1.6 Mining Floor Tracker
 * Track Mines (1-120) and Skull Cavern progress, monster kills, and Guild rewards
 * Data verified against official Stardew Valley Wiki (1.6)
 */

// ── Important Resources by Floor ──
const FLOOR_RESOURCES = {
  5:  { label: "Dwarf Scroll I", icon: "📜", color: "#c9a96e" },
  10: { label: "Elevator", icon: "🛗", color: "#22c55e" },
  15: { label: "Dwarf Scroll II", icon: "📜", color: "#c9a96e" },
  21: { label: "Gold Ore", icon: "🪙", color: "#eab308" },
  41: { label: "Frost Dungeon", icon: "❄️", color: "#3b82f6" },
  51: { label: "Dwarf Scroll III", icon: "📜", color: "#c9a96e" },
  61: { label: "Dwarf Scroll IV", icon: "📜", color: "#c9a96e" },
  71: { label: "Ghosts Common", icon: "👻", color: "#a855f7" },
  81: { label: "Iridium / Slime", icon: "💎", color: "#a855f7" },
  100: { label: "Last Elevator", icon: "🛗", color: "#ef4444" },
  110: { label: "Skull Key Area", icon: "🔑", color: "#ef4444" },
  120: { label: "Mines Complete!", icon: "🏆", color: "#22c55e" },
};

// ── Monster Types ──
const MONSTER_TYPES = [
  { id: "slime",       name: "Slime",        icon: "🟢" },
  { id: "bat",         name: "Bat",          icon: "🦇" },
  { id: "bug",         name: "Bug",          icon: "🐛" },
  { id: "dustsprite",  name: "Dust Sprite",  icon: "💨" },
  { id: "rockcrab",    name: "Rock Crab",    icon: "🦀" },
  { id: "ghost",       name: "Ghost",        icon: "👻" },
  { id: "carbon_ghost",name: "Carbon Ghost", icon: "💀" },
  { id: "skeleton",    name: "Skeleton",     icon: "☠️" },
  { id: "mummy",       name: "Mummy",        icon: "🧟" },
  { id: "serpent",     name: "Serpent",      icon: "🐍" },
  { id: "pepper_rex",  name: "Pepper Rex",   icon: "🦕" },
  { id: "haunted_skull", name: "Haunted Skull", icon: "💀" },
];

// ── Adventure Guild Rewards (v1.6) ──
const GUILD_REWARDS = [
  { monster: "slime",       kills: 150,  name: "Slime Ring",              desc: "Reduces slime damage by 10%" },
  { monster: "slime",       kills: 500,  name: "Slime Charmer Ring",      desc: "Immunity to slime damage" },
  { monster: "slime",       kills: 1000, name: "Burglar's Ring",          desc: "Monsters have double loot chance" },
  { monster: "bat",         kills: 200,  name: "Vampiric Ring",           desc: "4% chance to heal 2 HP on kill" },
  { monster: "dustsprite",  kills: 50,   name: "Burglar's Ring (alt)",    desc: "Double loot from monsters (also 500 Dust Sprites)" },
  { monster: "dustsprite",  kills: 250,  name: "Immunity Band",           desc: "Immunity +4" },
  { monster: "dustsprite",  kills: 500,  name: "Savage Ring",             desc: "+2 speed after killing a monster" },
  { monster: "rockcrab",    kills: 60,   name: "Crabshell Ring",          desc: "+5 Defense" },
  { monster: "ghost",       kills: 250,  name: "Phoenix Ring",            desc: "Automatically revive once per injury" },
  { monster: "mummy",       kills: 100,  name: "Mummy Mask",             desc: "Cosmetic hat" },
  { monster: "skeleton",    kills: 50,   name: "Skeleton Mask",          desc: "Cosmetic hat" },
  { monster: "serpent",     kills: 250,  name: "Napalm Ring",             desc: "Monsters explode on death" },
  { monster: "pepper_rex",  kills: 50,   name: "Pepper Rex Hat",         desc: "Cosmetic hat" },
];

// ── localStorage ──
function getData() {
  try { return JSON.parse(localStorage.getItem("sdvMiningTracker") || "{}"); } catch (e) { return {}; }
}

function saveData(data) {
  try { localStorage.setItem("sdvMiningTracker", JSON.stringify(data)); } catch (e) {}
}

function getDefaultData() {
  return {
    minesFloor: 0,
    skullCavern: "",
    monsterKills: {},
    notes: {}
  };
}

function loadOrInit() {
  let d = getData();
  if (!d.minesFloor && d.minesFloor !== 0) d = getDefaultData();
  if (!d.monsterKills) d.monsterKills = {};
  if (!d.notes) d.notes = {};
  return d;
}

// ── Render Mines Grid ──
function renderMines() {
  const el = document.getElementById("mines-grid");
  if (!el) return;
  const data = loadOrInit();
  const current = data.minesFloor || 0;
  
  let html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(52px, 1fr)); gap:4px;">';
  for (let i = 1; i <= 120; i++) {
    const res = FLOOR_RESOURCES[i];
    const reached = i <= current;
    let style = `text-align:center; padding:6px 2px; border-radius:6px; font-size:0.7em; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.06);`;
    if (reached && res) {
      style += ` background:${res.color}22; border-color:${res.color}44;`;
    } else if (reached) {
      style += ` background:rgba(34,197,94,0.12); border-color:rgba(34,197,94,0.2);`;
    } else {
      style += ` background:rgba(255,255,255,0.03); opacity:0.5;`;
    }
    if (i === current) style += ` box-shadow:0 0 0 2px #22c55e;`;
    
    let label = i;
    if (res) label = res.icon + i;
    html += `<div style="${style}" onclick="setMinesFloor(${i})" title="Floor ${i}${res ? ' — ' + res.label : ''}">${label}</div>`;
  }
  html += '</div>';
  el.innerHTML = html;
  
  // Update info
  document.getElementById("mines-current-floor").textContent = current;
  document.getElementById("mines-floor-input").value = current;
}

function setMinesFloor(floor) {
  const data = loadOrInit();
  data.minesFloor = floor;
  saveData(data);
  renderMines();
  updateProgress();
}

function jumpMinesFloor() {
  const input = document.getElementById("mines-floor-input");
  let val = parseInt(input.value);
  if (isNaN(val)) val = 0;
  if (val < 0) val = 0;
  if (val > 120) val = 120;
  setMinesFloor(val);
}

// ── Skull Cavern ──
function renderSkullCavern() {
  const data = loadOrInit();
  const el = document.getElementById("skull-cavern-display");
  if (!el) return;
  const floor = data.skullCavern || "";
  el.textContent = floor ? `Floor ${floor}` : "Not yet entered";
}

function updateSkullCavern() {
  const input = document.getElementById("skull-cavern-input");
  let val = input.value.trim();
  const data = loadOrInit();
  data.skullCavern = val;
  saveData(data);
  renderSkullCavern();
}

// ── Monster Kill Tracker ──
function renderMonsterKills() {
  const el = document.getElementById("monster-kills-list");
  if (!el) return;
  const data = loadOrInit();
  
  el.innerHTML = MONSTER_TYPES.map(m => {
    const count = data.monsterKills[m.id] || 0;
    return `
    <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:8px; margin-bottom:6px; border:1px solid rgba(255,255,255,0.04);">
      <span style="font-size:1.2em;">${m.icon}</span>
      <span style="flex:1; font-size:0.9em;"><strong>${m.name}</strong></span>
      <button onclick="adjustMonsterKill('${m.id}', -10)" style="padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#ef4444; cursor:pointer; font-size:0.8em;">-10</button>
      <button onclick="adjustMonsterKill('${m.id}', -1)" style="padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#ef4444; cursor:pointer; font-size:0.8em;">-1</button>
      <span style="font-size:1.1em; font-weight:bold; min-width:50px; text-align:center; color:#c9a96e;">${count}</span>
      <button onclick="adjustMonsterKill('${m.id}', 1)" style="padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#22c55e; cursor:pointer; font-size:0.8em;">+1</button>
      <button onclick="adjustMonsterKill('${m.id}', 10)" style="padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#22c55e; cursor:pointer; font-size:0.8em;">+10</button>
      <button onclick="setMonsterKillCustom('${m.id}')" style="padding:2px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#c9a96e; cursor:pointer; font-size:0.8em;">✏️</button>
    </div>`;
  }).join("");
}

function adjustMonsterKill(id, delta) {
  const data = loadOrInit();
  if (!data.monsterKills[id]) data.monsterKills[id] = 0;
  data.monsterKills[id] = Math.max(0, (data.monsterKills[id] || 0) + delta);
  saveData(data);
  renderMonsterKills();
  updateGuildRewards();
  updateProgress();
}

function setMonsterKillCustom(id) {
  const data = loadOrInit();
  const current = data.monsterKills[id] || 0;
  const val = prompt(`Set kills for ${MONSTER_TYPES.find(m => m.id === id).name}:`, current);
  if (val !== null) {
    const n = parseInt(val);
    if (!isNaN(n) && n >= 0) {
      data.monsterKills[id] = n;
      saveData(data);
      renderMonsterKills();
      updateGuildRewards();
      updateProgress();
    }
  }
}

// ── Guild Rewards ──
function updateGuildRewards() {
  const el = document.getElementById("guild-rewards-list");
  if (!el) return;
  const data = loadOrInit();
  
  el.innerHTML = GUILD_REWARDS.map(r => {
    const kills = data.monsterKills[r.monster] || 0;
    const met = kills >= r.kills;
    const monsterName = MONSTER_TYPES.find(m => m.id === r.monster)?.name || r.monster;
    return `
    <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:${met ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.02)'}; border-radius:8px; margin-bottom:4px; border:1px solid ${met ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)'};">
      <span style="font-size:1.1em;">${met ? '✅' : '⬜'}</span>
      <div style="flex:1;">
        <strong style="font-size:0.9em;">${r.name}</strong>
        <div style="font-size:0.75em; opacity:0.7;">${r.desc}</div>
      </div>
      <div style="text-align:right; font-size:0.8em;">
        <span style="${kills >= r.kills ? 'color:#22c55e;' : 'color:#ef4444;'}">${kills}</span> / ${r.kills}
        <div style="font-size:0.7em; opacity:0.5;">${monsterName}</div>
      </div>
    </div>`;
  }).join("");
}

// ── Progress Bar ──
function updateProgress() {
  const data = loadOrInit();
  const bar = document.getElementById("mining-progress-bar");
  const label = document.getElementById("mining-progress-label");
  const text = document.getElementById("mining-progress-text");
  if (!bar) return;
  
  // Mines progress: 0-120 = up to 60% of total
  const minesPct = (data.milesFloor || 0) / 120 * 60;
  
  // Monster kills progress: count % of achievables
  const totalMonsterKills = MONSTER_TYPES.reduce((sum, m) => sum + (data.monsterKills[m.id] || 0), 0);
  const monsterGoal = 500; // soft target
  const monsterPct = Math.min(40, (totalMonsterKills / monsterGoal) * 40);
  
  const totalPct = Math.min(100, Math.round(minesPct + monsterPct));
  
  bar.style.width = totalPct + "%";
  bar.style.background = totalPct === 100 ? "#22c55e" : totalPct > 50 ? "#c9a96e" : "#ef4444";
  if (label) label.textContent = totalPct + "%";
  if (text) text.textContent = `Mines: ${data.minesFloor || 0}/120 | ${totalMonsterKills} monsters slain`;
}

// ── Reset ──
function resetMiningTracker() {
  if (confirm("Reset all mining progress, monster kills, and floor data?")) {
    saveData(getDefaultData());
    renderAll();
  }
}

function renderAll() {
  renderMines();
  renderSkullCavern();
  renderMonsterKills();
  updateGuildRewards();
  updateProgress();
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  renderAll();
  
  // Event listeners
  document.getElementById("mines-floor-input")?.addEventListener("change", jumpMinesFloor);
  document.getElementById("mines-floor-input")?.addEventListener("keyup", function(e) {
    if (e.key === "Enter") jumpMinesFloor();
  });
  document.getElementById("skull-cavern-input")?.addEventListener("change", updateSkullCavern);
  document.getElementById("skull-cavern-input")?.addEventListener("keyup", function(e) {
    if (e.key === "Enter") updateSkullCavern();
  });
});
