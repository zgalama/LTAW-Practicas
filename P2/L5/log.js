// Para el log-in y registro
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});


var login = document.querySelector('.log-in');
var registro = document.querySelector('.register');

registro.addEventListener('submit', (event) => {
    event.preventDefault();
    // Obtener datos del formulario
    const nuevoUsuario = {
        user: document.getElementById('name').value,
        correo: document.getElementById('password').value,
        contrasena : document.getElementById('password').value
    };

    sendData('/register', nuevoUsuario); // Enviar datos al servidor
});

login.addEventListener('submit', (event) => {
    event.preventDefault();
    // Obtener datos del formulario
    const Usuario= {
        user: document.getElementById('name').value,
        contrasena: document.getElementById('password').value,
    };

    sendData('/register', Usuario); // Enviar datos al servidor
});


// Función para enviar datos al servidor
function sendData(url, data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        alert(response.message); // Mostrar el mensaje del servidor
      } else {
        alert('Error en la petición');
      }
    };
    xhr.send(JSON.stringify(data));
  }