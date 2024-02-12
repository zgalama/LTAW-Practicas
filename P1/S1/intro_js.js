// Programa 'Hola Mundo' en Node.js

/* Comentario multilínea.
El objeto console está disponible directamente desde 
node.js, sin tener que importar nada */

//-- Imprimir mensaje en la consola

console.log("¡Hola mundo!");

//-- Ahora vamos con las variables, que tiene la palabra reservada 'let'

let n = 3;

console.log("Variable n: ", n);

//-- Valor de la variable dentro de una cadena

console.log(`Variable n: ${n} metros`);

//-- Concatenar la variable al mensaje
console.log("Variable n: " + n);


//-- Ejemplo de bucles

//-- Definimos una cte: Número de mensajes
const N = 10;

//-- Bucle para imprimir N mensajes
for (i = 0; i < N; i++) {
    console.log("Mensaje " + i);
}

// Ejemplo de definición y uso de objetos literales

//-- Definiendo un objeto con varias propiedades y valores
const objeto1 = {
    nombre: "Objeto-1",
    valor: 10,
    test: true
};

//-- Imprimiendo las propiedades del objeto
console.log("")
console.log("Nombre: " + objeto1.nombre);
console.log("Valor: " + objeto1.valor);
console.log("Test: " + objeto1.test);

//-- También se pueden llamar a las propiedades usando su nombre entre [] y ""
console.log("")
console.log("Nombre: " + objeto1["nombre"]);
console.log("Valor: " + objeto1["valor"]);
console.log("Test: " + objeto1["test"]);

//-- Comprobar si un objeto tiene una propiedad
if ("test" in objeto1){
    console.log("\nTiene propiedad test");
}

//-- Recorrer todas las propiedades
console.log("")
for (prop in objeto1){
    console.log(`Propiedad: ${prop} --> Valor: ${objeto1[prop]}`);
}

//-- Forma abreviada para obtener constantes con prop. del objeto
const { valor, nombre } = objeto1;


console.log("");
console.log("Nombre: " + nombre);
console.log("Valor: " + valor);


//-- Ejemplo de arrays literales

//-- Crear una lista(array) de 4 elementos

const a = [2, 3, 4, 5];

//-- Mostramos el elemento 2
console.log("")
console.log("Elemento 2: " + a[2]);

//-- Recorrer todos los elementos

for (i in a) {
    console.log(`a[${i}] = ${a[i]}`);
}

//-- Imprimimos el numero total de elementos

console.log("Cantidad de elementos:" + a.length);


//-- Ejemplo de definicion de funciones

//-- Se definen 4 funciones sin parámetros de diferentes formas

//-- Definición clásica

console.log("")
function mi_f1(){
    console.log("Mi función 1!");
}

const mi_f2 = function() {
    console.log("Mi función 2...");
}

//-- Otra forma de hacer lo anterior, pero abreviadamente
const mi_f3 = () => {
    console.log("Mi función 3...")
}

//-- Definición de funciones dentro de un objeto literal

const z = {
    x : 10,
    f4 : function(){
        console.log("Mi función 4!!!");
    },
    f5: () => {
        console.log("Mu función 5!!!");
    }
}

mi_f1()
mi_f2()
mi_f3()
z.f4()
z.f5()


