//-- Pasamos una variable a formato JSON en otro fichero

const fs = require('fs');

const FICHERO_JSON='tienda-json-fich.json'

const FICHERO_JSON_OUT = 'tienda-json-mod.json'

const tienda_json = fs.readFileSync(FICHERO_JSON);

const tienda = JSON.parse(tienda_json);

//-- Modificamos el nombre del producto 2

tienda[1]["nombre"] = "Icebreaker"


console.log('Productos en la tienda: ' + tienda.length);

tienda.forEach((element,index) => {
    console.log('Producto: ' + (index +1) + ": " + element["nombre"]);
    
});

//-- Convertimos la variable a cadena JSON
let myJSON = JSON.stringify(tienda);

//-- Guardamos en el fichero destino
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);

console.log('Información guardada en un fichero: ' + FICHERO_JSON_OUT);