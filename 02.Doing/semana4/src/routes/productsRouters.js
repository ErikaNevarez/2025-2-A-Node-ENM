import { getProducts, addProduct } from '../controllers/productsController.js';

export function productsRouter(req, res) {
  if (req.pathname === '/products' && req.method === 'GET') {
    return getProducts(req, res);
  }
  if (req.pathname === '/products' && req.method === 'POST') {
    return addProduct(req, res);
  }
  return false;
}