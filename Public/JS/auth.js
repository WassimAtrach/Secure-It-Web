// Auth.js - Handles login/register form toggling
document.addEventListener('DOMContentLoaded', function () {
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Check if we're on the auth page
    if (!loginCard || !registerCard) return;

    // Toggle to register form
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginCard.style.display = 'none';
            registerCard.style.display = 'block';
        });
    }

    // Toggle back to login form
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerCard.style.display = 'none';
            loginCard.style.display = 'block';
        });
    }
});
