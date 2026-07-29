// backend/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'NEW' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);