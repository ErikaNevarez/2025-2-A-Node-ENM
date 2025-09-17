import express from 'express';
import {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  cancelOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = express.Router();

// Obtener todas las órdenes (admin)
router.get('/orders', authMiddleware, isAdmin, getOrders);

// Obtener órdenes por usuario
router.get('/orders/user/:userId', authMiddleware, getOrdersByUser);

// Obtener orden por ID
router.get('/orders/:id', authMiddleware, getOrderById);

// Crear nueva orden
router.post('/orders', authMiddleware, createOrder);

// Cancelar orden (función especial)
router.patch('/orders/:id/cancel', authMiddleware, isAdmin, cancelOrder);

// Actualizar solo el estado de la orden
router.patch('/orders/:id/status', authMiddleware, isAdmin, updateOrderStatus);

// Actualizar solo el estado de pago
router.patch('/orders/:id/payment-status', authMiddleware, isAdmin, updatePaymentStatus);

// Actualizar orden completa
router.put('/orders/:id', authMiddleware, isAdmin, updateOrder);

// Eliminar orden (solo si está cancelada)
router.delete('/orders/:id', authMiddleware, isAdmin, deleteOrder);

export default router;
