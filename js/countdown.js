document.addEventListener('DOMContentLoaded', () => {
  function updateCountdown() {
    const targetDate = new Date('April 30, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const countdownEl = document.getElementById('countdown');
    const countdownPopupTextEl = document.getElementById('countdown-popup-text');

    if (distance <= 0) {
      const finishedText = '🎉 Math Expo Started!';
      countdownEl.textContent = finishedText;
      if (countdownPopupTextEl) countdownPopupTextEl.textContent = finishedText;
      countdownEl.classList.add('countdown-zero');
      clearInterval(timerInterval);

      // Play sound
      const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
      audio.play();

      // Vibrate device if supported
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

      // Show success animation
      showSuccessAnimation();

      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format time as DD:HH:MM:SS with leading zeros
    const formatNumber = (num) => num.toString().padStart(2, '0');
    const countdownText = `${formatNumber(days)}d : ${formatNumber(hours)}h : ${formatNumber(minutes)}m : ${formatNumber(seconds)}s`;

    countdownEl.textContent = countdownText;
    if (countdownPopupTextEl) countdownPopupTextEl.textContent = countdownText;
    countdownEl.classList.add('animate');
    setTimeout(() => countdownEl.classList.remove('animate'), 900);
  }

  function showSuccessAnimation() {
    const countdownEl = document.getElementById('countdown');
    countdownEl.style.position = 'relative';

    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    countdownEl.appendChild(confetti);

    setTimeout(() => {
      countdownEl.removeChild(confetti);
    }, 3000);
  }

  // Show popup on clicking countdown timer
  const countdownEl = document.getElementById('countdown');
  const countdownPopup = document.getElementById('countdown-popup');
  const countdownPopupClose = document.getElementById('countdown-popup-close');

  countdownEl.style.cursor = 'pointer';
  countdownEl.title = 'Click to open countdown popup';

  countdownEl.addEventListener('click', () => {
    if (countdownPopup) countdownPopup.style.display = 'flex';
  });

  if (countdownPopupClose) {
    countdownPopupClose.addEventListener('click', () => {
      if (countdownPopup) countdownPopup.style.display = 'none';
    });
  }

  if (countdownPopup) {
    countdownPopup.addEventListener('click', (e) => {
      if (e.target === countdownPopup) {
        countdownPopup.style.display = 'none';
      }
    });
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
