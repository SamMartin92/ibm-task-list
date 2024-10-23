
//constants declared for input button and task list area
const taskInput = document.querySelector("#new-task-input");
const dateInput = document.querySelector("#due-date");
const taskSection = document.querySelector(".tasks");


//listener for Enter key. Used to add new task
taskInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && dateInput.value != "") {
        createTask();
    } 
});

//onClick event for add button
document.querySelector('#push').onclick = function() {
    createTask();
}
//function that creates task
function createTask(){
    const date = new Date();
    const dueDate = new Date(dateInput.value);

    if (taskInput.value.length == 0){
        alert("This field is blank. Enter a task name and try again");
    } 
    else if (dueDate< date.setHours(0,0,0)){
        alert("Due date cannot be in the past.");
    } 
    else {
        let taskDetails = {
            'task': taskInput.value,
            'due_date': dateInput.value
        }

        localStorage.setItem('taskDetails', JSON.stringify(taskDetails));

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


        taskInput.value='';
        dateInput.value='';

        let retrievedObject = localStorage.getItem('taskDetails');
        console.log(retrievedObject)
    }

    var currentTasks = document.querySelectorAll(".delete");
    for (var i =0; i <currentTasks.length; i++){
        currentTasks[i].onclick = function() {
            this.parentNode.remove();
        }
    }

    taskSection.offsetHeight>=300
    ? taskSection.classList.add("overflow")
    : taskSection.classList.remove("overflow")
}

function updateTask(task){
    let taskItem = task.parentElement;
    if (task.checked){
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}