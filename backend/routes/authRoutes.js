const express = require('express');
const controllers = require('../controllers/userController');

// Debug check:
console.log('Imported controllers object:', controllers);

const { registerUser, loginUser } = controllers;

console.log('registerUser:', typeof registerUser);
console.log('loginUser:', typeof loginUser);

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;