'use strict';

/* ============================================================
   Brief Consulting — main.js
   Handles: navbar scroll behaviour + fade-in on scroll.
   No inline event handlers. No eval. No external dependencies.
   ============================================================ */

/* ===========================
   1. Navbar: add shadow when page is scrolled
   =========================== */
(function initNav() {
  var nav = document.getElementById('nav');
  if (!nav) { return; }

  function onScroll() {
    if (window.scrollY > 24) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Run once immediately in case the page loads already scrolled */
  onScroll();
}());

/* ===========================
   2. Fade-in sections on scroll
      Uses IntersectionObserver for performance.
      Falls back gracefully on old browsers.
   =========================== */
(function initFadeIn() {
  var elements = document.querySelectorAll('.fade-in');
  if (!elements.length) { return; }

  /* ---- Fallback for browsers without IntersectionObserver ---- */
  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  /* ---- Normal path ---- */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* only animate once */
        }
      });
    },
    {
      threshold: 0.12,           /* trigger when 12 % of element is visible */
      rootMargin: '0px 0px -32px 0px' /* slight offset from bottom edge */
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}());
