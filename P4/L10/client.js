const display = document.getElementById("display");
const message = document.getElementById("msg");
const messageSound = document.getElementById("sonido");
const userList = document.getElementById("user-list");

//-- Pedir al usuario su apodo al cargar la página
const nickname = prompt("Por favor, introduce tu nickname:");
//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
//-- Enviar el apodo al servidor
socket.emit('nickname', nickname);

//-- Variable para controlar si el usuario está escribiendo
let typing = false;

//-- Manejar el evento de escribir en el input
message.addEventListener('input', () => {
    //-- Si está escribiendo, se envía a los demás usuarios que está escribiendo x usuario, si no, nada
    if (message.value.trim() !== '' && !typing) {
        socket.emit('typing');
        typing = true;
    } else if (message.value.trim() === '' && typing) {
        socket.emit('stop typing');
        typing = false;
    }
});

//-- Se añade el mensaje enviado
socket.on("message", (msg) => {
    display.innerHTML += '<p style="color:black">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
message.onchange = () => {
    if (message.value) {
        socket.send(message.value);
        //-- Reproducir el sonido de mensaje enviado
        messageSound.play();
        typing = false;
        socket.emit('stop typing');
    }
    message.value = "";
}


//-- Mientras se escribe
socket.on('typing', (nickname) => {
    display.innerHTML += '<p style="color: gray">' + nickname + ' está escribiendo...</p>';
});

//-- Cuando el user deja de escribir
socket.on('stop typing', (nickname) => {
    const paragraphs = display.getElementsByTagName('p');
    for (let i = 0; i < paragraphs.length; i++) {
        if (paragraphs[i].textContent.includes(nickname + ' está escribiendo...')) {
            display.removeChild(paragraphs[i]);
            break;
        }
    }
});

socket.on('userList', (users) => {
    userList.innerHTML = ''; // Limpiar la lista de usuarios antes de actualizarla
    users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('user-item');
        
        if (user === nickname) {
            div.textContent = user + ' (Tú)';
            div.style.color = 'green'; 
        } else {
            div.textContent = user;
        }
        userList.appendChild(div);
    });
});
