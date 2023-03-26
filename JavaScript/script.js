/* elementos */
const idEmpleado = document.getElementById("id")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const checkedMasculino = document.getElementById("masculino")
const checkedFemenino = document.getElementById("femenino")
const edad = document.getElementById("edad")
const puesto = document.getElementById("puesto")
const salario = document.getElementById("salario")
const empleados = JSON.parse(localStorage.getItem("empleados")) || []

const bodyTable = document.getElementById("bodyTable")

const btnAgregar = document.getElementById("btnAgregar")
const btnConfirmar = document.getElementById("btnConfirmar")
/* Arreglo de objeto de empleados y objeto empleado*/

/* funciones */
const agregarEmpleado = () =>{
    let empleado = { //crea un nuevo objeto empleado
        id: crypto.randomUUID(), //le asigna un id unico
        nombre: nombre.value,
        apellido: apellido.value,
        edad: edad.value,
        puesto: puesto.value,
        salario: salario.value,
    }
    if(checkedMasculino.checked === true){
        empleado.sexo = "hombre"
    }else if(checkedFemenino.checked === true){
        empleado.sexo = "mujer"
    }

    empleados.push(empleado) //agrega el objeto al arreglo empleados
    console.log(empleados) //imprime en consola los cambios del arreglo
    localStorage.setItem("empleados",JSON.stringify(empleados))

    nombre.value=""
    apellido.value=""
    edad.value=""
    puesto.value="default"
    salario.value=""
    checkedMasculino.checked = false
    checkedFemenino.checked = false

    mostrarEmpleado()
}

const mostrarEmpleado = () =>{
    bodyTable.innerHTML = ""
    empleados.forEach((empleado) => {
        bodyTable.innerHTML += `<tr>
        <th scope="row">${empleado.id}</th>
        <td>${empleado.nombre}</td>
        <td>${empleado.apellido}</td>
        <td>${empleado.edad}</td>
        <td>${empleado.sexo}</td>
        <td>${empleado.puesto}</td>
        <td>${empleado.salario}</td>
        <td><button onclick="eliminarEmpleado('${empleado.id}')">Eliminar</button></td>
        <td><button onclick="editarEmpleado('${empleado.id}')">Editar</button></td>
        </tr>
        `
    });
}

const eliminarEmpleado = (id) =>{
    const empleado = empleados.find((empleado) => empleado.id === id)
    console.log(empleado,"Eliminado")
    const index = empleados.indexOf(empleado)
    empleados.splice(index,1)
    localStorage.setItem("empleados",JSON.stringify(empleados))
    mostrarEmpleado()
}

const editarEmpleado = (id) =>{
    const empleado = empleados.find((empleado) => empleado.id === id)
    console.log(empleado,"editando")
    nombre.value = empleado.nombre
    apellido.value = empleado.apellido
    edad.value = empleado.edad
    puesto.value = empleado.puesto
    salario.value = empleado.salario

    if(empleado.sexo === "hombre"){
        checkedMasculino.checked = true
    }else if(empleado.sexo === "mujer"){
        checkedFemenino.checked =true
    }

    idEmpleado.style.display = "inline"
    idEmpleado.value = empleado.id
    btnAgregar.style.display = "none"
    btnConfirmar.style.display = "inline"

    bodyTable.setAttribute("class","ocultarbtn")
}

const confirmarEdicion = () =>{
    const empleado = empleados.find((empleado)=> empleado.id === id.value)
    empleado.nombre = nombre.value
    empleado.apellido = apellido.value
    empleado.edad = edad.value
    empleado.puesto = puesto.value
    empleado.salario = salario.value
    if(checkedMasculino.checked === true){
        empleado.sexo = "hombre"
    }else if(checkedFemenino.checked === true){
        empleado.sexo = "mujer"
    }
    localStorage.setItem("empleados", JSON.stringify(empleados))
    btnAgregar.style.display = "inline"
    btnConfirmar.style.display = "none"
    id.style.display = "none"
    nombre.value = ""
    apellido.value = ""
    edad.value = ""
    puesto.value = "default"
    salario.value = ""
    checkedMasculino.checked = false
    checkedFemenino.checked = false

    bodyTable.removeAttribute("class")
    mostrarEmpleado()
}

btnAgregar.addEventListener("click",(Event)=>{
    Event.preventDefault()
    agregarEmpleado()
})
btnConfirmar.addEventListener("click",(Event)=>{
    Event.preventDefault()
    confirmarEdicion()
})






/* checkbox */
function alternar(checkbox){
    if (checkbox.name === 'masculino' && checkbox.checked){
        document.querySelector('input[name="femenino"]').checked = false
    }
    if (checkbox.name === 'femenino' && checkbox.checked){
        document.querySelector('input[name="masculino"]').checked = false
    }
}

/* mostrar empleados cada que cargue la pagina */
window.addEventListener("load",mostrarEmpleado)