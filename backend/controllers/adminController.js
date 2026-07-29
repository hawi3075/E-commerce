const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// @desc    Get dashboard metrics (revenue, order counts, customer counts, inventory counts)
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    // 1. Calculate Revenue
    let totalRevenue = 0;
    try {
      const revenueResult = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]);
      totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    } catch (e) {
      console.log('Revenue aggregation fallback:', e.message);
    }

    // 2. Count Active Orders
    let activeOrdersCount = 0;
    try {
      activeOrdersCount = await Order.countDocuments({ isDelivered: false });
    } catch (e) {
      activeOrdersCount = await Order.countDocuments({});
    }

    // 3. Count Customers (excluding admins)
    let totalCustomersCount = 0;
    try {
      totalCustomersCount = await User.countDocuments({ isAdmin: { $ne: true } });
    } catch (e) {
      totalCustomersCount = await User.countDocuments({});
    }

    // 4. Count Inventory Items
    let inventoryItemsCount = 0;
    try {
      inventoryItemsCount = await Product.countDocuments({});
    } catch (e) {
      inventoryItemsCount = 0;
    }

    res.json({
      totalRevenue,
      activeOrdersCount,
      totalCustomersCount,
      inventoryItemsCount
    });
  } catch (error) {
    console.error('Error in getAdminStats:', error);
    res.status(500).json({ message: 'Error calculating stats', error: error.message });
  }
};

// @desc    Get performance analytics (category breakdown & customer mix)
// @route   GET /api/admin/performance
// @access  Private/Admin
const getPerformanceStats = async (req, res) => {
  try {
    // 1. Group paid orders by product category
    const categoryStats = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: '$orderItems' },
      {
        $lookup: {
          from: 'products',
          localField: 'orderItems.product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
      {
        $group: {
          _id: { $toUpper: '$productDetails.category' },
          totalSales: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    let categories = categoryStats.map((item) => ({
      name: item._id || 'UNCATEGORIZED',
      value: item.totalSales,
    }));

    // 2. Fallback: Aggregate directly from Product catalog if no paid order history exists yet
    if (categories.length === 0) {
      const inventoryByCategory = await Product.aggregate([
        {
          $group: {
            _id: { $toUpper: '$category' },
            count: { $sum: 1 },
          },
        },
      ]);

      categories = inventoryByCategory.map((item) => ({
        name: item._id || 'GEAR',
        value: item.count,
      }));
    }

    // 3. Fallback defaults matching Luu Safety store categories
    if (categories.length === 0) {
      categories = [
        { name: 'HEADWEAR', value: 0 },
        { name: 'WORKWEAR', value: 0 },
        { name: 'FOOTWEAR', value: 0 },
      ];
    }

    // 4. Calculate Customer Mix (Users who ordered vs non-ordering registered users)
    const totalUsers = await User.countDocuments({ isAdmin: { $ne: true } });
    const orderingUsers = await Order.distinct('user');
    const returningCount = Math.max(0, orderingUsers.length);
    const newCount = Math.max(0, totalUsers - returningCount);

    res.json({
      categories,
      customerMix: {
        returning: returningCount,
        newCustomers: newCount,
      },
    });
  } catch (error) {
    console.error('Error in getPerformanceStats:', error);
    res.status(500).json({ message: 'Error calculating performance stats', error: error.message });
  }
};

// @desc    Get recent orders for dashboard list
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAdminOrders = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(orders);
  } catch (error) {
    console.error('Error in getAdminOrders:', error);
    res.status(500).json({ message: 'Error fetching recent orders', error: error.message });
  }
};

// @desc    Get recent products for inventory stream
// @route   GET /api/admin/products
// @access  Private/Admin
const getAdminProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(products);
  } catch (error) {
    console.error('Error in getAdminProducts:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

module.exports = {
  getAdminStats,
  getPerformanceStats,
  getAdminOrders,
  getAdminProducts
};