const inputQuantity = document.querySelector('.input-quantity');
const btnIncrement = document.querySelector('#increment');
const btnDecrement = document.querySelector('#decrement');

let valueByDefault = parseInt(inputQuantity.value);

// Funciones

btnIncrement.addEventListener('click', () => {
    valueByDefault += 1
    inputQuantity.value = valueByDefault
});

btnDecrement.addEventListener('click', () => {

    if (valueByDefault === 1){
        return
    }
    valueByDefault -= 1
    inputQuantity.value =valueByDefault
});

// Toggle
// Constantes Toggle Titles
const toggleDescription = document.querySelector('.title-description');
const toggleAddInfo = document.querySelector('.title-adit-info');



// Constantes Texto

const contentDescription = document.querySelector('.text-description');
const contentAddInfo = document.querySelector('.text-adit-info');


// Funciones Toggle

toggleDescription.addEventListener('click', () => {
    contentDescription.classList.toggle('hidden');
});

toggleAddInfo.addEventListener('click', () =>{
    contentAddInfo.classList.toggle('hidden');
});
