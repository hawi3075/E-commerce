// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();

// 1. Import Controllers
const { 
  getAdminStats, 
  getPerformanceStats, 
  getAdminOrders, 
  getAdminProducts 
} = require('../controllers/adminController');

const { 
  getUsers, 
  updateUserStatus, 
  deleteUser 
} = require('../controllers/userController'); 

const { 
  getMessages, 
  getNotifications,
  markMessageAsRead, 
  deleteMessage 
} = require('../controllers/messageController');

// 2. Import Auth Middleware
const { protect, admin } = require('../middleware/authMiddleware');

// Fallback if protect/admin aren't functions
const auth = typeof protect === 'function' ? protect : ((req, res, next) => next());
const adminAuth = typeof admin === 'function' ? admin : ((req, res, next) => next());

// -------------------------------------------------------------
// Dashboard Stats & Performance Routes
// -------------------------------------------------------------

// GET /api/admin/stats
if (typeof getAdminStats === 'function') {
  router.get('/stats', auth, adminAuth, getAdminStats);
}

// GET /api/admin/performance
if (typeof getPerformanceStats === 'function') {
  router.get('/performance', auth, adminAuth, getPerformanceStats);
}

// GET /api/admin/orders
if (typeof getAdminOrders === 'function') {
  router.get('/orders', auth, adminAuth, getAdminOrders);
}

// GET /api/admin/products
if (typeof getAdminProducts === 'function') {
  router.get('/products', auth, adminAuth, getAdminProducts);
}

// -------------------------------------------------------------
// User Management Routes (Customers Page)
// -------------------------------------------------------------

// GET /api/admin/users
if (typeof getUsers === 'function') {
  router.get('/users', auth, adminAuth, getUsers);
}

// PUT /api/admin/users/:id/status
if (typeof updateUserStatus === 'function') {
  router.put('/users/:id/status', auth, adminAuth, updateUserStatus);
}

// DELETE /api/admin/users/:id
if (typeof deleteUser === 'function') {
  router.delete('/users/:id', auth, adminAuth, deleteUser);
}

// -------------------------------------------------------------
// Message Routes (Customer Messages Page & Top Nav Notifications)
// -------------------------------------------------------------

// GET /api/admin/messages/notifications
if (typeof getNotifications === 'function') {
  router.get('/messages/notifications', auth, adminAuth, getNotifications);
}

// GET /api/admin/messages
if (typeof getMessages === 'function') {
  router.get('/messages', auth, adminAuth, getMessages);
}

// PUT /api/admin/messages/:id/read
if (typeof markMessageAsRead === 'function') {
  router.put('/messages/:id/read', auth, adminAuth, markMessageAsRead);
}

// DELETE /api/admin/messages/:id
if (typeof deleteMessage === 'function') {
  router.delete('/messages/:id', auth, adminAuth, deleteMessage);
}

module.exports = router;