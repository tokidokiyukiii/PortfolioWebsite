class SkeletonLoader {
  initializeCarousels() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
      const skeleton = container.querySelector('.skeleton-carousel');
      const actualCarousel = container.querySelector('.carousel');
      
      if (!skeleton || !actualCarousel) return;

      const images = actualCarousel.querySelectorAll('img');
      const totalImages = images.length;
      let loadedImages = 0;

      if (totalImages === 0) {
        this.showCarousel(skeleton, actualCarousel);
        return;
      }

      images.forEach(img => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener('load', () => {
            loadedImages++;
            if (loadedImages === totalImages) this.showCarousel(skeleton, actualCarousel);
          });
          img.addEventListener('error', () => {
            loadedImages++;
            if (loadedImages === totalImages) this.showCarousel(skeleton, actualCarousel);
          });
        }
      });

      setTimeout(() => this.showCarousel(skeleton, actualCarousel), 4000);
    });
  }
  initializeStandaloneImages() {
    const wrappers = document.querySelectorAll('.skeleton-img-wrapper');
    
    wrappers.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (!img) return;

      const revealImage = () => {
        img.classList.add('loaded');
        wrapper.classList.add('loaded');
      };

      // Check if image is already cached/loaded
      if (img.complete && img.naturalHeight !== 0) {
        revealImage();
      } else {
        img.addEventListener('load', revealImage);
        img.addEventListener('error', revealImage); // Fallback if image breaks
      }
    });
  }
  showCarousel(skeleton, carousel) {
    if (skeleton.classList.contains('loaded')) return; 
    
    skeleton.classList.add('loaded');
    carousel.classList.remove('content-loading');
    carousel.classList.add('content-loaded');
    
    setTimeout(() => {
      skeleton.style.display = 'none';
    }, 400);

    if (typeof initCarousel === 'function' && !carousel.dataset.carouselInitialized) {
      initCarousel(carousel.closest('.carousel-container'));
      carousel.dataset.carouselInitialized = 'true';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loader = new SkeletonLoader();
  loader.initializeCarousels();
  loader.initializeStandaloneImages();
  window.skeletonLoader = loader;
});