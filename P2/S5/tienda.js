const fs = require('fs');

const FICHERO_JSON='tienda-json-fich.json'

const tienda_json = fs.readFileSync(FICHERO_JSON);

const tienda = JSON.parse(tienda_json);

console.log('Productos en la tienda: ' + tienda.length);

tienda.forEach((element,index) => {
    console.log('Producto: ' + (index +1) + ": " + element["nombre"]);
    
});