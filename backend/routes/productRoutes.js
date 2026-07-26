const express = require('express');
const router = express.Router();

// 1. Destructure both middlewares cleanly from authMiddleware
const { protect, isAdmin } = require('../middleware/authMiddleware');

// 2. Import product controller methods
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only routes (protected by authMiddleware)
router.post('/', protect, isAdmin, createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;