document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');

  function closeMenu() {
    menu.classList.remove('active');
  }

  menuIcon.addEventListener('click', function () {
    menu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
      closeMenu();
    }
  });

  // Close menu when clicking a menu item
  menu.querySelectorAll('a').forEach(function (menuItem) {
    menuItem.addEventListener('click', function (event) {
      event.preventDefault();
      closeMenu();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // After scrolling, show only the relevant content section
        setTimeout(() => {
          const contentSections = document.querySelectorAll('.content-section');
          contentSections.forEach(section => {
            if (section.id === 'section-' + targetId) {
              section.classList.add('visible');
            } else {
              section.classList.remove('visible');
            }
          });
        }, 600); // Delay to allow scroll animation to complete
      }
    });
  });
});
