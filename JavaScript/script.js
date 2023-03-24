/* funciones */
function agregarEmpleado(){
    /* elementos */
    const nombre = document.getElementById("nombre")
    const apellido = document.getElementById("apellido")
    const edad = document.getElementById("edad")
    const puesto = document.getElementById("puesto")
    const salario = document.getElementById("salario")

    /* agregar al Local Storage */
    localStorage.setItem("nombre", nombre.value)
    localStorage.setItem("apellido", apellido.value)
    localStorage.setItem("edad", edad.value)
    localStorage.setItem("puesto", puesto.value)
    localStorage.setItem("salario", salario.value)
}

/* checkbox */
function alternar(checkbox){
    if (checkbox.name === 'masculino' && checkbox.checked){
        document.querySelector('input[name="femenino"]').checked = false
    }
    if (checkbox.name === 'femenino' && checkbox.checked){
        document.querySelector('input[name="masculino"]').checked = false
    }
}