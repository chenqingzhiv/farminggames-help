// farminggames.help - 游戏背景拼接 + 卡片点击处理
(function() {
  'use strict';

  var path = window.location.pathname;

  // ════════════════════════════════════════════════
  // 1. 先通过URL检测并添加section类
  // ════════════════════════════════════════════════

  var bgClass = '';
  if (path.startsWith('/stardew/') || path === '/stardew') {
    bgClass = 'section-stardew';
  } else if (path.startsWith('/farmingsim/') || path === '/farmingsim') {
    bgClass = 'section-farmsim';
  } else if (path.startsWith('/palia/') || path === '/palia') {
    bgClass = 'section-palia';
  } else if (path.startsWith('/fields-mistria/') || path === '/fields-mistria') {
    bgClass = 'section-mistria';
  } else if (path.startsWith('/coral-island/') || path === '/coral-island') {
    bgClass = 'section-coral';
  } else if (path.startsWith('/sandrock/') || path === '/sandrock') {
    bgClass = 'section-sandrock';
  } else if (path.startsWith('/sun-haven/') || path === '/sun-haven') {
    bgClass = 'section-sunhaven';
  } else if (path.startsWith('/ranch-simulator/') || path === '/ranch-simulator' ||
             path.startsWith('/tools/game-comparison/') || path === '/tools/game-comparison') {
    bgClass = 'section-ranch';
  }
  if (bgClass) {
    document.body.classList.add(bgClass);
  }

  // ════════════════════════════════════════════════
  // 2. 创建背景拼接层
  // ════════════════════════════════════════════════

  var GAME_CFG = {
    'section-stardew':  { dir: 'stardew',  n: 3 },
    'section-farmsim':  { dir: 'fs25',     n: 2 },
    'section-palia':    { dir: 'palia',    n: 3 },
    'section-mistria':  { dir: 'mistria',  n: 3 },
    'section-coral':    { dir: 'coral',    n: 3 },
    'section-sandrock': { dir: 'sandrock', n: 3 },
    'section-sunhaven': { dir: 'sunhaven', n: 3 },
    'section-ranch':    { dir: 'ranch',    n: 3 }
  };

  var HOME_GAMES = ['stardew','fs25','palia','mistria','coral','sandrock','sunhaven','ranch'];
  var isHome = (path === '/' || path === '');

  var bgImages = [];
  var layoutClass = '';

  if (isHome) {
    // 首页 → 8个游戏各取第1张，两行四列 (2x4 grid)
    for (var h = 0; h < HOME_GAMES.length; h++) {
      bgImages.push('assets/images/game-bg/' + HOME_GAMES[h] + '/0.jpg');
    }
    layoutClass = 'bg-layout-home';
  } else {
    var bodyClasses = document.body.className;
    for (var cls in GAME_CFG) {
      if (GAME_CFG.hasOwnProperty(cls) && bodyClasses.indexOf(cls) !== -1) {
        var cfg = GAME_CFG[cls];
        for (var i = 0; i < cfg.n; i++) {
          bgImages.push('assets/images/game-bg/' + cfg.dir + '/' + i + '.jpg');
        }
        layoutClass = 'bg-layout-detail';
        break;
      }
    }
  }

  if (bgImages.length > 0) {
    var bgLayer = document.createElement('div');
    bgLayer.className = 'game-bg-layer ' + layoutClass;

    for (var j = 0; j < bgImages.length; j++) {
      var img = document.createElement('img');
      img.src = bgImages[j];
      img.alt = '';
      bgLayer.appendChild(img);
    }

    document.body.insertBefore(bgLayer, document.body.firstChild);
    document.body.classList.add('has-bg-layer');
  }

  // ════════════════════════════════════════════════
  // 3. 首页卡片点击 → 游戏详情页
  // ════════════════════════════════════════════════

  var cards = document.querySelectorAll('.game-hero-card[data-href]');
  for (var k = 0; k < cards.length; k++) {
    (function(card) {
      card.addEventListener('click', function(e) {
        var target = e.target;
        while (target && target !== card) {
          if (target.tagName === 'A') return;
          target = target.parentNode;
        }
        window.location.href = card.getAttribute('data-href');
      });
      card.style.cursor = 'pointer';
    })(cards[k]);
  }

})();
