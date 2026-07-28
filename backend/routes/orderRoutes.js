const express = require('express');
const router = express.Router();

// Import your order controllers
// (Adjust controller names/paths if yours are slightly different)
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} = require('../controllers/orderController');

// Import authentication middleware if you use them
const { protect, admin } = require('../middleware/authMiddleware');

// Define Order Routes
if (typeof addOrderItems === 'function') {
  router.post('/', protect || ((req, res, next) => next()), addOrderItems);
}

if (typeof getMyOrders === 'function') {
  router.get('/myorders', protect || ((req, res, next) => next()), getMyOrders);
}

if (typeof getOrderById === 'function') {
  router.get('/:id', protect || ((req, res, next) => next()), getOrderById);
}

if (typeof updateOrderToPaid === 'function') {
  router.put('/:id/pay', protect || ((req, res, next) => next()), updateOrderToPaid);
}

if (typeof getOrders === 'function') {
  router.get('/', protect || ((req, res, next) => next()), admin || ((req, res, next) => next()), getOrders);
}

// ⚠️ CRITICAL: MUST BE module.exports = router
module.exports = router;