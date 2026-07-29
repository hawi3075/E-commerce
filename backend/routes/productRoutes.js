const express = require('express');
const router = express.Router();

// 1. Destructure middleware components
const { protect, isAdmin } = require('../middleware/authMiddleware');

// 2. Import product controller methods
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require('../controllers/productController');

// Root Route: GET all products (with filters) & POST create new product
router
  .route('/')
  .get(getProducts)
  .post(protect, isAdmin, createProduct);

// Specific ID Routes: GET single product, PUT update product, DELETE product
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

// Product Review Route
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;