document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('register-button');
  const registerModal = document.getElementById('register-modal');
  const modalCloseButton = document.getElementById('register-modal-close');
  const registerForm = document.getElementById('register-form');
  const formSuccessMessage = document.getElementById('form-success-message');

  // Utility: Scroll to element instantly
  function instantScrollTo(element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'auto'
    });
  }

  // Show modal with bloom and fade-in animation
  function showModal() {
    registerModal.setAttribute('aria-hidden', 'false');
    registerModal.style.display = 'flex';
    const modalContent = registerModal.querySelector('.modal-content');
    modalContent.classList.remove('animate__fadeInDown');
    // Trigger reflow to restart animation
    void modalContent.offsetWidth;
    modalContent.classList.add('bloom-fade-in');
  }

  // Hide modal
  function hideModal() {
    const modalContent = registerModal.querySelector('.modal-content');
    modalContent.classList.remove('bloom-fade-in');
    registerModal.setAttribute('aria-hidden', 'true');
    registerModal.style.display = 'none';
    formSuccessMessage.hidden = true;
    registerForm.style.display = 'block';
    registerForm.reset();
    clearErrors();
  }

  // Clear form error messages
  function clearErrors() {
    const errorMessages = registerForm.querySelectorAll('.error-message');
    errorMessages.forEach(span => {
      span.textContent = '';
    });
  }

  // Validate form fields
  function validateForm() {
    let valid = true;
    clearErrors();

    const nameInput = registerForm.name;
    const emailInput = registerForm.email;
    const phoneInput = registerForm.phone;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'Name is required');
      valid = false;
    }
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Email is required');
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Invalid email format');
      valid = false;
    }
    if (phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
      setError(phoneInput, 'Invalid phone number');
      valid = false;
    }
    return valid;
  }

  // Set error message for input
  function setError(input, message) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  // Email validation regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Phone validation regex
  function validatePhone(phone) {
    const re = /^\+?[0-9\s\-]{7,15}$/;
    return re.test(phone);
  }

  // Event listeners
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Scroll instantly to the register button's position
    instantScrollTo(registerButton);
    // Show modal after a short delay to ensure scroll completes
    setTimeout(() => {
      showModal();
    }, 100); // 100ms delay for scroll to complete
  });

  modalCloseButton.addEventListener('click', () => {
    hideModal();
  });

  registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
      hideModal();
    }
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission success
      registerForm.style.display = 'none';
      formSuccessMessage.hidden = false;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const sectionModal = document.getElementById('section-modal');
  const sectionModalBody = document.getElementById('section-modal-body');
  const sectionModalClose = document.getElementById('section-modal-close');

  // Bubble animation logic
  function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = 3 + Math.random() * 2 + 's';
    bubble.style.width = 10 + Math.random() * 20 + 'px';
    bubble.style.height = bubble.style.width;
    sectionModalBody.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
      bubble.remove();
    });
  }

  let bubbleInterval = null;

  function startBubbles() {
    stopBubbles();
    bubbleInterval = setInterval(createBubble, 300);
  }

  function stopBubbles() {
    if (bubbleInterval) {
      clearInterval(bubbleInterval);
      bubbleInterval = null;
    }
  }

  // Observe modal content changes to start/stop bubbles
  const observer = new MutationObserver(() => {
    if (sectionModal.style.display === 'block' && sectionModalBody.querySelector('#section-registration')) {
      startBubbles();
    } else {
      stopBubbles();
    }
  });

  observer.observe(sectionModalBody, { childList: true, subtree: true });

  // Stop bubbles on modal close
  sectionModalClose.addEventListener('click', () => {
    stopBubbles();
  });

  window.addEventListener('click', (e) => {
    if (e.target === sectionModal) {
      stopBubbles();
    }
  });
});
