const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, addOrderItems);
router.get('/:id', protect, getOrderById);

// Admin routes
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;