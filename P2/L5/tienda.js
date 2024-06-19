// Importando módulos
const http = require('http');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');

// Constantes 
const puerto = 9090;
const page_err = 'error.html';
const page_error = fs.readFileSync(page_err);
const recurso = __dirname; 
const page_prod = 'producto.html';
// Constantes JSON 
const FICHERO_JSON = 'tienda.json'
let productos = []
const tienda_json = fs.readFileSync(FICHERO_JSON, 'utf-8')
productos = JSON.parse(tienda_json).producto;

// Para el content_type de los recursos a solicitar 
const tipo = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    ico: 'image/x-icon'
};

function code_404(res) {
    res.statusCode = 400;         // Código de respuesta
    res.setHeader('Content-Type', `${tipo}; charset=utf-8`);
    res.write(page_error);  
    res.end();
}

function code_200(res, data, tipo){
    res.statusCode = 200;         // Código de respuesta
    res.statusMessage = "OK";    // Mensaje asociado al código
    res.setHeader('Content-Type', `${tipo}; charset=utf-8`);
    res.write(data);
    res.end();
}


function leerFichero(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            callback(err,null);
        } else {
            console.log('Lectura completada');
            callback(null,data);
        }
    }
    )};


const server = http.createServer((req, res) => {
    console.log('Request received:', req.url);

    if (req.url === '/' || req.url === '/main.html') {
        // Sirve la página principal
        const filePath = path.join(recurso, 'main.html'); 
        leerFichero(filePath, (err,data) => {
            if (err){
                code_404(res)
            }else{
                const tipo ="text/html"
                code_200(res,data,tipo)
            }
        })

    } else {
        // Intenta servir como archivo estático
        const filePath = path.join(recurso, req.url);
        leerFichero(filePath,'utf-8', (err,data) => {
            if (err){
                code_404(res);
            }else{
                code_200(res,data,tipo);
            }
        });
    }

});


server.listen(puerto);

console.log('Servidor de la tienda. Escuchando en: ' + puerto);