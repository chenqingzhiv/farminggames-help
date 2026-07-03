/**
 * Farming Games Help — 入场动画 & 微交互 (Expo Enhancement)
 * 使用 IntersectionObserver 实现滚动触发动画
 * 无外部依赖，兼容现代浏览器
 */
(function() {
  'use strict';

  /* ── 1. 滚动入场动画 ───────────────────────────────────── */
  function initScrollReveal() {
    // 观察游戏卡片、工具卡片、文章预览、提示框等
    var selectors = '.game-hero-card, .tool-card-home, .article-preview-card, .about-section-home, .feedback-section';
    var elements = document.querySelectorAll(selectors);

    if (!elements.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  }

  /* ── 2. 游戏卡片鼠标跟随光晕 ────────────────────────────── */
  function initCardMouseGlow() {
    var cards = document.querySelectorAll('.game-hero-card');

    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  /* ── 3. Hero 统计数字微动效 ────────────────────────────── */
  function initHeroStats() {
    var stats = document.querySelectorAll('.hero-stat-num');

    if (!stats.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var finalText = el.textContent.trim();
          var finalNum = parseInt(finalText.replace(/[^0-9]/g, ''), 10);
          if (isNaN(finalNum) || finalNum < 10) return;

          // If has suffix like "万" or "+", preserve it
          var suffix = finalText.replace(/[0-9,]/g, '').trim();

          // Animate from 0 to final
          var duration = 1200;
          var startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quad
            var eased = 1 - (1 - progress) * (1 - progress);
            var current = Math.round(eased * finalNum);

            // Format with commas
            var formatted = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            el.textContent = formatted + (suffix ? ' ' + suffix : '');

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          }

          // Start animation after a short delay (let the card fade in first)
          setTimeout(function() {
            requestAnimationFrame(animateCount);
          }, 400);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) {
      observer.observe(stat);
    });
  }

  /* ── 4. Footer 年份自动更新 ────────────────────────────── */
  function updateFooterYear() {
    var yearEl = document.querySelector('.md-footer-copyright');
    if (yearEl) {
      var currentYear = new Date().getFullYear();
      yearEl.innerHTML = yearEl.innerHTML.replace(/\d{4}/, currentYear);
    }
  }

  /* ── 5. 页面加载后依次初始化 ─────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    // Small delay for layout settle
    setTimeout(function() {
      initScrollReveal();
      initCardMouseGlow();
      initHeroStats();
      updateFooterYear();
    }, 100);
  });
})();
