const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 

dotenv.config();
connectDB();

// Initialize app first so it is available for middleware
const app = express();

// Allowed origins for CORS (supports local development and Vercel deployments)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://e-commerce-msuo.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Helper to safely inspect and mount routes
const safeMount = (routePath, routeModule, fileName) => {
  if (typeof routeModule === 'function' || (routeModule && typeof routeModule.use === 'function')) {
    app.use(routePath, routeModule);
    console.log(`✅ Loaded route [${routePath}] from ${fileName}`);
  } else {
    console.error(`❌ ERROR in ${fileName}: Export is ${typeof routeModule}. Did you forget 'module.exports = router'?`);
  }
};

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Safely mount each route
safeMount('/api/auth', authRoutes, './routes/authRoutes.js');
safeMount('/api/users', userRoutes, './routes/userRoutes.js');
safeMount('/api/products', productRoutes, './routes/productRoutes.js');
safeMount('/api/orders', orderRoutes, './routes/orderRoutes.js');
safeMount('/api/payments', paymentRoutes, './routes/paymentRoutes.js');
safeMount('/api/contact', contactRoutes, './routes/contactRoutes.js');
safeMount('/api/admin', adminRoutes, './routes/adminRoutes.js');

// Health Check
app.get('/', (req, res) => {
    res.send('Luu Safety API is running with MongoDB...');
});

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(`NOT FOUND - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message ? err.message : 'SERVER ERROR',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});