import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js"; 
import upload from '../config/multer.js';

const router = express.Router();


// CREATE 
router.post("/add-product", protect, upload.single("image"), createProduct);

// GET all 
router.get('/products', protect, getAllProducts);

// GET one product 
router.get('/products/:id', protect, getProductById);

// UPDATE 
router.put('/products/:id', protect, upload.single("image"), updateProduct);

// DELETE 
router.delete('/products/:id', protect, deleteProduct);

export default router;
