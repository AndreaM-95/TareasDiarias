const btn = document.querySelector('[data-form-btn]');

const createTask = (evento) => {                             //Este evento es el que genera el formulario
    evento.preventDefault();
    const input = document.querySelector('[data-form-input]');      //Donde el usuario digita la tarea
    const list = document.querySelector('[data-list]');             //Donde se van agregando las tareas
    const calendar = document.querySelector('[data-form-date]');    //Calendario para seleccionar la fecha

    const usuario = input.value;                            //Tomamos el texto que digitó el usuario
    const date = calendar.value;                                //Obtenemos la fecha que el usuario seleccionó
    const dateFormat = moment(date).format("DD/MM/YYYY");       //Le damos el formato con el uso de la librería moment()

    if(usuario == "" || date == ""){                  //Si la tarea o la fecha está vacío mande la alert y retorne al inicio
        alert("No se permiten campos vacíos");
        return;
    }

    input.value = '';                               //Luego de agregar la tarea con la fecha, deja el input vacío
    calendar.value = '';

    const task = document.createElement('li');              //Generamos un elemento de tipo li
    task.classList.add('card');                             //Agregaremos una clase llamada card
 
    const taskContent = document.createElement('div');      //Generamos un elemento de tipo div

    const titleTask = document.createElement('span');       //Generamos un elemento de tipo span 
    titleTask.classList.add('task');                        //Al elemento span creado le asignamos la tarea (task) 
    titleTask.innerText = usuario;                            //Agregamos el texto que escribió el usuario
    taskContent.appendChild(checkComplete());               //Agregamos la caja de check
    taskContent.appendChild(titleTask);                     //Agregamos el título de la tarea

    task.appendChild(taskContent);                          //Agregamos un nuevo div (Luego de crear una tarea se reinici)
    task.appendChild(deleteIcon());                         //Agregamos un nuevo ícono de basurita
    list.appendChild(task);                                 //Agregamos una nueva lista

    const taskObj = {                   //Generamos una constante que es un objeto que almacena el valor y la fecha
        usuario,
        dateFormat
    };
    
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];    //Aquí guardará las tareas en localStorage
    taskList.push(taskObj);                                             //Incertamos las tareas al array de arriba
    localStorage.setItem('tasks', JSON.stringify(taskList));             //Lo que entre al array se vuelve string
    
    const tarea = createTask(taskObj);
    list.appendChild(tarea);
};

btn.addEventListener('click', createTask);                //Capturamos el evento y se ejecuta la función