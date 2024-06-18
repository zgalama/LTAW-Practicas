const fs = require('fs');

const FICHERO_JSON='tienda.json'

const tienda_json = fs.readFileSync(FICHERO_JSON);

const tienda = JSON.parse(tienda_json);

console.log('Productos en la tienda: ' + tienda.length);

tienda.forEach((element) => {
    let productos = element["producto"];
    let users = element["usuarios"];
    let pedidos = element["pedidos"];

    productos?.forEach((pr, index) => {
        console.log('Producto ' + (index +1) + ':');
        console.log('Nombre: ' + pr.nombre);
        console.log('Descripcion: ' + pr.descripcion);
        console.log('Precio: ' + pr.precio);
        console.log('Stock: ' + pr.stock);
    });

    users?.forEach((us, index) => {
        console.log('Usuario ' + (index +1) + ':' + us.user);
        console.log('Nombre :' + us.nombre);
        console.log('Correo : ' + us.correo);
    });

    pedidos?.forEach((ped, index) => {
        console.log('Pedido ' + (index +1) + ':');
        console.log('Dirección: ' + ped.direccion);
        console.log('Nº de tarjeta: ' + ped.tarjeta);
        console.log('Productos: ' + ped.productos);
    });
     

});


