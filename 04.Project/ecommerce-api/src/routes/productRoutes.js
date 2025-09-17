import express from 'express';
import {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../config/controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/category/:idCategory', getProductByCategory);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;