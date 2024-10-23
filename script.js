
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

//display existing tasks in taskSection
for (let i=0; i<localStorage.length; i++){
    taskSection.innerHTML +=
        `<div  id ="taskObject${i}" class="task">
        <label id="taskname">
        <input onclick="updateTask(this)" type="checkbox" id="check-task">
        <p>${JSON.parse(localStorage.getItem(`taskObject${i}`)).task_name}</p>
        </label>
        <span>Due: ${JSON.parse(localStorage.getItem(`taskObject${i}`)).task_date}</span>
        <div class="delete">
        <i class="uil uil-trash"></i></div></div>
        `        
}

addDeleteListeners()



//function that creates task
function createTask(){
    const date = new Date();
    const dueDate = new Date(dateInput.value);

    if (taskInput.value.length == 0){
        alert("This field is blank. Enter a task name and try again");
    } 
    else if (dateInput.value.length == 0){
        alert("Please add due date")
    }
    else if (dueDate< date.setHours(0,0,0)){
        alert("Due date cannot be in the past.");
    } 
    else {


        let taskObject = {
            'task_name': taskInput.value,
            'task_date': dateInput.value
        }

        localStorage.setItem(`${'taskObject'}${localStorage.length}`,JSON.stringify(taskObject));
        console.log(localStorage)
        

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

    }

    addDeleteListeners();


    taskSection.offsetHeight>=300
    ? taskSection.classList.add("overflow")
    : taskSection.classList.remove("overflow")
}


function addDeleteListeners(){
    var currentTasks = document.querySelectorAll(".delete");
    for (var i =0; i <currentTasks.length; i++){
        currentTasks[i].onclick = function() {
            let taskID = this.parentNode.attributes.id.value;
            localStorage.removeItem(`${taskID}`);
            this.parentNode.remove();
        }
    }
    
}

function updateTask(task){
    let taskItem = task.parentElement;
    if (task.checked){
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}