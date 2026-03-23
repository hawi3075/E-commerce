const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD PRODUCT (ADMIN ONLY)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;