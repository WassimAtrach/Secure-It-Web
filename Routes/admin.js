// Routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');
const isAuth = require('../Utils/is-auth');

router.get('/admin/users', isAuth, adminController.listUsers);
router.post('/admin/users/delete/:id', isAuth, adminController.deleteUser);

module.exports = router;
