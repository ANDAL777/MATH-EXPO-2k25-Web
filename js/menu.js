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

  // Function to show all required sections simultaneously
  function showAllSections() {
    const sectionsToShow = ['about-us', 'contact', 'timeline'];
    sectionsToShow.forEach(sectionId => {
      const section = document.getElementById('section-' + sectionId);
      if (section) {
        section.style.display = 'block';
        section.classList.add('visible'); // Add visible class for opacity and animation
      }
    });
  }

  // Show all sections on page load
  showAllSections();

  // Attach click handlers to menu items
  menu.querySelectorAll('a').forEach(function (menuItem) {
    menuItem.addEventListener('click', function (event) {
      event.preventDefault();
      closeMenu();

      const targetId = this.getAttribute('href').substring(1);

      const targetSection = document.getElementById('section-' + targetId);
      if (targetSection) {
        // Scroll to target section top offset without hiding others
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'auto'
        });
      }
    });
  });
});
