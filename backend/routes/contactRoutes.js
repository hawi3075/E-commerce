// routes/contactRoutes.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  console.log('📥 New Contact Inquiry:', { name, email, subject, message });

  // Return success response
  res.status(200).json({
    success: true,
    message: 'Transmission complete. Message logged successfully.',
  });
});

module.exports = router;