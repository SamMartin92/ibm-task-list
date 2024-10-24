
//constants declared for input button and task list area
const taskInput = document.querySelector("#new-task-input");
const dateInput = document.querySelector("#due-date");
const taskSection = document.querySelector(".tasks");
let allTasks;

//get today's date
const date = new Date();
const dateToday = date.getFullYear()+"-"+parseInt(date.getMonth()+1)+"-"+date.getDate();

console.log(dateToday);
console.log("yo");

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

function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}



if (JSON.parse(localStorage.getItem('allTasks'))) {
    allTasks = JSON.parse(localStorage.getItem('allTasks'))
} else {
    allTasks = []
}



// display existing tasks in taskSection
for (let i = 0; i < allTasks.length; i++) {

    taskSection.innerHTML +=
        `<div  id ="${allTasks[i].task_name.replace(/\s+/g, '')}" class="task">
        <label id="taskname">
        <input onclick="updateTask(this)" type="checkbox" id="check-task">
        <p>${allTasks[i].task_name}</p>
        </label>
        <span>Due: ${allTasks[i].task_date}</span>
        <div class="delete">
        <i class="uil uil-trash"></i></div></div>
        `
}


addDeleteListeners()



//function that creates task
function createTask() {
    
    
    const dueDate = new Date(dateInput.value);

    if (taskInput.value.length == 0) {
        alert("This field is blank. Enter a task name and try again");
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
        <label id="taskname">
        <input onclick="updateTask(this)" type="checkbox" id="check-task">
        <p>${taskInput.value}</p>
        </label>
        <span>Due: ${dateInput.value}</span>
        <div class="delete">
        <i class="uil uil-trash"></i></div></div>
        `

        showNotification("This notification")
        taskInput.value = '';
        dateInput.value = '';

    }

    addDeleteListeners();



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

function updateTask(task) {
    let taskItem = task.parentElement;
    if (task.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}