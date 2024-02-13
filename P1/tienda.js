const http = require('http');
const fs = require('fs');
const path = require('path');

const puerto = 9090;
const pag = 'index.html';

const server = http.createServer((req, res) => {

    console.log('Petición recibida!');

    // -- Mensajes a enviar
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type' : 'text/plain'});
            res.end('Error interno del servidor');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });


    // 'res.setHeader('Content-type', 'text/plain'), por si cambiamos
    //-- algo de alguna cabecera, si se pone esto, el html sale tal cual

});

server.listen(puerto);

console.log("Servidor activado. Escuchando en puerto: " + puerto);