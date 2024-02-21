const http = require('http');

const PUERTO = 9080;

//-- Texto HTML de la página principal
const pagina = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Happy Server!</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">HAPPY SERVER!!!</h1>
</body>
</html>
`

//-- Texto HTML de la página de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: red">
    <h1 style="color: white">ERROR!!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = 'OK';
    let page = pagina;

    //--Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'htpp://' +req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la pagina principal genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = 'Not Found';
        page = pagina_error;
    }

    //-- Generamos respuesta en funcion de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 6. Happy Server HTML!. Escuchando en puerto: " + PUERTO);