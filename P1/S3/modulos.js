const http = require('http');
const { URL } = require('url'); //-- hay más formas de ponerlo


//-- En URL, la búsqueda es a partir del caracter '?' y los parametros de esto
//-- se separan por el caracter '&'

const puerto = 8080;

//-- Construimos un objeto URL
const myURL= new URL('http://localhost:8080/mi_tienda/listados.html?articulo=pendrive&color=blanco#descripcion');

// console.log(myURL) para ver la info del objeto URL
//-- Imprimir el objeto URL para ver todas sus partes 
console.log("  * URL completa (href): " + myURL.href);
console.log("  * Origen: " + myURL.origin);
console.log("  * Protocolo: " + myURL.protocol);
console.log(" * host: " + myURL.hostname);
console.log(" * port: " + myURL.port);
console.log(" * Ruta:" +myURL.pathname);
console.log(" * Busqueda:" +myURL.search);

//-- Recorremos todas las búsquedas
myURL.searchParams.forEach((value, name) => {
    console.log(" * Parametro: " + name + " = " + value);
});

//-- Imprimir directamente los valores de los parametros
console.log(" * Articulo: " + myURL.searchParams.get('articulo'));
console.log(" * Color:" + myURL.searchParams.get('color'));
console.log(" * Otro: " + myURL.searchParams.get('otro'));

//-- Ultima parte: Fragmento
console.log(" * Fragmento: " + myURL.hash);



