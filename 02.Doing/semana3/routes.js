// son las rutas conocidas que envian el contenido

const { responderHTML, responderJSON,responderTXT} = require('./utils/responses');

const fs = require ('fs');
const { IncomingMessage, ServerResponse } = require('http');

const path =require('path'); 

@param {IncomingMessage} req
@param {ServerResponse} res

function manejarRutas(req, res) {
  const { url, method } = req;

  if (url === "/" && method === 'GET') {
    const content = `<h1>Bienvenido al servidor</h1>
    <p>Usa</p>
    <ul>
    <li><a href='/contacto'>Contacto</a></li>
    <li><a href='/conocenos'>Conócenos</a></li>
    <li><a href='/api'>API</a></li>
    </ul>
    `;
    responderHTML(res,content, 200);
  }else if (url === "/contacto" && method === 'GET') {
    const content=`<h2>Contacto</h2><p>Escríbenos a contacto@industriaspatito.com</p>`;
    responderHTML(res,content, 200);
  } else if (url === "/conocenos" && method === 'GET') {
    const content=`<h2>Conócenos</h2><p>Somos cool</p>`;
    responderHTML(res,content, 200);
  } else if (url === "/api" && method === 'GET') {
    const datos ={
      nombre: 'Servidor de mi app cool',
      version: '1.0.0',
      autor: 'Dev Team',
      mensaje: 'Hola desde la API',
    };
    responderJSON(res, datos, 200);
  }else if (url === '/equipo' && method === 'GET') {
     const archivo = path.join(__dirname, 'data', 'equipo.json');
     fs.readFile(archivo, 'utf8', (err, data) => {
          if (err) {
     } else {     
        responderJSON(res, JSON.parse(data), 200);
     }
    }); 
  }else if (url === '/equipo' && method === 'POST') {
// Aquí se podría implementar la lógica para agregar un nuevo miembro al equipo.
  }
  // Cualquier otra ruta: responde con texto plano y error 404.
  else {
    responderTXT(res, 'Página no encontrada', 404);
  }
}

// Exporta la función manejarRutas para usarla en otros archivos.
module.exports = { manejarRutas };