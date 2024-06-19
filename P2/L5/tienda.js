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

    res.write(page_error);  
    res.end();
}

function code_200(res, data, tipo){
    res.statusCode = 200;         // Código de respuesta
    res.statusMessage = "OK";    // Mensaje asociado al código
    res.setHeader('Content-Type', tipo);
    res.write(data);
    res.end();
}


function leerFichero(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            code_404(res);
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
    } else if (req.url.startsWith('/producto.html/')) {
        const nombreProducto = decodeURIComponent(req.url.split('/producto.html/')[1]);
    
        const producto = productos.find(p => p.nombre === nombreProducto);
    
        if (producto) {
          const filePath = path.join(recurso, page_prod);

          leerFichero(filePath, (err, data) => {
            if (err) {
                code_404(res);
            }else {
    
            // Reemplazar marcadores de posición
            let html = data.toString();
            html = html.replace('TITULO_PAG', producto.nombre);
            html = html.replace(/NOMBRE_PROD/g, producto.nombre);
            html = html.replace('DESCRIPCION_PROD', producto.descripcion);
            html = html.replace('PRECIO_PROD', producto.precio);

            html = html.replace('<!-- IMG_P-->', '<img src ="' + producto.foto + '"alt="disco los angeles" class = "product-img">');
            html = html.replace('<!--IMGR1-->', '<img src ="' + producto.foto_r1 + '"alt="disco los angeles">');
            html = html.replace('<!--IMGR2-->','<img src ="' + producto.foto_r2 + '"alt="disco los angeles">');
            
            html = html.replace('<!--CSS-->', `<link rel="stylesheet" href ="art.css">`);
            const ext = path.extname(filePath).slice(1);
            const contentType = tipo[ext] || 'text/plain'; 
            code_200(res, data, contentType);    
        
        }
          });
   
        }

        } else {
        // Intenta servir como archivo estático
        const filePath = path.join(recurso, req.url);
        const ext = path.extname(filePath).slice(1);
        const contentType = tipo[ext] || 'text/plain';
        leerFichero(filePath, (err,data) => {
            if (err){
                code_404(res)
            }else{
                code_200(res,data,contentType)
            }
        })
    }

});


server.listen(puerto);

console.log('Servidor de la tienda. Escuchando en: ' + puerto);