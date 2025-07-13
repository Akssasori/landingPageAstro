// Seleciona os botões do carrossel
const prevButton = document.getElementById('carouselPrev');
const nextButton = document.getElementById('carouselNext');

// Adiciona os "escutadores de evento"
if (prevButton) {
  prevButton.addEventListener('click', () => moveCarousel(-1));
}
if (nextButton) {
  nextButton.addEventListener('click', () => moveCarousel(1));
}

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');

// Create dots
if (dotsContainer) {
  for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
    if (!track) return; // Garante que o script não quebre se o elemento não existir
    // Ensure precise positioning with exact pixel calculation
    const slideWidth = track.clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Update active dot indicator
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Initialize carousel
if (totalSlides > 0) {
  updateCarousel();
}

// Auto-play carousel
setInterval(() => {
    moveCarousel(1);
}, 6000);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
          header.style.background = 'rgba(255, 255, 255, 0.8)';
          header.style.boxShadow = 'none';
      }
    }
});

// Ensure carousel updates on window resize
window.addEventListener('resize', () => {
    if (totalSlides > 0) {
      updateCarousel();
    }
});