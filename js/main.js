/* ================================================
   I 5 SENSI — Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Hamburger ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ── Fade-in on scroll (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger by index within parent
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = (i % 4) * 80;
      observer.observe(el);
    });
  }

  // ── Price tabs ──
  const tabs = document.querySelectorAll('.price-tab');
  const panels = document.querySelectorAll('.price-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // ── Gallery carousel ──
  const tracks = document.querySelectorAll('.gallery-track');
  tracks.forEach(track => {
    const container = track.closest('.gallery-track-wrapper') || track.parentElement;
    const prevBtn = container.parentElement.querySelector('.gallery-btn--prev');
    const nextBtn = container.parentElement.querySelector('.gallery-btn--next');
    const itemW = () => (track.querySelector('.gallery-item')?.offsetWidth || 320) + 12;

    if (prevBtn) prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -itemW(), behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: itemW(), behavior: 'smooth' });
    });
  });

});
