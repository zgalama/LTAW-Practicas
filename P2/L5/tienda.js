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
                code_404(res);
            }else{
                const tipo ="text/html";
                code_200(res,data,tipo);
            }
        });

    }  else if (req.url.startsWith('/procesar')) { 
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const username = urlParams.get('username');
        const password = urlParams.get('password');
        const email = urlParams.get('email'); // Obtener el email si existe

        if (email) { // Si se proporciona un email, es un registro
            // Lógica de registro
            const nuevoUsuario = {
                nombre_usuario: username,
                password: password,
                email: email
            };

            productos.push(nuevoUsuario); // Agregar el nuevo usuario al array

            // Guardar los cambios en el archivo JSON
            fs.writeFileSync(FICHERO_JSON, JSON.stringify({ producto: productos }, null, 2)); 

            const data = JSON.stringify({ success: true, message: "¡Registro exitoso!" });
            code_200(res, data, 'application/json');
        } else { // Si no hay email, es un inicio de sesión
            // Lógica de inicio de sesión
            let usuarioEncontrado = productos.find(element => element.nombre_usuario == username);

            if (usuarioEncontrado) {
                if (usuarioEncontrado.password == password) {
                    const data = JSON.stringify({ success: true, message: `¡Has iniciado sesión correctamente! Bienvenido: ${username}` });
                    code_200(res, data, 'application/json');
                } else {
                    const data = JSON.stringify({ success: false, message: "CONTRASEÑA INCORRECTA" });
                    code_200(res, data, 'application/json');
                }
            } else {
                const data = JSON.stringify({ success: false, message: "USUARIO NO REGISTRADO" });
                code_200(res, data, 'application/json');
            }
        }
    } else {
        // Intenta servir como archivo estático
        const filePath = path.join(recurso, req.url);
        leerFichero(filePath, (err,data) => {
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