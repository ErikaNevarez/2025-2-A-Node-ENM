const http = require('http');
const url= require ('url');
import {invertir} from './utils/invertir.js'; 
const PORT = 3000;

// Crea el servidor HTTP
// a partir de aqui se da la EJECUCION //
const server = http.createServer((req, res) => {
  if (req.url === '/invertir') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const original = url.searchParams.get('texto');
    const resultado = invertirCadena(original);

    res.writeHead(codigo, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(
      {
        original: original,
        invertido: resultado
      }
    ));

  } else {
    res.statusCode = 404;
    res.end('404');
  }
});


// Inicia el servidor y muestra un mensaje en consola
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});