
// Función para mostrar los productos
function displayProducts(products) {
    const container = document.getElementById('#carrito_prod');
    products.forEach(product => {
      // Crear un contenedor para cada producto
      const productElement = document.createElement('div');
      productElement.className = 'product';
  
      // Crear el contenido del producto
      productElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>Precio: $${product.precio}</p>
      `;
  
      // Añadir el contenedor del producto al contenedor principal
      container.appendChild(productElement);
    });
  }
  
  // Función para cargar productos desde un archivo JSON
  async function loadProducts() {
    try {
      const response = await fetch('tienda.json');
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      const products = await response.json();
      const pro = products.producto;
      displayProducts(pro);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Asegurarse de que el DOM esté completamente cargado antes de ejecutar la función
  document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
  });
  

data = document.getAnimations('datos')


data.addEventListener('sumbit', () => {

    // Recolecta los datos del formulario
    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
    data[key] = value;
    });

    // Convierte los datos a JSON
    const jsonData = JSON.stringify(data);

    // Aquí puedes manejar los datos JSON como prefieras
    // Por ejemplo, mostrarlos en la consola
    console.log(jsonData);

    // Si quieres mostrar los datos JSON en la página
    const pre = document.createElement('pre');
    pre.textContent = jsonData;
    document.body.appendChild(pre);
});