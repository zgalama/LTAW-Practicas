const electron = require('electron')
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const path = require('path');
const colors = require('colors');
const ip = require('ip');

const PUERTO = 9090;
const dir_ip = `${ip.address()}:${PUERTO}`;

//-- Crear una nueva aplicación web
const app = express();

//-- Crear un servidor, asociado a la App de express
const server = http.Server(app);


//-- Crear el servidor de websockets, asociado al servidor HTTP
const io = socket(server);

//-- Creamos constante para usuarios en línea
let users_connected = 0;

const users = {}; // Objeto para almacenar los apodos de los usuarios conectados

//-- Variable para acceder a la ventana principal
let win = null;

//-- Entradas para la app web
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.redirect('/chat.html');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname + '/'));

//-- El directorio público contiene ficheros estáticos
app.use(express.static('public'));

// Manejar otros eventos de la aplicación
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

//------------------- GESTIÓN DE SOCKETS IO
//-- Evento: Nueva conexión recibida
io.on('connect', (socket) => {
    console.log('** NUEVA CONEXIÓN **'.yellow);

    //-- Incrementar el contador de usuarios conectados
    users_connected++;

    //-- Evento de recepción del apodo del usuario
    socket.on('nickname', (nickname) => {
        users[socket.id] = nickname;
        io.emit('userList', Object.values(users)); // Enviar la lista de usuarios a todos los clientes

    });

    //-- Enviar mensaje de bienvenida al nuevo usuario (verde)
    socket.emit('message', '<span style="color: green;">¡Bienvenido al chat!</span>');

    //-- Evento de desconexión
    socket.on('disconnect', function () {
        console.log('** CONEXIÓN TERMINADA **'.red);

        //-- Decrementar el contador de usuarios conectados
        users_connected--;

        const nickname = users[socket.id] || 'Anónimo'; // Obtener el apodo del usuario o establecerlo como "Anónimo" si no tiene apodo
        delete users[socket.id]; // Eliminar al usuario desconectado de la lista
        io.emit('userList', Object.values(users)); // Actualizar la lista de usuarios en todos los clientes

        //-- Notificar a todos los clientes que alguien se ha desconectado (rojo)
        socket.broadcast.emit('message', `<span style="color: red;">${nickname} se ha desconectado del chat.</span>`);

    });

    //-- Evento de recepción de mensajes
    socket.on("message", (msg) => {
        console.log("Mensaje Recibido!: ".blue + msg);
        const nickname = users[socket.id] || 'Anónimo'; // Obtener el apodo del usuario o establecerlo como "Anónimo" si no tiene apodo
        
        if (msg.startsWith('/')) {
            handleCommand(msg, socket, nickname);
        } else {
            //-- Si no es un comando especial, reenviarlo a todos los clientes conectados
            io.emit("message", `<strong>${nickname}:</strong> ${msg}`); // Enviar el mensaje con el apodo del usuario
            win.webContents.send('mensaje', `${nickname}: ${msg}`)
        }
    });

    //-- Evento de recepción de "typing"
    socket.on('typing', () => {
        const nickname = users[socket.id] || 'Anónimo';
        socket.broadcast.emit('typing', nickname);
    });

    //-- Evento de recepción de "stop typing"
    socket.on('stop typing', () => {
        const nickname = users[socket.id] || 'Anónimo';
        socket.broadcast.emit('stop typing', nickname);
    });
});

//-- Función para manejar los comandos especiales
function handleCommand(msg, socket, nickname) {
    const command = msg.substring(1); // Eliminar el '/' del comando
    switch (command) {
        case 'help':
            sendToClient(socket, 'Lista de comandos soportados: /help, /list, /hello, /date');
            break;
        case 'list':
            sendToClient(socket, `Número de usuarios en línea: ${users_connected}`);
            break;
        case 'hello':
            sendToClient(socket, 'Hola! Que tengas un buen día!');
            break;
        case 'date':
            sendToClient(socket, `La fecha actual es: ${new Date().toLocaleDateString()}`);
            break;
        default:
            sendToClient(socket, `Comando desconocido: ${command}`);
    }
}

//-- Función para enviar un mensaje solo al cliente que lo solicitó
function sendToClient(socket, message) {
    socket.emit('message', message);
}


//-- Punto de entrada de Electron 
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");


    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura
        icon: path.join(__dirname, 'chat_logo.PNG'), // ´-- Para empaquetar 

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

    //-- Cargar interfaz gráfica en HTML
    win.loadFile("index.html");

    //-- Esperar a que la página se cargue y se muestre
    //-- y luego enviar el mensaje al proceso de renderizado para que 
    //-- lo saque por la interfaz gráfica
    win.on('ready-to-show', () => {
    win.webContents.send('numero-usuarios', users_connected);
    win.webContents.send('direccion-ip', dir_ip);
    });

});


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola

electron.ipcMain.handle('test', (event, message) => {
    console.log(message);
    io.send(message); // -- Se envian el mensaje del server a todos los clientes 
})

//-- Lanzar el servidor HTTP
server.listen(PUERTO, () => {
    console.log("Escuchando en puerto: " + PUERTO);
});