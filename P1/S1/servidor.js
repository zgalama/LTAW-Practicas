const http = require('http');

//-- Crear el servidor

const puerto = 8080;


//-- Función de retrollamada de petición recibida cada vez que
//-- un cliente realiza una petición se llama a esta función


const server = http.createServer( (req, res) => {
    console.log("Petición recibida!")

    //-- Cabecera que indica el tipo de datos del cuerpo de la respuesta
    res.setHeader('Content-Type', 'text/plain');

    //-- Enviamos respuesta con res.write(), se escribe dentro el mensaje
    res.write("Soy el Happy Server!!\n");

    //-- Terminamos la respuesta y enviamos
    res.end();
});

server.listen(puerto);


console.log("Servidor activado. Escuchando en puerto: " + puerto);
