let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Show the current slide
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  if (slides.length === 0) return; // No slides found
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

// Optional: Auto-slide every 5 seconds
setInterval(function() {
  plusSlides(1);
}, 5000);