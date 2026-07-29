// backend/controllers/messageController.js
const Message = require('../models/messageModel');

// @desc    Get all contact messages
// @route   GET /api/admin/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error fetching messages' });
  }
};

// @desc    Get unread notifications for admin top navbar
// @route   GET /api/admin/messages/notifications
// @access  Private/Admin
const getNotifications = async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({ status: 'NEW' });
    const notifications = await Message.find({ status: 'NEW' })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ unreadCount, notifications });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching notifications' });
  }
};

// @desc    Mark message as read
// @route   PUT /api/admin/messages/:id/read
// @access  Private/Admin
const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.status = 'READ';
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating status' });
  }
};

// @desc    Delete message
// @route   DELETE /api/admin/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed successfully' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting message' });
  }
};

module.exports = {
  getMessages,
  getNotifications,
  markMessageAsRead,
  deleteMessage,
};