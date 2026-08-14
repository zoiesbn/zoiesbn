---
---
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

nav?.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sections = [...document.querySelectorAll('.case-content section[id]')];
const caseLinks = [...document.querySelectorAll('.case-nav a')];
if (sections.length && caseLinks.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      caseLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-25% 0px -65%' });
  sections.forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());

const projectCatalog = {{ site.data.projects | jsonify }};

const caseArticle = document.querySelector('.case-content');
if (caseArticle) {
  const current = location.pathname.split('/').filter(Boolean).at(-1);
  const cards = projectCatalog.filter(project => project.slug !== current).sort((a, b) => a.order - b.order).slice(0, 4);
  const section = document.createElement('section');
  section.className = 'other-projects';
  section.innerHTML = `<div class="container"><h2 class="section-heading">Other Projects</h2><div class="project-grid">${cards.map(project => `
    <a class="project-card" href="../${project.slug}/">
      <div class="project-image"><img src="..${project.image}" alt="${project.alt}" loading="lazy"></div>
      <div class="project-copy"><p class="eyebrow">${project.type}</p><h3>${project.title}</h3></div>
    </a>`).join('')}</div></div>`;
  document.querySelector('main').append(section);
}
