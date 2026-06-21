---
title: "Stardew Valley Crop Profit Planner"
description: "Interactive crop profit calculator for Stardew Valley 1.6 — compare profit/day by season, fertilizer, artisan bonus, and more."
---

# 🌱 Stardew Valley Crop Profit Planner

Select a season, fertilizer, and your skills to see the **most profitable crops** ranked by profit per day. Batch-select crops to compare total investment vs. return.

<div id="profit-planner">
  <!-- Controls -->
  <div style="display:flex; flex-wrap:wrap; gap:16px; margin:20px 0; padding:20px; background:rgba(255,255,255,0.05); border-radius:12px;">
    <div>
      <label><strong>Season</strong></label><br>
      <select id="season-select" style="padding:8px 16px; border-radius:8px; font-size:1em;">
        <option value="spring">🌸 Spring</option>
        <option value="summer" selected>☀️ Summer</option>
        <option value="fall">🍂 Fall</option>
        <option value="winter">❄️ Winter</option>
        <option value="all">🌿 All Seasons</option>
        <option value="greenhouse">🏠 Greenhouse (Any)</option>
      </select>
    </div>
    <div>
      <label><strong>🧪 Fertilizer</strong></label><br>
      <select id="fertilizer-select" style="padding:8px 16px; border-radius:8px; font-size:1em;">
        <option value="none">None</option>
        <option value="basic">Basic Fertilizer</option>
        <option value="quality">Quality Fertilizer</option>
        <option value="deluxe">Deluxe Fertilizer</option>
        <option value="speedgro">Speed-Gro (+10%)</option>
        <option value="deluxe_speedgro">Deluxe Speed-Gro (+25%)</option>
        <option value="hyper_speedgro">Hyper Speed-Gro (+33%)</option>
      </select>
    </div>
    <div>
      <label><strong>Professions</strong></label><br>
      <label style="font-size:0.85em; opacity:0.7;">
        <input type="checkbox" id="artisan-check"> +40% artisan goods
      </label><br>
      <label style="font-size:0.85em; opacity:0.7;">
        <input type="checkbox" id="tiller-check"> +10% crop sell price
      </label><br>
      <label style="font-size:0.85em; opacity:0.7;">
        <input type="checkbox" id="agri-check"> +10% growth speed
      </label>
    </div>
  </div>

  <!-- Chart -->
  <div style="background:rgba(255,255,255,0.03); border-radius:12px; padding:20px; margin-bottom:20px;">
    <canvas id="profit-chart" height="300" style="max-height:300px;"></canvas>
  </div>

  <!-- Batch Summary -->
  <div class="batch-summary" style="display:flex; flex-wrap:wrap; gap:16px; margin:16px 0; padding:16px; background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.3); border-radius:12px; align-items:center;">
    <div style="font-weight:bold;">📦 Batch Summary</div>
    <div>Selected: <strong id="batch-count">0</strong> crops</div>
    <div>Seed Cost: <strong id="batch-seed-cost">0g</strong></div>
    <div>Total Income: <strong id="batch-income">0g</strong></div>
    <div style="font-size:1.1em;">📈 Net Profit: <strong id="batch-profit">0g</strong></div>
  </div>

  <!-- Table -->
  <div style="overflow-x:auto;">
    <table id="crop-table" class="datatable" style="width:100%;">
      <thead>
        <tr>
          <th style="width:32px;">✓</th>
          <th>Crop</th>
          <th>Seed Cost</th>
          <th>Growth</th>
          <th>Regrow</th>
          <th>Base Sell</th>
          <th>Harvests</th>
          <th>Total Income</th>
          <th>Profit/Day</th>
          <th>Fertilizer</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody id="crop-tbody"></tbody>
    </table>
  </div>
</div>

## 📖 How to Use

1. **Select a season** to see which crops are available
2. **Choose a fertilizer** to see how it affects growth time and profit
3. **Toggle professions** (Artisan, Tiller, Agriculturist) for accurate calculations
4. **Check the boxes** next to crops to see batch totals (seed cost, income, profit)
5. **Sort by profit/day** — the table is automatically ranked highest to lowest

### 💡 Profit Per Day Explained

**Profit/Day = (Total Income − Seed Cost) ÷ Total Days**

- **Single-harvest crops**: Total days = growth time
- **Multi-harvest (regrowing)**: Total days = initial growth + (harvests − 1) × regrow interval
- **Fertilizer effects**: Speed-Gro reduces growth time; Quality fertilizers boost sell price
- **Artisan bonus**: Crops with artisan processing (wine, juice, beer, etc.) get +40% with the Artisan profession

### 🌾 Fertilizer Comparison

| Fertilizer | Effect | Best For |
|:-----------|:-------|:---------|
| **Basic Fertilizer** | +~10% avg sell price (quality boost) | Early game, cheap |
| **Quality Fertilizer** | +~25% avg sell price | Mid-game crops |
| **Deluxe Fertilizer** | +~50% avg sell price | High-value single harvests |
| **Speed-Gro** | −10% growth time | Regrowing crops, more harvests |
| **Deluxe Speed-Gro** | −25% growth time | Maximizing harvest count |
| **Hyper Speed-Gro** | −33% growth time | Min-maxing rare seeds |

<div class="feedback-section">
  <h3>💬 Data accuracy</h3>
  <p>All data verified against Stardew Valley 1.6 wiki. Found an error? <a href="../../../feedback/">Let us know</a>.</p>
  <p style="font-size:0.8em; opacity:0.6;">Data source: Stardew Valley Wiki v1.6</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="../../assets/js/tools/stardew-profit-planner.js"></script>

<style>
.batch-selected { background: rgba(34,197,94,0.08) !important; }
.batch-selected:hover { background: rgba(34,197,94,0.12) !important; }
#crop-table tbody tr { transition: background 0.2s; }
#crop-table tbody tr:hover { background: rgba(255,255,255,0.04); }
.datatable th { background: rgba(201,169,110,0.1); }
</style>
