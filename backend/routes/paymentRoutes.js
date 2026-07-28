// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();

// 1. Import the payment controller function
const paymentController = require('../controllers/paymentController');

// Check if controller exists, fallback safely to prevent crash
const handleTelebirr = paymentController.initializeTelebirrPayment 
  || paymentController.initializePayment 
  || ((req, res) => res.status(500).json({ message: "Payment controller function not found" }));

// 2. Define payment route
router.post('/telebirr', handleTelebirr);

// 3. CRITICAL: Export router directly
module.exports = router;