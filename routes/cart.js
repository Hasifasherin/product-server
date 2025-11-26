import express from 'express';
import { getCart, addToCart, updateCartQty, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes protected by JWT
router.get('/', protect, getCart);          
router.post('/', protect, addToCart);       
router.put('/:id', protect, updateCartQty); 
router.delete('/:id', protect, removeFromCart); 

export default router;
