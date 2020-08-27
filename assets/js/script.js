var taskIdCounter=0;
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var tasFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form");
        return false;
    }
    // create task data object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    formEl.reset();
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Add task id as custom data attribute
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    //create a div to hold task info and add to the list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML="<h3 class='task-name'>" + taskDataObj.name + 
        "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl=createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className="task-actions";

    // Edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent="Edit";
    editButtonEl.className="btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(editButtonEl);

    //Delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent="Delete";
    deleteButtonEl.className="btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className="select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i=0;i < statusChoices.length;i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent= statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
    var taskId;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};
var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    formEl.setAttribute("data-task-id", taskId);
 
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent="Save Task";
};

formEl.addEventListener("submit",tasFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);

