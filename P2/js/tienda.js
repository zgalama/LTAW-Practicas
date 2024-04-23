const http = require('http');
const fs = require('fs');
const path = require('path');


const puerto = 9091;
const page = 'main.html';
const page_err = 'error.html';
const page_error = fs.readFileSync(page_err);
const art1 = 'art1.html';
const art2 = 'art2.html';
const art3 = 'art3.html';


function info(req){
    //Construir objeto url con la url de la solicitud
    let url = req.url==='/'?'/main.html':req.url;
    const resource = path.join(__dirname,url);
    return resource;
}

const server = http.createServer((req, res) => {

    console.log('Petición recibida!')
    
    dir = info(req);
    console.log(dir)

    if (dir.pathname === '/') {
        pagina = page;
    } else if (dir.pathname === '/index.html') {
        pagina = page;
    } else if (dir.pathname === '/art1.html') {
        pagina = art1;
    } else if (dir.pathname === '/art2.html') {
        pagina = art2;
    } else if (dir.pathname === '/art3.html') {
        pagina = art3;
    } else {
        pagina = page_error;
    }
    

    const tipo = {
        'jpg' : 'image/jpg',
        'jpeg' : 'image/jpeg',
        'html': 'text/html',
        'css' : 'text/css',
        'avif' : 'image/avif',
        'gif' : 'image/gif'
    };


    //-- Leemos el archivo de forma asincrónica
    fs.readFile(dir, (err, data) => {
        //-- Para gestión de errores hacemos if-else
        if (err) { //-- Ha ocurrido algún error
            console.log('Error!')
            console.log(err.message);

            res.write(page_error);
            res.end();

        } else {

            res.statusMessage = 'OK' ;
            res.writeHead( 200, {'Content-Type': tipo});
            res.write(data);
            res.end();
        }

    });
});


server.listen(puerto);

console.log('Servidor de la tienda. Escuchando en: ' + puerto);