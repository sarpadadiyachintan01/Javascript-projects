
let currentIndex = 0;

function moveSlide(direction) {
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  
  currentIndex += direction;


  if (currentIndex < 0) {
    currentIndex = totalSlides - 1; // Go to last slide
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0; // Go back to first slide
  }

  
  const offset = -currentIndex * 100;
  
  
  slider.style.transform = `translateX(${offset}%)`;
}