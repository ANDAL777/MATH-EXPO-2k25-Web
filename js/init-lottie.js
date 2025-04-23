document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lottie-math-icon');
  if (container) {
    lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json' // Example math-themed animation JSON URL
    });
  }
});
