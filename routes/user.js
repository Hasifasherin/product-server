import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { signUpUser, loginUser, addToCart, removeFromCart, getCart } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);

// Cart routes
router.get("/cart", protect, getCart);
router.post("/cart", protect, addToCart);
router.delete("/cart", protect, removeFromCart);

export default router;
