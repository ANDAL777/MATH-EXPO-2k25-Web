document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('register-button');
  const registerModal = document.getElementById('register-modal');
  const modalCloseButton = document.getElementById('register-modal-close');
  const registerForm = document.getElementById('register-form');
  const formSuccessMessage = document.getElementById('form-success-message');

  // Smooth scroll to element and return a Promise that resolves when scroll ends
  function smoothScrollTo(element) {
    return new Promise((resolve) => {
      const targetPosition = element.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 400; // fast but smooth scroll duration in ms
      let startTime = null;

      function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          resolve();
        }
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
      }

      requestAnimationFrame(animation);
    });
  }

  // Show modal with bloom and fade-in animation
  function showModal() {
    registerModal.setAttribute('aria-hidden', 'false');
    registerModal.style.display = 'flex';
    const modalContent = registerModal.querySelector('.modal-content');
    modalContent.classList.remove('bloom-fade-in');
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
    // Redirect to external registration form URL
    window.location.href = 'https://bit.ly/MATHEXPO-2025-REG-FORM';
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
