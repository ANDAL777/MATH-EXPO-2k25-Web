document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-on-scroll');

  function checkVisibility() {
    const windowHeight = window.innerHeight;
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        el.classList.add('visible');
        el.classList.remove('hidden');
      } else {
        el.classList.remove('visible');
        el.classList.add('hidden');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  checkVisibility();
});


