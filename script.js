
//constants declared for input button and task list area
const taskInput = document.querySelector("#new-task-input");
const dateInput = document.querySelector("#due-date");
const taskSection = document.querySelector(".tasks");

let allTasks;

//get today's date
const date = new Date();
const dateToday = date.getFullYear()+"-"+parseInt(date.getMonth()+1)+"-"+date.getDate();



//listener for Enter key. Used to add new task
taskInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && dateInput.value != "") {
        createTask();
    }
});

//onClick event for add button
document.querySelector('#push').onclick = function () {
    createTask();
}


if (JSON.parse(localStorage.getItem('allTasks'))) {
    allTasks = JSON.parse(localStorage.getItem('allTasks'))
} else {
    allTasks = []
}


function showNotification(task) {
    const taskMessage = `${task.task_name.toUpperCase()} IS DUE TODAY!`;

    if (Notification.permission === "granted") {
        new Notification(taskMessage);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(taskMessage);
            }
        });
    }
}


function readCurrentTasks(){
    return currentTasks = document.getElementsByClassName('task-p');
}



function displayTaskManager(allTasks){
    for (let i = 0; i < allTasks.length; i++) {

        taskSection.innerHTML +=
            `<div  id ="${allTasks[i].task_name.replace(/\s+/g, '')}" class="task">
            <label class="task-name">
            <input onclick="updateTask(this)" type="checkbox" id="check-task">
            <p class="task-p">${allTasks[i].task_name}</p>
            </label>
            <span class="class="due-date-span">Due: ${allTasks[i].task_date}</span>
            <div class="delete">
            <i class="uil uil-trash"></i></div></div>
            `
    }

    displayScroll()
    addDeleteListeners()
    checkTaskDates()
}


function getCurrentTasks(){
    let currentTasks = Array.from(document.getElementsByClassName("task-p")).map(task =>
        task.innerText.replaceAll(" ", "").toLowerCase())
    return currentTasks
}

//function that creates task
function createTask() {
    
    const dueDate = new Date(dateInput.value);
    let currentTasks =getCurrentTasks()
    console.log(currentTasks)

    if (taskInput.value.length == 0) {
        alert("This field is blank. Enter a task name and try again");
    }
    else if (currentTasks.includes(taskInput.value.replaceAll(" ","").toLowerCase())){
        alert("Task already exists");
    }
    else if (dateInput.value.length == 0) {
        alert("Please add due date")
    }
    else if (dueDate < date.setHours(0, 0, 0)) {
        alert("Due date cannot be in the past.");
    }
    else {


        let taskObject = {
            'task_name': taskInput.value,
            'task_date': dateInput.value
        }

        allTasks.push(taskObject);
        localStorage.setItem(`allTasks`, JSON.stringify(allTasks));


        taskSection.innerHTML +=
            `<div class="task">
        <label class="task-name">
        <input onclick="updateTask(this)" type="checkbox" id="check-task">
        <p class="task-p">${taskInput.value}</p>
        </label>
        <span class="due-date-span">Due: ${dateInput.value}</span>
        <div class="delete">
        <i class="uil uil-trash"></i></div></div>
        `

        taskInput.value = '';
        dateInput.value = '';

    }

    addDeleteListeners();  
    displayScroll();
}


function displayScroll(){
    taskSection.offsetHeight >= 300
        ? taskSection.classList.add("overflow")
        : taskSection.classList.remove("overflow")
}


function addDeleteListeners() {
    var currentTasks = document.querySelectorAll(".delete");
    for (var i = 0; i < currentTasks.length; i++) {
        currentTasks[i].setAttribute("id", i);
        currentTasks[i].onclick = function () {
            var allTasksIndex = this.getAttribute('id');
            allTasks.splice(allTasksIndex, 1);
            localStorage.setItem(`allTasks`, JSON.stringify(allTasks));
            this.parentNode.remove();
        }
    }

}

function checkTaskDates(){
    allTasks.forEach(task => {
        if (task.task_date == dateToday) {
            showNotification(task)
        }
    });
}




function updateTask(task) {
    let taskItem = task.parentElement;
    if (task.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}



displayTaskManager(allTasks)
