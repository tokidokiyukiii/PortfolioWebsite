document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.carousel-container');
  let activeCarousel = null;

  containers.forEach(container => {
    // Prevent multiple initializations
    if (container.dataset.initialized) return;
    container.dataset.initialized = 'true';
    
    const carousel = container.querySelector('.carousel');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    const dotsContainer = container.querySelector('.carousel-dots');
    
    if (!carousel || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot'); 
    
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    function goToSlide(i) {
      currentIndex = i;
      updateCarousel();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
    
    // Autoplay
    let autoplayInterval;
    
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }
    
    // Buttons
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
    
    // Touch/Swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoplay();
      }
    }
    
    // Pause on hover
    const instance = { nextSlide, prevSlide, resetAutoplay };
    
    container.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
      activeCarousel = instance;
    });
    
    container.addEventListener('mouseleave', () => {
      startAutoplay();
      if (activeCarousel === instance) activeCarousel = null;
    });
    
    // Initialize autoplay
    startAutoplay();
  });

  // Global Keyboard navigation 
  document.addEventListener('keydown', (e) => {
    if (activeCarousel) {
      if (e.key === 'ArrowLeft') {
        activeCarousel.prevSlide();
        activeCarousel.resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        activeCarousel.nextSlide();
        activeCarousel.resetAutoplay();
      }
    }
  });
});