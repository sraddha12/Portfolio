/**
 * Portfolio — Sraddha Kanuparthy
 * Smooth scroll, nav, reveal animations, mobile menu, contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initActiveNavLink();
  initContactForm();
  initSmoothScroll();
  initSkillBars();
});

/* Header scroll effect */
function initHeader() {
  const header = document.getElementById('header');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile navigation */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = menu.querySelectorAll('.nav-link');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* Intersection Observer for reveal animations */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 0.1}s`;
    observer.observe(el);
  });

  // Hero elements animate immediately
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 + i * 120);
  });
}

/* Active nav link on scroll */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Smooth scroll for anchor links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* Animate skill bars (all levels >= 70%) */
function initSkillBars() {
  const rows = document.querySelectorAll('.skill-row');

  const animate = () => {
    rows.forEach((row, index) => {
      const level = Math.max(70, parseInt(row.dataset.level, 10) || 70);
      const fill = row.querySelector('.skill-row-fill');
      const pctEl = row.querySelector('.skill-row-pct');

      row.style.transitionDelay = `${index * 0.05}s`;
      if (fill) fill.style.setProperty('--level', level);

      setTimeout(() => row.classList.add('animated'), index * 60);

      if (pctEl) {
        const start = performance.now();
        const duration = 1100;
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          pctEl.textContent = `${Math.round(level * eased)}%`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
  };

  const section = document.getElementById('skills');
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animate();
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(section);
}

/* Contact form handling */
function initContactForm() {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.disabled = true;
    btn.style.opacity = '0.9';

    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.style.opacity = '';
    }, 3000);
  });
}
