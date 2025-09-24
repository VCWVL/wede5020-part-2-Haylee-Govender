document.addEventListener('DOMContentLoaded', () => {
    // --- Universal Header Update ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const nav = document.querySelector('.main-header nav ul');

    if (loggedInUser && nav) {
        const user = JSON.parse(loggedInUser);
        // Remove Login and Sign Up links
        const loginLink = nav.querySelector('a[href="login.html"]');
        const signupLink = nav.querySelector('a[href="signup.html"]');
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

        nav.appendChild(welcomeLi);
        nav.appendChild(logoutLi);
    }

    // --- Sign Up Page Logic ---
    const signupForm = document.querySelector('.form-container form');
    if (document.title.includes('Sign Up')) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // In a real app, you'd send this to a server. Here, we use localStorage.
            // WARNING: Storing passwords in localStorage is NOT secure. This is for demonstration only.
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                alert("An account with this email already exists.");
                return;
            }

            users.push({ fullname, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            alert("Sign up successful! Please log in.");
            window.location.href = 'login.html';
        });
    }

    // --- Login Page Logic ---
    if (document.title.includes('Login')) {
        const loginForm = document.querySelector('.form-container form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});