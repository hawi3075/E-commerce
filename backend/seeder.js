const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
    {
        product_name: 'Ambassador Safety Shoes',
        product_code: 'SH-001',
        product_category: 'Shoes',
        price: 4500,
        description: 'High-quality steel toe leather safety shoes for industrial use.',
        image: 'https://via.placeholder.com/200x200?text=Safety+Shoes'
    },
    {
        product_name: 'Heavy Duty Safety Jacket',
        product_code: 'JK-002',
        product_category: 'Jackets',
        price: 2800,
        description: 'Reflective high-visibility waterproof safety jacket.',
        image: 'https://via.placeholder.com/200x200?text=Safety+Jacket'
    },
    {
        product_name: 'Industrial Safety Helmet',
        product_code: 'HM-003',
        product_category: 'Helmets',
        price: 1200,
        description: 'Hard hat helmet with adjustable chin strap.',
        image: 'https://via.placeholder.com/200x200?text=Helmet'
    },
    {
        product_name: 'Leather Work Gloves',
        product_code: 'GL-004',
        product_category: 'Gloves',
        price: 500,
        description: 'Heat resistant and puncture-proof leather gloves.',
        image: 'https://via.placeholder.com/200x200?text=Gloves'
    }
];

const importData = async () => {
    try {
        // Clear existing data to avoid duplicates
        await Product.deleteMany();
        
        // Insert new data
        await Product.insertMany(products);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('⚠️ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Check command line arguments
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}