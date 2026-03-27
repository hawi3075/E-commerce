const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// SRS 3.4: Guest & User View Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // This MUST be here