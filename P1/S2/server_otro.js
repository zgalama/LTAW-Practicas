const http = require('http');

const puerto = 9090;

const server = http.createServer((req, res) => {
    console.log('Petición recibida!');

    // -- Mensajes a enviar
    res.write(`
    <!DOCTYPE html>
    <html>
        <body>
        <p> HOLA </p>
        <b> NEGRITA </b>
        </body>
    </html>
     `);

    // 'res.setHeader('Content-type', 'text/plain'), por si cambiamos
    //-- algo de alguna cabecera, si se pone esto, el html sale tal cual

    res.end(); //-- Terminamos nuestro mensaje y enviamos

});

server.listen(puerto);

console.log("Servidor activado. Escuchando en puerto: " + puerto);