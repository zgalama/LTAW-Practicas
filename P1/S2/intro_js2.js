//-- Ejemplo de paso de parametros a funciones

//-- Recibe dos parámetros y devuelve su suma

function suma(x,y){
    //-- devuelve la suma
    return x+y;
}


//-- Recibe un parámtero y lo imprime por la consola
function mensaje(msg){
    console.log(msg);
}

//-- Función que no recibe parametros

function saluda(){
    console.log("HOLA!!");
}

//-- Función que recibe una funcion como parametro y la llama

function llamar(func){
    console.log("--> Funcion recibida");

    func();
}

let x = suma(3,2);

mensaje("Prueba")
mensaje(x);

llamar(saluda);

//-- Pasamos como parametro una funcion que se define dentro de los parametros
//-- en vez de fuera

llamar ( () => {
    mensaje("Holiii!!")
});


//-- TEMPORIZADORES

//-- Función a ejecutar tras un tiempo
//-- Función de retrollamada del temporizador

function tarea1() {
    console.log("Tarea 1 completada!");
}



//-- Llamada retardada mediante temporarizador
//-- Cuando transcurran 1000 ms se llama a la función
setTimeout(tarea1, 1000);


//-- Incluir la funcion de retrollamda dir. en el parametro, en vez de fuera

setTimeout( () => {
    console.log("Tarea 2 completada!");
}, 2000);

console.log("Esperando a que terminen las tareas");


//-- Esta funcion de retrollamada se invoca cada 200 ms
//-- Se guarda su id en la variable id para poder quitar el tempor. 

let id = setInterval( () => {
    console.log("Tic...");
}, 200);

//-- Al cabo de 3 segundos se desactiva el tempo
setTimeout( () => {
    clearInterval(id)
    console.log("Stop!");
}, 3000);