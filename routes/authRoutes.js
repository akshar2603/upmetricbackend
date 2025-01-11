const express = require('express');
const { signup, login, logout , forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);

module.exports = router;

// http://localhost:5000/api/auth/signup