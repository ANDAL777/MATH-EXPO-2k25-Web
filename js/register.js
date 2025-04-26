document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('register-button');
  const registerModal = document.getElementById('register-modal');
  const modalCloseButton = document.getElementById('register-modal-close');
  const registerForm = document.getElementById('register-form');
  const formSuccessMessage = document.getElementById('form-success-message');

  // Utility: Smooth scroll to modal
  function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Show modal with fade-in animation
  function showModal() {
    registerModal.setAttribute('aria-hidden', 'false');
    registerModal.style.display = 'flex';
    registerModal.querySelector('.modal-content').classList.add('animate__fadeInDown');
    smoothScrollTo(registerModal);
  }

  // Hide modal
  function hideModal() {
    registerModal.querySelector('.modal-content').classList.remove('animate__fadeInDown');
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

  // Confetti effect (simple lightweight)
  function createConfetti() {
    const confettiCount = 30;
    const colors = ['#ffd700', '#ff2d55', '#8e2de2', '#ff8c00', '#00bfff'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.top = '0';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.opacity = '0.8';
      confetti.style.borderRadius = '50%';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.animation = `confetti-fall ${2 + Math.random() * 2}s linear forwards`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(confetti);

      confetti.addEventListener('animationend', () => {
        confetti.remove();
        if (container.childElementCount === 0) {
          container.remove();
        }
      });
    }
  }

  // Event listeners
  registerButton.addEventListener('mouseenter', () => {
    createConfetti();
  });

  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    createConfetti();
    showModal();
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

// Confetti fall animation keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
