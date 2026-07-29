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

      // Fetch user without password
      req.user = await User.findById(decoded.id || decoded._id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found in database' });
      }

      return next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  console.log('User attached to request:', req.user);

  if (req.user && (req.user.isAdmin || req.user.role === 'admin')) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied (Admin only)' });
  }
};

// Export aliases so both { protect, admin } and { protect, isAdmin } work
module.exports = { 
  protect, 
  admin, 
  isAdmin: admin 
};