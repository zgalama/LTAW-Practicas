const electron = require('electron');


//-- Constantes para interactuar con nuestra interfa gráfica

const nodeVersion = document.getElementById('nodeVersion');
const electronVersion = document.getElementById('electronVersion');
const chromeVersion = document.getElementById('chromeVersion');
const num_users = document.getElementById('users-connected');
const arquitectura = document.getElementById('arquitectura');
const plataforma = document.getElementById('plataforma');
const directorio = document.getElementById('directorio');
const btn_pruebas = document.getElementById('btn');
const display = document.getElementById('serverMessages');
const ip = document.getElementById('chat-ip');

//-- Acceso a las API para obtener su info
nodeVersion.textContent = process.version;
electronVersion.textContent = process.versions.electron;
chromeVersion.textContent = process.versions.chrome;

arquitectura.textContent = process.arch;
plataforma.textContent = process.platform;
directorio.textContent = process.cwd();

//-- Si se pulsa el botón de prueba se envía el mensaje al proceso principal
btn_pruebas.onclick = () => {
    electron.ipcRenderer.invoke('test', "Este es un mensaje de prueba del servidor")
    display.innerHTML += '<p> Mensaje enviado a todos los clientes! </p>';
}

//-- Evento recibido del proceso principal con el nº de usuarios
electron.ipcRenderer.on('numero-usuarios', (event, message) => {
    num_users.textContent = message;
});

//-- Evento recibido del proceso principal con la ip de conexión
electron.ipcRenderer.on('direccion-ip', (event, message) => {
    ip.textContent = message;
});

//-- Evento recibido del proceso principal con los mensajes de los clientes
electron.ipcRenderer.on('mensaje', (event, message) => {
    display.innerHTML += '<p>' + message + '</p>';
});