import express from 'express';
import { signUpUser, loginUser } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup",signUpUser);
router.post('/login',loginUser);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});

export default router;
