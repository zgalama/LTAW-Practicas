
//-- Elementos HTML para mostrar la información
const display = document.querySelector(".button");

//-- Caja de búsquedas
const caja_busqueda = document.querySelector("#s");

caja_busqueda.addEventListener('input', () => {
    const terminoBusqueda = caja_busqueda.value;
  
    if (terminoBusqueda.length >= 1) {
      fetch(`/buscar?q=${terminoBusqueda}`) // Petición AJAX a la nueva ruta
        .then(response => response.json())
        .then(productosFiltrados => {
          // Limpiar resultados anteriores
          display.innerHTML = '';
  
          // Mostrar los productos filtrados
          if (productosFiltrados.length === 0) {
            display.innerHTML = 'No se encontraron resultados';
          } else {
            productosFiltrados.forEach(producto => {
              const enlace = document.createElement('a');
              enlace.href = `/producto.html?nombre=${producto.nombre}`; // Enlace a la página del producto
              enlace.textContent = producto.nombre;
              display.appendChild(enlace);
              display.appendChild(document.createElement('br')); // Salto de línea
            });
          }
        })
        .catch(error => {
          console.error('Error en la petición:', error);
          // Manejar el error de alguna manera (mostrar un mensaje al usuario, etc.)
        });
    } else {
      // Ocultar el contenedor de resultados si no hay término de búsqueda
      display.style.display = 'none';
    }
  });