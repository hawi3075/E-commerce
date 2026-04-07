// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 

// 1. Initialize Env
dotenv.config();

const app = express();

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Connect to Database (Direct Mongoose Connection)
connectDB();

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// 5. Basic Test Route
app.get('/', (req, res) => {
    res.send('AuraSync API is running with MongoDB Atlas via Mongoose...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Local: http://localhost:${PORT}`);
});