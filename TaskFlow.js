// place to select all he elemnt form html 
const addTask = document.querySelector("#addTask");
const popup = document.querySelector("#popup");
const confirmButton = document.querySelector("#confirmButton");
const closeButton = document.querySelector("#closeBUtton");
const editTaskPopUp = document.querySelector("#editTask");

// this place for selecting all the inputs 
const taskTitle = document.querySelector("#taskTitile");
const dueDate = document.querySelector("#date");
const Thestatus = document.querySelector("#status");
const priority =document.querySelector("#status")
const Discreption = document.querySelector("#Discreption");
// select the error containers of the input fields
const titleError = document.querySelector("#titleError");
const dateError = document.querySelector("#dateError");
const discreptionError = document.querySelector("#discreptionError")
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
    if (Discreption.value.length <= 0) {
        const dateErroR = `<p class="text-red-500 mx-auto">you must provide a description</p>`;
        discreptionError.innerHTML = dateErroR
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
    else if (task.Status === "doing") {
        doing.innerHTML += ` <div class=" thetaskcard w-[90%] mx-auto mt-2 flex flex-col bg-gray-300 rounded-lg p-4 data-id=${task.taskId} ">
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
    if (task.Status === "done") {
        done.innerHTML += ` <div class=" thetaskcard w-[90%] mx-auto mt-2 flex flex-col bg-gray-300 rounded-lg p-4 data-id=${task.taskId} ">
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
        const selectedElemet = myTaskes.findIndex((element) => {
            if (element.taskId == taskId) {
                return element
            }
        })
        myTaskes[selectedElemet].priority = priorityValue;
        localStorage.setItem("task", JSON.stringify(myTaskes));
        window.location.reload();
    })
})
// this finction is delete the taske 
const deletetask = document.querySelectorAll(".deletetask");
deletetask.forEach((time) => {
    time.addEventListener("click", (e) => {
        const taskId = e.target.dataset.id;
        let newtaskes = myTaskes.filter(e => e.taskId != taskId)
        localStorage.setItem("task", JSON.stringify(newtaskes));
        localStorage.setItem("id", JSON.stringify(--ID));
        window.location.reload()
    })
})
// this function is edit the task
const editTaskButton = document.querySelectorAll(".editTask");
console.log(editTaskButton);

editTaskButton.forEach((item) => {
    item.addEventListener("click", (e) => {
        const taskID = e.target.dataset.id
        const task = myTaskes.find((e) => {
            if (e.taskId == taskID) {
                return e
            }
        })
        editTaskPopUp.innerHTML = `<div class="  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" id="edittaskModal">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit task form
                        </h3>
                        <button type="button"
                            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            id="editCloseBUtton">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5">
                        <form class="space-y-4" action="#">
                            <div>
                                <label for="EdittaskTitile"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">task
                                    Title</label>
                                <input type="text" id="EdittaskTitile" 
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="task Title" value="${task.title}"/>
                                    <div id="editTitleError">
                                    </div>
                            </div>
                            <div>
                                <label for="editDate"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">due
                                    date</label>
                                <input type="date" id="editDate"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="task Title" />
                                    <div id="editDateError">
                                    </div>
                            </div>
                            <div class=" flex justify-between ">
                                <div class="w-1/2">
                                    <label for="editpriority"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">priority</label>
                                    <select id="editpriority"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option ${task.priority == "p1" ? "selectd" : ""} value="p1">p1</option>
                                        <option value="p2" ${task.priority == "p2" ? "selectd" : ""}>p2</option>
                                        <option value="p3" ${task.priority == "p3" ? "selectd" : ""}>p3</option>
                                    </select>
                                </div>
                                <div class="w-1/2">
                                    <label for="editStatus"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">status</label>
                                    <select id="editStatus"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option ${task.Status == "todo" ? "selected" : ""} value="todo">Todo</option>
                                        <option ${task.Status == "doing" ? "selected" : ""} value="doing">Doing</option>
                                        <option ${task.Status == "done" ? "selected" : ""} value="done">Done</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="editDiscreption"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Discreption</label>
                                <textarea id="Discreption"
                                class="bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value ="${task.discreption}"></textarea>
                            </div>
                            <div id="editDiscreptionError">
                            </div>
                            <button type="submit"
                                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                id="editConfirmButton"> confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
        const editCloseButton = document.querySelector("#editCloseBUtton");
        editCloseButton.addEventListener("click", () => {
            editTaskPopUp.innerHTML = ""
        })
        const EdittaskTitile = document.querySelector("#EdittaskTitile");
        const EditDueDate = document.querySelector("#editDate");
        const editStatus = document.querySelector("#editStatus");
        const editpriority = document.querySelector("#editpriority");
        const editDiscreption = document.querySelector("#editDiscreption");
        const editTitleError = document.querySelector("#editTitleError");
        const editDateError = document.querySelector("#editDateError");
        const editConfirmButton = document.querySelector("#editConfirmButton");
        editConfirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (EdittaskTitile.value.length < 6) {
                const titileError = `<p class="text-red-500 mx-auto">your title must be at least 6 characters long</p>`;
                editTitleError.innerHTML = titileError;
                return;
            } else {
                titleError.innerHTML = "";
            }
            const EditDueDateValue = new Date(EditDueDate.value);

            if (EditDueDateValue < today) {
                const dateErroR = `<p class="text-red-500 mx-auto">you'r due date is in the past</p>`;
                editDateError.innerHTML = dateErroR
                return
            }
            else {
                editDateError.innerHTML = "";
            }
            if (editDiscreption.value.length <= 0) {
                const dateErroR = `<p class="text-red-500 mx-auto">you must provide a description</p>`;
                discreptionError.innerHTML = dateErroR
            }
            let indexOfSelectedTask = myTaskes.findIndex((e)=>{
                if (e.taskId == taskID) {
                    return e;
                }
            })
            myTaskes[indexOfSelectedTask].title =  EdittaskTitile.value;
            myTaskes[indexOfSelectedTask].dueDate =  EditDueDate.value;
            myTaskes[indexOfSelectedTask].priority =  editpriority.value;
            myTaskes[indexOfSelectedTask].Status =  editStatus.value;
            myTaskes[indexOfSelectedTask].Discreption =  editDiscreption.value;
        });
    })
})
// const newtask = {
//     taskId: ID + 1,
//     title: taskTitle.value,
//     dueDate: dueDatevalue,
//     priority: priority.value,
//     Status: Thestatus.value,
//     Discreption: Discreption.value,
// };

