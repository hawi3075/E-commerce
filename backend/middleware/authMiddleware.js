const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const secret =
        process.env.JWT_SECRET ||
        process.env.NEXTAUTH_SECRET ||
        'luu_safety_secret_key_999';

      const decoded = jwt.verify(token, secret);

      // 🔴 IMPORTANT: Fetch full user document without password, ensuring isAdmin is returned
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found in database' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const isAdmin = (req, res, next) => {
  // Add console.log here to debug what req.user actually contains!
  console.log('User attached to request:', req.user);

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied (Admin only)' });
  }
};

module.exports = { protect, isAdmin };