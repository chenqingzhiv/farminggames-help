/**
 * Cross-Game Animal Profit Calculator
 * Stardew Valley / Fields of Mistria / Coral Island / Sandrock / Sun Haven
 */
(function() {
  var ANIMALS = {
    stardew: {
      name:'Stardew Valley', icon:'🌿',
      buildings: {
        Coop: [
          {name:'Chicken', cost:800, product:'Egg', price:50, days:1, season:'all', note:'Mayonnaise: 190g (normal)'},
          {name:'Void Chicken', cost:0, product:'Void Egg', price:65, days:1, season:'all', note:'Void Mayonnaise: 275g'},
          {name:'Duck', cost:1200, product:'Duck Egg', price:95, days:2, season:'all', note:'Duck Mayonnaise: 375g'},
          {name:'Rabbit', cost:8000, product:'Wool', price:340, days:4, season:'all', note:'Also drops Rabbit Foot'},
          {name:'Dinosaur', cost:0, product:'Dino Egg', price:350, days:7, season:'all', note:'Dino Mayonnaise: 800g'}
        ],
        Barn: [
          {name:'Cow', cost:1500, product:'Milk', price:125, days:1, season:'all', note:'Cheese: 230g (normal)'},
          {name:'Goat', cost:4000, product:'Goat Milk', price:225, days:2, season:'all', note:'Goat Cheese: 400g'},
          {name:'Sheep', cost:8000, product:'Wool', price:340, days:3, season:'all', note:'Cloth: 470g'},
          {name:'Pig', cost:16000, product:'Truffle', price:625, days:1, season:'Spring-Fall', note:'Truffle Oil: 1,065g'},
          {name:'Ostrich', cost:0, product:'Ostrich Egg', price:600, days:7, season:'all', note:'10x Mayo = 10× quality'}
        ]
      }
    },
    mistria: {
      name:'Fields of Mistria', icon:'🌳',
      buildings: {
        Coop: [
          {name:'Chicken', cost:500, product:'Egg', price:30, days:1, season:'all'},
          {name:'Duck', cost:1000, product:'Duck Egg', price:60, days:2, season:'all'}
        ],
        Barn: [
          {name:'Cow', cost:2000, product:'Milk', price:80, days:1, season:'all'},
          {name:'Sheep', cost:4000, product:'Wool', price:150, days:3, season:'all'},
          {name:'Horse', cost:5000, product:'—', price:0, days:0, season:'all', note:'Ride only'}
        ]
      }
    },
    coral: {
      name:'Coral Island', icon:'🏝️',
      buildings: {
        Coop: [
          {name:'Chicken', cost:600, product:'Egg', price:45, days:1, season:'all'},
          {name:'Duck', cost:1200, product:'Duck Egg', price:80, days:2, season:'all'},
          {name:'Quail', cost:2000, product:'Quail Egg', price:120, days:1, season:'all'}
        ],
        Barn: [
          {name:'Cow', cost:1800, product:'Milk', price:100, days:1, season:'all'},
          {name:'Goat', cost:3500, product:'Goat Milk', price:200, days:2, season:'all'},
          {name:'Sheep', cost:4500, product:'Wool', price:280, days:3, season:'all'}
        ]
      }
    },
    sandrock: {
      name:'My Time at Sandrock', icon:'🏜️',
      buildings: {
        Coop: [
          {name:'Chicken', cost:400, product:'Egg', price:18, days:1, season:'all'},
          {name:'Duck', cost:800, product:'Duck Egg', price:35, days:2, season:'all'}
        ],
        Barn: [
          {name:'Yakmel', cost:1500, product:'Milk', price:45, days:1, season:'all'},
          {name:'Camel', cost:3000, product:'Camel Milk', price:70, days:2, season:'all'}
        ]
      }
    },
    sunhaven: {
      name:'Sun Haven', icon:'🌾',
      buildings: {
        Coop: [
          {name:'Chicken', cost:500, product:'Egg', price:28, days:1, season:'all'}
        ],
        Barn: [
          {name:'Cow', cost:1500, product:'Milk', price:70, days:1, season:'all'},
          {name:'Sheep', cost:3000, product:'Wool', price:120, days:3, season:'all'}
        ]
      }
    }
  };

  function calcROI(animal) {
    var dailyRevenue = animal.price / animal.days;
    var daysToBreakEven = animal.cost > 0 ? Math.round(animal.cost / dailyRevenue) : 0;
    return {daily:Math.round(dailyRevenue), breakEven:daysToBreakEven};
  }

  function render() {
    var html = '';
    for (var gk in ANIMALS) {
      var g = ANIMALS[gk];
      html += '<h3 style="margin-top:24px">' + g.icon + ' ' + g.name + '</h3>';
      html += '<table><thead><tr><th>建筑</th><th>动物</th><th>成本</th><th>产品</th><th>售价</th><th>周期(天)</th><th>💎日收入</th><th>回本(天)</th><th>备注</th></tr></thead><tbody>';

      for (var bk in g.buildings) {
        var animals = g.buildings[bk];
        for (var a = 0; a < animals.length; a++) {
          var an = animals[a];
          var roi = calcROI(an);
          var color = roi.daily >= 200 ? '#1b5e20' : roi.daily >= 80 ? '#2e7d32' : roi.daily >= 30 ? '#ff8f00' : 'inherit';
          html += '<tr>';
          html += '<td>' + (a === 0 ? bk : '') + '</td>';
          html += '<td><strong>' + an.name + '</strong></td>';
          html += '<td>' + (an.cost > 0 ? an.cost + 'g' : '特殊获取') + '</td>';
          html += '<td>' + an.product + '</td>';
          html += '<td>' + an.price + 'g</td>';
          html += '<td>' + (an.days > 0 ? an.days : '—') + '</td>';
          html += '<td style="color:' + color + ';font-weight:bold">' + roi.daily + 'g/d</td>';
          html += '<td>' + (roi.breakEven > 0 ? roi.breakEven + 'd' : '—') + '</td>';
          html += '<td style="font-size:12px;color:#999">' + (an.note || '') + '</td>';
          html += '</tr>';
        }
      }
      html += '</tbody></table>';
    }

    html += '<p style="margin-top:20px;font-size:12px;color:#666">日收入 = 产品售价 ÷ 生产周期。未计算加工品（蛋黄酱/奶酪等）的增值。</p>';
    html += '<p style="font-size:12px;color:#666">🐷 Stardew Pig 日收入最高（625g/d ← Truffle），但需户外空间且冬季停产。</p>';

    var el = document.getElementById('animal-profit-compare');
    if (el) el.innerHTML = html;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
