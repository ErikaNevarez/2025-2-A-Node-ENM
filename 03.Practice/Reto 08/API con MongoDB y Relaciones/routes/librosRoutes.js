import express from 'express';
import {
  getLibros,
  getLibroById,
  getLibroByCategory,
  createLibro,
  updateLibro,
  deleteLibro,
  searchLibro,
} from '../controllers/libroController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import validate from '../middlewares/validation.js';
import { query } from 'express-validator';

const router = express.Router();

router.get('/libros', [
  query('page')
    .optional()
    .isNumeric().withMessage('Page parameter must be a number'),
  query('limit')
    .optional()
    .isNumeric().withMessage('Limit parameter must be a number'),
], validate, getLibros);
router.get('/libros/search', searchlibro);
router.get('/libros/category/:idCategory', getLibroByCategory);
router.get('/libros/:id', getLibroById);
router.post('/libros', authMiddleware, isAdmin, createLibro);
router.put('/libros/:id', authMiddleware, isAdmin, updateLibro);
router.delete('/libros/:id', authMiddleware, isAdmin, deleteLibro);

export default router;