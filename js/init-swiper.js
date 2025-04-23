document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.timeline-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
});
