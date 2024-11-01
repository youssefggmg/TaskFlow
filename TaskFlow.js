// place to select all he elemnt form html 
const addTask = document.querySelector("#addTask");
const popup = document.querySelector("#popup");
const confirmButton = document.querySelector("#confirmButton");
const closeButton = document.querySelector("#closeBUtton");
// this place for selecting all the inputs 
const taskTitle = document.querySelector("#taskTitile");
const dueDate = document.querySelector("#date");
const Thestatus = document.querySelector("#status");
const Discreption = document.querySelector("#Discreption");
// select the error containers of the input fields
const titleError = document.querySelector("#titleError");
const dateError = document.querySelector("#dateError");
// select the date to compare it later
const today = new Date;
today.setHours(0, 0, 0, 0); //this is seting the hour to med night 
// select all the  tasks holders
const todo = document.querySelector("#Todtask");
const doing = document.querySelector("#DoingTask");
const done = document.querySelector("#DoneTask");
// this is the element that is going to e dissplayed to change the info of a task


// get the taskes form loclaStorage 
let myTaskes = JSON.parse(localStorage.getItem("task")) || [];
// get the last id of the taskes
let ID = JSON.parse(localStorage.getItem("id")) || 0;


// the event that shows the pop up when the button is clicked 

addTask.addEventListener("click", (e) => {
    e.preventDefault();
    addTask.setAttribute("disabled", "");
    popup.classList.add("block");
    popup.classList.remove("hidden");
});
// the event that close the  pop up when the close button is clicked 
closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("hidden");
    popup.classList.remove("block");
    addTask.removeAttribute("disabled")
});
// the event that confirm the task when the confirm button is clicked
confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (taskTitle.value.length < 6) {
        const titileError = `<p class="text-red-500 mx-auto">your title must be at least 6 characters long</p>`;
        titleError.innerHTML = titileError;
        return;
    } else {
        titleError.innerHTML = "";
    }
    const dueDatevalue = new Date(dueDate.value);

    if (dueDatevalue < today) {
        const dateErroR = `<p class="text-red-500 mx-auto">you'r due date is in the past</p>`;
        dateError.innerHTML = dateErroR
        return
    }
    else {
        dateError.innerHTML = "";
    }
    // the task is added to the array and the local storage is updated
    const newtask = {
        taskId: ID + 1,
        title: taskTitle.value,
        dueDate: dueDatevalue,
        priority: priority.value,
        Status: Thestatus.value,
        Discreption: Discreption.value,
    };
    ID++
    myTaskes.push(newtask);
    localStorage.setItem("task", JSON.stringify(myTaskes));
    localStorage.setItem("id", JSON.stringify(ID));
    popup.classList.add("hidden");
    popup.classList.remove("block");
    addTask.removeAttribute("disabled");
    window.location.reload();
});
// the event to show each task in the plac it belong to 


myTaskes.map((task) => {
    let prioritycolor
    if (task.priority === "p1") {
        prioritycolor = "bg-red-500";
    }
    else if (task.priority === "p2") {
        prioritycolor = "bg-green-500";
    }
    else if (task.priority === "p3") {
        prioritycolor = "bg-blue-500";
    }

    if (task.Status === "todo") {
        todo.innerHTML += ` <div class=" thetaskcard w-[90%] mx-auto mt-2 flex flex-col bg-gray-300 rounded-lg p-4 data-id=${task.taskId} ">
                <div class=" flex justify-between">
                    <h2 id="cardTitle" class="text-lg">
                        ${task.title}
                    </h2>
                    
                    <select id="prioritySelect" class="rounded-md w-16 priorityList ${prioritycolor}" data-id=${task.taskId}>
                        <option ${task.priority == "p1" ? "selected" : ""} class="bg-red-500" value="p1">p1</option>
                        <option ${task.priority == "p2" ? "selected" : ""} value="p2" class="bg-green-500">p2</option>
                        <option ${task.priority == "p3" ? "selected" : ""} value="p3" class="bg-blue-500" cla>p3</option>
                    </select>
                </div>
                <div class="flex justify-between pt-6 ">
                    <p id="taskDate">
                        ${task.dueDate.slice(5, 10)}
                    </p>
                    <div>
                        <i class="fa-solid fa-trash fa-lg pe-2 deletetask" style="color: #e60039;" data-id=${task.taskId}></i>
                        <i class="fa-solid fa-pen-to-square fa-lg editTask" style="color: #1259d3;" data-id=${task.taskId}></i>
                    </div>
                </div>
            </div>`
    }
})
const priorityList = document.querySelectorAll(".priorityList");

// this function is changing the priority of the task
priorityList.forEach((time) => {
    time.addEventListener("change", (e) => {
        const taskId = e.target.dataset.id;
        const priorityValue = e.target.value;
        const selectedElemet = myTaskes.findIndex((element)=>{
            if (element.taskId==taskId) {
                return element
            }
        })
        myTaskes[selectedElemet].priority = priorityValue;
        console.log(myTaskes);
        localStorage.setItem("task", JSON.stringify(myTaskes));
        window.location.reload();
    })
})
// this finction is delete the taske 
const deletetask = document.querySelectorAll(".deletetask");
deletetask.forEach((time) => {
    time.addEventListener("click", (e) => {
        const taskId = e.target.dataset.id;
        let newtaskes = myTaskes.filter(e=> e.taskId != taskId)
        localStorage.setItem("task",JSON.stringify(newtaskes));
        localStorage.setItem("id",JSON.stringify(--ID));
        window.location.reload()
    })
})


