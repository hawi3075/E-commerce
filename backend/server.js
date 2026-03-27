const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Initialize Env
dotenv.config();

// 2. Connect Database
connectDB();

const app = express();

// 3. Middleware
app.use(express.json());
app.use(cors());

// 4. Routes
// Ensure these paths match your folders exactly
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// 5. Basic Test Route
app.get('/', (req, res) => {
    res.send('Safety Equipment API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));