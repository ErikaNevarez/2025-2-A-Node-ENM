import express from 'express';

import authRoutes from './authRoutes.js';
import cartRoutes from './cartRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import orderRoutes from './orderRoutes.js';
import paymentMethodRoutes from './paymentMethodRoutes.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use(cartRoutes);
router.use(categoryRoutes);
router.use(notificationRoutes);
router.use(orderRoutes);
router.use(paymentMethodRoutes);
router.use(productRoutes);

export default router;