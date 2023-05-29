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
    }
    else
    {
        alert("You should enter the task name!")
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
    }
    else
    {
        alert("check your inputs!")
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
