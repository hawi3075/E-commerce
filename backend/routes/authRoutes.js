const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // Ensure controller path is correct

const router = express.Router();

// Matches POST /api/auth/register
router.post('/register', registerUser);

// Matches POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;