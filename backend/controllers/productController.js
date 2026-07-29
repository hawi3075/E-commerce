const Product = require('../models/productModel');

// @desc    Get all products (with optional query filter support)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, target_gender, work_field, raw_material, search } = req.query;

    let query = {};

    // Filter by Category
    if (category && category !== 'ALL CATEGORIES' && category !== 'ALL') {
      query.product_category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    // Filter by Target Gender
    if (target_gender && target_gender !== 'ALL GENDERS' && target_gender !== 'ALL') {
      query.target_gender = { $regex: new RegExp(`^${target_gender.trim()}$`, 'i') };
    }

    // Filter by Work Field / Sector
    if (work_field && work_field !== 'ALL WORK SECTORS' && work_field !== 'ALL') {
      query.work_field = { $regex: new RegExp(`^${work_field.trim()}$`, 'i') };
    }

    // Filter by Raw Material
    if (raw_material && raw_material !== 'ALL MATERIALS' && raw_material !== 'ALL') {
      query.raw_material = { $regex: new RegExp(`^${raw_material.trim()}$`, 'i') };
    }

    // Keyword Search (by name or SKU/code)
    if (search) {
      query.$or = [
        { product_name: { $regex: search, $options: 'i' } },
        { product_code: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_type,
      price,
      product_code,
      category,
      product_category,
      work_field,
      target_gender,
      raw_material,
      size,
      countInStock,
      color,
      description,
      image,
    } = req.body;

    const product = new Product({
      user: req.user._id,
      product_name,
      product_type,
      price,
      product_code,
      product_category: product_category || category,
      work_field: work_field || 'GENERAL',
      target_gender: target_gender || 'ALL GENDERS',
      raw_material: raw_material || 'Standard',
      size,
      countInStock,
      color,
      description,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.product_name = req.body.product_name || product.product_name;
      product.product_type = req.body.product_type || product.product_type;
      product.price = req.body.price ?? product.price;
      product.product_code = req.body.product_code || product.product_code;
      product.product_category = req.body.product_category || req.body.category || product.product_category;
      product.work_field = req.body.work_field || product.work_field;
      product.target_gender = req.body.target_gender || product.target_gender;
      product.raw_material = req.body.raw_material || product.raw_material;
      product.size = req.body.size || product.size;
      product.countInStock = req.body.countInStock ?? product.countInStock;
      product.color = req.body.color || product.color;
      product.description = req.body.description || product.description;
      product.image = req.body.image || product.image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = {
        name: req.user.name || req.user.username || 'Customer',
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};