











3-
+----------------document.addEventListener('DOMContentLoaded', function () {
  const countdownElement = document.getElementById('countdown-timer');
  // Set the target date to Jan 1, 2026 00:00:00
  const targetDate = new Date('2026-01-01T00:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownElement.textContent = "Event Started!";
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownElement.textContent = 
      days + "d " + 
      hours.toString().padStart(2, '0') + "h " + 
      minutes.toString().padStart(2, '0') + "m " + 
      seconds.toString().padStart(2, '0') + "s";
  }

  updateCountdown();
  const intervalId = setInterval(updateCountdown, 1000);
});
