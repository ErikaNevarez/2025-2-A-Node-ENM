import express from 'express';
import {
  getPaymentMethods,
  getPaymentMethodById,
  getPaymentMethodsByUser,
  createPaymentMethod,
  updatePaymentMethod,
  setDefaultPaymentMethod,
  deactivatePaymentMethod,
  deletePaymentMethod,
  getDefaultPaymentMethod,
} from '../controllers/paymentMethodController.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Obtener todos los métodos de pago activos (admin)
router.get('/payment-methods', authMiddleware, isAdmin, getPaymentMethods);

// Obtener método de pago predeterminado de un usuario
router.get('/payment-methods/default/:userId', authMiddleware, getDefaultPaymentMethod);

// Obtener métodos de pago de un usuario
router.get('/payment-methods/user/:userId', authMiddleware, getPaymentMethodsByUser);

// Obtener método de pago por ID
router.get('/payment-methods/:id', authMiddleware, getPaymentMethodById);

// Crear nuevo método de pago
router.post('/payment-methods', authMiddleware, createPaymentMethod);

// Establecer método de pago como predeterminado
router.patch('/payment-methods/:id/set-default', authMiddleware, setDefaultPaymentMethod);

// Desactivar método de pago
router.patch('/payment-methods/:id/deactivate', authMiddleware, deactivatePaymentMethod);

// Actualizar método de pago
router.put('/payment-methods/:id', authMiddleware, updatePaymentMethod);

// Eliminar método de pago permanentemente
router.delete('/payment-methods/:id', authMiddleware, deletePaymentMethod);

export default router;
