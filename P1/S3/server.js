
const http = require('http');

const puerto = 9080;


//-- Imprimimos info sobre el mensaje de solicitud
//-- Estos mensaes son http.IncomingMessage
function print_info_req(req){


    console.log("");
    console.log("Mensaje de solicitud");
    console.log("=====================");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("Version:" + req.httpVersion);
    console.log("Cabeceras: ");

    //-- Recorrer todas las cabeceras
    //-- imprimiendo su nombre y su valor
    for (hname in req.headers)
        console.log(` * ${hname}: ${req.headers[hname]}`);

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL completa: " + myURL.href);
    console.log(" Ruta: " + myURL.pathname);
}

//-- Servidor: Bucle principal de atención de clientes
const server = http.createServer((req, res) => {

    console.log("Petición recibida")
    //-- Imprimir info de la petición
    print_info_req(req);

    //-- Si hay datos en el cuerpo, se imprimen
    req.on('data', (cuerpo) => {

        //-- Los datos del cuerpo son caracteres
        req.setEncoding('utf-8');

        console.log("Cuerpo: ")
        console.log(` * Tamaño: ${cuerpo.length} bytes`);
        console.log(` * Contenido: ${cuerpo}`);
    });

    //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud 
    req.on('end', () => {
        console.log("Fin del mensaje");

        //-- Happy server, generar respuesta
        //-- Código : OK
        //res.statusCode = 200;
        //res.statusMessage = 'OK :-)';
        //res.setHeader('Content-Type', 'text/plain');
        //res.write("Soy el happy server\n");
        res.statusCode = 404;
        res.statusMessage = 'Not Found :-(';
        res.setHeader('Content-Type', 'text/plain');
        res.write("Soy el ANGRY server\n");
        res.end()
    });



});

server.listen(puerto);

console.log("Ejemplo 1. Happy server listo! Escuchando en puerto: " + puerto);