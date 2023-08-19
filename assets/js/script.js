// ----- DECLARANDO VARIABLES -----
let tareaInput = document.getElementById("tareaInput")
let btnAgregar = document.getElementById("btnAgregar")
let total = document.getElementById("total")
let realizados = document.getElementById("realizados")
let lista = document.getElementById("lista")

// ----- ARREGLO INICIAL ------
let todoList = [
    {id:1, description:'Hacer el almuerzo', completado:false},
    {id:2, description:'Ir a comprar al supermercado', completado:false},
    {id:3, description:'Hacer el desafío de esta semana', completado:false}
]
//---- CONTADOR DE TAREAS COMPLETADAS ----
function todoChecked(){
    let contador = 0
    todoList.forEach(tarea => {
        if (tarea.completado == true){
            contador += 1
        }
    })
    realizados.innerHTML = contador
}

// ---- RENDER -----
function renderTodoList(){
    let html = ''
    todoList.forEach(tarea => {
        if (tarea.completado == false){
            html += `
            <tr>
                <td>${tarea.id}</td>
                <td style="color: black">${tarea.description}</td>
                <td><button onClick="realizado(${tarea.id})">Listo</button></td>
                <td onclick="borrar(${tarea.id})">❌</td>
            </tr>
            `
        }else{
            html += `
            <tr>
                <td>${tarea.id}</td>
                <td style="color: green"><del>${tarea.description}</del></td>
                <td><button onClick="realizado(${tarea.id})">desmarcar</button></td>
                <td onclick="borrar(${tarea.id})">❌</td>
            </tr>
            `
        }
    })
    total.innerHTML = todoList.length
    lista.innerHTML = html
    todoChecked()
}

//---- CARGAR EL SITIO CON EL ARREGLO INCIAL -----
renderTodoList()

//---- AGREGAR UNA TAREA A LA LISTA -----
btnAgregar.addEventListener("click", () => {
    const d = new Date()
    let uid = d.getHours() + d.getMinutes() + d.getSeconds()
    let tareaNueva = tareaInput.value
    if (tareaNueva != ''){
        todoList.push({id:uid, description:tareaNueva, completado:false})
        tareaInput.value = ''
        renderTodoList()
    }else{
        alert('Ingrese una tarea para poder agregarla a la lista')
    }
})

//---- BORRAR UNA TAREA DE LA LISTA ----
function borrar(id){
    let indice = todoList.findIndex((ele) => ele.id == id)
    todoList.splice(indice,1)
    renderTodoList()
    console.table(todoList)
}

//---- MARCAR TAREA COMO LISTA ----
function realizado(id){
    let indice = todoList.findIndex((ele) => ele.id == id)
    if (todoList[indice].completado == false){
        todoList[indice].completado = true
        renderTodoList()
    }else{
        todoList[indice].completado = false
        renderTodoList()
    }
    console.table(todoList)
}