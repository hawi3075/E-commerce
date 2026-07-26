const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Uses .env if available, otherwise falls back to a hardcoded secret
  const secret =
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'luu_safety_secret_key_999';

  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;