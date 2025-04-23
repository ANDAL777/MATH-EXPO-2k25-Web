document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered fade-in for elements with fade-on-scroll class
  const fadeElements = document.querySelectorAll('.fade-on-scroll');

  function checkFade() {
    const windowBottom = window.innerHeight + window.scrollY;
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top + window.scrollY;
      if (windowBottom > elementTop + 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFade);
  checkFade();

  // Button click animation handled by CSS :active

  // Card click animation handled by CSS :active and JS toggle aria-expanded (already implemented)
});
