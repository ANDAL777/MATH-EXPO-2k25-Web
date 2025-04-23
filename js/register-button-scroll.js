document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('confetti-button');
  if (!registerButton) return;
  
  // Ensure button is visible and interactive
  registerButton.style.opacity = '1';
  registerButton.style.pointerEvents = 'auto';
  registerButton.style.transition = 'none';
  
  // No scroll event listener to prevent movement
  
  // Optional: keep click event if needed
  registerButton.addEventListener('click', () => {
  registerButton.textContent = 'Unlock the Math Magic';
  });
  });