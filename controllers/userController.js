import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Product from "../model/Product.js";
import CartItem from "../model/Cart.js"; 

// JWT token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// SIGN UP
export const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    res.json({ success: true, message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    res.json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ user: userId, product: productId, quantity: 1 });
    }

    const cart = await CartItem.find({ user: userId }).populate("product");
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartItemId } = req.body;

    await CartItem.deleteOne({ _id: cartItemId, user: userId });

    const cart = await CartItem.find({ user: userId }).populate("product");
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await CartItem.find({ user: req.user._id }).populate("product");
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) return res.status(400).json({ message: "Quantity cannot be less than 1" });

    const cartItem = await CartItem.findOne({ _id: cartItemId, user: userId });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();

    const cart = await CartItem.find({ user: userId }).populate("product");
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
