import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', authMiddleware, isAdmin, createCategory);
router.put('/categories/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/categories/:id', authMiddleware, isAdmin, deleteCategory);

export default router;