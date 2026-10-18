---
---
const isPersianPage = document.documentElement.lang === 'fa';
const imageLabels = isPersianPage
  ? { preview: 'نمایش تصویر', close: 'بستن تصویر', full: 'اندازه اصلی', fit: 'متناسب با صفحه', open: 'بزرگ‌نمایی تصویر', fallback: 'تصویر کیس‌استادی' }
  : { preview: 'Image preview', close: 'Close image preview', full: 'View full size', fit: 'Fit to screen', open: 'Open image', fallback: 'Case study image' };

document.querySelectorAll('[data-case-language]').forEach(link => {
  const baseHref = link.getAttribute('href');
  const keepSection = () => link.setAttribute('href', baseHref + window.location.hash);
  keepSection();
  window.addEventListener('hashchange', keepSection);
});

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

const footerZoie = document.querySelector('.footer-zoie');
if (footerZoie && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const footerZoieObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    footerZoie.classList.add('is-visible');
    footerZoieObserver.disconnect();
  }, { threshold: .22 });
  footerZoieObserver.observe(footerZoie);
}

const sections = [...document.querySelectorAll('.case-content section[id]')];
const caseLinks = [...document.querySelectorAll('.case-nav a')];
if (sections.length && caseLinks.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visibleEntry = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight * .25) - Math.abs(b.boundingClientRect.top - innerHeight * .25))[0];
    if (!visibleEntry) return;
    const rightelEvidenceSections = ['problem-statement', 'research', 'interview-guide', 'findings'];
    const activeSectionId = document.body.classList.contains('rightel-case') && rightelEvidenceSections.includes(visibleEntry.target.id)
      ? 'problem-statement'
      : visibleEntry.target.id;
    caseLinks.forEach(link => link.classList.toggle('active', link.hash === `#${activeSectionId}`));
  }, { rootMargin: '-25% 0px -65%' });
  sections.forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear().toLocaleString(isPersianPage ? 'fa-IR' : 'en-US', { useGrouping: false }));

const caseImages = [...document.querySelectorAll('.case-hero img, .case-content img')];
if (caseImages.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'case-image-dialog';
  dialog.setAttribute('aria-label', imageLabels.preview);
  dialog.innerHTML = `<div class="case-image-toolbar">
    <button type="button" data-image-size aria-pressed="false">${imageLabels.full}</button>
    <button type="button" data-image-close aria-label="${imageLabels.close}" autofocus>×</button>
  </div><div class="case-image-viewport"><img alt=""></div>`;
  document.body.append(dialog);

  const previewImage = dialog.querySelector('img');
  const viewport = dialog.querySelector('.case-image-viewport');
  const sizeButton = dialog.querySelector('[data-image-size]');
  let opener;
  const setFullSize = fullSize => {
    dialog.classList.toggle('is-full-size', fullSize);
    sizeButton.setAttribute('aria-pressed', String(fullSize));
    sizeButton.textContent = fullSize ? imageLabels.fit : imageLabels.full;
    viewport.scrollTo(0, 0);
  };
  sizeButton.addEventListener('click', () => setFullSize(!dialog.classList.contains('is-full-size')));
  previewImage.addEventListener('click', () => setFullSize(!dialog.classList.contains('is-full-size')));
  dialog.querySelector('[data-image-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('case-image-open');
    setFullSize(false);
    opener?.focus({ preventScroll: true });
  });

  caseImages.forEach(image => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-haspopup', 'dialog');
    image.setAttribute('aria-label', `${imageLabels.open}: ${image.alt || imageLabels.fallback}`);
    const openImage = () => {
      if (dialog.open) return;
      opener = image;
      previewImage.src = image.currentSrc || image.src;
      previewImage.alt = image.alt;
      setFullSize(false);
      dialog.showModal();
      document.body.classList.add('case-image-open');
    };
    image.addEventListener('click', openImage);
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage();
      }
    });
  });
}

const questionLanguageSwitch = document.querySelector('.rightel-language-switch');
const questionGroups = document.querySelector('.rightel-question-groups');
if (questionLanguageSwitch && questionGroups) {
  const languageButtons = [...questionLanguageSwitch.querySelectorAll('[data-question-language]')];
  const questionVersions = [...questionGroups.querySelectorAll('[data-question-lang]')];

  languageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const language = button.dataset.questionLanguage;
      questionGroups.dataset.activeLanguage = language;
      languageButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      questionVersions.forEach(version => {
        version.hidden = version.dataset.questionLang !== language;
      });
    });
  });
}

const projectCatalog = {{ site.data.projects | jsonify }};

document.querySelectorAll('[data-document-slider]').forEach(slider => {
  const viewport = slider.querySelector('[data-document-scroll]');
  const progress = slider.querySelector('[data-document-progress]');
  const updateProgress = () => {
    const scrollable = viewport.scrollHeight - viewport.clientHeight;
    const ratio = scrollable > 0 ? viewport.scrollTop / scrollable : 0;
    const thumbSize = Math.max(10, viewport.clientHeight / viewport.scrollHeight * 100);
    progress.style.height = `${thumbSize}%`;
    progress.style.top = `${ratio * (100 - thumbSize)}%`;
  };
  slider.querySelectorAll('[data-document-direction]').forEach(button => {
    button.addEventListener('click', () => viewport.scrollBy({
      top: (button.dataset.documentDirection === 'down' ? 1 : -1) * viewport.clientHeight * .82,
      behavior: 'smooth'
    }));
  });
  viewport.addEventListener('scroll', updateProgress, { passive: true });
  viewport.querySelector('img')?.addEventListener('load', updateProgress);
  window.addEventListener('resize', updateProgress);
  updateProgress();
});

const caseArticle = document.querySelector('.case-content');
if (caseArticle) {
  const current = location.pathname.split('/').filter(Boolean).at(-1);
  const projectRoot = isPersianPage ? '../../' : '../';
  const persianProjects = {
    myrightel: { title: 'بازطراحی رایتل من', type: 'طراحی اپ و وب' },
    fsa: { title: 'بازطراحی FakeStore API', type: 'طراحی وب' },
    'design-system': { title: 'دیزاین‌سیستم رایتل', type: 'دیزاین‌سیستم' },
    restaurant: { title: 'داشبورد مدیریت رستوران', type: 'طراحی اپلیکیشن' },
    'mr.box': { title: 'اپلیکیشن ارسال مرسوله مسترباکس', type: 'طراحی اپلیکیشن' },
    rightelwebsite: { title: 'وب‌سایت رایتل و خرید سیم‌کارت', type: 'طراحی وب' }
  };
  const cards = projectCatalog.filter(project => project.slug !== current).sort((a, b) => a.order - b.order).slice(0, 4);
  const section = document.createElement('section');
  section.className = 'other-projects';
  section.innerHTML = `<div class="container"><h2 class="section-heading">${isPersianPage ? 'پروژه‌های دیگر' : 'Other Projects'}</h2><div class="project-grid">${cards.map(project => `
    <a class="project-card" href="${projectRoot}${project.slug}/">
      <div class="project-image"><img src="${projectRoot}${project.image.replace(/^\//, '')}" alt="${isPersianPage ? persianProjects[project.slug]?.title || project.alt : project.alt}" loading="lazy"></div>
      <div class="project-copy"><p class="eyebrow">${isPersianPage ? persianProjects[project.slug]?.type || project.type : project.type}</p><h3>${isPersianPage ? persianProjects[project.slug]?.title || project.title : project.title}</h3></div>
    </a>`).join('')}</div></div>`;
  document.querySelector('main').append(section);
}
