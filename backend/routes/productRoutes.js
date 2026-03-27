const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/productModel');

// Guest & Registered User: View Products (SRS 3.4)
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Admin: Add Product (SRS 3.3)
router.post('/', protect, admin, async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;