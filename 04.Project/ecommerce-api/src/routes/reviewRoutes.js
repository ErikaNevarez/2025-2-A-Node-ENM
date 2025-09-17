import express from 'express';
import { body, param } from 'express-validator';
import validate from '../middlewares/validation.js';
import {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Crear una nueva review
router.post('/', [
  body('product')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),

  body('comment')
    .optional()
    .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters')
    .trim()
], validate, authMiddleware, createReview);

// Obtener reviews de un producto específico
router.get('/product/:productId', [
  param('productId')
    .isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId')
], validate, getProductReviews);

// Obtener reviews del usuario autenticado
router.get('/my-reviews', authMiddleware, getUserReviews);

// Actualizar una review
router.put('/:reviewId', [
  param('reviewId')
    .isMongoId().withMessage('Review ID must be a valid MongoDB ObjectId'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),

  body('comment')
    .optional()
    .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters')
    .trim()
], validate, authMiddleware, updateReview);

// Eliminar una review
router.delete('/:reviewId', [
  param('reviewId')
    .isMongoId().withMessage('Review ID must be a valid MongoDB ObjectId')
], validate, authMiddleware, deleteReview);

export default router;