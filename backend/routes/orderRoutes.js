// Example functions in orderController.js
const addOrderItems = async (req, res) => { /* ... */ };
const getOrderById = async (req, res) => { /* ... */ };
const updateOrderToPaid = async (req, res) => { /* ... */ };
const updateOrderToDelivered = async (req, res) => { /* ... */ };
const getMyOrders = async (req, res) => { /* ... */ };
const getOrders = async (req, res) => { /* ... */ };

// 🔴 MAKE SURE ALL 6 ARE EXPORTED HERE:
module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};