//--Módulos
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const path = require('path'); 
const colors = require('colors');

const PUERTO = 9090;
//-- Crear una nueva aplicación web
const app = express();
//-- Crear un servidor, asociado a la App de express
const server = http.Server(app);
//-- Crear el servidor de websockets, asociado al servidor HTTP
const io = socket(server);
//-- Creamos constante para usuarios conectados
let num_users = 0;
// -- Dicionario para los nicknames de los usuarios
const users = {}; 


//-------- PUNTOS DE ENTRADA DE LA APLICACIÓN WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.redirect('/chat.html');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname + '/'));

//-- El directorio público contiene ficheros estáticos
app.use(express.static('public'));

//---------FUNCIONES PARA SOCKET:

//-- Función para enviar un mensaje solo al cliente
function sendToClient(socket, message) {
    socket.emit('message', message);
}

//-- Función para manejar los comandos especiales
function comandos(msg, socket, nickname) {
    const command = msg.substring(1); // Eliminar el '/' 
    switch (command) {
        case 'help':
            sendToClient(socket, 'Lista de comandos soportados: /help, /list, /hello, /date');
            break;
        case 'list':
            sendToClient(socket, `Número de usuarios: ${num_users}`);
            break;
        case 'hello':
            sendToClient(socket, 'Buenas, espero que todo le vaya bien');
            break;
        case 'date':
            sendToClient(socket, `La fecha actual es: ${new Date().toLocaleDateString()}`);
            break;
        default:
            sendToClient(socket, `Comando desconocido: ${command}`);
    }
}

//------------------- GESTIÓN DE SOCKETS IO
//-- Evento: Nueva conexión recibida
io.on('connect', (socket) => {
    console.log('** NUEVA CONEXIÓN **'.yellow);

    //-- Contador para usuarios que se conecten
    num_users += 1;

    //-- Usuarios que se conectan
    socket.on('nickname', (nickname) => {
        users[socket.id] = nickname;
        io.emit('userList', Object.values(users)); // Enviar la lista de usuarios a todos los clientes
        socket.broadcast.emit('message', `<span style="color: blue;">${nickname} se ha unido al chat.</span>`);
    });

    //-- Mensaje de bienvenida 
    socket.emit('message', '<span style="color: green;">¡Bienvenido al chat Motomami!</span>');

    //-- Evento de recepción de mensajes
    socket.on("message", (msg) => {
        console.log("Mensaje Recibido!: ".blue + msg);
        const nickname = users[socket.id] || 'Anonimous'; 
        
        if (msg.startsWith('/')) {
            comandos(msg, socket, nickname);
        } else {
            //-- Si no es un comando especial, reenviarlo a todos los clientes conectados
            io.emit("message", `<strong>${nickname}:</strong> ${msg}`); // Enviar el mensaje con el nickname del cliente
        }
    });

    //-- Evento cuando se está escribiendo
    socket.on('typing', () => {
        const nickname = users[socket.id] || 'Anonimous';
        socket.broadcast.emit('typing', nickname);
    });

    //-- Evento al parar de escribir
    socket.on('stop typing', () => {
        const nickname = users[socket.id] || 'Anonimous';
        socket.broadcast.emit('stop typing', nickname);
    });

    //-- Evento de desconexión
    socket.on('disconnect', function () {
        console.log('** CONEXIÓN TERMINADA **'.red);

        //-- Se resta un usuario al desconectarse
        num_users -= 1;

        const nickname = users[socket.id] || 'Anonimous'; // Si no hay apodo, se pone uno por defecto
        delete users[socket.id]; // Eliminar al usuario desconectado de la lista
        io.emit('userList', Object.values(users)); // Actualizar la lista de usuarios en todos los clientes

        //-- Notificar a todos los clientes que alguien se ha desconectado 
        socket.broadcast.emit('message', `<span style="color: red;">${nickname} se ha desconectado.</span>`);
    });
});


//-- Lanzar el servidor HTTP
server.listen(PUERTO, () => {
    console.log("Escuchando en puerto: " + PUERTO);
});