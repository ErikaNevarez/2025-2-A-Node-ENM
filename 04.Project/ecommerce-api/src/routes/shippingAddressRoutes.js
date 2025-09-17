import express from 'express';
import { body, param } from 'express-validator';
import validate from '../middlewares/validation.js';
import {
  createShippingAddress,
  getUserAddresses,
  getAddressById,
  getDefaultAddress,
  updateShippingAddress,
  setDefaultAddress,
  deleteShippingAddress
} from '../controllers/shippingAddressController.js';
import authMiddleware from '../middlewares/auth.js'; // Middleware de autenticación

const router = express.Router();

// Validaciones comunes para crear/actualizar dirección
const addressValidations = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .trim(),

  body('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5, max: 200 }).withMessage('Address must be between 5 and 200 characters')
    .trim(),

  body('city')
    .notEmpty().withMessage('City is required')
    .isLength({ min: 2, max: 50 }).withMessage('City must be between 2 and 50 characters')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('City must contain only letters and spaces')
    .trim(),

  body('state')
    .notEmpty().withMessage('State is required')
    .isLength({ min: 2, max: 50 }).withMessage('State must be between 2 and 50 characters')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('State must contain only letters and spaces')
    .trim(),

  body('postalCode')
    .notEmpty().withMessage('Postal code is required')
    .isLength({ min: 4, max: 6 }).withMessage('Postal code must be between 4 and 6 characters')
    .isNumeric().withMessage('Postal code must contain only numbers')
    .trim(),

  body('country')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Country must be between 2 and 50 characters')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('Country must contain only letters and spaces')
    .trim(),

  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isLength({ min: 10, max: 15 }).withMessage('Phone must be between 10 and 15 characters')
    .matches(/^[0-9+\-\s()]+$/).withMessage('Phone must contain only numbers, spaces, parentheses, plus and dash')
    .trim(),

  body('isDefault')
    .optional()
    .isBoolean().withMessage('isDefault must be a boolean value'),

  body('addressType')
    .optional()
    .isIn(['home', 'work', 'other']).withMessage('Address type must be home, work, or other')
];

// Crear una nueva dirección
router.post('/', addressValidations, validate, authMiddleware, createShippingAddress);

// Obtener todas las direcciones del usuario
router.get('/', authMiddleware, getUserAddresses);

// Obtener la dirección por defecto
router.get('/default', authMiddleware, getDefaultAddress);

// Obtener una dirección específica
router.get('/:addressId', [
  param('addressId')
    .isMongoId().withMessage('Address ID must be a valid MongoDB ObjectId')
], validate, authMiddleware, getAddressById);

// Actualizar una dirección
router.put('/:addressId', [
  param('addressId')
    .isMongoId().withMessage('Address ID must be a valid MongoDB ObjectId'),
  ...addressValidations
], validate, authMiddleware, updateShippingAddress);

// Marcar dirección como default
router.patch('/:addressId/default', [
  param('addressId')
    .isMongoId().withMessage('Address ID must be a valid MongoDB ObjectId')
], validate, authMiddleware, setDefaultAddress);

// Eliminar una dirección
router.delete('/:addressId', [
  param('addressId')
    .isMongoId().withMessage('Address ID must be a valid MongoDB ObjectId')
], validate, authMiddleware, deleteShippingAddress);

export default router;