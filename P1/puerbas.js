const http = require('http');
const fs = require('fs');

const puerto = 9090;
const page = 'index.html';
const page_error = 'error.html';

const server = http.createServer((req, res) => {
    console.log('Petición recibida!')

    if (req.url === '/') {
        req.url = page;
    } else {
        req.url = page_error;
    }

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = 'OK';

    const url = new URL(req.url, 'http://' + req.headers['host']);

    //-- Leemos el archivo de forma asincrónica
    fs.readFile(page, 'utf-8', (err, data) => {
        //-- Para gestión de errores hacemos if-else
        if (err) { //-- Ha ocurrido algún error
            console.log('Error!')
            console.log(err.message);
            code = 404;
            code_msg = 'Not Found';
            data = '<h1>404 Not Found</h1>';
        }

        //-- Si hay datos en el cuerpo, se imprimen
        req.on('data', (cuerpo) => {
            console.log(`Contenido: ${cuerpo}`);
        });

        //-- Cuando llegue al final del mensaje de solicitud:
        req.on('end', () => {
            console.log('Fin del mensaje');
            res.statusCode = code;
            res.statusMessage = code_msg;
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
        });
    });
});

server.listen(puerto);
console.log('Servidor de la tienda. Escuchando en: ' + puerto);
