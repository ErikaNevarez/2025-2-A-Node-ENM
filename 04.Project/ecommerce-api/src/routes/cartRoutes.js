import express from 'express';
import {
  getCarts,
  getCartById,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
  addProductToCart,
} from '../config/controllers/cartController.js';

const router = express.Router();

// Obtener todos los carritos (admin)
router.get('/cart', getCarts);

// Obtener carrito por ID
router.get('/cart/:id', getCartById);

// Obtener carrito por usuario
router.get('/cart/user/:id', getCartByUser);

// Crear nuevo carrito
router.post('/cart', createCart);

// Agregar producto al carrito (función especial)
router.post('/cart/add-product', addProductToCart);

// Actualizar carrito completo
router.put('/cart/:id', updateCart);

// Eliminar carrito
router.delete('/cart/:id', deleteCart);

export default router;
