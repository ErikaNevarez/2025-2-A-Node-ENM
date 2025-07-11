import express from 'express';
import taskRoutes from './taskRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use(taskRoutes);
router.use(userRoutes);

export default router;
