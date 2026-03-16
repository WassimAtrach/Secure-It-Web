// Routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth');

// Make sure these names match the exports in your Controllers/auth.js
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
 
 // Logout route
 router.get('/logout', authController.getLogout);

module.exports = router;