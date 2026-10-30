/**
 * PORTFOLIO KYAN BEER - WINDOWS XP & GOOGLE CHROME JAVASCRIPT
 * Interactie: Before/After slider, XP Window controls, Lightbox, Filter & Formulieren
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initBeforeAfterSlider();
  initScrollSpy();
  initForm();
});

/* ==========================================================================
   1. SYSTEEMKLOK (WINDOWS XP TAAKBALK)
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('systrayClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. WINDOWS XP VENSTERBEDIENING (Min, Max, Sluiten)
   ========================================================================== */
let isMaximized = false;
let isMinimized = false;

function toggleMaximize() {
  const win = document.getElementById('xpWindow');
  if (!win) return;

  isMaximized = !isMaximized;
  if (isMaximized) {
    win.classList.add('is-maximized');
  } else {
    win.classList.remove('is-maximized');
  }
}

function toggleMinimize() {
  const win = document.getElementById('xpWindow');
  const taskItem = document.getElementById('taskbarItem');
  if (!win) return;

  isMinimized = !isMinimized;
  if (isMinimized) {
    win.classList.add('is-minimized');
    if (taskItem) taskItem.classList.remove('is-active');
  } else {
    win.classList.remove('is-minimized');
    if (taskItem) taskItem.classList.add('is-active');
  }
}

function handleCloseWindow() {
  showXpDialog(
    'Windows XP: Kyan Beer Portfolio',
    'Weet je zeker dat je het portfolio van Kyan Beer wilt afsluiten?\n\nTip: Neem eerst even contact op via het formulier of bekijk de DIY Grizzly Arcadebox!'
  );
}

function showStartMenu() {
  showXpDialog(
    'Windows XP Startmenu',
    'Welkom bij Kyan Beer Portfolio OS!\n\n👤 Eigenaar: Kyan Beer (20 jaar)\n🎓 Opleiding: CMD Avans Hogeschool\n📸 Instagram: @kyanbeer\n🕹️ Specialiteit: Fysiek & Digitaal Design'
  );
}

/* ==========================================================================
   3. CHROME TABBLADEN & NAVIGATIE
   ========================================================================== */
function switchChromeTab(tabKey) {
  const tabs = {
    main: { tabId: 'tabMain', sectionId: 'hero', hash: '#home', title: 'Kyan Beer - Portfolio' },
    controller: { tabId: 'tabController', sectionId: 'project-controller', hash: '#controller', title: 'Grizzly Arcade Box', projectTab: 'project-controller' },
    zelda: { tabId: 'tabZelda', sectionId: 'project-zelda', hash: '#zelda', title: 'Zelda Fotoshoot', projectTab: 'project-zelda' },
    uxd: { tabId: 'tabUxd', sectionId: 'project-uxd', hash: '#uxd', title: 'Figma UX Project', projectTab: 'project-uxd' },
    muzus: { tabId: 'tabMuzus', sectionId: 'project-muzus', hash: '#muzus', title: 'Muzus: Breath Battle', projectTab: 'project-muzus' }
  };

  // Verwijder active class van alle tabs
  document.querySelectorAll('.chrome-tab').forEach(t => t.classList.remove('is-active'));

  const active = tabs[tabKey] || tabs.main;
  const tabEl = document.getElementById(active.tabId);
  if (tabEl) tabEl.classList.add('is-active');

  // Update Omnibox
  updateOmnibox(active.hash);

  // Activeer ook de overeenkomende portfolio project tab
  if (active.projectTab) {
    const tabBtn = Array.from(document.querySelectorAll('.filter-tab-btn')).find(b => {
      const oc = b.getAttribute('onclick') || '';
      return oc.includes(active.projectTab);
    });
    showProjectTab(active.projectTab, tabBtn);
  }

  // Scroll naar sectie
  scrollToSection(active.sectionId);
}

function handleCloseTab(event, tabKey) {
  event.stopPropagation();
  if (tabKey === 'main') {
    showXpDialog('Google Chrome', 'Je kunt het hoofdtabblad van Kyan Beer niet sluiten!');
    return;
  }
  const tabEl = document.getElementById(
    tabKey === 'controller' ? 'tabController' :
    tabKey === 'zelda' ? 'tabZelda' :
    tabKey === 'uxd' ? 'tabUxd' : 'tabMuzus'
  );
  if (tabEl) {
    tabEl.style.display = 'none';
  }
  switchChromeTab('main');
}

function openNewTabDialog() {
  showXpDialog(
    'Nieuw Tabblad',
    'Open een nieuw tabblad of bekijk:\n• Instagram: instagram.com/kyanbeer\n• Video: mymedia.avans.nl/media/ARCADEBOXCT2'
  );
}

function updateOmnibox(hash) {
  const urlHashEl = document.getElementById('urlHash');
  if (urlHashEl) {
    urlHashEl.textContent = hash;
  }
}

function toggleBookmark() {
  const star = document.getElementById('omniboxStar');
  if (!star) return;
  star.classList.toggle('is-starred');
  const isStarred = star.classList.contains('is-starred');
  showXpDialog(
    'Google Chrome Bladwijzers',
    isStarred
      ? '★ Pagina succesvol toegevoegd aan je bladwijzerbalk!'
      : 'Bladwijzer verwijderd.'
  );
}

function historyBack() {
  scrollToSection('hero');
}

function historyForward() {
  scrollToSection('contact');
}

function reloadPage() {
  const viewport = document.getElementById('xpViewport');
  if (viewport) {
    viewport.style.opacity = '0.4';
    setTimeout(() => {
      viewport.style.opacity = '1';
      showXpDialog('Google Chrome', 'Pagina succesvol vernieuwd!');
    }, 200);
  }
}

/* ==========================================================================
   4. SCROLLEN & SCROLL SPY
   ========================================================================== */
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  const viewport = document.getElementById('xpViewport');
  if (!target || !viewport) return;

  const targetTop = target.offsetTop - 60;
  viewport.scrollTo({
    top: targetTop,
    behavior: 'smooth'
  });

  updateOmnibox(`#${sectionId}`);
  updateNavLinks(sectionId);
}

function updateNavLinks(activeSectionId) {
  document.querySelectorAll('.site-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    if (href === activeSectionId || (activeSectionId === 'hero' && href === 'hero')) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

function initScrollSpy() {
  const viewport = document.getElementById('xpViewport');
  if (!viewport) return;

  const sections = ['hero', 'about', 'services', 'portfolio', 'contact'];

  viewport.addEventListener('scroll', () => {
    const scrollPos = viewport.scrollTop + 120;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        updateNavLinks(sections[i]);
        break;
      }
    }
  });
}

/* ==========================================================================
   5. INTERACTIEVE BEFORE / AFTER FOTO SLIDER (1-OP-1 ZUIVERE FOTO'S)
   ========================================================================== */
const comparisonImages = {
  1: {
    before: 'Images/Foto30.jpg',
    after: 'Images/Foto29.jpg',
    aspectRatio: '509 / 759'
  },
  2: {
    before: 'Images/Foto32.jpg',
    after: 'Images/Foto31.jpg',
    aspectRatio: '540 / 812'
  },
  3: {
    before: 'Images/Foto34.jpg',
    after: 'Images/Foto33.jpg',
    aspectRatio: '607 / 401'
  },
  4: {
    before: 'Images/Foto36.jpg',
    after: 'Images/Foto35.jpg',
    aspectRatio: '549 / 829'
  }
};

function changeComparison(num, btn) {
  const item = comparisonImages[num];
  if (!item) return;

  const beforeImg = document.getElementById('beforeImage');
  const afterImg = document.getElementById('afterImage');
  const container = document.getElementById('beforeAfterSlider');

  if (beforeImg) beforeImg.src = item.before;
  if (afterImg) afterImg.src = item.after;
  if (container && item.aspectRatio) {
    container.style.aspectRatio = item.aspectRatio;
  }

  // Active state bijwerken
  document.querySelectorAll('.comparison-selector-btn').forEach(b => b.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');
}

function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterSlider');
  const handle = document.getElementById('sliderHandle');

  if (!container || !handle) return;

  let isDragging = false;

  function setSliderPosition(xPos) {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    container.style.setProperty('--slider-pos', `${percentage}%`);
  }

  // Muis events
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  container.addEventListener('mousedown', (e) => {
    if (container.classList.contains('is-side-by-side')) return;
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch events voor mobiel / tablets
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
  });

  container.addEventListener('touchstart', (e) => {
    if (container.classList.contains('is-side-by-side')) return;
    isDragging = true;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  });
}

function toggleSideBySideView(btn) {
  const container = document.getElementById('beforeAfterSlider');
  if (!container) return;

  const isSide = container.classList.toggle('is-side-by-side');
  if (btn) {
    btn.textContent = isSide ? 'Modus: Interactieve Veeg' : 'Modus: Naast Elkaar';
  }
}

/* ==========================================================================
   6. PORTFOLIO TAB NAVIGATIE: één project tegelijk zichtbaar
   ========================================================================== */
function showProjectTab(projectId, btn) {
  // Verberg alle tab-panels
  document.querySelectorAll('.project-tab-panel').forEach(panel => {
    panel.style.display = 'none';
  });

  // Toon het geselecteerde project
  const target = document.getElementById(projectId);
  if (target) target.style.display = 'block';

  // Actieve tab markeren
  document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');

  // Reinitialize before/after slider als het Zelda project is
  if (projectId === 'project-zelda') {
    setTimeout(initBeforeAfterSlider, 50);
  }
}

// Alias voor backwards compatibility
function filterProjects(category, btn) {
  showProjectTab('project-' + (category === 'all' ? 'zelda' : (category === 'photo' ? 'zelda' : category === 'hardware' ? 'controller' : 'uxd')), btn);
}

/* ==========================================================================
   7. LIGHTBOX MODAL VOOR AFBEELDINGEN
   ========================================================================== */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (!modal || !img) return;

  img.src = src;
  if (cap) cap.textContent = caption || '';
  modal.classList.add('is-open');
}

function closeLightbox(event) {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('is-open');
  }
}

/* Sluit lightbox met Escape toets */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeXpDialog();
  }
});

/* ==========================================================================
   8. WINDOWS XP DIALOOG MODAL
   ========================================================================== */
function showXpDialog(title, message) {
  const modal = document.getElementById('xpDialogModal');
  const titleEl = document.getElementById('xpDialogTitle');
  const msgTitleEl = document.getElementById('xpDialogMsgTitle');
  const msgTextEl = document.getElementById('xpDialogMsgText');

  if (!modal) return;

  if (titleEl) titleEl.textContent = title || 'Windows XP Melding';
  if (msgTitleEl) msgTitleEl.textContent = title || 'Informatie';
  if (msgTextEl) msgTextEl.innerHTML = message ? message.replace(/\n/g, '<br>') : '';

  modal.classList.add('is-visible');
}

function closeXpDialog() {
  const modal = document.getElementById('xpDialogModal');
  if (modal) {
    modal.classList.remove('is-visible');
  }
}

/* ==========================================================================
   9. CONTACTFORMULIER MET BEVESTIGING
   ========================================================================== */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName')?.value || 'Bewerker';
  const email = document.getElementById('formEmail')?.value || '';
  const subject = document.getElementById('formSubject')?.value || 'Vraag';

  showXpDialog(
    'Bericht Verzonden!',
    `Bedankt voor je bericht, <strong>${name}</strong>!\n\nIk heb je aanvraag over <em>${subject}</em> goed ontvangen. Ik neem zo snel mogelijk contact met je op via <u>${email}</u>.`
  );

  const form = document.getElementById('contactForm');
  if (form) form.reset();
}
