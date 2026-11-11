/* Питомник ALLVIK — макет: интерактив без зависимостей */
(() => {
  'use strict';

  /* ---------- шапка при скролле ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- бургер-меню ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');

  const closeNav = () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeNav();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- появление секций при скролле ---------- */
  const revealTargets = document.querySelectorAll(
    '.step, .section-head, .dog-card, .news-card, .litter-card, .g-tile, .breed-item, .breed-photo, .puppy-banner, .contact-form, .contacts-info, .feature-content'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    // небольшая каскадная задержка внутри родителя
    el.style.setProperty('--rd', `${(i % 6) * 60}ms`);
    io.observe(el);
  });

  /* ---------- лайтбокс галереи ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const tiles = Array.from(document.querySelectorAll('.g-tile'));
  let current = 0;

  const openLightbox = (index) => {
    current = (index + tiles.length) % tiles.length;
    lbImage.src = tiles[current].getAttribute('href');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  tiles.forEach((tile, i) => {
    tile.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => openLightbox(current - 1));
  document.getElementById('lbNext').addEventListener('click', () => openLightbox(current + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(current - 1);
    if (e.key === 'ArrowRight') openLightbox(current + 1);
  });

  /* ---------- демо-форма (макет, никуда не отправляет) ---------- */
  const form = document.getElementById('contactForm');
  const hint = document.getElementById('formHint');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      hint.textContent = 'Пожалуйста, заполните обязательные поля.';
      hint.style.color = '#e2a48f';
      return;
    }
    form.reset();
    hint.textContent = 'Спасибо! Это демонстрационный макет — форма не отправляется.';
    hint.style.color = '';
    setTimeout(() => { hint.textContent = ''; }, 6000);
  });

  /* ---------- год в подвале ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
