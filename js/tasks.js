let tasks = []  // array that stores added tasks 
let completed = []  //stores completed tasks 

let bingo = "complete"
let del = "delete"


console.log("John")
listening() //this method listens for when the add task button is clicked


function listening() {
    var addT = document.getElementById("add")
    addT.addEventListener('click', event => { //the clicking of the add button

        var x = document.getElementById("task-name").value;
        tasks.push(x)
        checkTasks()

        console.log(tasks)
    })

}




function checkTasks() { // this method checks the array if there are any tasks then it displays them on the screen 
    //it also add a complete and delete button to the side of tasks

    if (tasks.length === 0) {
        document.getElementById("task-list").innerHTML = "There are no current tasks"

    } else {
        let htmlArray = tasks.map((value) =>
            `<div class="aTask">
            <p>${value}</p>
            <button class="comp-btn">complete</button>
            <button class="del-btn">delete</button>
            </div>`
        )
        document.getElementById('task-list').innerHTML = htmlArray.join('');
        var products = document.querySelectorAll('.comp-btn')
        var productsOf = document.querySelectorAll('.del-btn')


        showCompleted(products, productsOf, bingo, del)

    }
}




function showCompleted(products, productsOf, message, del) { //this method adds a listener to each of the complete and delete so that when it is clicked, it will be functional


    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        element.addEventListener('click', event => {

            var button = event.target
            var taskE = button.parentElement
            var taskInfo = taskE.querySelector('p').innerText
            completeAndDelete(taskInfo, message)
        }
        )
    }

    for (let index = 0; index < productsOf.length; index++) {
        const element = productsOf[index];
        element.addEventListener('click', event => {

            var button = event.target
            var taskE = button.parentElement
            var taskInfo = taskE.querySelector('p').innerText
            completeAndDelete(taskInfo, del)
        }
        )
    }




}





function completeAndDelete(taskInfo, message) {
    //this method adds a task to an array if its delete or complete button is clicked, then it shows it as a completed task or it is deleted from the screen
    console.log(message)
    tasks = tasks.filter(item => item !== taskInfo)
    console.log(tasks)
    checkTasks()

    if (message === 'complete') {
        completed.push(taskInfo)
        checkTasks()

        //console.log(completed)
        let compArray = completed.map((value) =>
            `<div class="fTask">
            <p>${value}</p>
            </div>
            `)
        document.querySelector('.comp-tasks').innerHTML = compArray.join('');
    }



}

module.exports = {
    tasks,
    completed,
    listening,
    checkTasks,
    showCompleted,
    completeAndDelete
};
