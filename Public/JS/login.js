document.addEventListener('DOMContentLoaded', function () {
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Toggle between login and register forms
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginCard.style.display = 'none';
            registerCard.style.display = 'block';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerCard.style.display = 'none';
            loginCard.style.display = 'block';
        });
    }
});

    // Registration Logic
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;

        if (!email || !password) {
            alert('Please enter email and password.');
            return;
        }

        const users = getUsers();
        if (users[email]) {
            alert('Email already registered.');
            return;
        }

        users[email] = { password, fullName };
        saveUsers(users);

        alert('Registration successful! You can now login.');
        registerCard.style.display = 'none';
        loginCard.style.display = 'flex';
    });

    // Login Logic
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        const users = getUsers();
        if (!users[email] || users[email].password !== password) {
            alert('Invalid email or password.');
            return;
        }

        const userDatabase = localStorage.getItem('users'); 
        localStorage.clear(); 
        localStorage.setItem('users', userDatabase); 
        
        // Save current session
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', users[email].fullName || 'User');
        // ---------------------------------------------------------

        alert('Login successful!');
        window.location.href = 'profile.html';
    });