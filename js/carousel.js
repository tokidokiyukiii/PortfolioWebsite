document.addEventListener('DOMContentLoaded', () => {
  // 1. Grab ALL carousel containers on the page
  const containers = document.querySelectorAll('.carousel-container');
  
  // We'll use this to track which carousel the user is hovering over (for keyboard nav)
  let activeCarousel = null;

  // 2. Loop through each container and initialize it independently
  containers.forEach(container => {
    
    // 3. Scope all queries to the CURRENT container only!
    const carousel = container.querySelector('.carousel');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    const dotsContainer = container.querySelector('.carousel-dots');
    
    if (!carousel || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots (scoped to this specific container)
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    
    // Grab the dots we just created, scoped to this container
    const dots = dotsContainer.querySelectorAll('.carousel-dot'); 
    
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots (scoped)
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
    
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
    
    // Touch/Swipe support
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
          nextSlide(); // Swipe left
        } else {
          prevSlide(); // Swipe right
        }
        resetAutoplay();
      }
    }
    
    // Autoplay
    let autoplayInterval;
    
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Pause on hover (scoped to this specific container)
    container.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
      activeCarousel = instance; // Mark this carousel as "active" for keyboard navigation
    });
    
    container.addEventListener('mouseleave', () => {
      startAutoplay();
      if (activeCarousel === instance) activeCarousel = null;
    });
    
    // Store this specific instance's functions so the global keyboard listener can use them
    const instance = { nextSlide, prevSlide, resetAutoplay };
    
    // Initialize autoplay for this specific carousel
    startAutoplay();
  });

  // Global Keyboard navigation 
  // (Updated: This now ONLY controls the carousel you are currently hovering your mouse over!)
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