---
title: "Stardew Valley Community Center Bundle Tracker"
description: "Interactive bundle tracking tool for Stardew Valley 1.6 — track all 6 rooms, their bundles, and required items with progress saved in your browser."
date: 2026-07-05
---

# 🏛️ Stardew Valley Community Center Bundle Tracker

Track your Community Center bundle progress in Stardew Valley 1.6. Check off items as you donate them — progress saves automatically in your browser.

---

## 📊 Overall Progress

<div id="bundle-container">
  <!-- Populated by JS -->
</div>

---

## 🌲 Crafts Room

<div id="room-crafts_room" class="room-section">
  <!-- Populated by JS -->
</div>

---

## 🥕 Pantry

<div id="room-pantry" class="room-section">
  <!-- Populated by JS -->
</div>

---

## 🐟 Fish Tank

<div id="room-fish_tank" class="room-section">
  <!-- Populated by JS -->
</div>

---

## 🔥 Boiler Room

<div id="room-boiler_room" class="room-section">
  <!-- Populated by JS -->
</div>

---

## 📋 Bulletin Board

<div id="room-bulletin_board" class="room-section">
  <!-- Populated by JS -->
</div>

---

## 💰 Vault

<div id="room-vault" class="room-section">
  <!-- Populated by JS -->
</div>

---

## 📖 How to Use

1. **Click any item checkbox** to mark it as donated to the bundle
2. **Progress auto-saves** in your browser (localStorage)
3. **Bundle progress** shows as `X/Y` — when all items in a bundle are checked, it turns green
4. **Room progress bars** at the top show per-room completion
5. **Overall progress bar** tracks your total Community Center completion

### 💡 Tips

- **Don't rush the Quality Crops bundle** — you need Gold-quality Parsnips, Melons, Pumpkins, and Corn. Use Basic/Quality Fertilizer!
- **The Fish Tank requires multiple seasons** — check which fish are available each season using the [Fish Tracker](fish-tracker.md)
- **The Bulletin Board** has many cooking recipes — save your ingredients!
- **The Vault** requires a total of 42,500g — start saving early
- **1.6 additions**: Legendary Fish II bundles and the Children's Bundle with new 1.6 items (Raisins, Pear, etc.)

### 🏆 Rewards

| Room Completed | Reward |
|:---------------|:-------|
| **Crafts Room** | 😀 Greenhouse repair |
| **Pantry** | 🚌 Bus repair (desert access) |
| **Fish Tank** | 🎣 Glittering Boulder removed |
| **Boiler Room** | ⛏️ Mine carts activated |
| **Bulletin Board** | 🦚 Movie Theater (with Joja) |
| **All Rooms** | 🎉 Complete Community Center, "Stardew Valley Fair" rating |

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/) — Support the developer!
>
> *Data source: Stardew Valley Wiki v1.6*

<script src="../../assets/js/tools/community-center.js"></script>

<style>
.room-section {
  background: rgba(255,255,255,0.02);
  border-radius: 14px;
  padding: 18px 20px;
  margin: 16px 0;
  border: 1px solid rgba(255,255,255,0.06);
}
.datatable th { background: rgba(201,169,110,0.1); }
label input[type="checkbox"] {
  cursor: pointer;
}
</style>
