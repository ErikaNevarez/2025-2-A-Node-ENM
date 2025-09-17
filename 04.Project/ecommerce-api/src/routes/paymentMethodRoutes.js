import express from 'express';
import {
  getNotifications,
  getNotificationById,
  getNotificationByUser,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllAsReadByUser,
  getUnreadNotificationsByUser,
} from '../config/controllers/notificationController.js';

const router = express.Router();

// Obtener todas las notificaciones (admin)
router.get('/notifications', getNotifications);

// Obtener notificaciones no leídas por usuario
router.get('/notifications/unread/:userId', getUnreadNotificationsByUser);

// Obtener notificaciones por usuario
router.get('/notifications/user/:userId', getNotificationByUser);

// Obtener notificación por ID
router.get('/notifications/:id', getNotificationById);

// Crear nueva notificación
router.post('/notifications', createNotification);

// Marcar una notificación como leída
router.patch('/notifications/:id/mark-read', markAsRead);

// Marcar todas las notificaciones de un usuario como leídas
router.patch('/notifications/user/:userId/mark-all-read', markAllAsReadByUser);

// Actualizar notificación
router.put('/notifications/:id', updateNotification);

// Eliminar notificación
router.delete('/notifications/:id', deleteNotification);

export default router;
