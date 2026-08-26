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

const homeNavLinks = [...document.querySelectorAll('.home-page .nav-links a[href^="#"]')];
const homeNavSections = homeNavLinks
  .map(link => document.querySelector(link.hash))
  .filter(Boolean);

if (homeNavLinks.length && homeNavSections.length) {
  const setActiveHomeLink = sectionId => {
    homeNavLinks.forEach(link => link.classList.toggle('active', link.hash === `#${sectionId}`));
  };

  const homeNavObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveHomeLink(entry.target.id);
    });
  }, { rootMargin: '-35% 0px -55%' });

  homeNavSections.forEach(section => homeNavObserver.observe(section));
}

const roleTitle = document.querySelector('.hero-role-title');
if (roleTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const roles = ['Product Designer', 'UI Designer', 'UX Designer', 'Visual Designer'];
  let roleIndex = 0;
  window.setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleTitle.classList.remove('is-changing');
    void roleTitle.offsetWidth;
    roleTitle.textContent = roles[roleIndex];
    roleTitle.classList.add('is-changing');
  }, 2200);
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const projectCards = [...document.querySelectorAll('.home-page .project-card')];
const supportsAnimatedCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (projectCards.length && supportsAnimatedCursor) {
  const cursor = document.createElement('div');
  cursor.className = 'animated-project-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cursor-gradient" x1="14" y1="12" x2="82" y2="84" gradientUnits="userSpaceOnUse"><stop stop-color="#7B67F2"/><stop offset=".48" stop-color="#D6299F"/><stop offset="1" stop-color="#FF9A3D"/></linearGradient></defs><path d="M17 11L78 49L52 54L43 79L17 11Z" fill="url(#cursor-gradient)" stroke="#17151D" stroke-width="3.5" stroke-linejoin="round"/><path d="M27 23L66 48L48 51L41 68L27 23Z" fill="white" fill-opacity=".94"/><path d="M61 61L78 79" stroke="#17151D" stroke-width="6" stroke-linecap="round"/></svg>`;
  document.body.append(cursor);

  let targetX = -120;
  let targetY = -120;
  let cursorX = targetX;
  let cursorY = targetY;

  const animateCursor = () => {
    cursorX += (targetX - cursorX) * .22;
    cursorY += (targetY - cursorY) * .22;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.addEventListener('pointermove', event => {
    targetX = event.clientX - 15;
    targetY = event.clientY - 14;
  });
  projectCards.forEach(card => {
    card.addEventListener('pointerenter', () => {
      cursor.classList.add('is-active');
    });
    card.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-active');
    });
  });
}

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

const restaurantPreviewCards = [...document.querySelectorAll('.restaurant-case .foundation-gallery .media, .restaurant-case .restaurant-visual-directions .media, .restaurant-case .restaurant-diagram, .restaurant-case .restaurant-core-image, .restaurant-case .restaurant-menu-images .media, .restaurant-case .restaurant-dashboard-images .media')];
if (restaurantPreviewCards.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'restaurant-image-dialog';
  dialog.innerHTML = '<button type="button" aria-label="Close image preview">×</button><img alt="">';
  document.body.append(dialog);

  const dialogImage = dialog.querySelector('img');
  const closeDialog = () => dialog.close();
  dialog.querySelector('button').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
  });

  restaurantPreviewCards.forEach(card => {
    const image = card.querySelector('img');
    if (!image) return;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open image: ${image.alt}`);
    const openDialog = () => {
      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialog.showModal();
    };
    card.addEventListener('click', openDialog);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDialog();
      }
    });
  });
}

const mrBoxPreviewCards = [...document.querySelectorAll('.mrbox-case .case-content .media')];
if (mrBoxPreviewCards.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'mrbox-image-dialog';
  dialog.innerHTML = '<button type="button" aria-label="Close image preview">×</button><img alt="">';
  document.body.append(dialog);

  const dialogImage = dialog.querySelector('img');
  const closeDialog = () => dialog.close();
  dialog.querySelector('button').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
  });

  mrBoxPreviewCards.forEach(card => {
    const image = card.querySelector('img');
    if (!image) return;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open image: ${image.alt}`);
    const openDialog = () => {
      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialog.showModal();
    };
    card.addEventListener('click', openDialog);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDialog();
      }
    });
  });
}

const rightelWebsitePreviewCards = [...document.querySelectorAll('.rightelwebsite-case .case-content .media')].filter(card => card.querySelector('img'));
if (rightelWebsitePreviewCards.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'rightelwebsite-image-dialog';
  dialog.innerHTML = '<button type="button" aria-label="Close image preview">×</button><img alt="">';
  document.body.append(dialog);

  const dialogImage = dialog.querySelector('img');
  const closeDialog = () => dialog.close();
  dialog.querySelector('button').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
  });

  rightelWebsitePreviewCards.forEach(card => {
    const image = card.querySelector('img');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open image: ${image.alt}`);
    const openDialog = () => {
      dialogImage.src = image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialog.showModal();
    };
    card.addEventListener('click', openDialog);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDialog();
      }
    });
  });
}

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
