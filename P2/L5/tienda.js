// Importando módulos
const http = require('http');
const fs = require('fs');
const {url} = require('inspector');
const path = require('path')

// Constantes 
const puerto = 9090;
const page_err = 'error.html';
const page_error = fs.readFileSync(page_err);
const recurso = __dirname; 

// Constantes JSON 
const FICHERO_JSON = 'tienda.json'
const tienda_json = fs.readFileSync(FICHERO_JSON, 'utf-8')

const productos = JSON.parse(tienda_json).producto;
const usuarios = JSON.parse(tienda_json).usuarios;
const pedidos = JSON.parse(tienda_json).pedidos;

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

function leerFichero(filePath, res) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            code_404(res);
            return;
        }

        const extname = path.extname(filePath).slice(1).toLowerCase(); // Lo pongo en minusculas para acceder bien en el dict tipo y borro '/'
        const contentType = tipo[extname] || 'application/octet-stream'; //Por si no es ninguno del dict tipo, es otro
        res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8`}); // Para las tildes pongo el charset
        fs.createReadStream(filePath).pipe(res); // Para leer a trozos, mejora la eficencia al ser un archivo grande
    });
}


function code_404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(page_error);  
    res.end();
}


const server = http.createServer((req, res) => {
    console.log('Request received:', req.url);

    if (req.url === '/' || req.url === '/main.html') {
        // Sirve la página principal
        const filePath = path.join(recurso, 'main.html'); 
        leerFichero(filePath, res); // Función para servir archivos
    } else {
        // Intenta servir como archivo estático
        const filePath = path.join(recurso, req.url);
        leerFichero(filePath, res); 
    }
});


server.listen(puerto);

console.log('Servidor de la tienda. Escuchando en: ' + puerto);