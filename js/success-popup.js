document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('success-popup-overlay');
  const closeButton = document.getElementById('success-popup-close');

  closeButton.addEventListener('click', () => {
    hideSuccessPopup();
  });

  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      hideSuccessPopup();
    }
  });
});

function showSuccessPopup(message = "Form submitted successfully!") {
  const popupOverlay = document.getElementById('success-popup-overlay');
  const messageEl = document.getElementById('success-popup-message');
  messageEl.textContent = message;
  popupOverlay.classList.add('active');
}

function hideSuccessPopup() {
  const popupOverlay = document.getElementById('success-popup-overlay');
  popupOverlay.classList.remove('active');
}
