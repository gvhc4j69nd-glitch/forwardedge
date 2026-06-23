// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    let mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) {
      mobileNav = document.createElement('div');
      mobileNav.className = 'mobile-nav';
      mobileNav.id = 'mobileNav';
      mobileNav.setAttribute('role', 'dialog');
      mobileNav.setAttribute('aria-label', 'Navigation menu');

      const top = document.createElement('div');
      top.className = 'mobile-nav-top';
      const brand = document.querySelector('.nav-brand');
      if (brand) top.appendChild(brand.cloneNode(true));
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.textContent = '✕';
      top.appendChild(closeBtn);
      mobileNav.appendChild(top);

      const list = document.createElement('ul');
      navLinks.querySelectorAll('a').forEach((a) => {
        const li = document.createElement('li');
        const clone = a.cloneNode(true);
        clone.addEventListener('click', closeMobileNav);
        li.appendChild(clone);
        list.appendChild(li);
      });
      mobileNav.appendChild(list);

      document.body.appendChild(mobileNav);

      closeBtn.addEventListener('click', closeMobileNav);
    }

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});
