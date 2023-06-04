var taskNameInput = document.getElementById("taskNameInput");
var taskPriorityInput = document.getElementById("taskPriorityInput");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var searchBar = document.getElementById("searchBar");
var taskAlert = document.getElementById("taskAlert");
var displayDiv = document.getElementById("displayDiv");
var tasks = [];
var updIndex;


if(JSON.parse(localStorage.getItem("tasks")) != null)
{
    tasks = JSON.parse(localStorage.getItem("tasks"));
    display();
}
if(display() == true) //check if the table has items to display
{
    displayDiv.classList.remove("d-none");
}

addBtn.onclick = function()
{
    if(addBtn.innerHTML == "Add Task")
    {
        addTask();
    }
    else
    {
        editTask();
    }
    displayDiv.classList.remove("d-none");
    display();
    clearInputs();
}

function addTask()
{
    if(taskNameInput.value != null && taskNameInput.value != '')
    {
        var task =
        {
            taskName: taskNameInput.value,
            taskPriority: taskPriorityInput.value
        }
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("taskNameAlert").classList.add("d-none")
    }
    else
    {
        document.getElementById("taskNameAlert").classList.remove("d-none")
        addBtn.disabled="true";
    }
}
function display()
{
    var trs='';
    for(var i=0; i < tasks.length; i++)
    {
        trs+= `<tr>
                <td> ${tasks[i].taskName} </td>
                <td> ${tasks[i].taskPriority} </td>
                <td> <button onclick="updateTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-edit fs-5 text-black-50"></i> </button>
                <td> <button onClick="deleteTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-trash-alt fs-5 text-danger"></i> </button> </td>
            </tr>`
    }
    if(trs == '')
    {
        displayDiv.classList.add("d-none");
        return false;
    }

    document.getElementById("tableBody").innerHTML = trs;
    return true;
}
function clearInputs()
{
    for(var i=0; i<inputs.length; i++)
    {
        inputs[i].value = "";
        inputs[i].classList.remove("is-invalid");
        inputs[i].classList.remove("is-valid");
        taskAlert.classList.add("d-none");
    }
}

function deleteTask(index)
{
    tasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    display();
}
function updateTask(index) //to display Task data in the inputs
{
    updIndex=index; //to be seen by other functions
    addBtn.innerHTML="Update Task";
    taskNameInput.value = tasks[index].taskName;
    taskPriorityInput.value = tasks[index].taskPriority;
    addBtn.removeAttribute("disabled");
}
function editTask() //actual editing func.
{
    if(taskNameInput.value != null && taskNameInput.value != '')
    {
        tasks[updIndex]=
        {
            taskName: taskNameInput.value,
            taskPriority: taskPriorityInput.value
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addBtn.innerHTML="Add Task";
        addBtn.disabled="true";
        document.getElementById("taskNameAlert").classList.add("d-none")
    }
    else
    {
        document.getElementById("taskNameAlert").classList.remove("d-none")
        addBtn.disabled="true";
    }
}
searchBar.onkeyup = function()
{
    var trs='';
    var val = searchBar.value;
    for(var i=0; i<tasks.length; i++)
    {
        if(tasks[i].taskName.toLowerCase().includes(val.toLowerCase()))
        {
            trs+= `<tr>
                <td> ${tasks[i].taskName} </td>
                <td> ${tasks[i].taskPriority} </td>
                <td> <button onclick="updateTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-edit fs-5 text-black-50"></i> </button>
                <td> <button onClick="deleteTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-trash-alt fs-5 text-danger"></i> </button> </td>
            </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=trs;
}

taskPriorityInput.onkeyup = function() //Task verification
{
    var URLregex = /^[1-5]$/
    if(!URLregex.test(taskPriorityInput.value))
    {
        taskPriorityInput.classList.add("is-invalid");
        taskPriorityInput.classList.remove("is-valid");
        taskAlert.classList.remove("d-none");
        addBtn.disabled="true";
        return false;
    }
    else
    {
        taskPriorityInput.classList.add("is-valid");
        taskPriorityInput.classList.remove("is-invalid");
        taskAlert.classList.add("d-none");
        addBtn.removeAttribute("disabled");
        return true;
    }
}


//sorting
function sortAscByPriority(tasks)
{
    tasks.sort((a,b) => a.taskPriority - b.taskPriority)
    display()
}
function sortDesByPriority(tasks)
{
    tasks.sort((a,b) => b.taskPriority - a.taskPriority)
    display()
}

function sortAscByName(tasks)
{
    tasks.sort((a,b) => a.taskName.localeCompare(b.taskName))
    display()
}
function sortDesByName(tasks)
{
    tasks.sort((a,b) => b.taskName.localeCompare(a.taskName))
    display()
}

let sortingByPriority = document.getElementById("sortingByPriority")
 sortingByPriority.addEventListener("click", e => {
    if(sortingByPriority.classList.contains("Asc"))
    {
        sortAscByPriority(tasks)
        sortingByPriority.classList.remove("Asc")
        sortingByPriority.classList.add("Des")
        sortingByName.innerHTML = `Task Priority <span> <i class="fa fa-caret-down" aria-hidden="true"></i> </span>`
    }
    else if(sortingByPriority.classList.contains("Des"))
    {
        sortDesByPriority(tasks)
        sortingByPriority.classList.remove("Des")
        sortingByPriority.classList.add("Asc")
        sortingByName.innerHTML = `Task Priority <span> <i class="fa fa-caret-up" aria-hidden="true"></i> </span>`
    }
})

let sortingByName = document.getElementById("sortingByName")
 sortingByName.addEventListener("click", e => {
    if(sortingByName.classList.contains("Asc"))
    {
        sortAscByPriority(tasks)
        sortingByName.classList.remove("Asc")
        sortingByName.classList.add("Des")
        sortingByName.innerHTML = `Task Name <span> <i class="fa fa-caret-down" aria-hidden="true"></i> </span>`
    }
    else if(sortingByName.classList.contains("Des"))
    {
        sortDesByPriority(tasks)
        sortingByName.classList.remove("Des")
        sortingByName.classList.add("Asc")
        sortingByName.innerHTML = `Task Name <span> <i class="fa fa-caret-up" aria-hidden="true"></i> </span>`
    }
})





//task 5
let tasksArray = [
    ["Nathalie Nader Nabil", "Task 01", "Option 2"],
    ["Youssef Mohamed Ahmed Mohamed Youssef", "Task 01", "Option 1"],
    ["Salma Nasreldin", "Task 01", "Option 1"],
    ["Engy Mostafa", "Task 01", "Option 1"],
    ["Engy Mostafa", "Task 01", "Option 1"],
    ["Engy ahmed mostafa ", "Task 01", "Option 1"],
    ["Abdelhay Nader Abdelhay Abozayed", "Task 01", "Option 1"],
    ["Abdelrahman Shemies", "Task 01", "Option 1"],
    ["Alaa Ahmed", "Task 01", "Option 2"],
    ["Youssef Fathy Mahmoud", "Task 01", "Option 1"],
    ["Mark Bassem", "Task 01", "Option 1"],
    ["Anas Ahmed", "Task 01", "Option 1"],
    ["Adham Hesham", "Task 01", "Option 1"],
    ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
    ["rola wafi", "Task 01", "Option 1"],
    ["Moataz Youssef", "Task 01", "Option 2"],
    ["Ahmad Salama", "Task 01", "Option 1"],
    ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
    ["Ahmad Salama Abdelaziz", "Task 01", "Option 2"],
    ["Kareem Ramzi El-Tahlawi", "Task 01", "Option 1"],
    ["Alaa Ahmed", "Task 01", "Option 2"],
    ["rola wafi", "Task 01", "Option 2"],
    ["Mohamed Fahmi", "Task 01", "Option 1"],
    ["Mohamed Fahmi", "Task 01", "Option 2"],
    ["Alaa Ahmed", "Task 01", "Option 2"],
    ["Abdelrahman Shemies", "Task 01", "Option 1"],
    ["Nathalie Nader", "Task 01", "Option 1"],
    ["Mariam Ahmed", "Task 01", "Option 1"],
];


const uniqueNames = (arr) => 
{
    let newTasks = arr.map(task => 
    {
        return task[0];
    });
    
    let uniqueTask = new Set(newTasks);
    uniqueTask.forEach(task => {
        console.log(task)
    });
}

uniqueNames(tasksArray);

