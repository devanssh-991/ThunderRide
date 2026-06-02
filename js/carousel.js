// Hero Slideshow — manual JS interval, no CSS transitions

var currentSlide = 0;
var slideInterval = null;

function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;

  slides[0].classList.add('active');

  slideInterval = setInterval(function() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);

  // Dot navigation — individual listeners per dot
  const dots = document.querySelectorAll('.carousel-dot');
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function() {
      goToSlide(parseInt(this.getAttribute('data-index'), 10));
    });
  }

  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (prevBtn) prevBtn.addEventListener('click', function() { goToSlide(currentSlide - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { goToSlide(currentSlide + 1); });
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentSlide = index;
  slides[currentSlide].classList.add('active');

  document.querySelectorAll('.carousel-dot').forEach(function(dot, i) {
    dot.classList.toggle('active', i === currentSlide);
  });

  clearInterval(slideInterval);
  slideInterval = setInterval(function() {
    goToSlide(currentSlide + 1);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', initHeroCarousel);
