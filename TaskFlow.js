// place to select all he elemnt form html 
const addTask = document.querySelector("#addTask");
const popup = document.querySelector("#popup");
const confirmButton = document.querySelector("#confirmButton");
const closeButton = document.querySelector("#closeBUtton");
// this place for selecting all the inputs 
const taskTitle = document.querySelector("#taskTitile");
const dueDate = document.querySelector("#date");
const priority = document.querySelector("#priority");
const status = document.querySelector("#status");
const Discreption = document.querySelector("#Discreption");
// select the error containers of the input fields
const titleError = document.querySelector("#titleError");
const dateError = document.querySelector("#dateError")
// select the date to compare it later
const today = new Date;
today.setHours(0,0,0,0); //this is seting the hour to med night 







const myTaskes = JSON.parse(localStorage.getItem("task")) || [];
const newtask = {
    title: "",
    dueDate: "",
    priority: "",
    status: "",
    Discreption: "",
};


// an evnt that shows the pop up when the button is clicked 

addTask.addEventListener("click",(e)=>{
    e.preventDefault;
    addTask.setAttribute("disabled","");
    popup.classList.add("block");
    popup.classList.remove("hidden");
});
closeButton.addEventListener("click",(e)=>{
    e.preventDefault;
    popup.classList.add("hidden");
    popup.classList.remove("block");
    addTask.removeAttribute("disabled")
});
confirmButton.addEventListener("click",(e)=>{
    e.preventDefault;
    if(taskTitle.value.length<6){
        const titileError = `<p class="text-red-500 mx-auto">your title must be at least 6 characters long</p>`;
        titleError.innerHTML = titileError;
        return;
    } else{
        titleError.innerHTML = "";
    }
    const dueDatevalue = new Date(dueDate.value);
    
    if (dueDatevalue < today) {
        const dateErroR =`<p class="text-red-500 mx-auto">you'r due date is in the past</p>`;
        dateError.innerHTML = `<p class="text-red-500 mx-auto">your title must be at least 6 characters long</p>`
        return
    }
    else{
        dateError.innerHTML = "";
    }
    


    popup.classList.add("hidden");
    popup.classList.remove("block");
    addTask.removeAttribute("disabled");
});