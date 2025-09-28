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

// filter.js


document.addEventListener('DOMContentLoaded', () => {
  const genderSelect = document.getElementById('gender');
  const categorySelect = document.getElementById('category');
  const brandSelect = document.getElementById('brand');
  const products = document.querySelectorAll('.product-card');

  // Normalize product data attributes
  products.forEach(p => {
    if(p.dataset.gender) p.dataset.gender = p.dataset.gender.toLowerCase();
    if(p.dataset.category) p.dataset.category = p.dataset.category.toLowerCase();
    if(p.dataset.brand) p.dataset.brand = p.dataset.brand.toLowerCase();
  });

// Filter function
function filterProducts() {
  const gender = genderSelect.value.trim().toLowerCase();
  const category = categorySelect.value.trim().toLowerCase();
  const brand = brandSelect.value.trim().toLowerCase();

  products.forEach(p => {
    const pGender = (p.dataset.gender || '').trim().toLowerCase();
    const pCategory = (p.dataset.category || '').trim().toLowerCase();
    const pBrand = (p.dataset.brand || '').trim().toLowerCase();

    const show =
      (gender === 'all' || pGender === gender) &&
      (category === 'all' || pCategory === category) &&
      (brand === 'all' || pBrand === brand);

    p.style.display = show ? 'block' : 'none';
  });
}


  // Add event listeners
  genderSelect.addEventListener('change', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  brandSelect.addEventListener('change', filterProducts);

  // Check URL params for pre-setting filters
  const params = new URLSearchParams(window.location.search);
  if(params.get('gender')) genderSelect.value = params.get('gender').toLowerCase();
  if(params.get('category')) categorySelect.value = params.get('category').toLowerCase();
  if(params.get('brand')) brandSelect.value = params.get('brand').toLowerCase();

  // Initial filter
  filterProducts();
});
