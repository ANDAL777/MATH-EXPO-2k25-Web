function updateCountdown() {
  const targetDate = new Date('April 30, 2025 09:00:00').getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  const countdownEl = document.getElementById('countdown');

  if (distance <= 0) {
    countdownEl.textContent = '🎉 Math Expo Started!';
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

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
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

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
