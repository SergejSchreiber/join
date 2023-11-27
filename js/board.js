let currentDraggedElement;
let boolean;

/**
 * This function is used to get all tasks from the todos array and then renders the tasks on the site
 */
function render() {
  loadCurrentUser().then(() => {
    loadCategoryWithUserId();
    loadContactsWithUserId();
    loadTodosWithUserId().then(() => {
      removeTasksFromContainer();
      for (let i = 0; i < todos.length; i++) {
        let addTodo = document.getElementById(todos[i]["progress"]);
        addTodo.innerHTML += createTaskContainer(i);
        todos[i]['id'] = i;
      }
    });
  });
}
/**
 * This functions removes the HTML-generated tasks
 */
function removeTaskHTML() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("awaitingfeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

/**
 * This is the dragging function for the drag and drop animation
 * 
 * @param {number} id - This is the id-number of the dragged task
 */
function startDraggin(id) {
  currentDraggedElement = id;
}

/**
 * This is the drop-function
 * 
 * @param {object} ev - This is the Event-Object for the dragging function
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Changes dragged progress, removes current task HTML, saves it on the server, renders all tasks and removes the gray background
 * 
 * @param {string} progress - New progress attribute for the dragged task element
 */
function moveTo(progress) {
  document.getElementById('task-container-' + currentDraggedElement).remove();
  todos[currentDraggedElement]["progress"] = progress;
  document.getElementById(todos[currentDraggedElement]["progress"]).innerHTML += createTaskContainer(currentDraggedElement);
  setTodosWithUserId();
  removeHighlight(progress);
}

/**
 * Changes the progress attribute of a task with taking the id of the task and giving it the parameter progress
 * 
 * @param {number} id - id of the task, which progress get changed
 * @param {string} progress - new progress attribute of the task with the given id
 */
function changeProgressOfTask(id, progress) {
  document.getElementById('task-container-' + id).remove();
  todos[id]["progress"] = progress;
  document.getElementById(todos[id]["progress"]).innerHTML += createTaskContainer(id);
  setTodosWithUserId();
  removeAddTaskSlide();
}

/**
 * Highlights background of the progress-container which the task was moved to
 * 
 * @param {string} progress - specific progress-container which the task was moved to
 */
function highlight(progress) {
    document.getElementById(progress).classList.add('highlight-drag-area');
}

/**
 * Removes background of the progress-container if the task is not above anymore
 * 
 * @param {string} progress - specific progress which the task was moving away from
 */
function removeHighlight(progress) {
    document.getElementById(progress).classList.remove('highlight-drag-area');
}

/**
 * Adds the task-slide for the board-page and takes the progress with it
 * 
 * @param {string} progress - the progress specific progress is brought to the task slide
 */
function showAddTaskSlideForBoardHTML(progress) {
  document.getElementById("task-container").innerHTML += getTaskSlide(progress);
  renderSubtask();
}

/**
 * Adds the task-slide for the board-page and takes the progress with it
 * 
 * @param {string} progress - the progress specific progress is brought to the task slide
 */
function showEditTaskSlideForBoardHTML(id, progress) {
  document.getElementById("task-container").innerHTML += getTaskSlideEdit(id, progress);
  renderSubtaskItem(id);
}

/**
 * removes the task slide and turns the boolean to false back
 */
function removeAddTaskSlide() {
  document.getElementById("slide-contact").remove();
  boolean = false;
}

/**
 * Shows the details of the task with the condition if the boolean is not true and adds colors for initials of the contacts
 * 
 * @param {number} id - specific id of the chosen task
 */
function showTaskedInDetail(id) {
  if(boolean != true) {
    document.getElementById("task-container").innerHTML += getTaskDetails(id);
    renderSubtaskItem(id);
    colorForInitialsInTaskDetails(id);
  }
}

/**
 * Searches the tasks if they contain any characters of the inputfield
 */
function filterTasks() { // search function
    let search = document.getElementById('search-task').value.toLowerCase();
    removeTasksFromContainer();
    for (let i = 0; i < todos.length; i++) {
        let task = todos[i];
        if (task['title'].toLowerCase().includes(search) || task['description'].toLowerCase().includes(search)) {
            let addTodo = document.getElementById(todos[i]['progress']);
            addTodo.innerHTML += createTaskContainer(i);
        }
    }
    if(!search) {
        render();
    }
}

/**
 * removes all HTML-code of the tasks
 */
function removeTasksFromContainer() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('awaitingfeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}

/**
 * gets the fullname of a contact and return the initials
 * 
 * @param {string} fullName - takes the complete name of the contact
 * @returns 
 */
function getInitials(fullName) {
    let firstInitial = fullName[0];
    let secondInitial = fullName.split(' ')[1][0];
    return firstInitial + secondInitial;
}

/**
 * deletes the task with the id, removes the slide HTML, reditributes the id´s and saves the change
 * 
 * @param {number} id - specific id of the chosen task
 */
function deleteTaskFromBoard(id) {
  todos.splice(id, 1);
  removeAddTaskSlide();
  redistributeIds();
  setTodosWithUserId();
  render();
}

/**
 * Shows the task slide filled with the information of the task with id id and takes the progress to the HTML-code
 * 
 * @param {number} id - id of the chosen task
 * @param {string} progress - progress of the chosen task
 */
function showEditTaskFromBoard(id, progress) {
  removeAddTaskSlide();
  showEditTaskSlideForBoardHTML(id, progress);
  fillTaskInfo(id);
}

/**
 * Specific function which fills the task slide with information of the chosen task
 * 
 * @param {number} id - id of the chosen task
 */
function fillTaskInfo(id) {
  document.getElementById('InputTitle').value = todos[id]['title'];
  document.getElementById('InputDescription').value = todos[id]['description'];
  fillDateInEditedTask(id);
  showCategory();
  fillCategoryInTask(id);
  document.getElementById('formSubmitButton').setAttribute('onClick', `saveEditedTask(${id})`);
  selectPrioForEditTask(id);
  fillContactsInfoTask();
}

/**
 * activates the Priority of the chosen task
 * 
 * @param {number} id - id of the chosen task
 */
function selectPrioForEditTask(id) {
  if(todos[id]['urgency'][0] == 'low') {
    selectPrio(2);
  }
  else if(todos[id]['urgency'][0] == 'normal') {
    selectPrio(1);
  } 
  else if(todos[id]['urgency'][0] == 'high') {
    selectPrio(0);
  }
}

/**
 * Fills the date inputfiled with the date of the chosen task
 * 
 * @param {number} id - id of the chosen task
 */
function fillDateInEditedTask(id) {
  let filledDate = todos[id]['dueDate'].split('-').reverse().join('.').toString();
  document.getElementById('inputDate').value = filledDate;
}

/**
 * opens the contacts-choice
 */
function fillContactsInfoTask() {
  sortContactsByName(contacts);
}

/**
 * shows the options to which progress the task can got to
 * 
 * @param {number} id - id of the chosen task
 */
function showMoveProgressSlide(id) {
  document.getElementById("task-container").innerHTML += getProgressOptions(id);
  boolean = true;
}

/**
 * Saves the edited task
 * 
 * @param {number} id - id of the chosen task
 */
function saveEditedTask(id) {
  let subtaskCache = todos[id].subtasks;
  createNewTask(todos[id]['progress']);
  todos.splice(id, 1);
  // todos.splice(todos.length - 1);
  redistributeIds();
  todos[todos.length - 1].subtasks = subtaskCache;
  todos[todos.length - 1].progressnumber[0] = todos[todos.length - 1].subtasks.filter(subtask => subtask.status === 'checked').length;
  todos[todos.length - 1].progressnumber[1] = todos[todos.length - 1].subtasks.length;
  setTodosWithUserId();
  render();
}

/**
 * fills the inputfield for category with the chosen task
 * 
 * @param {number} id - id of the chosen task
 */
function fillCategoryInTask(id) {
  for (let i = 0; i < category.length; i++) {
    if(todos[id]['category'] == category[i]) {
      showSelectedCategory(i);
    }
  }
}

/**
 * Distributes id`s for the tasks which bgeins at 0
 */
function redistributeIds() {
  for (let i = 0; i < todos.length; i++) {
    todos[i]['id'] = i;
  }
}

/**
 * saves the tasks to the server
 */
async function setTodosWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`todos_${currentUserJSON}`, todos);
  } else {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  loadTodosWithUserId();
}

/**
 * load the tasks from the server
 */
async function loadTodosWithUserId() {
  if (currentUser) {
      let currentUserJSON = JSON.stringify(currentUser)
      todos = JSON.parse(await getItem(`todos_${currentUserJSON}`));
  } else {
    if (JSON.parse(localStorage.getItem("todos"))) {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  }
}
