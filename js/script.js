document.addEventListener('DOMContentLoaded', () => {
  // --- RESPONSIVE NAVIGATION (HAMBURGER MENU) ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-header nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      // Toggle the 'active' class to show/hide the mobile navigation
      nav.classList.toggle('active');
    });
  }


  // --- CAROUSEL LOGIC ---
  let slideIndex = 1;
  const slides = document.getElementsByClassName("carousel-slide");

  // Function to move to the next or previous slide
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Function to display a specific slide
  function showSlides(n) {
    if (slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }

  // Initialize the carousel if it exists on the page
  if (slides.length > 0) {
    showSlides(slideIndex);
    // Add event listeners for the previous and next arrow buttons
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    if(prev) prev.addEventListener('click', () => plusSlides(-1));
    if(next) next.addEventListener('click', () => plusSlides(1));

    // Auto-slide every 5 seconds
    setInterval(() => plusSlides(1), 5000);
  }

  // --- PRODUCT PAGE FILTERING LOGIC ---
  const genderSelect = document.getElementById('gender');
  const categorySelect = document.getElementById('category');
  const brandSelect = document.getElementById('brand');
  const productCards = document.querySelectorAll('.product-card');

  // This function filters products based on the selected dropdown values
  function filterProducts() {
    const gender = genderSelect.value.toLowerCase();
    const category = categorySelect.value.toLowerCase();
    const brand = brandSelect.value.toLowerCase();

    productCards.forEach(p => {
      // Get the data attributes from each product card
      const pGender = (p.dataset.gender || '').toLowerCase();
      const pCategory = (p.dataset.category || '').toLowerCase();
      const pBrand = (p.dataset.brand || '').toLowerCase();

      // Determine if the card should be shown based on filter criteria
      const show =
        (gender === 'all' || pGender === gender || (gender !== 'men' && gender !== 'women' && pGender === 'all')) &&
        (category === 'all' || pCategory === category) &&
        (brand === 'all' || pBrand === brand);

      // Show or hide the card
      p.style.display = show ? 'block' : 'none';
    });
  }

  // If the filter dropdowns exist, set up the filtering functionality
  if (genderSelect && categorySelect && brandSelect) {
    // Check for filter parameters in the URL (e.g., from homepage links)
    const params = new URLSearchParams(window.location.search);
    if (params.get('gender')) genderSelect.value = params.get('gender').toLowerCase();
    if (params.get('category')) categorySelect.value = params.get('category').toLowerCase();
    if (params.get('brand')) brandSelect.value = params.get('brand').toLowerCase();

    // Add event listeners to the dropdowns to trigger filtering on change
    genderSelect.addEventListener('change', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
    brandSelect.addEventListener('change', filterProducts);

    // Run the filter function once on page load
    filterProducts();
  }

  // --- SOCCER PAGE FILTERING LOGIC ---
  const soccerCategorySelect = document.getElementById('soccer-category');
  const soccerCards = document.querySelectorAll('.soccer-card');

  // This function filters soccer items based on the selected category
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

  // If the soccer filter dropdown exists, set it up
  if (soccerCategorySelect) {
    // Check for a category parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const soccerCategoryParam = params.get('soccer-category');
    if (soccerCategoryParam) soccerCategorySelect.value = soccerCategoryParam.toLowerCase();
    
    // Add event listener and run the filter on page load
    soccerCategorySelect.addEventListener('change', filterSoccerItems);
    filterSoccerItems();
  }

  // --- ENQUIRY FORM SUBMISSION LOGIC ---
  const form = document.getElementById("Enquiry form");
  if (form) {
    const emailInput = document.getElementById("enquiry-email");
    const message = document.getElementById("form-message");

    form.addEventListener("submit", function (e) {
      // Prevent the default form submission which reloads the page
      e.preventDefault();
      const email = emailInput.value.trim();
      const regex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

      // Simple email validation
      if (!regex.test(email)) {
        message.textContent = " Please enter a valid email address.";
        message.style.color = "red";
      } else {
        message.textContent = " Thank you for your enquiry! We will respond to you shortly.";
        message.style.color = "limegreen";
        form.reset();
      }
    });
  }
});