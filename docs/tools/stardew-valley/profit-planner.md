---
title: "Stardew Valley Crop Profit Planner"
description: "Interactive crop profit calculator for Stardew Valley 1.6 — compare profit/day by season, artisan bonus, and more."
---

# 🌱 Stardew Valley Crop Profit Planner

Select a season and your skills to see the **most profitable crops** ranked by profit per day.

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
        <option value="greenhouse">🌿 Greenhouse (Any)</option>
      </select>
    </div>
    <div>
      <label><strong>Artisan</strong></label><br>
      <label style="font-size:0.85em; opacity:0.7;">
        <input type="checkbox" id="artisan-check"> +40% artisan goods
      </label>
    </div>
    <div>
      <label><strong>Tiller</strong></label><br>
      <label style="font-size:0.85em; opacity:0.7;">
        <input type="checkbox" id="tiller-check"> +10% crop sell price
      </label>
    </div>
    <div>
      <label><strong>Agriculturist</strong></label><br>
      <label style="font-size:0.85em; opacity:0.7;">
        <input type="checkbox" id="agri-check"> +10% growth speed
      </label>
    </div>
  </div>

  <!-- Chart -->
  <div style="background:rgba(255,255,255,0.03); border-radius:12px; padding:20px; margin-bottom:20px;">
    <canvas id="profit-chart" height="300" style="max-height:300px;"></canvas>
  </div>

  <!-- Table -->
  <div style="overflow-x:auto;">
    <table id="crop-table" class="datatable" style="width:100%;">
      <thead>
        <tr>
          <th>Crop</th>
          <th>Seed Cost</th>
          <th>Growth</th>
          <th>Regrow</th>
          <th>Base Sell</th>
          <th>Harvests</th>
          <th>Total Income</th>
          <th>Profit/Day</th>
          <th>Best For</th>
        </tr>
      </thead>
      <tbody id="crop-tbody"></tbody>
    </table>
  </div>
</div>

<div class="feedback-section">
  <h3>💬 Data accuracy</h3>
  <p>All data verified against Stardew Valley 1.6 wiki. Found an error? <a href="../../feedback/">Let us know</a>.</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="../../assets/js/tools/stardew-profit-planner.js"></script>
