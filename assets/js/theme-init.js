/* ============================================================
   SPARKWASH — THEME & DIRECTION INITIALIZER
   Prevents flash of unstyled theme (FOUC)
   ============================================================ */
(function () {
  'use strict';
  var d = localStorage.getItem('sw-dark-mode');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (d === '1' || (d === null && prefersDark)) {
    document.documentElement.classList.add('dark-mode');
  }
  var dir = localStorage.getItem('sw-dir') || 'ltr';
  document.documentElement.dir = dir;
})();
