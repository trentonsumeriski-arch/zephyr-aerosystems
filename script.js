const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
}));

const searchDialog = document.querySelector('#searchDialog');
document.querySelector('#searchBtn')?.addEventListener('click', () => {
  searchDialog.showModal();
  document.querySelector('#searchInput').focus();
});
document.querySelector('#searchInput')?.addEventListener('input', e => {
  const q = e.target.value.trim();
  document.querySelector('#searchHint').textContent = q
    ? `Demo search: looking for “${q}”…`
    : 'Search is a demo interface for this concept site.';
});

const stepText = [
  'We study natural flight, gather movement data, and identify patterns worth translating into aerospace systems.',
  'Engineers turn biological movement into aerodynamic surfaces, adaptive materials, control logic, and immersive interfaces.',
  'Each craft is assembled from fictional bio-adaptive composites and advanced propulsion components inside a precision aerospace facility.',
  'Vehicles enter simulated and real-world flight trials, where software and materials are continuously refined for safer, smarter flight.'
];
document.querySelectorAll('.step').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector('#stepDescription').textContent = stepText[Number(btn.dataset.step)];
  });
});

const craftDialog = document.querySelector('#craftDialog');
const craftName = document.querySelector('#craftDialogName');
const craftType = document.querySelector('#craftDialogType');
document.querySelectorAll('.details').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.craft-card');
    craftName.textContent = card.dataset.name;
    craftType.textContent = card.dataset.type;
    craftDialog.showModal();
  });
});
document.querySelector('#craftClose')?.addEventListener('click', () => craftDialog.close());

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => observer.observe(s));
