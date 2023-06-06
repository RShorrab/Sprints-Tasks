var taskNameInput = document.getElementById("taskNameInput");
var taskPriorityInput = document.getElementById("taskPriorityInput");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var searchBar = document.getElementById("searchBar");
var taskAlert = document.getElementById("taskAlert");
var displayDiv = document.getElementById("displayDiv");
var updIndex;
var tasksArr = [];


/* 
fix checkbox bug ...
*/

class Task
{
    taskName;
    taskPriority;
    taskId = Math.floor(Math.random() * 1000);
    done = false;

    constructor(name, piriority, taskId=this.taskId, done = this.done)
    {
        this.taskName = name;
        this.taskPriority = piriority;
        this.taskId = taskId
        this.done = done;
    }
}

class TaskMethods
{

    static getStorage()
    {
        if(JSON.parse(localStorage.getItem("tasks")) != null)
        {
            tasksArr = JSON.parse(localStorage.getItem("tasks"));
            tasksArr = tasksArr.map((task)=> new Task(task.taskName, task.taskPriority, task.taskId, task.done))
            TaskMethods.display();
        }
        if(TaskMethods.display() == true) //check if the table has items to display
        {
            TaskMethods.sortAscByPriority(tasksArr)
            displayDiv.classList.remove("d-none");
        }
    }
    static display()
    {
        this.getDoneDown()
        let trs='';
        for(var i=0; i < tasksArr.length; i++)
        {
            trs+= ` ${tasksArr[i].done===true? `<tr id="${tasksArr[i].taskId}" class="opacity-50">`:`<tr id="${tasksArr[i].taskId}">`}
                    <td class="pt-3"> ${tasksArr[i].taskName} </td>
                    <td class="pt-3"> ${tasksArr[i].taskPriority} </td>
                    <td> ${tasksArr[i].done===true? `<button class="btn btn-transparent shadow-none"> <i class="fa fa-check text-success status-btn done-true pt-0 fs-4" aria-hidden="true"></i> </button>`: `<button class="btn btn-transparent shadow-none p-0 pt-1"> <i class="text-danger fw-bold fs-5 status-btn done-false " aria-hidden="true">X</i> </button>`} </td>
                    <td> <button onclick="TaskMethods.updateTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-edit fs-5 text-black-50"></i> </button>
                    <td> <button onClick="TaskMethods.deleteTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-trash-alt fs-5 text-danger"></i> </button> </td>
                    <td class="pt-3"> <input class="form-check-input checkbox me-4" type="checkbox" id="checkbox-${i}"></td>
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

    static addTask()
    {
        let existTask = tasksArr.find((task)=> task.taskName == taskNameInput.value)
        if(taskNameInput.value != null && taskNameInput.value != '')
        {   if(existTask)
            {
                document.getElementById("taskNameAlert").innerHTML = `<p> You already entered this task!</p> `
                document.getElementById("taskNameAlert").classList.remove("d-none")
            }
            else
            {
                let task = new Task(taskNameInput.value, taskPriorityInput.value)
                tasksArr.push(task);
                localStorage.setItem("tasks", JSON.stringify(tasksArr));
                document.getElementById("taskNameAlert").classList.add("d-none")
            }
        }
        else
        {
            document.getElementById("taskNameAlert").innerHTML = `<p>You should Enter the task name!</p> `
            document.getElementById("taskNameAlert").classList.remove("d-none")
            addBtn.disabled="true";
        }
    }
    static clearInputs()
    {
        for(var i=0; i<inputs.length; i++)
        {
            inputs[i].value = "";
            inputs[i].classList.remove("is-invalid");
            inputs[i].classList.remove("is-valid");
            taskAlert.classList.add("d-none");
        }
    }
    static deleteTask(index)
    {
        tasksArr.splice(index,1);
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
        this.display();
    }
    static updateTask(index) //to display Task data in the inputs
    {
        updIndex=index; //to be seen by other functions
        addBtn.innerHTML="Update Task";
        taskNameInput.value = tasksArr[index].taskName;
        taskPriorityInput.value = tasksArr[index].taskPriority;
        addBtn.removeAttribute("disabled");
    }

    static editTask() //actual editing func.
    {
        let existTask = tasksArr.find((task)=> task.taskName == taskNameInput.value)
        if(taskNameInput.value != null && taskNameInput.value != '')
        {
            if(existTask)
            {
                document.getElementById("taskNameAlert").innerHTML = `<p> You already entered this task!</p> `
                document.getElementById("taskNameAlert").classList.remove("d-none")
            }
            else
            {
                tasksArr[updIndex] = new Task(taskNameInput.value, taskPriorityInput.value, tasksArr[updIndex].taskId, tasksArr[updIndex].done)
                localStorage.setItem("tasks", JSON.stringify(tasksArr));
                addBtn.innerHTML="Add Task";
                addBtn.disabled="true";
                document.getElementById("taskNameAlert").classList.add("d-none")
                console.log(tasksArr[updIndex]);
            }
        }
        else
        {
            document.getElementById("taskNameAlert").classList.remove("d-none")
            addBtn.disabled="true";
        }
    }

    static sortAscByPriority(tasksArr)
    {
        tasksArr.sort((a,b) => a.taskPriority - b.taskPriority)
        this.display()
    }
    static sortDesByPriority(tasksArr)
    {
        tasksArr.sort((a,b) => b.taskPriority - a.taskPriority)
        this.display()
    }

    static sortAscByName(tasksArr)
    {
        let sorted = tasksArr.sort((a,b) => a.taskName.localeCompare(b.taskName))
        this.display(sorted)
    }
    static sortDesByName(tasksArr)
    {
        tasksArr.sort((a,b) => b.taskName.localeCompare(a.taskName))
        this.display()
    }

    static getDoneDown()
    {
        let doneTasks = Array.from(document.getElementsByClassName("done-true"))
        doneTasks.reverse().map((icon)=> 
        {
            let taskId = icon.parentElement.parentElement.parentElement.id
            let task = tasksArr.find((item)=> item.taskId == taskId)
             
            let arranged = tasksArr.splice( tasksArr.indexOf(task), 1)[0]
            tasksArr.splice(tasksArr.length, 0, arranged )
        })
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    }
}



TaskMethods.getStorage()
addBtn.onclick = () => 
{
    if(addBtn.innerHTML == "Add Task")
    {
        TaskMethods.addTask();
        TaskMethods.sortAscByPriority(tasksArr)
    }
    else
    {
        TaskMethods.editTask();
        TaskMethods.sortAscByPriority(tasksArr)
    }
    displayDiv.classList.remove("d-none");
    TaskMethods.display();
    TaskMethods.clearInputs();
}
searchBar.onkeyup = () =>
{
    var trs='';
    var val = searchBar.value;
    for(var i=0; i<tasksArr.length; i++)
    {
        if(tasksArr[i].taskName.toLowerCase().includes(val.toLowerCase()))
        {
            trs+= ` ${tasksArr[i].done===true? `<tr id="${tasksArr[i].taskId}" class="opacity-50">`:`<tr id="${tasksArr[i].taskId}">`}
                    <td> ${tasksArr[i].taskName} </td>
                    <td> ${tasksArr[i].taskPriority} </td>
                    <td> ${tasksArr[i].done===true? `<button class="btn btn-transparent shadow-none"> <i class="fa fa-check text-success status-btn done-true" aria-hidden="true"></i> </button>`: `<button class="btn btn-transparent shadow-none"> <i class="text-danger fw-bold status-btn done-false" aria-hidden="true">X</i> </button>`} </td>
                    <td> <button onclick="TaskMethods.updateTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-edit fs-5 text-black-50"></i> </button>
                    <td> <button onClick="TaskMethods.deleteTask(${i})" class="btn btn-transparent shadow-none"> <i class="fas fa-trash-alt fs-5 text-danger"></i> </button> </td>
                    <td> <input class="form-check-input me-4" type="checkbox"> </td>
                </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=trs;
}
taskPriorityInput.onkeyup = () => //Task verification
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
let sortingByPriority = document.getElementById("sortingByPriority")
sortingByPriority.addEventListener("click", e => {
    if(sortingByPriority.classList.contains("Asc"))
    {
        TaskMethods.sortAscByPriority(tasksArr)
        sortingByPriority.classList.remove("Asc")
        sortingByPriority.classList.add("Des")
        sortingByPriority.innerHTML = `Priority <span> <i class="fa fa-caret-down" aria-hidden="true"></i> </span>`
    }
    else if(sortingByPriority.classList.contains("Des"))
    {
        TaskMethods.sortDesByPriority(tasksArr)
        sortingByPriority.classList.remove("Des")
        sortingByPriority.classList.add("Asc")
        sortingByPriority.innerHTML = `Priority <span> <i class="fa fa-caret-up" aria-hidden="true"></i> </span>`
    }
})
let sortingByName = document.getElementById("sortingByName")
sortingByName.addEventListener("click", e => {
    if(sortingByName.classList.contains("Asc"))
    {
        TaskMethods.sortAscByName(tasksArr)
        sortingByName.classList.remove("Asc")
        sortingByName.classList.add("Des")
        sortingByName.innerHTML = `Task Name <span> <i class="fa fa-caret-down" aria-hidden="true"></i> </span>`
    }
    else if(sortingByName.classList.contains("Des"))
    {
        TaskMethods.sortDesByName(tasksArr)
        sortingByName.classList.remove("Des")
        sortingByName.classList.add("Asc")
        sortingByName.innerHTML = `Task Name <span> <i class="fa fa-caret-up" aria-hidden="true"></i> </span>`
    }
})




//status
document.addEventListener("click", (e)=>
{
    if(e.target.classList.contains("status-btn"))
    {
        let id = e.target.parentElement.parentElement.parentElement.id
        let task = tasksArr.find((item)=> item.taskId == id)

        if(e.target.classList.contains("done-true"))
        {
            e.target.classList.remove("done-true")
            e.target.classList.add("done-false")
            e.target.parentElement.parentElement.parentElement.classList.remove("opacity-50")
            e.target.parentElement.innerHTML=`<i class="fa fa-undo text-danger status-btn done-false" aria-hidden="true"></i>`
            task.done = false
        }
        else if(e.target.classList.contains("done-false"))
        {
            e.target.classList.remove("done-false")
            e.target.classList.add("done-true")
            e.target.parentElement.parentElement.parentElement.classList.add("opacity-50")
            e.target.parentElement.innerHTML = `<i class="fa fa-check text-success status-btn done-true" aria-hidden="true"></i> `
            task.done = true
        }

        tasksArr[task]=task
        TaskMethods.display()//should be here to apply getDoneDoen() before using local storage
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    }
})

//check ... still in progress -> once a change happens, the input cannot be selected! (affect delete function below)
let checkbox = Array.from(document.querySelectorAll('.checkbox'))
let check_parent = document.getElementById("check-parent")
let taskId;
let task;

document.addEventListener("click", (e)=>
{
    if(e.target == check_parent)
    {
        if(check_parent.checked == true)
        {
            //once a change happens, the input cannot be selected! (affect delete function below)
            /* checkbox.map((checkInput)=>
            {
                checkInput.checked = true
            })*/

            
            for (let i = 0; i < tasksArr.length; i++) //for now till find a solution for the above code..
            {
                if(document.getElementById(`checkbox-${i}`))
                {
                    document.getElementById(`checkbox-${i}`).checked = true
                }
            }
        }
        else
        {
            for (let i = 0; i < tasksArr.length; i++) 
            {
                if(document.getElementById(`checkbox-${i}`))
                {
                    document.getElementById(`checkbox-${i}`).checked = false
                }
            }
        }
    }
    else if(e.target.classList.contains("checkbox"))
    {
        if(e.target.checked==true)
        {
            e.target.checked = true
        }
        else
        {
            e.target.checked = false
        }
    }
})

let deleteMulti = document.getElementById("delete-multi") 
deleteMulti.addEventListener("click", ()=>
{
    if(check_parent.checked==true)
        {tasksArr.length = 0}
    else
    {
        checkbox.map((checkInput)=>
        {
            taskId = checkInput.parentElement.parentElement.id
            task = tasksArr.find( (task)=> task.taskId == taskId)
            if(checkInput.checked === true)
            {
                tasksArr.splice(tasksArr.indexOf(task), 1)
            }
        })
    }

    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    TaskMethods.display()
})


