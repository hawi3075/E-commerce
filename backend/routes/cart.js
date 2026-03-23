const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");


// ADD TO CART
router.post("/add", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user.id);

  const existingItem = user.cart.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }

  await user.save();

  res.json({ message: "Product added to cart", cart: user.cart });
});


// REMOVE FROM CART
router.post("/remove", verifyToken, async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user.id);

  user.cart = user.cart.filter(
    (item) => item.productId.toString() !== productId
  );

  await user.save();

  res.json({ message: "Product removed", cart: user.cart });
});


// UPDATE QUANTITY
router.put("/update", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user.id);

  const item = user.cart.find(
    (i) => i.productId.toString() === productId
  );

  if (item) {
    item.quantity = quantity;
  }

  await user.save();

  res.json({ message: "Cart updated", cart: user.cart });
});


// GET USER CART
router.get("/", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.productId");
  res.json(user.cart);
});

module.exports = router;