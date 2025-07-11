import express from 'express';
import { logger } from '../middlewares/logger.js';
import { addProduct, getProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get('/products', logger, getProducts);
router.post('/products', logger, addProduct);

export default router;



