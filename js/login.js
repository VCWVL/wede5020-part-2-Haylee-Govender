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
