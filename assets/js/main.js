/* ============================================================
   SPARKWASH — SHARED JAVASCRIPT
   main.js — All global functionality
   ============================================================ */

(function () {
  'use strict';

  /* ── LOADER ──────────────────────────────────────────── */
  const loader = document.getElementById('site-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('loaded'), 600);
    });
  }

  /* ── DARK MODE ───────────────────────────────────────── */
  const DARK_KEY = 'sw-dark-mode';
  const html = document.documentElement;

  function applyDark(on) {
    html.classList.toggle('dark-mode', on);
    // Update all dark-mode toggle button icons
    document.querySelectorAll('[data-dark-toggle]').forEach(btn => {
      const sunIcon  = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon)  sunIcon.style.display  = on ? 'block' : 'none';
      if (moonIcon) moonIcon.style.display = on ? 'none'  : 'block';
      btn.setAttribute('aria-label', on ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function initDark() {
    const saved = localStorage.getItem(DARK_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved !== null ? saved === '1' : prefersDark;
    applyDark(isDark);
  }

  function toggleDark() {
    const isDark = html.classList.toggle('dark-mode');
    localStorage.setItem(DARK_KEY, isDark ? '1' : '0');
    applyDark(isDark);
  }

  document.querySelectorAll('[data-dark-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleDark);
  });

  initDark();

  /* ── RTL / LTR ───────────────────────────────────────── */
  const RTL_KEY = 'sw-dir';

  function applyDir(dir) {
    html.dir = dir;
    document.querySelectorAll('[data-dir-toggle]').forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    });
  }

  function initDir() {
    const saved = localStorage.getItem(RTL_KEY) || 'ltr';
    applyDir(saved);
  }

  function toggleDir() {
    const current = html.dir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem(RTL_KEY, current);
    applyDir(current);
  }

  document.querySelectorAll('[data-dir-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleDir);
  });

  initDir();

  /* ── MOBILE MENU ─────────────────────────────────────── */
  const mobileMenu     = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const menuBtn        = document.getElementById('menu-btn');

  function toggleMenu() {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobileBackdrop) {
      mobileBackdrop.classList.add('open');
      mobileBackdrop.setAttribute('aria-hidden', 'false');
    }
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('open');
      mobileBackdrop.setAttribute('aria-hidden', 'true');
    }
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  menuBtn && menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.querySelectorAll('#menu-close, .mobile-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  });

  // Close on backdrop click (outside menu)
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMenu);
  }
  mobileMenu && mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── HOME DROPDOWN (CLICK ONLY — DESKTOP) ───────────── */
  const homeDropItem = document.querySelector('.nav-item[data-dropdown]');
  const homeDropLink = homeDropItem?.querySelector('.nav-link');

  if (homeDropItem && homeDropLink) {
    homeDropLink.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = homeDropItem.classList.toggle('open');
      homeDropLink.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!homeDropItem.contains(e.target)) {
        homeDropItem.classList.remove('open');
        homeDropLink.setAttribute('aria-expanded', 'false');
      }
    });

    // Close dropdown when a dropdown link is clicked
    homeDropItem.querySelectorAll('.nav-dropdown a').forEach(a => {
      a.addEventListener('click', () => {
        homeDropItem.classList.remove('open');
        homeDropLink.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── MOBILE HOME ACCORDION ───────────────────────────── */
  document.querySelectorAll('.mobile-nav-item[data-accordion]').forEach(item => {
    const trigger = item.querySelector('.mobile-nav-link');
    trigger && trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Mobile nav links — close menu after click
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* ── ACTIVE NAV ──────────────────────────────────────── */
  function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href], .mobile-nav-link[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const isActive = href === currentPath ||
        (currentPath === '' && href === 'index.html') ||
        (currentPath === 'index.html' && href === 'index.html');
      link.classList.toggle('active', isActive);
    });
  }

  setActiveNav();

  /* ── SCROLL-TO-TOP ───────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── INTERSECTION OBSERVER (ANIMATE ON SCROLL) ───────── */
  const animEls = document.querySelectorAll('.animate-fadeup, .animate-fadein');

  if ('IntersectionObserver' in window && animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── ACCORDION (FAQ etc.) ────────────────────────────── */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all siblings
      item.closest('.accordion-group')?.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── BAY STATUS LIVE UPDATE (simulated) ──────────────── */
  function updateBayStatus() {
    document.querySelectorAll('[data-bay-realtime]').forEach(el => {
      // Randomly cycle status for demo purposes
      const statuses = ['available', 'busy'];
      const random = statuses[Math.floor(Math.random() * statuses.length)];
      el.className = el.className.replace(/bay-\w+/g, `bay-${random}`);
      const dot = el.querySelector('.bay-dot');
      const label = el.querySelector('.bay-label');
      if (label) label.textContent = random.charAt(0).toUpperCase() + random.slice(1);
    });
  }

  // Simulate live updates every 45 seconds
  setInterval(updateBayStatus, 45000);

  /* ── COUNTER ANIMATION ───────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start = performance.now();
    const suffix = el.getAttribute('data-suffix') || '';

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ── ACTIVE NAV HIGHLIGHTING ──────────────────────────── */
  function initActiveNav() {
    let page = window.location.pathname.split('/').pop() || 'index.html';
    if (!page || page === '' || page === '/') {
      page = 'index.html';
    }
    page = page.split('?')[0].split('#')[0];

    function matchesHref(href) {
      if (!href) return false;
      const target = href.split('/').pop().split('?')[0].split('#')[0];
      if (page === 'index.html' || page === '') {
        return target === 'index.html' || target === '' || target === './';
      }
      return target === page;
    }

    // Clear any pre-existing active classes
    document.querySelectorAll('.header-nav .nav-link, .nav-dropdown a, #mobile-menu .mobile-nav-link, #mobile-menu .mobile-submenu a').forEach(link => {
      link.classList.remove('active');
    });
    const headerHomeBtn = document.getElementById('nav-home-btn');
    if (headerHomeBtn) headerHomeBtn.classList.remove('active');
    const mobileHomeBtn = document.querySelector('#mobile-menu .mobile-nav-item .mobile-nav-link');
    if (mobileHomeBtn) mobileHomeBtn.classList.remove('active');

    // Desktop nav items
    const navLinks = document.querySelectorAll('.header-nav .nav-link, .nav-dropdown a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && matchesHref(href)) {
        link.classList.add('active');
        const parentDropdown = link.closest('.nav-item');
        if (parentDropdown) {
          const homeBtn = parentDropdown.querySelector('.nav-link');
          if (homeBtn) homeBtn.classList.add('active');
        }
      }
    });

    if (page === 'index.html' || page === 'home-2.html') {
      if (headerHomeBtn) headerHomeBtn.classList.add('active');
    }

    // Mobile nav items
    const mobileLinks = document.querySelectorAll('#mobile-menu .mobile-nav-link, #mobile-menu .mobile-submenu a');
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && matchesHref(href)) {
        link.classList.add('active');
        const parentItem = link.closest('.mobile-nav-item');
        if (parentItem) {
          const parentBtn = parentItem.querySelector('.mobile-nav-link');
          if (parentBtn) parentBtn.classList.add('active');
        }
      }
    });

    if (page === 'index.html' || page === 'home-2.html') {
      const mobileHomeItem = document.querySelector('#mobile-menu .mobile-nav-item');
      if (mobileHomeItem) {
        const parentBtn = mobileHomeItem.querySelector('.mobile-nav-link');
        if (parentBtn) parentBtn.classList.add('active');
      }
    }
  }

  initActiveNav();

  /* ── SMOOTH SCROLL FOR HERO INDICATOR ─────────────────── */
  const heroScrollBtn = document.querySelector('.h2-hero-scroll');
  if (heroScrollBtn) {
    heroScrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('stats-bar');
      if (target) {
        const headerOffset = 70;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  }

})();

