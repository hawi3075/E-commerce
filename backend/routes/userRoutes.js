const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
} = require('../controllers/userController');

// Destructure both middleware functions cleanly
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private Admin routes
router.route('/').get(protect, isAdmin, getUsers);
router.route('/:id').delete(protect, isAdmin, deleteUser);

module.exports = router;