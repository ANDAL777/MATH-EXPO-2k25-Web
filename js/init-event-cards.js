document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      const expanded = item.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        item.setAttribute('aria-expanded', 'false');
        item.querySelector('.event-details').hidden = true;
      } else {
        item.setAttribute('aria-expanded', 'true');
        item.querySelector('.event-details').hidden = false;
      }
    });

    item.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
});
