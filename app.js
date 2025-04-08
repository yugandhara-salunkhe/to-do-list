document.addEventListener("DOMContentLoaded",() =>{
    const storedTasks =JSON.parse(localStorage.getItem("tasks"))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task));
        updateTaskslist();
        updatestats();
    }
});


let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
};


const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskslist();
        updatestats();
        saveTasks();
    };
};

const toogleTastcompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskslist();
    updatestats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskslist();
    updatestats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text

    tasks.splice(index,1);
    updateTaskslist();
    updatestats();
    saveTasks();
};

const updatestats = () =>{
    const completetasks = tasks.filter((task)=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completetasks / totalTasks)*100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${'progress'}%`;

    document.getElementById('numbers').innerText =`${completetasks} / ${totalTasks}`;
};

const updateTaskslist = ()=> {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""} ">
            <input type="checkbox" class="checkbox" ${
                task.completed ? "checked" : "" }/>
            <p>${task.text}</p>
          </div>
          <div class="icons">
            <img src="./image/edit-button.png" onclick="editTask(${index})"/>
            <img src="./image/delete (1).png" onclick="deleteTask(${index})"/>
          </div>
        </div>
        `;

        listItem.addEventListener("change",() => toogleTastcompleted(index));
        taskList.append(listItem);

    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();

    addTask();
});

