// Мобилдик меню
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// Жыл футерде
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Сандардын анимациясы
function animateCount(el) {
  const target = Number(el.dataset.count) || 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Скролл болгондо элементтердин пайда болушу
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('[data-count]').forEach(animateCount);
    obs.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Байланыш формасы (азырынча сервер жок, билдирүү көрсөтүлөт гана)
const form = document.getElementById('form');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (note) note.hidden = false;
    form.reset();
  });
}
