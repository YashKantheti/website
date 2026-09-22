(() => {
  'use strict';

  const body = document.body;
  const themeButton = document.querySelector('#theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#nav-links');
  const motionButton = document.querySelector('#motion-toggle');
  const flightButton = document.querySelector('#fly-button');
  const flightScene = document.querySelector('.flight-scene');
  const flightStatus = document.querySelector('#flight-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 580px)');
  let flightTimer = null;

  // Storage can be unavailable in privacy modes. The controls still work.
  function readPreference(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch { /* In-memory preferences still apply. */ }
  }

  function setTheme(theme) {
    const light = theme === 'light';
    body.classList.toggle('light-theme', light);
    themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    document.querySelector('meta[name="theme-color"]').content = light ? '#f7f3ee' : '#1e1d1d';
  }
  setTheme(readPreference('theme') || 'dark');
  themeButton.addEventListener('click', () => {
    const theme = body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(theme);
    savePreference('theme', theme);
  });

  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) closeMenu();
  });
  mobileLayout.addEventListener('change', () => closeMenu());

  // Respect the operating system preference even if a previous visit enabled motion.
  let manuallyPaused = readPreference('portfolio-motion') === 'paused';
  function motionIsPaused() { return manuallyPaused || reducedMotion.matches; }
  function finishFlight() {
    clearTimeout(flightTimer);
    flightTimer = null;
    flightScene.classList.remove('is-flying');
    flightButton.disabled = false;
  }
  function updateMotion() {
    const paused = motionIsPaused();
    body.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', reducedMotion.matches
      ? 'Reduced motion is enabled in your system settings'
      : paused ? 'Resume animations' : 'Pause animations');
    motionButton.querySelector('.motion-label').textContent = reducedMotion.matches
      ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    motionButton.querySelector('.pause-symbol').textContent = paused ? '▷' : 'Ⅱ';
    motionButton.disabled = reducedMotion.matches;
    if (paused) finishFlight();
  }
  updateMotion();
  motionButton.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    savePreference('portfolio-motion', manuallyPaused ? 'paused' : 'playing');
    updateMotion();
  });
  reducedMotion.addEventListener('change', updateMotion);

  flightButton.addEventListener('click', () => {
    if (motionIsPaused()) {
      flightStatus.textContent = reducedMotion.matches
        ? 'Ready for takeoff. Flight animation is disabled to respect your reduced-motion preference.'
        : 'Motion is paused. Use Resume motion to enable the flight animation.';
      return;
    }
    flightButton.disabled = true;
    flightStatus.textContent = 'Cleared for takeoff.';
    flightScene.classList.add('is-flying');
    // Also recovers if the animation is cancelled by a preference or tab change.
    flightTimer = window.setTimeout(() => {
      finishFlight();
      flightStatus.textContent = 'Back from the flight. Ready to go again.';
    }, 2800);
  });
  flightScene.addEventListener('animationend', event => {
    if (event.animationName === 'flyby') {
      finishFlight();
      flightStatus.textContent = 'Back from the flight. Ready to go again.';
    }
  });
  document.addEventListener('visibilitychange', () => {
    body.classList.toggle('page-hidden', document.hidden);
    if (document.hidden) finishFlight();
  });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project[data-category]')];
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let count = 0;
      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      projects.forEach(project => {
        const visible = filter === 'all' || project.dataset.category === filter;
        project.hidden = !visible;
        if (visible) count += 1;
      });
      document.querySelector('#filter-status').textContent =
        count + ' projects shown: ' + (filter === 'all' ? 'all projects' : filter === 'ai' ? 'AI and ML' : 'software') + '.';
    });
  });

  // Native details elements provide keyboard-accessible project notes without JavaScript.
  // IntersectionObserver only enhances navigation; all content stays visible without it.
  if ('IntersectionObserver' in window) {
    const sectionLinks = [...navigation.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const id = visible[0].target.id;
      sectionLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }

  document.querySelector('#copy-email').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('yashk@vt.edu');
      status.textContent = 'Email copied. Say hello!';
    } catch {
      status.textContent = 'You can copy yashk@vt.edu or click the email link to get in touch.';
    }
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
