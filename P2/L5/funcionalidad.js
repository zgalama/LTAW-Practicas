const inputQuantity = document.querySelector('.input_quantity')
const btnIncrement = document.querySelector('#increment')
const btnDecrement = document.querySelector('#decrement')
const toggleDescription = document.querySelector('.title-description')
const toggleAddInfo = document.querySelector('.title-adit-info')
const contentDescription = document.querySelector('.text-description')
const contentAddInfo = document.querySelector('.text-adit-info')


let valueByDefault = parseInt(inputQuantity.value)

btnIncrement.addEventListener('click', () => {
    valueByDefault += 1
    inputQuantity.value = valueByDefault
})

btnDecrement.addEventListener('click', () => {

    if (valueByDefault === 1){
        return
    }
    valueByDefault -= 1
    inputQuantity.value =valueByDefault
})


toggleDescription.addEventListener('click', () => {
    contentDescription.classList.toggle('hidden');
})

toggleAddInfo.addEventListener('click', () =>{
    contentAddInfo.classList.toggle('hidden');
})

