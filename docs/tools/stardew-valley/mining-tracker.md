---
title: "Stardew Valley Mining Floor Tracker"
description: "Interactive mining progress tracker for Stardew Valley 1.6 — track Mines and Skull Cavern floors, monster kills, and Adventure Guild rewards."
---

# ⛏️ Stardew Valley Mining Floor Tracker

Track your mining progress across all of Stardew Valley's underground areas. Save your floor milestones, monster kill counts, and see which Adventure Guild rewards you've unlocked — all stored in your browser.

---

## 🏆 Overall Progress

<div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin:16px 0; padding:20px; background:rgba(255,255,255,0.04); border-radius:12px;">
  <div style="flex:1; min-width:200px;">
    <div style="height:24px; background:rgba(255,255,255,0.08); border-radius:12px; overflow:hidden;">
      <div id="mining-progress-bar" style="height:100%; width:0%; background:#ef4444; border-radius:12px; transition:width 0.5s;"></div>
    </div>
  </div>
  <div style="text-align:center; min-width:80px;">
    <div id="mining-progress-label" style="font-size:2em; font-weight:bold; color:#c9a96e;">0%</div>
  </div>
  <div id="mining-progress-text" style="opacity:0.7;">Mines: 0/120 | 0 monsters slain</div>
  <button onclick="resetMiningTracker()" style="padding:6px 16px; border-radius:8px; border:1px solid rgba(239,68,68,0.4); background:transparent; color:#ef4444; cursor:pointer; font-size:0.8em; margin-left:auto;">🔄 Reset</button>
</div>

---

## 🏔️ The Mines (1–120)

<div style="margin-bottom:8px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
  <span style="font-size:1.1em;">Current Floor: <strong id="mines-current-floor" style="color:#c9a96e;">0</strong> / 120</span>
  <div style="display:flex; align-items:center; gap:6px;">
    <label style="font-size:0.85em; opacity:0.7;">Jump to floor:</label>
    <input type="number" id="mines-floor-input" value="0" min="0" max="120" style="width:70px; padding:4px 8px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1;">
    <button onclick="jumpMinesFloor()" style="padding:4px 12px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#e8e6e1; cursor:pointer; font-size:0.8em;">Go</button>
  </div>
</div>

<div style="margin:12px 0; font-size:0.75em; opacity:0.6;">
  <span>🛗 = Elevator | 💎 = Important Resources | 🏆 = Milestone</span>
</div>

<div id="mines-grid" style="overflow-x:auto; padding:8px 0;">
  <!-- Populated by JS -->
</div>

---

## ☠️ Skull Cavern

<div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; padding:16px; background:rgba(255,255,255,0.03); border-radius:12px; margin:12px 0;">
  <span style="font-size:1.1em;">Deepest Floor: <strong id="skull-cavern-display" style="color:#a855f7;">Not yet entered</strong></span>
  <div style="display:flex; align-items:center; gap:6px;">
    <label style="font-size:0.85em; opacity:0.7;">Enter floor:</label>
    <input type="text" id="skull-cavern-input" placeholder="e.g. 100 or leave blank" style="padding:6px 12px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.3); color:#e8e6e1; min-width:160px;">
    <button onclick="updateSkullCavern()" style="padding:6px 12px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#e8e6e1; cursor:pointer; font-size:0.8em;">Save</button>
  </div>
</div>

> 💡 The Skull Cavern has no elevator — you start from floor 1 every time. Just track your personal deepest floor!

---

## 🐾 Monster Kill Tracker

<div id="monster-kills-list">
  <!-- Populated by JS -->
</div>

---

## 🎖️ Adventure Guild Rewards

<div id="guild-rewards-list">
  <!-- Populated by JS -->
</div>

---

## 🗺️ Important Floor Resources

| Floor | Resource | Notes |
|:------|:---------|:------|
| **5** | 📜 Dwarf Scroll I | Dig spots / monster drops |
| **10** | 🛗 Elevator | First elevator stop |
| **15** | 📜 Dwarf Scroll II | Monster drops |
| **21** | 🪙 Gold Ore starts appearing | Common from floor 80+ |
| **41** | ❄️ Frost Dungeon / Ghosts | Frost Jelly, Ghostfish fishing |
| **51** | 📜 Dwarf Scroll III | Monster drops |
| **61** | 📜 Dwarf Scroll IV | Monster drops |
| **71** | 👻 Ghosts common | Ghost + Carbon Ghost |
| **81** | 💎 Iridium & Slimes | Iridium Ore starts, Purple Slimes |
| **100** | 🛗 Last elevator | Final checkpoint |
| **110** | 🔑 Skull Key earned | Unlocks Skull Cavern |
| **120** | 🏆 Mines Complete | Final chest with Stardrop |

---

## 📝 Usage Instructions

1. **Click a mine floor** in the grid to mark your progress. Click any floor up to your current max.
2. **Jump to floor** using the input box for quick navigation.
3. **Skull Cavern** — enter your deepest floor reached (text input, no limit).
4. **Monster kills** — use +1 / +10 / -1 / -10 buttons to track kills per monster type. Click ✏️ to enter a custom number.
5. **Guild rewards** — automatically updates as you track kills. Met thresholds show ✅.
6. **Progress bar** — tracks overall completion combining Mines progress and monster kills.
7. **All data saves automatically** in your browser (localStorage).

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/)
>
> *Data source: Stardew Valley v1.6 Official Wiki*

<script src="../../assets/js/tools/mining-tracker.js"></script>

<style>
#mines-grid div:hover {
  transform: scale(1.1);
  z-index: 1;
}
</style>
