// place to select all he elemnt form html 
const addTask = document.querySelector("#addTask");
const popup = document.querySelector("#popup");
const confirmButton = document.querySelector("#confirmButton");
const closeButton = document.querySelector("#closeBUtton");


// an evnt that shows the pop up when the button is clicked 

addTask.addEventListener("click",(e)=>{
    e.preventDefault;
    addTask.setAttribute("disabled","");
    popup.classList.add("block");
    popup.classList.remove("hidden");
})
console.log(addTask);

closeButton.addEventListener("click",(e)=>{
    e.preventDefault;
    popup.classList.add("hidden");
    popup.classList.remove("block");
})
confirmButton.addEventListener("click",(e)=>{
    e.preventDefault;
    popup.classList.add("hidden");
    popup.classList.remove("block");
})