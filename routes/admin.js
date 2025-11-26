import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/adminController.js";

const router = express.Router();

// CREATE
router.post('/add-product', createProduct);

// GET all
router.get('/products', getAllProducts);

// GET one product
router.get('/products/:id', getProductById);

// UPDATE
router.put('/products/:id', updateProduct);

// DELETE
router.delete('/products/:id', deleteProduct);

export default router;
