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

function filterSoccerItems() {
  const category = document.getElementById("soccer-category").value.toLowerCase();
  const products = document.querySelectorAll(".soccer-card");

  products.forEach(product => {
    const productCategory = product.getAttribute("data-category").toLowerCase();

    if (category === "all" || productCategory === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// Run when page loads
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = (urlParams.get('category') || 'all').toLowerCase();
  const brandParam = (urlParams.get('brand') || 'all').toLowerCase();

  // Set dropdowns
  const categorySelect = document.getElementById('category');
  const brandSelect = document.getElementById('brand');
  if (categorySelect) categorySelect.value = categoryParam;
  if (brandSelect) brandSelect.value = brandParam;

  // Apply filter
  filterItems();
});

// Filter function
function filterItems() {
  const category = document.getElementById('category').value.toLowerCase();
  const brand = document.getElementById('brand').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const productCategory = product.getAttribute('data-category').toLowerCase();
    const productBrand = product.getAttribute('data-brand').toLowerCase();

    if ((category === 'all' || productCategory === category) &&
        (brand === 'all' || productBrand === brand)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
// Run when page loads
window.addEventListener('DOMContentLoaded', () => {
  // Read the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const soccerCategoryParam = (urlParams.get('soccer-category') || 'all').toLowerCase();

  // Set the dropdown to this value
  const soccerSelect = document.getElementById('soccer-category');
  if (soccerSelect) soccerSelect.value = soccerCategoryParam;

  // Apply the filter automatically
  filterSoccerItems();
});

// Soccer filter function
function filterSoccerItems() {
  const category = document.getElementById('soccer-category').value.toLowerCase();
  const products = document.querySelectorAll('.soccer-card');

  products.forEach(product => {
    const productCategory = product.getAttribute('data-category').toLowerCase();

    if (category === 'all' || productCategory === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}


  const form = document.getElementById("Enquiry form");
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


  document.addEventListener('DOMContentLoaded', () => {

  // ------------------ SIGN UP ------------------
  const signupForm = document.getElementById('signup-form');
  const signupMessage = document.getElementById('signup-message');

  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();

      const fullname = document.getElementById('signup-fullname').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();
      const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

      signupMessage.style.display = 'block';

      if (!fullname || !email || !password || !confirmPassword) {
        signupMessage.textContent = "❌ Please fill in all fields.";
        signupMessage.style.color = 'red';
        return;
      }

      if (password !== confirmPassword) {
        signupMessage.textContent = "❌ Passwords do not match.";
        signupMessage.style.color = 'red';
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        signupMessage.textContent = "❌ An account with this email already exists.";
        signupMessage.style.color = 'red';
        return;
      }

      users.push({ fullname, email, password });
      localStorage.setItem('users', JSON.stringify(users));

      signupMessage.textContent = "✅ Sign up successful! Redirecting to login...";
      signupMessage.style.color = 'limegreen';
      signupForm.reset();

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    });
  }

  // ------------------ LOGIN ------------------
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      loginMessage.style.display = 'block';

      if (!email || !password) {
        loginMessage.textContent = "❌ Please fill in all fields.";
        loginMessage.style.color = 'red';
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        loginMessage.textContent = "❌ Invalid email or password.";
        loginMessage.style.color = 'red';
        return;
      }

      sessionStorage.setItem('loggedInUser', JSON.stringify(user));

      loginMessage.textContent = "✅ Login successful! Redirecting...";
      loginMessage.style.color = 'limegreen';
      loginForm.reset();

      setTimeout(() => {
        window.location.href = 'index.html'; // Change to your dashboard/home page
      }, 1500);
    });
  }

  // ------------------ HEADER LOGGED-IN UPDATE ------------------
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const nav = document.querySelector('.main-header nav ul');

  if (loggedInUser && nav) {
    const user = JSON.parse(loggedInUser);

    // Remove Login & Sign Up links
    const loginLink = nav.querySelector('a[href="login.html"]');
    const signupLink = nav.querySelector('a[href="signup.html"]');
    if (loginLink) loginLink.parentElement.remove();
    if (signupLink) signupLink.parentElement.remove();

    // Add Welcome message
    const welcomeLi = document.createElement('li');
    welcomeLi.textContent = `Welcome, ${user.fullname}!`;

    // Add Logout button
    const logoutLi = document.createElement('li');
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
    logoutLink.onclick = () => {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    };
    logoutLi.appendChild(logoutLink);

    nav.appendChild(welcomeLi);
    nav.appendChild(logoutLi);
  }

});
