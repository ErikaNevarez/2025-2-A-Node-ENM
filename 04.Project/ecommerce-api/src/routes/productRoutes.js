import express from 'express';
import {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/category/:idCategory', getProductByCategory);
router.get('/products/:id', getProductById);
router.post('/products', authMiddleware, isAdmin, createProduct);
router.put('/products/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/products/:id', authMiddleware, isAdmin, deleteProduct);

export default router;