const templateMenuItem = document.getElementById('menu-template');
if (templateMenuItem) {
  templateMenuItem.addEventListener('click', function(event) {
    event.preventDefault();
    const fileUrl = this.href;

    // Create a temporary anchor element to trigger download/open
    const tempLink = document.createElement('a');
    tempLink.href = fileUrl;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener';
    tempLink.download = '';

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // Close the menu if open
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.remove('active');
    }
  });
}

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

  // Cache for loaded sections content
  const loadedSections = new Set();

  // Function to load section content dynamically
  async function loadSectionContent(sectionId) {
    if (loadedSections.has(sectionId)) {
      return; // Already loaded
    }
    const section = document.getElementById(sectionId);
    if (!section) return;

    try {
      const response = await fetch(`template/${sectionId}.html`);
      if (!response.ok) {
        console.error(`Failed to load content for ${sectionId}: ${response.statusText}`);
        return;
      }
      const html = await response.text();
      section.innerHTML = html;
      loadedSections.add(sectionId);
    } catch (error) {
      console.error(`Error loading content for ${sectionId}:`, error);
    }
  }

  // Attach click handlers to menu items
  menu.querySelectorAll('a').forEach(function (menuItem) {
    menuItem.addEventListener('click', async function (event) {
      const menuId = this.id;
      if (menuId === 'menu-about' || menuId === 'menu-contact') {
        // Prevent scrolling and open modal only for About Us and Contact Us
        event.preventDefault();
        closeMenu();
        openSectionModal('section-' + this.getAttribute('href').substring(1));
        return;
      }

      // For project submission, allow default navigation to external URL
      if (menuId === 'menu-project-submission') {
        closeMenu();
        return;
      }

      event.preventDefault();
      closeMenu();

      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('hidden-content');
        section.classList.remove('highlighted-section');
        section.style.display = 'block';
      });

      const targetId = this.getAttribute('href').substring(1);
      const targetSectionId = 'section-' + targetId;

      // Load content dynamically for target section
      await loadSectionContent(targetSectionId);

      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Brochure modal open/close logic
  const brochureButton = document.getElementById('menu-brochure');
  const brochureModal = document.getElementById('brochure-modal');
  const brochureModalClose = document.getElementById('brochure-modal-close');

  brochureButton.addEventListener('click', function(event) {
    event.preventDefault();
    brochureModal.style.display = 'block';
  });

  brochureModalClose.addEventListener('click', function() {
    brochureModal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target === brochureModal) {
      brochureModal.style.display = 'none';
    }
  });

  // Gallery modal open/close logic
  const galleryButton = document.getElementById('menu-gallery');
  const galleryModal = document.getElementById('gallery-modal');
  const galleryModalClose = document.getElementById('gallery-modal-close');
  const galleryVideo = document.getElementById('gallery-video');
  
  galleryButton.addEventListener('click', function(event) {
    event.preventDefault();
    galleryModal.style.display = 'block';
    if (galleryVideo) {
      galleryVideo.play();
    }
  });
  
  galleryModalClose.addEventListener('click', function() {
    galleryModal.style.display = 'none';
    if (galleryVideo) {
      galleryVideo.pause();
      galleryVideo.currentTime = 0;
    }
  });
  
  window.addEventListener('click', function(event) {
    if (event.target === galleryModal) {
      galleryModal.style.display = 'none';
      if (galleryVideo) {
        galleryVideo.pause();
        galleryVideo.currentTime = 0;
      }
    }
  });

  // Section modal open/close logic
  const sectionModal = document.getElementById('section-modal');
  const sectionModalBody = document.getElementById('section-modal-body');
  const sectionModalClose = document.getElementById('section-modal-close');

  // Function to open modal with cloned section content
  function openSectionModal(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Clear previous content
    sectionModalBody.innerHTML = '';

    // Clone the section content and append to modal body
    const clonedContent = section.cloneNode(true);
    sectionModalBody.appendChild(clonedContent);

    // Show modal
    sectionModal.style.display = 'block';
  }

  // Attach click handlers to menu items for sections
  const sectionMenuItems = ['menu-about', 'menu-registration', 'menu-project-submission', 'menu-template', 'menu-contact'];
  sectionMenuItems.forEach(menuId => {
    const menuItem = document.getElementById(menuId);
    if (menuItem) {
      menuItem.addEventListener('click', function(event) {
        if (menuId === 'menu-project-submission' || menuId === 'menu-template') {
          // Allow default navigation for external link or template file
          closeMenu();
          return;
        }
        event.preventDefault();
        closeMenu();
        const targetId = this.getAttribute('href').substring(1);
        openSectionModal('section-' + targetId);
      });
    }
  });

  // Open registration section modal on register button click
  const registerButton = document.getElementById('register-button');
  if (registerButton) {
    registerButton.addEventListener('click', function(event) {
      event.preventDefault();
      openSectionModal('section-registration');
    });
  }

  // Close modal on close button click
  sectionModalClose.addEventListener('click', function() {
    sectionModal.style.display = 'none';
  });

  // Close modal on clicking outside modal content
  window.addEventListener('click', function(event) {
    if (event.target === sectionModal) {
      sectionModal.style.display = 'none';
    }
  });
});
