import storage, { saveData } from '../storage.js';

export function getProducts(req, res) { 
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(storage.products));

}

export async function addProduct(req, res) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
    const product = JSON.parse(body);
    product.id = storage.products.length ? Math.max(...storage.products.map(u => u.id)) + 1 : 1;
    storage.products.push(product);
    await saveData('products');
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Producto creado', producto: product }));
  });
 }




