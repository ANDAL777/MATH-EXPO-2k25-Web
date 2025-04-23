document.addEventListener('DOMContentLoaded', () => {
  const symbols = ['∑', 'π', '∞', '∂', '√', '∫', '∏', '∆', 'θ', 'λ', 'σ', 'Φ'];
  const container = document.getElementById('floating-symbols-bg');
  const numSymbols = 30;
  const floatingSymbols = [];

  // Utility to get random number in range
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Calculate grid size for even distribution
  const cols = Math.ceil(Math.sqrt(numSymbols));
  const rows = Math.ceil(numSymbols / cols);
  const cellWidth = container.clientWidth / cols;
  const cellHeight = container.clientHeight / rows;

  // Create symbol elements with grid-based initial position and velocity
  for (let i = 0; i < numSymbols; i++) {
    const span = document.createElement('span');
    span.classList.add('floating-symbol');
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    container.appendChild(span);

    const size = randomRange(16, 32); // font size in px
    span.style.fontSize = size + 'px';

    // Random initial opacity between 0.2 and 0.8
    const initialOpacity = randomRange(0.2, 0.8);
    span.style.opacity = initialOpacity;

    // Calculate grid position
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Position with random offset within cell
    const x = col * cellWidth + randomRange(cellWidth * 0.1, cellWidth * 0.9);
    const y = row * cellHeight + randomRange(cellHeight * 0.1, cellHeight * 0.9);

    floatingSymbols.push({
      el: span,
      x: x,
      y: y,
      vx: randomRange(-0.3, 0.3),
      vy: randomRange(-0.15, 0.15),
      opacity: initialOpacity,
      opacityDirection: Math.random() > 0.5 ? 1 : -1,
      size: size,
      oscillationPhase: Math.random() * 2 * Math.PI
    });
  }

  // Animate symbols drifting, fading, and horizontal oscillation
  function animate() {
    floatingSymbols.forEach(symbol => {
      symbol.x += symbol.vx;
      symbol.y += symbol.vy;

      // Bounce off edges
      if (symbol.x < 0) {
        symbol.x = 0;
        symbol.vx = -symbol.vx;
      } else if (symbol.x > container.clientWidth) {
        symbol.x = container.clientWidth;
        symbol.vx = -symbol.vx;
      }
      if (symbol.y < 0) {
        symbol.y = 0;
        symbol.vy = -symbol.vy;
      } else if (symbol.y > container.clientHeight) {
        symbol.y = container.clientHeight;
        symbol.vy = -symbol.vy;
      }

      // Fade in/out between 0.2 and 0.8 opacity
      symbol.opacity += 0.005 * symbol.opacityDirection;
      if (symbol.opacity >= 0.8) {
        symbol.opacity = 0.8;
        symbol.opacityDirection = -1;
      } else if (symbol.opacity <= 0.2) {
        symbol.opacity = 0.2;
        symbol.opacityDirection = 1;
      }

      // Horizontal oscillation with sine wave
      symbol.oscillationPhase += 0.02;
      const oscillationX = 10 * Math.sin(symbol.oscillationPhase);

      symbol.el.style.transform = `translate(${symbol.x + oscillationX}px, ${symbol.y}px)`;
      symbol.el.style.opacity = symbol.opacity;
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Adjust positions on window resize
  window.addEventListener('resize', () => {
    floatingSymbols.forEach(symbol => {
      symbol.x = Math.min(symbol.x, container.clientWidth);
      symbol.y = Math.min(symbol.y, container.clientHeight);
    });
  });
});
