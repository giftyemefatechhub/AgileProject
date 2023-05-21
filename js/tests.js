const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');

let tasks = []   //This is the list that contains all the added tasks

console.log(tasks);

// Function to create a new task element
function createTaskElement(taskName, assignee) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskNameElement = document.createElement('span');
    taskNameElement.textContent = 'Task: ' + taskName;

    const assigneeElement = document.createElement('span');
    assigneeElement.textContent = 'Assignee: ' + assignee;


    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(assigneeElement);

    let showValue = document.createElement('div');




    taskList.appendChild(taskElement);

}
/*
// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const taskNameInput = document.querySelector('#task-name');
    const assigneeInput = document.querySelector('#assignee');

    const taskName = taskNameInput.value;
    const assignee = assigneeInput.value;

    createTaskElement(taskName, assignee);

    // Reset the form inputs
    taskNameInput.value = '';
    assigneeInput.value = '';
}

// Add event listener for form submission
taskForm.addEventListener('submit', handleFormSubmit);*/
