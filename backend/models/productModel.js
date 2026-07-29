const mongoose = require('mongoose');

// 1. Define Review Schema
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// 2. Define Product Schema
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product_name: { type: String, required: true },
    product_type: { type: String, required: true },
    product_code: { type: String, required: true, unique: true },
    
    // Updated category: String without rigid enum restrictions to allow custom "Other" categories
    product_category: {
      type: String,
      required: true,
      trim: true,
    },

    // New Fields matching your frontend forms
    work_field: {
      type: String,
      trim: true,
      default: 'GENERAL',
    },
    target_gender: {
      type: String,
      trim: true,
      default: 'ALL GENDERS',
    },
    raw_material: {
      type: String,
      trim: true,
      default: 'Standard',
    },

    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    size: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },

    // Reviews and ratings tracking
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);