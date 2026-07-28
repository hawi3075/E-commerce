// backend/controllers/adminController.js
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

const getAdminStats = async (req, res) => {
  try {
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    const activeOrdersCount = await Order.countDocuments({ isDelivered: false });
    const totalCustomersCount = await User.countDocuments({ isAdmin: false });
    const inventoryItemsCount = await Product.countDocuments({});

    res.json({
      totalRevenue,
      activeOrdersCount,
      totalCustomersCount,
      inventoryItemsCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error loading admin stats', error: error.message });
  }
};

module.exports = { getAdminStats };