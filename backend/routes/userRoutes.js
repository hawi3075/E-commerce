const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  authUser, 
  getUsers, 
  deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);

// Admin routes
// If any of these variables (getUsers, deleteUser) are undefined, the app crashes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;