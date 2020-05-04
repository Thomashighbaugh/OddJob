var $ = function(id) { return document.getElementById(id); };

var tasks = [];

var displayTaskList = function() {
    // get tasks from storage
    if (tasks.length === 0) {
    //key used to identify storage (important in more complex situations)
        tasks = getStorage("tasks_10");
    }
    // display sorted tasks with buttons
    displaySortedTaskList(tasks, $("tasks"), deleteFromTaskList, editTaskListItem);

    // set focus
    $("task").focus();
};
//verifies task entered and adds it 
var addToTaskList = function() {   
    var task = $("task");
    if (task.value === "") {
        alert("Please enter a task.");
    } else {
        tasks.push(capitalizeTask(task.value));
        setStorage("tasks_10", tasks);

        task.value = "";
        displayTaskList();
    }
};
//deletes the task 
var deleteFromTaskList = function() {
    deleteTask(tasks, this.id); // 'this' = clicked link
    setStorage("tasks_10", tasks);
    displayTaskList();
};
//edits the tasks
var editTaskListItem = function() {
    var newText = prompt("Please enter new text", tasks[this.title]);  // 'this' = clicked link
    if (newText) {
        editTask(tasks, this.title, capitalizeTask(newText));
        setStorage("tasks_10", tasks);
        displayTaskList();
    }
};

//clears the whole list
var clearTaskList = function() {
    tasks.length = 0;
    clearStorage("tasks_10");
    $("tasks").innerHTML = "";
    $("task").focus();
};
//taks for load
window.onload = function() {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;   
    displayTaskList();
    //set focus again just to be sure 
    $('task').focus();
};
