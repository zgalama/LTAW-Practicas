//-- Importar el módulo 'module_name'

const mod = require('module_name')

const http = require('http');

const server = http.createServer();

//-- Función de retrollamada de petición recibida, cada vez que un cliente realiza
//-- una petición se llama a este función

function atender(req, res) {

    //-- req es el mensaje solicitud, res es el mensaje respuesta, que inic. vacío

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida...");

    //-- aún no enviamos respuesta
}


//-- Acticar la funcion de retrollamada del servidor al haber una petición
server.on('request', atender);

//-- Activar el servidor. A la escucha de peticiones en puerto 8080
server.listen(8080);

