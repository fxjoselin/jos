/* --------------------------------------------------
   UPDATE GMT TIME IN NAV (desktop + mobile)
-------------------------------------------------- */
const navTime = document.getElementById('nav-time');
if (navTime) {
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    navTime.textContent = `${hours}:${minutes} GMT`;
  };
  updateTime();
  setInterval(updateTime, 60000);
}

/* --------------------------------------------------
   SMOOTH SCROLL FOR INTERNAL LINKS
-------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 10;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  });
});

/* --------------------------------------------------
   MOBILE NAVIGATION
-------------------------------------------------- */
const navToggle = document.querySelector('.nav__toggle');
const navOverlay = document.querySelector('.nav__overlay');

if (navToggle && navOverlay) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('nav__toggle--open');
    navOverlay.classList.toggle('nav__overlay--open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navOverlay.setAttribute('aria-hidden', String(!isOpen));
  });

  navOverlay.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('nav__toggle--open');
      navOverlay.classList.remove('nav__overlay--open');
      navToggle.setAttribute('aria-expanded', 'false');
      navOverlay.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navOverlay.contains(event.target) && !navToggle.contains(event.target)) {
      navToggle.classList.remove('nav__toggle--open');
      navOverlay.classList.remove('nav__overlay--open');
      navToggle.setAttribute('aria-expanded', 'false');
      navOverlay.setAttribute('aria-hidden', 'true');
    }
  });
}

/* --------------------------------------------------
   MAIN NAV TOGGLE
-------------------------------------------------- */
const mainNavButton = document.querySelector('.hamburger');
const mainNavMenu = document.querySelector('.main-nav__menu-wrapper');
const mainNavLinks = document.querySelectorAll('.main-nav__menu a');

if (mainNavButton && mainNavMenu) {
  mainNavButton.addEventListener('click', () => {
    const active = mainNavButton.classList.toggle('is-active');
    mainNavMenu.classList.toggle('is-active');
    mainNavButton.setAttribute('aria-expanded', active ? 'true' : 'false');
    mainNavMenu.setAttribute('aria-hidden', active ? 'false' : 'true');
  });

  mainNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNavButton.classList.remove('is-active');
      mainNavMenu.classList.remove('is-active');
      mainNavButton.setAttribute('aria-expanded', 'false');
      mainNavMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

/* --------------------------------------------------
   SECTION REVEAL ANIMATIONS
-------------------------------------------------- */

const animatedSections = document.querySelectorAll('[data-animate="section"]');

const observerOptions = {
  threshold: 0.15,
};

const animateSection = (section) => {
  const fadeUps = section.querySelectorAll('.fade-up');
  const fadeIns = section.querySelectorAll('.fade-in');
  const imageReveals = section.querySelectorAll('.image-reveal img');

  fadeUps.forEach((el, index) => {
    el.style.transition = `opacity 600ms ease-out ${index * 80}ms, transform 600ms ease-out ${index * 80}ms`;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });

  fadeIns.forEach((el, index) => {
    el.style.transition = `opacity 600ms ease-out ${index * 80}ms`;
    el.style.opacity = '1';
  });

  imageReveals.forEach((img, index) => {
    img.style.transition = `opacity 700ms ease-out ${index * 80}ms, transform 700ms ease-out ${index * 80}ms`;
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSection(entry.target);
      sectionObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedSections.forEach((section) => sectionObserver.observe(section));

/* --------------------------------------------------
   BACK TO TOP BUTTON
-------------------------------------------------- */
const backToTop = document.querySelector('.footer__top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------
   CUSTOM CURSOR FOLLOWER
-------------------------------------------------- */
const cursor = document.querySelector('.cursor');

if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

/* --------------------------------------------------
   MAGNETIC BUTTONS
-------------------------------------------------- */
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((el) => {
  const strength = 0.3;

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const moveX = (relX - rect.width / 2) * strength;
    const moveY = (relY - rect.height / 2) * strength;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });

  el.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      cursor.style.border = '1px solid rgba(0, 0, 0, 0.8)';
    }
  });

  el.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.style.width = '22px';
      cursor.style.height = '22px';
      cursor.style.border = '1px solid rgba(0, 0, 0, 0.4)';
    }
  });
});

/* --------------------------------------------------
   CURSOR HOVER SCALING ON INTERACTIVE ELEMENTS
-------------------------------------------------- */
const interactiveSelectors = [
  'a',
  'button',
  '.work-card-wrapper',
  '.about__portrait-card'
];

const interactiveElements = document.querySelectorAll(interactiveSelectors.join(','));

interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.style.width = '28px';
      cursor.style.height = '28px';
      cursor.style.border = '1px solid rgba(0, 0, 0, 0.8)';
    }
  });

  el.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.style.width = '22px';
      cursor.style.height = '22px';
      cursor.style.border = '1px solid rgba(0, 0, 0, 0.4)';
    }
  });
});