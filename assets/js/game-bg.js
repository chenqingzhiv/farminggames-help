// farminggames.help - Game background detection
(function() {
  const path = window.location.pathname;
  let bgClass = '';
  
  if (path.startsWith('/stardew/') || path === '/stardew/') {
    bgClass = 'stardew-bg';
  } else if (path.startsWith('/farmingsim/') || path === '/farmingsim/') {
    bgClass = 'farmsim-bg';
  } else if (path.startsWith('/palia/') || path === '/palia/') {
    bgClass = 'palia-bg';
  }
  
  if (bgClass) {
    document.body.classList.add(bgClass);
  }
})();
