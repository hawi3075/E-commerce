import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get dashboard summary statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    // 1. Total Revenue from paid/completed orders
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // 2. Active Orders (Orders that are not yet delivered)
    const activeOrdersCount = await Order.countDocuments({ isDelivered: false });

    // 3. Total Customers registered
    const totalCustomersCount = await User.countDocuments({ isAdmin: false });

    // 4. Total Product inventory count
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