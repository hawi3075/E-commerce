const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, // Fixed: Changed authUser to loginUser
  getUsers, 
  deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser); // Fixed: using loginUser here

// Admin routes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;