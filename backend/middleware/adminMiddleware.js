const isAdmin = (req, res, next) => {
  // Checks if user exists and if isAdmin is true
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied (Admin only)" });
  }
  next();
};

module.exports = isAdmin;