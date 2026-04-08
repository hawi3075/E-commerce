// backend/controllers/productController.js
const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  const { product_name, price, image, category, product_code, description } = req.body;

  const product = new Product({
    user: req.user._id, // Set by protect middleware
    product_name,
    price,
    image,
    category,
    product_code,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { createProduct };