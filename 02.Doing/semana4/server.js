import http from 'http';
import { logger } from './src/middlewares/logger.js';
import { parseQuery } from './src/middlewares/parseQuery.js';
import { usersRouter } from './src/routes/usersRouters.js';
import { productsRouter } from './src/routes/productsRouters.js';
import { loadData } from './src/storage.js';

const PORT = 3000;

await loadData();

const server = http.createServer((req, res) => {
  logger(req, res, () => {
    parseQuery(req, res, () => {
      const { pathname, method, query } = req;

      if (pathname === '/' && method === 'GET') {
        if (query.name && query.admin === 'true') {
          return res.end(`Welcome Admin ${query.name} to your API`);
        }
        if (query.name) {
          return res.end(`Welcome ${query.name}`);
        }
        return res.end('Welcome! Agrega ?name=tu_nombre');
      }

      if (usersRouter(req, res) !== false) return;
      if (productsRouter(req, res) !== false) return;

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});