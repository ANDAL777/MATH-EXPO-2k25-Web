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

  // Function to show only the selected section
  function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
    });
    const targetSection = document.getElementById('section-' + sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
    }
  }

  // Attach click handlers to menu items
  menu.querySelectorAll('a').forEach(function (menuItem) {
    menuItem.addEventListener('click', function (event) {
      event.preventDefault();
      closeMenu();

      const targetId = this.getAttribute('href').substring(1);
      showSection(targetId);

      const targetSection = document.getElementById('section-' + targetId);
      if (targetSection) {
        // Instant scroll to target section top offset
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'auto' // 'instant' is not standard, use 'auto' for immediate scroll
        });
      }
    });
  });
});
