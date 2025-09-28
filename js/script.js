document.addEventListener('DOMContentLoaded', () => {
  // --- RESPONSIVE NAVIGATION (HAMBURGER MENU) ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-header nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }


  // --- CAROUSEL LOGIC ---
  let slideIndex = 1;
  const slides = document.getElementsByClassName("carousel-slide");

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }

  // Initial setup for carousel if it exists
  if (slides.length > 0) {
    showSlides(slideIndex);
    // Set up arrows
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    if(prev) prev.addEventListener('click', () => plusSlides(-1));
    if(next) next.addEventListener('click', () => plusSlides(1));

    // Auto-slide every 5 seconds
    setInterval(() => plusSlides(1), 5000);
  }

  // --- PRODUCT PAGE FILTER LOGIC ---
  const genderSelect = document.getElementById('gender');
  const categorySelect = document.getElementById('category');
  const brandSelect = document.getElementById('brand');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts() {
    const gender = genderSelect.value.toLowerCase();
    const category = categorySelect.value.toLowerCase();
    const brand = brandSelect.value.toLowerCase();

    productCards.forEach(p => {
      const pGender = (p.dataset.gender || '').toLowerCase();
      const pCategory = (p.dataset.category || '').toLowerCase();
      const pBrand = (p.dataset.brand || '').toLowerCase();

      const show =
        (gender === 'all' || pGender === gender || (gender !== 'men' && gender !== 'women' && pGender === 'all')) &&
        (category === 'all' || pCategory === category) &&
        (brand === 'all' || pBrand === brand);

      p.style.display = show ? 'block' : 'none';
    });
  }

  if (genderSelect && categorySelect && brandSelect) {
    const params = new URLSearchParams(window.location.search);
    if (params.get('gender')) genderSelect.value = params.get('gender').toLowerCase();
    if (params.get('category')) categorySelect.value = params.get('category').toLowerCase();
    if (params.get('brand')) brandSelect.value = params.get('brand').toLowerCase();

    genderSelect.addEventListener('change', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
    brandSelect.addEventListener('change', filterProducts);

    filterProducts(); // Initial filter
  }

  // --- SOCCER PAGE FILTER LOGIC ---
  const soccerCategorySelect = document.getElementById('soccer-category');
  const soccerCards = document.querySelectorAll('.soccer-card');

  function filterSoccerItems() {
    const category = soccerCategorySelect.value.toLowerCase();
    soccerCards.forEach(product => {
      const productCategory = (product.getAttribute("data-category") || '').toLowerCase();
      if (category === "all" || productCategory === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  if (soccerCategorySelect) {
    const params = new URLSearchParams(window.location.search);
    const soccerCategoryParam = params.get('soccer-category');
    if (soccerCategoryParam) soccerCategorySelect.value = soccerCategoryParam.toLowerCase();
    
    soccerCategorySelect.addEventListener('change', filterSoccerItems);
    filterSoccerItems(); // Initial filter
  }

  // --- ENQUIRY FORM LOGIC ---
  const form = document.getElementById("Enquiry form");
  if (form) {
    const emailInput = document.getElementById("enquiry-email");
    const message = document.getElementById("form-message");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      const regex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

      if (!regex.test(email)) {
        message.textContent = "❌ Please enter a valid email address.";
        message.style.color = "red";
      } else {
        message.textContent = "✅ Thank you for your enquiry! We will respond to you shortly.";
        message.style.color = "limegreen";
        form.reset();
      }
    });
  }
});