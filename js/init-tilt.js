document.addEventListener('DOMContentLoaded', () => {
  const wheel = document.getElementById('topics-wheel');
  if (wheel) {
    // Initialize vanilla-tilt on each topic item for 3D tilt and shine effect
    const topicItems = wheel.querySelectorAll('.topic-item');
    topicItems.forEach(item => {
      VanillaTilt.init(item, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
        perspective: 1000,
      });
    });
  }
});


