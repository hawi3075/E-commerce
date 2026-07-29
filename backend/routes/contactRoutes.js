// backend/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// @desc    Submit new message (Contact Form)
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error saving message' });
  }
});

module.exports = router;