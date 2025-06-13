// es lo que dan formato a las respuestas que envia

function responderHTML(res, contenido, codigo) {
  res.writeHead(codigo, { 'Content-Type': 'text/html' });
  res.end(contenido);
}

function responderJSON(res, contenido, codigo) {
  res.writeHead(codigo, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(contenido));
}

function responderTXT(res, contenido, codigo) {
  res.writeHead(codigo, { 'Content-Type': 'text/plain' });
  res.end(contenido);
}

module.exports = { responderHTML, responderJSON, responderTXT }