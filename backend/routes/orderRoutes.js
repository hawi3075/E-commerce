const express = require('express');
const router = express.Router();

// Placeholder for Order Management (SRS 3.9)
router.get('/', (req, res) => {
    res.json({ message: "Order route is active" });
});

module.exports = router; // This MUST be here