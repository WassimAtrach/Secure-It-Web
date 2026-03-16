const User = require('../Models/User');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
    res.render('Auth/register', { pageTitle: 'Sign Up', errorMessage: null });
};

exports.postRegister = async (req, res) => {
    const { email, password, confirmPassword, name, phone_number, username, gender, country, zipcode } = req.body;

    // 1. Basic Validation
    if (password !== confirmPassword) {
        return res.render('Auth/register', { 
            pageTitle: 'Sign Up', 
            errorMessage: 'Passwords do not match!' 
        });
    }

    try {
        // 2. Hash password and save new user (including zipcode)
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User(null, email, hashedPassword, name, phone_number, username, gender, country, zipcode);
        
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).render('Auth/register', { 
            pageTitle: 'Sign Up', 
            errorMessage: 'Registration failed. Username or Email might already exist.' 
        });
    }
};

exports.getLogin = (req, res) => {
    res.render('Auth/login', { pageTitle: 'Login', errorMessage: null });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // 3. Find user in Database
        const rows = await User.findByUsername(username);
        
        // Handle case where findByUsername might return the array directly or nested
        const user = Array.isArray(rows[0]) ? rows[0][0] : rows[0];

        if (!user) {
            return res.render('Auth/login', { 
                pageTitle: 'Login', 
                errorMessage: 'Invalid username or password.' 
            });
        }
        
        // 4. Compare Passwords
        const doMatch = await bcrypt.compare(password, user.password);
        
        if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user; 
            req.session.userId = user.id;
            
            // 5. Save session before redirecting to prevent race conditions
            return req.session.save(err => {
                if (err) console.log("Session Save Error:", err);
                res.redirect('/home'); // Changed to /home based on your routes/platforms.js
            });
        } else {
            return res.render('Auth/login', { 
                pageTitle: 'Login', 
                errorMessage: 'Invalid username or password.' 
            });
        }
    } catch (err) {
        console.error("Login Error:", err);
        // CRITICAL: This prevents the "taking ages" / hanging issue
        res.status(500).render('Auth/login', { 
            pageTitle: 'Login', 
            errorMessage: 'An internal error occurred. Please try again.' 
        });
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout Error:', err);
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
};