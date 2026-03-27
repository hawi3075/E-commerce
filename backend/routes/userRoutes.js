const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc Get all users (Admin only)
router.get('/', protect, admin, async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc Delete user (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;