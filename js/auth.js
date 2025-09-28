document.addEventListener('DOMContentLoaded', () => {
    // --- Universal Header Update ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const navUl = document.querySelector('.main-header nav ul');

    if (loggedInUser && navUl) {
        const user = JSON.parse(loggedInUser);
        // Remove Login and Sign Up links
        const loginLink = navUl.querySelector('a[href="login.html"]');
        const signupLink = navUl.querySelector('a[href="signup.html"]');
        if (loginLink) loginLink.parentElement.remove();
        if (signupLink) signupLink.parentElement.remove();

        // Add Welcome message and Logout button
        const welcomeLi = document.createElement('li');
        welcomeLi.textContent = `Welcome, ${user.fullname}!`;
        
        const logoutLi = document.createElement('li');
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Logout';
        logoutLink.onclick = () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        };
        logoutLi.appendChild(logoutLink);

        navUl.appendChild(welcomeLi);
        navUl.appendChild(logoutLi);
    }

    // --- Sign Up Page Logic ---
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('signup-fullname').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

            if (signupMessage) signupMessage.style.display = 'block';

            if (!fullname || !email || !password || !confirmPassword) {
                if (signupMessage) {
                    signupMessage.textContent = "❌ Please fill in all fields.";
                    signupMessage.style.color = 'red';
                }
                return;
            }

            if (password !== confirmPassword) {
                if (signupMessage) {
                    signupMessage.textContent = "❌ Passwords do not match.";
                    signupMessage.style.color = 'red';
                }
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                if (signupMessage) {
                    signupMessage.textContent = "❌ An account with this email already exists.";
                    signupMessage.style.color = 'red';
                }
                return;
            }

            users.push({ fullname, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            if (signupMessage) {
                signupMessage.textContent = "✅ Sign up successful! Redirecting to login...";
                signupMessage.style.color = 'limegreen';
            }
            signupForm.reset();

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // --- Login Page Logic ---
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            if (loginMessage) loginMessage.style.display = 'block';

            if (!email || !password) {
                if (loginMessage) {
                    loginMessage.textContent = "❌ Please fill in all fields.";
                    loginMessage.style.color = 'red';
                }
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                if (loginMessage) {
                    loginMessage.textContent = "✅ Login successful! Redirecting...";
                    loginMessage.style.color = 'limegreen';
                }
                loginForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                if (loginMessage) {
                    loginMessage.textContent = "❌ Invalid email or password.";
                    loginMessage.style.color = 'red';
                }
            }
        });
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        const emailInput = document.getElementById("contact-email");
        const message = document.getElementById("form-message");

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            const regex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

            if (!regex.test(email)) {
                message.textContent = "❌ Please enter a valid email address.";
                message.style.color = "red";
            } else {
                message.textContent = "✅ Thank you for contacting us! We will respond to you shortly.";
                message.style.color = "limegreen";
                contactForm.reset();
            }
        });
    }
});
