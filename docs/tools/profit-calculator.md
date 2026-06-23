<div class="tool-tabs">
  <input type="radio" name="tooltab" id="tab-calc" checked>
  <label for="tab-calc">📊 Calculator</label>
  <input type="radio" name="tooltab" id="tab-guide">
  <label for="tab-guide">📖 Quick Guide</label>
  <input type="radio" name="tooltab" id="tab-faq">
  <label for="tab-faq">❓ FAQ</label>
</div>

<div class="tool-tab-content" id="content-calc">

# Crop Profit Calculator

Welcome to the **Stardew Valley Crop Profit Calculator** — an interactive tool to help you maximize your farming profits.

<form id="calculator-form">
  <div class="calc-controls">
    <label>
      Farming Level:
      <input type="number" id="farmingLevel" value="10" min="0" max="10">
    </label>
    <label>
      Tiller Profession:
      <input type="checkbox" id="tiller">
    </label>
    <label>
      Artisan Profession:
      <input type="checkbox" id="artisan">
    </label>
    <label>
      Fertilizer:
      <select id="fertilizer">
        <option value="0">None</option>
        <option value="1">Basic Fertilizer</option>
        <option value="2">Quality Fertilizer</option>
        <option value="3">Deluxe Fertilizer</option>
      </select>
    </label>
    <button type="submit" class="calc-btn">Calculate</button>
  </div>
</form>

<div id="results">
  <table id="profit-table" class="display" style="width:100%">
    <thead>
      <tr>
        <th>Crop</th>
        <th>Season</th>
        <th>Seed Cost</th>
        <th>Growth Days</th>
        <th>Regrowth</th>
        <th>Base Price</th>
        <th>Harvests</th>
        <th>Total Revenue</th>
        <th>Total Profit</th>
        <th>Profit/Day</th>
      </tr>
    </thead>
    <tbody id="profit-body"></tbody>
  </table>
</div>

<canvas id="profitChart" width="800" height="400"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const crops = [
  // Spring
  {name: 'Blue Jazz', season: 'Spring', seedCost: 30, growth: 7, regrowth: 0, basePrice: 50, harvests: 0},
  {name: 'Cauliflower', season: 'Spring', seedCost: 80, growth: 12, regrowth: 0, basePrice: 175, harvests: 0},
  {name: 'Coffee Bean', season: 'Spring', seedCost: 15, growth: 10, regrowth: 2, basePrice: 15, harvests: 0},
  {name: 'Garlic', season: 'Spring', seedCost: 40, growth: 4, regrowth: 0, basePrice: 60, harvests: 0},
  {name: 'Green Bean', season: 'Spring', seedCost: 60, growth: 10, regrowth: 3, basePrice: 40, harvests: 0},
  {name: 'Kale', season: 'Spring', seedCost: 70, growth: 6, regrowth: 0, basePrice: 110, harvests: 0},
  {name: 'Parsnip', season: 'Spring', seedCost: 20, growth: 4, regrowth: 0, basePrice: 35, harvests: 0},
  {name: 'Potato', season: 'Spring', seedCost: 50, growth: 6, regrowth: 0, basePrice: 80, harvests: 0},
  {name: 'Rhubarb', season: 'Spring', seedCost: 100, growth: 13, regrowth: 0, basePrice: 220, harvests: 0},
  {name: 'Strawberry', season: 'Spring', seedCost: 100, growth: 8, regrowth: 4, basePrice: 120, harvests: 0},
  {name: 'Spring Onion', season: 'Spring', seedCost: 0, growth: 0, regrowth: 0, basePrice: 8, harvests: 0},
  {name: 'Tulip', season: 'Spring', seedCost: 20, growth: 6, regrowth: 0, basePrice: 30, harvests: 0},
  {name: 'Blueberry', season: 'Summer', seedCost: 80, growth: 13, regrowth: 4, basePrice: 50, harvests: 0},
  {name: 'Corn', season: 'Summer', seedCost: 150, growth: 14, regrowth: 4, basePrice: 50, harvests: 0},
  {name: 'Hops', season: 'Summer', seedCost: 60, growth: 11, regrowth: 1, basePrice: 25, harvests: 0},
  {name: 'Hot Pepper', season: 'Summer', seedCost: 40, growth: 5, regrowth: 3, basePrice: 40, harvests: 0},
  {name: 'Melon', season: 'Summer', seedCost: 80, growth: 12, regrowth: 0, basePrice: 250, harvests: 0},
  {name: 'Poppy', season: 'Summer', seedCost: 20, growth: 7, regrowth: 0, basePrice: 140, harvests: 0},
  {name: 'Radish', season: 'Summer', seedCost: 40, growth: 6, regrowth: 0, basePrice: 90, harvests: 0},
  {name: 'Red Cabbage', season: 'Summer', seedCost: 100, growth: 9, regrowth: 0, basePrice: 260, harvests: 0},
  {name: 'Starfruit', season: 'Summer', seedCost: 400, growth: 13, regrowth: 0, basePrice: 750, harvests: 0},
  {name: 'Summer Spangle', season: 'Summer', seedCost: 10, growth: 8, regrowth: 0, basePrice: 90, harvests: 0},
  {name: 'Sunflower', season: 'Summer', seedCost: 200, growth: 8, regrowth: 0, basePrice: 80, harvests: 0},
  {name: 'Tomato', season: 'Summer', seedCost: 50, growth: 11, regrowth: 4, basePrice: 60, harvests: 0},
  {name: 'Wheat', season: 'Summer', seedCost: 10, growth: 4, regrowth: 0, basePrice: 25, harvests: 0},
  {name: 'Amaranth', season: 'Fall', seedCost: 70, growth: 7, regrowth: 0, basePrice: 150, harvests: 0},
  {name: 'Artichoke', season: 'Fall', seedCost: 30, growth: 8, regrowth: 0, basePrice: 160, harvests: 0},
  {name: 'Beet', season: 'Fall', seedCost: 20, growth: 6, regrowth: 0, basePrice: 100, harvests: 0},
  {name: 'Bok Choy', season: 'Fall', seedCost: 50, growth: 4, regrowth: 0, basePrice: 80, harvests: 0},
  {name: 'Cranberries', season: 'Fall', seedCost: 240, growth: 7, regrowth: 5, basePrice: 75, harvests: 0},
  {name: 'Eggplant', season: 'Fall', seedCost: 20, growth: 5, regrowth: 5, basePrice: 60, harvests: 0},
  {name: 'Fairy Rose', season: 'Fall', seedCost: 50, growth: 12, regrowth: 0, basePrice: 290, harvests: 0},
  {name: 'Grape', season: 'Fall', seedCost: 60, growth: 10, regrowth: 3, basePrice: 80, harvests: 0},
  {name: 'Pumpkin', season: 'Fall', seedCost: 100, growth: 13, regrowth: 0, basePrice: 320, harvests: 0},
  {name: 'Sweet Gem Berry', season: 'Fall', seedCost: 1000, growth: 24, regrowth: 0, basePrice: 3000, harvests: 0},
  {name: 'Yam', season: 'Fall', seedCost: 60, growth: 10, regrowth: 0, basePrice: 160, harvests: 0},
  // Special
  {name: 'Ancient Fruit', season: 'Spring/Summer/Fall', seedCost: 0, growth: 28, regrowth: 7, basePrice: 550, harvests: 0},
  {name: 'Cactus Fruit', season: 'Desert', seedCost: 0, growth: 0, regrowth: 0, basePrice: 75, harvests: 0},
  {name: 'Pineapple', season: 'Ginger Island', seedCost: 0, growth: 14, regrowth: 7, basePrice: 300, harvests: 0}
];

const seasons = ['Spring', 'Summer', 'Fall', 'Spring/Summer/Fall', 'Desert', 'Ginger Island'];

function calculate(e) {
  e.preventDefault();
  const farmingLevel = parseInt(document.getElementById('farmingLevel').value) || 0;
  const hasTiller = document.getElementById('tiller').checked;
  const hasArtisan = document.getElementById('artisan').checked;
  const fertType = parseInt(document.getElementById('fertilizer').value);
  
  const qualityBonus = fertType * 0.05; // +5% per fertilizer tier for quality chance
  const tillerBonus = hasTiller ? 1.1 : 1.0;
  const artisanBonus = hasArtisan ? 1.4 : 1.0;
  
  // Season days
  const seasonDays = 28;
  
  let results = document.getElementById('profit-body');
  results.innerHTML = '';
  
  let chartData = [];
  
  crops.forEach(crop => {
    if (crop.seedCost === 0 && crop.basePrice === 0) return; // Skip forage-only items
    
    let harvests = 0;
    if (crop.regrowth > 0) {
      // Regrowable crop
      if (crop.growth > 0) {
        let daysLeft = seasonDays - crop.growth;
        if (daysLeft >= 0) {
          harvests = 1 + Math.floor(daysLeft / crop.regrowth);
        }
      }
    } else {
      // Single harvest crop
      if (crop.growth > 0) {
        harvests = Math.floor(seasonDays / crop.growth);
        if (harvests < 0) harvests = 0;
      }
    }
    
    if (harvests <= 0 && crop.regrowth > 0) {
      // For multi-season crops like Ancient Fruit
      harvests = 10; // Rough estimate for multi-season
    }
    
    if (crop.name === 'Ancient Fruit') harvests = 12; // Full season estimate
    if (crop.name === 'Sweet Gem Berry') harvests = 1;
    if (crop.name === 'Coffee Bean') harvests = Math.floor(18 / 2); // coffee grows 10 days then regrows 2
    
    // Calculate price with quality and bonuses
    let priceMultiplier = tillerBonus;
    let effectivePrice = crop.basePrice * priceMultiplier;
    
    // Artisan bonus for processed goods
    if (crop.name === 'Hops') {
      // Hops -> Pale Ale (300g base)
      effectivePrice = 300 * artisanBonus;
    } else if (crop.name === 'Wheat') {
      // Wheat -> Beer (200g base)
      effectivePrice = 200 * artisanBonus;
    } else if (crop.name === 'Coffee Bean') {
      // Coffee -> 5 beans per harvest
      effectivePrice = 15 * 5;
    }
    
    let totalRevenue = effectivePrice * harvests;
    let totalProfit = totalRevenue - crop.seedCost;
    let profitPerDay = crop.growth > 0 ? totalProfit / crop.growth : totalProfit;
    
    if (crop.name === 'Ancient Fruit') {
      profitPerDay = totalProfit / 28; // per season
    }
    
    let row = document.createElement('tr');
    if (profitPerDay > 0) {
      row.style.background = 
        profitPerDay > 100 ? 'rgba(76,175,80,0.15)' :
        profitPerDay > 50 ? 'rgba(255,193,7,0.1)' : 'rgba(244,67,54,0.05)';
    }
    row.innerHTML = `
      <td><strong>${crop.name}</strong></td>
      <td>${crop.season}</td>
      <td>${crop.seedCost}g</td>
      <td>${crop.growth}d</td>
      <td>${crop.regrowth > 0 ? `Every ${crop.regrowth}d` : '-'}</td>
      <td>${crop.basePrice}g</td>
      <td>${harvests}</td>
      <td>${totalRevenue.toFixed(0)}g</td>
      <td>${totalProfit.toFixed(0)}g</td>
      <td><strong>${profitPerDay.toFixed(1)}g</strong></td>
    `;
    results.appendChild(row);
    
    chartData.push({
      name: crop.name,
      profitPerDay: profitPerDay,
      totalProfit: totalProfit
    });
  });
  
  // Draw chart
  drawChart(chartData);
}

function drawChart(data) {
  const ctx = document.getElementById('profitChart').getContext('2d');
  if (window.profitChartInstance) {
    window.profitChartInstance.destroy();
  }
  
  // Sort by profit per day
  const sorted = [...data].sort((a, b) => b.profitPerDay - a.profitPerDay).slice(0, 20);
  
  window.profitChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(d => d.name),
      datasets: [{
        label: 'Profit per Day (g)',
        data: sorted.map(d => d.profitPerDay),
        backgroundColor: sorted.map(d => 
          d.profitPerDay > 100 ? 'rgba(76,175,80,0.7)' :
          d.profitPerDay > 50 ? 'rgba(255,193,7,0.7)' : 'rgba(244,67,54,0.7)'
        ),
        borderColor: sorted.map(d => 
          d.profitPerDay > 100 ? 'rgb(76,175,80)' :
          d.profitPerDay > 50 ? 'rgb(255,193,7)' : 'rgb(244,67,54)'
        ),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Top 20 Crops by Profit Per Day',
          color: '#e8e6e1',
          font: { size: 16 }
        },
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: '#9b9a95', maxRotation: 45 }
        },
        y: {
          ticks: { color: '#9b9a95' },
          grid: { color: 'rgba(155,154,149,0.1)' }
        }
      }
    }
  });
}

document.getElementById('calculator-form').addEventListener('submit', calculate);
// Auto-calculate on load
setTimeout(calculate, 100);
</script>

<style>
.calc-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  background: var(--card, #24242b);
  border: 1px solid var(--bd, #35353e);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}
.calc-controls label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.9rem;
  color: var(--t1, #e8e6e1);
}
.calc-controls input,
.calc-controls select {
  padding: 8px 12px;
  background: var(--el, #2c2c35);
  border: 1px solid var(--bd, #35353e);
  border-radius: 6px;
  color: var(--t1, #e8e6e1);
  font-size: 0.9rem;
}
.calc-btn {
  padding: 10px 24px;
  background: var(--ac, #c9a96e);
  border: none;
  border-radius: 8px;
  color: #1a1a1f;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
}
</style>
</div>

<div class="tool-tab-content" id="content-guide" style="display:none">

## 📖 Quick Guide

1. **Set your Farming Level** — Higher level = more crops harvested
2. **Toggle professions** — Tiller (10% more crops) or Artisan (40% more artisan goods)
3. **Choose fertilizer** — Basic/Quality/Deluxe/Speed-Gro affects harvest quality
4. **Select a crop** — Compare spring/summer/fall crops side by side
5. **Read the results** — Gold/day tells you which crop is most profitable

**Pro tip:** Blueberries (summer) and Cranberries (fall) are the top earners in early-game. Switch to Starfruit or Ancient Fruit for end-game max profit.

</div>

<div class="tool-tab-content" id="content-faq" style="display:none">

## ❓ FAQ

**Q: Why is Gold/Day more important than total profit?**
A: Total profit ignores how many days the crop takes to grow. Gold/Day accounts for the growing time, so you can compare crops fairly.

**Q: Does quality fertilizer increase profit?**
A: Yes — higher quality crops sell for more. Quality fertilizer increases the chance of silver/gold/iridium quality harvests.

**Q: Should I use Speed-Gro or Quality Fertilizer?**
A: It depends. Speed-Gro lets you get more harvests per season, which beats quality for multi-harvest crops. Quality fertilizer is better for single-harvest crops with high base value.

<script>
(function() {
  const tabs = document.querySelectorAll('.tool-tabs input[type="radio"]');
  const contents = {
    'tab-calc': document.getElementById('content-calc'),
    'tab-guide': document.getElementById('content-guide'),
    'tab-faq': document.getElementById('content-faq')
  };
  tabs.forEach(tab => {
    tab.addEventListener('change', function() {
      Object.keys(contents).forEach(key => {
        if (contents[key]) {
          contents[key].style.display = (key === this.id) ? 'block' : 'none';
        }
      });
    });
  });
})();
</script>
#results { margin: 20px 0; }
#profitChart { margin-top: 20px; border-radius: 12px; }
</style>

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/) — Support the developer!
