// Include necessary code from tasks.js
let tasks = [];
let completed = [];
let bingo = "complete";
let del = "delete";

function listening() {
    var addT = document.getElementById("add");
    addT.addEventListener('click', event => {
        var x = document.getElementById("task-name").value;
        tasks.push(x);
        checkTasks();
        console.log(tasks);
    });
}

function checkTasks() {
    if (tasks.length === 0) {
        document.getElementById("task-list").innerHTML = "There are no current tasks";
    } else {
        let htmlArray = tasks.map((value) =>
            `<div class="aTask">
        <p>${value}</p>
        <button class="comp-btn">complete</button>
        <button class="del-btn">delete</button>
      </div>`
        );
        document.getElementById('task-list').innerHTML = htmlArray.join('');
        var products = document.querySelectorAll('.comp-btn');
        var productsOf = document.querySelectorAll('.del-btn');
        showCompleted(products, productsOf, bingo, del);
    }
}

function showCompleted(products, productsOf, message, del) {
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        element.addEventListener('click', event => {
            var button = event.target;
            var taskE = button.parentElement;
            var taskInfo = taskE.querySelector('p').innerText;
            completeAndDelete(taskInfo, message);
        });
    }

    for (let index = 0; index < productsOf.length; index++) {
        const element = productsOf[index];
        element.addEventListener('click', event => {
            var button = event.target;
            var taskE = button.parentElement;
            var taskInfo = taskE.querySelector('p').innerText;
            completeAndDelete(taskInfo, del);
        });
    }
}

function completeAndDelete(taskInfo, message) {
    console.log(message);
    tasks = tasks.filter(item => item !== taskInfo);
    console.log(tasks);
    checkTasks();

    if (message === 'complete') {
        completed.push(taskInfo);
        checkTasks();

        let compArray = completed.map((value) =>
            `<div class="fTask">
        <p>${value}</p>
      </div>`
        );
        document.querySelector('.comp-tasks').innerHTML = compArray.join('');
    }
}

// Test case
test('Event listeners should be called', () => {
    // Stub the necessary functions
    const stubAddEventListener = jest.fn();
    const stubCompleteAndDelete = jest.fn();

    // Mock the necessary elements
    document.getElementById = jest.fn().mockReturnValueOnce({ addEventListener: stubAddEventListener });
    document.querySelector = jest.fn().mockReturnValueOnce({ innerHTML: '' });
    document.querySelectorAll = jest.fn().mockReturnValueOnce([
        { addEventListener: stubCompleteAndDelete },
        { addEventListener: stubCompleteAndDelete },
    ]);

    // Call the listening function
    listening();

    // Expect the event listeners to be called
    expect(stubAddEventListener).toHaveBeenCalled();
    expect(stubCompleteAndDelete).toHaveBeenCalledTimes(0);
});

