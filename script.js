// Cargar tareas guardadas al abrir la página
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Crear elemento de la tarea
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item";
    taskItem.textContent = taskText;

    // Marcar como completada al hacer clic
    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Guardar tareas y limpiar input
    saveTasks();
    taskInput.value = "";
}

// Guardar tareas en LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((taskItem) => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Cargar tareas desde LocalStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.className = "list-group-item";
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        taskItem.appendChild(deleteButton);
        document.getElementById("taskList").appendChild(taskItem);
    });
}