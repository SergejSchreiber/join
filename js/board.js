let currentDraggedElement;
let boolean;

/**
 * This function is used to get all tasks from the todos array and then renders the tasks on the site
 */
function render() {
  loadCurrentUser().then(() => {
    loadSubtaskWithUserId();
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

function showAddTaskSlideForBoardHTML(progress) {
  document.getElementById("task-container").innerHTML += getTaskSlide(progress);
  renderSubtask();
}

function removeAddTaskSlide() {
  document.getElementById("slide-contact").remove();
  boolean = false;
}

function showTaskedInDetail(id) {
  if(boolean != true) {
    document.getElementById("task-container").innerHTML += getTaskDetails(id);
    colorForInitialsInTaskDetails(id);
  }
}

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

function removeTasksFromContainer() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('awaitingfeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}

function getInitials(fullName) {
    let firstInitial = fullName[0];
    let secondInitial = fullName.split(' ')[1][0];
    return firstInitial + secondInitial;
}

// functions to delete and edit tasks
function deleteTaskFromBoard(id) {
  todos.splice(id, 1);
  removeAddTaskSlide();
  redistributeIds();
  setTodosWithUserId();
  render();
}

function showEditTaskFromBoard(id, progress) {
  removeAddTaskSlide();
  showAddTaskSlideForBoardHTML(progress);
  fillTaskInfo(id);
}

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

function fillDateInEditedTask(id) {
  let filledDate = todos[id]['dueDate'].split('-').reverse().join('.').toString();
  document.getElementById('inputDate').value = filledDate;
}

function fillContactsInfoTask() {
  sortContactsByName(contacts);
}

function showMoveProgressSlide(id) {
  document.getElementById("task-container").innerHTML += getProgressOptions(id);
  boolean = true;
}

function saveEditedTask(id) {
  createNewTask(todos[id]['progress']);
  redistributeIds();
  setTodosWithUserId();
  testFunction();
}

function testFunction() {
  for (let i = 0; i < todos.length; i++) {
    if(typeof todos[i]['progress'] != 'string') {
      todos.splice(i, 1);
      console.log('wtf');
    }
  }
  setTodosWithUserId();
}

function fillCategoryInTask(id) {
  for (let i = 0; i < category.length; i++) {
    if(todos[id]['category'] == category[i]) {
      showSelectedCategory(i);
    }
  }
}

function redistributeIds() {
  for (let i = 0; i < todos.length; i++) {
    todos[i]['id'] = i;
  }
}

async function setTodosWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`todos_${currentUserJSON}`, todos);
  } else {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  loadTodosWithUserId();
}

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