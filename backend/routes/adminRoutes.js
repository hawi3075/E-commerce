const express = require('express');
const router = express.Router();
const { getAdminStats } = require('../controllers/adminController');
const Order = require('../models/Order');
const Product = require('../models/Product');
// const { protect, admin } = require('../middleware/authMiddleware'); // Uncomment if using auth

// GET /api/admin/stats
router.get('/stats', getAdminStats);

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;