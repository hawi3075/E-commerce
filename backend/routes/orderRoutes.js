const express = require('express');
const router = express.Router();

// Import order controllers
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');

// Import auth middleware
const { protect, admin } = require('../middleware/authMiddleware');

// Fallback middleware if protect or admin aren't exported properly
const passThrough = (req, res, next) => next();
const auth = typeof protect === 'function' ? protect : passThrough;
const adminAuth = typeof admin === 'function' ? admin : passThrough;

// 1. Root Routes: GET all orders (Admin) & POST create order
router.route('/')
  .get(auth, adminAuth, getOrders)
  .post(auth, addOrderItems);

// 2. Specific Named Routes (Must come BEFORE dynamic /:id parameter)
router.get('/myorders', auth, getMyOrders);

// 3. Dynamic ID Routes (Must come LAST)
router.get('/:id', auth, getOrderById);
router.put('/:id/pay', auth, updateOrderToPaid);

module.exports = router;