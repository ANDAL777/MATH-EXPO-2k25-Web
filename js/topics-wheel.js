document.addEventListener('DOMContentLoaded', () => {
  const topics = [
    { name: 'Calculus', info: 'Study of change and motion.' },
    { name: 'Algebra', info: 'Study of symbols and rules for manipulating them.' },
    { name: 'Probability and Statistics', info: 'Study of data and chance.' },
    { name: 'Number Theory', info: 'Study of integers and their properties.' },
    { name: 'Discrete Mathematics', info: 'Study of discrete structures.' },
    { name: 'Operations Research', info: 'Optimization and decision-making.' },
    { name: 'Random Process', info: 'Study of stochastic processes.' }
  ];

  const container = document.getElementById('floating-bubbles-container');
  const modal = document.getElementById('topic-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTopicName = document.getElementById('modal-topic-name');
  const modalTopicInfo = document.getElementById('modal-topic-info');

  // Clear existing bubbles if any
  container.innerHTML = '';

  // Updated colors for more attractive palette
  const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2', '#FF9671', '#00C9A7'];
  const sizes = [80, 100, 90, 110, 85, 95, 105]; // px diameters

  // Helper function to check overlap between two bubbles
  function isOverlapping(x1, y1, r1, x2, y2, r2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2 + 15; // 15px extra spacing between bubbles
  }

  // Store positions of placed bubbles
  const placedBubbles = [];

  // Create floating bubbles with spacing
  topics.forEach((topic, index) => {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    bubble.textContent = topic.name;
    bubble.style.backgroundColor = colors[index % colors.length];
    bubble.style.width = `${sizes[index % sizes.length]}px`;
    bubble.style.height = `${sizes[index % sizes.length]}px`;

    const radius = sizes[index % sizes.length] / 2;
    const padding = 20;
    const maxX = container.clientWidth - sizes[index % sizes.length] - padding;
    const maxY = container.clientHeight - sizes[index % sizes.length] - padding;

    let posX, posY;
    let attempts = 0;
    do {
      posX = Math.random() * maxX + padding / 2;
      posY = Math.random() * maxY + padding / 2;
      attempts++;
      // Check overlap with all placed bubbles
    } while (
      placedBubbles.some(b => isOverlapping(posX + radius, posY + radius, radius, b.x, b.y, b.r)) &&
      attempts < 100
    );

    placedBubbles.push({ x: posX + radius, y: posY + radius, r: radius });

    bubble.style.left = `${posX}px`;
    bubble.style.top = `${posY}px`;

    // Random animation duration and delay for floating effect
    const duration = 4 + Math.random() * 3; // 4 to 7 seconds
    const delay = Math.random() * 3; // 0 to 3 seconds
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    // Click event to show modal with topic details
    bubble.addEventListener('click', () => {
      modalTopicName.textContent = topic.name;
      modalTopicInfo.textContent = topic.info;
      modal.style.display = 'flex';
    });

    container.appendChild(bubble);
  });

  // Close modal on close button click
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal on clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
