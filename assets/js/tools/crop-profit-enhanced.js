/**
 * Enhanced Crop Profit Calculator — Cross-Game Comparison
 * 对比 Stardew / Fields of Mistria / Coral Island / Sun Haven 的作物利润
 */
(function() {
  'use strict';

  const GAMES = {
    stardew: {
      name: 'Stardew Valley',
      icon: '🌿',
      seasons: ['Spring','Summer','Fall','Special'],
      crops: {
        Spring: [
          {name:'Strawberry',seed:100,sell:120,days:8,regrow:4,perSeason:5},
          {name:'Cauliflower',seed:80,sell:175,days:12,regrow:0,perSeason:2},
          {name:'Potato',seed:50,sell:80,days:6,regrow:0,perSeason:4,multiChance:0.2},
          {name:'Green Bean',seed:60,sell:40,days:10,regrow:3,perSeason:7},
          {name:'Kale',seed:70,sell:110,days:6,regrow:0,perSeason:4},
          {name:'Parsnip',seed:20,sell:35,days:4,regrow:0,perSeason:7},
          {name:'Rhubarb',seed:100,sell:220,days:13,regrow:0,perSeason:2},
          {name:'Garlic',seed:40,sell:60,days:4,regrow:0,perSeason:7},
          {name:'Rice',seed:40,sell:30,days:8,regrow:0,perSeason:3},
          {name:'Blue Jazz',seed:30,sell:50,days:7,regrow:0,perSeason:3}
        ],
        Summer: [
          {name:'Blueberry',seed:80,sell:50,days:13,regrow:4,perSeason:4,multi:3},
          {name:'Starfruit',seed:400,sell:750,days:13,regrow:0,perSeason:2},
          {name:'Melon',seed:80,sell:250,days:12,regrow:0,perSeason:2},
          {name:'Hot Pepper',seed:40,sell:40,days:5,regrow:3,perSeason:8},
          {name:'Tomato',seed:50,sell:60,days:11,regrow:4,perSeason:5},
          {name:'Hops',seed:60,sell:25,days:11,regrow:1,perSeason:17},
          {name:'Corn',seed:150,sell:50,days:14,regrow:4,perSeason:4},
          {name:'Radish',seed:40,sell:90,days:6,regrow:0,perSeason:4},
          {name:'Poppy',seed:100,sell:140,days:7,regrow:0,perSeason:3}
        ],
        Fall: [
          {name:'Cranberry',seed:240,sell:75,days:7,regrow:5,perSeason:5,multi:2},
          {name:'Pumpkin',seed:100,sell:320,days:13,regrow:0,perSeason:2},
          {name:'Artichoke',seed:30,sell:160,days:8,regrow:0,perSeason:3},
          {name:'Bok Choy',seed:50,sell:80,days:4,regrow:0,perSeason:7},
          {name:'Grape',seed:60,sell:80,days:10,regrow:3,perSeason:7},
          {name:'Eggplant',seed:20,sell:60,days:5,regrow:5,perSeason:5},
          {name:'Yam',seed:60,sell:160,days:10,regrow:0,perSeason:2},
          {name:'Beet',seed:20,sell:100,days:6,regrow:0,perSeason:4},
          {name:'Amaranth',seed:70,sell:150,days:7,regrow:0,perSeason:4},
          {name:'Fairy Rose',seed:200,sell:290,days:12,regrow:0,perSeason:2}
        ]
      }
    },
    mistria: {
      name: 'Fields of Mistria',
      icon: '🌳',
      seasons: ['Spring','Summer','Fall','Winter'],
      crops: {
        Spring: [
          {name:'Turnip',seed:15,sell:40,days:4,regrow:0,perSeason:7},
          {name:'Potato',seed:25,sell:70,days:6,regrow:0,perSeason:4},
          {name:'Cabbage',seed:50,sell:140,days:10,regrow:0,perSeason:2},
          {name:'Strawberry',seed:80,sell:100,days:7,regrow:3,perSeason:6},
          {name:'Daffodil',seed:20,sell:55,days:5,regrow:0,perSeason:5}
        ],
        Summer: [
          {name:'Tomato',seed:30,sell:60,days:6,regrow:3,perSeason:8},
          {name:'Corn',seed:40,sell:80,days:12,regrow:4,perSeason:5},
          {name:'Watermelon',seed:60,sell:180,days:12,regrow:0,perSeason:2},
          {name:'Sunflower',seed:40,sell:100,days:8,regrow:0,perSeason:3},
          {name:'Pepper',seed:35,sell:75,days:5,regrow:3,perSeason:7}
        ],
        Fall: [
          {name:'Pumpkin',seed:70,sell:200,days:13,regrow:0,perSeason:2},
          {name:'Carrot',seed:20,sell:50,days:5,regrow:0,perSeason:5},
          {name:'Beet',seed:25,sell:55,days:5,regrow:0,perSeason:5},
          {name:'Wheat',seed:10,sell:25,days:4,regrow:0,perSeason:7}
        ]
      }
    },
    coral: {
      name: 'Coral Island',
      icon: '🏝️',
      seasons: ['Spring','Summer','Fall','Winter'],
      crops: {
        Spring: [
          {name:'Potato',seed:15,sell:42,days:5,regrow:0,perSeason:5},
          {name:'Turnip',seed:10,sell:28,days:4,regrow:0,perSeason:7},
          {name:'Daisy',seed:15,sell:40,days:5,regrow:0,perSeason:5},
          {name:'Sugar Cane',seed:25,sell:65,days:8,regrow:0,perSeason:3},
          {name:'Tea Leaf',seed:20,sell:55,days:11,regrow:3,perSeason:5}
        ],
        Summer: [
          {name:'Corn',seed:20,sell:60,days:10,regrow:3,perSeason:6},
          {name:'Tomato',seed:25,sell:63,days:7,regrow:3,perSeason:7},
          {name:'Watermelon',seed:40,sell:130,days:12,regrow:0,perSeason:2},
          {name:'Pineapple',seed:55,sell:175,days:14,regrow:0,perSeason:2},
          {name:'Sunflower',seed:35,sell:90,days:8,regrow:0,perSeason:3}
        ],
        Fall: [
          {name:'Pumpkin',seed:45,sell:155,days:13,regrow:0,perSeason:2},
          {name:'Sweet Potato',seed:25,sell:72,days:8,regrow:0,perSeason:3},
          {name:'Cranberry',seed:20,sell:55,days:5,regrow:0,perSeason:5},
          {name:'Rice',seed:15,sell:42,days:5,regrow:0,perSeason:5}
        ]
      }
    },
    sunhaven: {
      name: 'Sun Haven',
      icon: '🌾',
      seasons: ['Spring','Summer','Fall','Winter'],
      crops: {
        Spring: [
          {name:'Wheat',seed:15,sell:35,days:4,regrow:0,perSeason:7},
          {name:'Potato',seed:25,sell:65,days:6,regrow:0,perSeason:4},
          {name:'Onion',seed:20,sell:50,days:5,regrow:0,perSeason:5},
          {name:'Lettuce',seed:15,sell:40,days:5,regrow:0,perSeason:5}
        ],
        Summer: [
          {name:'Tomato',seed:30,sell:70,days:6,regrow:3,perSeason:7},
          {name:'Corn',seed:35,sell:85,days:10,regrow:4,perSeason:5},
          {name:'Pepper',seed:25,sell:65,days:5,regrow:3,perSeason:6}
        ],
        Fall: [
          {name:'Pumpkin',seed:50,sell:165,days:10,regrow:0,perSeason:2},
          {name:'Carrot',seed:15,sell:40,days:4,regrow:0,perSeason:7}
        ]
      }
    }
  };

  function calcCropProfit(crop) {
    var harvests = crop.regrow > 0
      ? 1 + Math.floor((27 - crop.days) / crop.regrow)
      : crop.perSeason;
    var multi = crop.multi || 1;
    var multiBonus = crop.multiChance ? crop.sell * crop.multiChance : 0;
    var revenue = crop.sell * harvests * multi + multiBonus * harvests;
    var cost = crop.seed;
    var profit = revenue - cost;
    var perDay = Math.round(profit / 27 * 100) / 100;
    return {harvests:harvests, revenue:Math.round(revenue), cost:cost, profit:Math.round(profit), perDay:perDay};
  }

  function render() {
    var html = '<div style="max-width:100%;overflow-x:auto">';
    html += '<p><em>数据基于无肥料基础售价。实际利润随品质和技能等级浮动。</em></p>';

    for (var gk in GAMES) {
      var g = GAMES[gk];
      html += '<h3 style="margin-top:24px">' + g.icon + ' ' + g.name + '</h3>';
      html += '<table><thead><tr><th>季节</th><th>作物</th><th>种子价</th><th>售价</th><th>生长(天)</th><th>再长(天)</th><th>收获次数</th><th>总收入</th><th>总利润</th><th>💎日利润</th></tr></thead><tbody>';

      var topPerDay = [];
      for (var s = 0; s < g.seasons.length; s++) {
        var season = g.seasons[s];
        var crops = g.crops[season] || [];
        for (var c = 0; c < crops.length; c++) {
          var crop = crops[c];
          var r = calcCropProfit(crop);
          topPerDay.push({season:season, name:crop.name, perDay:r.perDay, profit:r.profit});
          html += '<tr>';
          html += '<td>' + season + '</td>';
          html += '<td><strong>' + crop.name + '</strong></td>';
          html += '<td>' + crop.seed + 'g</td>';
          html += '<td>' + crop.sell + 'g</td>';
          html += '<td>' + crop.days + '</td>';
          html += '<td>' + (crop.regrow || '-') + '</td>';
          html += '<td>' + r.harvests + '</td>';
          html += '<td>' + r.revenue + 'g</td>';
          html += '<td><strong>' + r.profit + 'g</strong></td>';
          html += '<td style="background:' + (r.perDay > 15 ? '#1b5e20' : r.perDay > 8 ? '#2e7d32' : 'inherit') + ';color:white;font-weight:bold">' + r.perDay + 'g/d</td>';
          html += '</tr>';
        }
      }
      html += '</tbody></table>';

      // Top 3 per game
      topPerDay.sort(function(a,b){return b.perDay - a.perDay;});
      html += '<p>🏆 <strong>Top 3:</strong> ';
      for (var t = 0; t < 3 && t < topPerDay.length; t++) {
        html += topPerDay[t].season + ' ' + topPerDay[t].name + ' (' + topPerDay[t].perDay + 'g/d)';
        if (t < 2) html += ' | ';
      }
      html += '</p>';
    }

    html += '<p style="margin-top:30px;font-size:12px;color:#666">数据来源: 各游戏官方 Wiki。利润基于基础品质，未计算工匠制品加成。实际游戏中应考虑加工升值（酒/果酱/奶酪通常 2-3x）。</p>';
    html += '</div>';

    var el = document.getElementById('crop-profit-enhanced');
    if (el) el.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
