let currentDraggedElement;

/**
 * This function is used to get all tasks from the todos array and then renders the tasks on the site
 */
function render() {
  loadCurrentUser().then(() => {
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

let newTaskBoard = [];
function createTaskWithChosenProgress(progress) {
  newTaskBoard = [];
  saveTaskToArrayForBoard(progress);
}

function saveTaskToArrayForBoard(progress) {
  let nextId = todos.length;
  let title = document.getElementById('InputTitle').value;
  let description = document.getElementById('InputDescription').value;
  let category = document.getElementById('spanCategory').innerHTML;
  let assinedContacts = searchAssinedContacts();
  let choosedDate = document.getElementById('inputDate').value;
  let prio = selectedUrgency;
  let prioIcon = `../assets/img/${urgencyIcon}_icon.png`;
  let assinedSubtasks = searchAssinedSubtask();


  if(assinedSubtasks.length == 0) {
    newTaskBoard.push({
      'id': nextId,
      'progress': progress,
      'category': category,
      'title': title,
      'description': description,
      'progress-number': [],
      'participants': assinedContacts,
      'urgency': [prio, prioIcon],
      'dueDate': choosedDate,
    });
  }else{
    newTaskBoard.push({
      'id': nextId,
      'progress': progress,
      'category': category,
      'title': title,
      'description': description,
      'progress-number': [0, assinedSubtasks.length],
      'participants': assinedContacts,
      'urgency': [prio, prioIcon],
      'dueDate': choosedDate,
    });
  }
  pushNewTaskToTodosBoard();
  showSavedNotification();
  setTimeout(redirectToBoard, delay);
}

function pushNewTaskToTodosBoard() {
  todos.push(newTaskBoard[0]);
  setTodosWithUserId();
}

function removeAddTaskSlide() {
  document.getElementById("slide-contact").remove();
}

function showTaskedInDetail(id) {
  document.getElementById("task-container").innerHTML += getTaskDetails(id);
  colorForInitialsInTaskDetails(id);
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

function showEditTaskFromBoard(id) {
  removeAddTaskSlide();
  showAddTaskSlideForBoardHTML();
  fillTaskInfo(id);
}

function fillTaskInfo(id) {
  document.getElementById('InputTitle').value = todos[id]['title'];
  document.getElementById('InputDescription').value = todos[id]['description'];
  let changeDate;
  /* for (let i = todos[id]['dueDate'].length; i > 0; i--) {
    changeDate.push();
  } */
  document.getElementById('inputDate').value = todos[id]['dueDate'].split('-').join('.').toString();
  showCategory();
  fillCategoryInTask(id);
  document.getElementById('formSubmitButton').setAttribute('onClick', `saveEditedTask(${id})`);
  if(todos[id]['urgency'] == 'low') {
    selectPrio(0);
  }
  else if(todos[id]['urgency'] == 'normal') {
    selectPrio(1);
  } 
  else if(todos[id]['urgency'] == 'high') {
    selectPrio(2);
  }
}

function saveEditedTask(id) {
  todos.splice(id, 1);
  createNewTask();
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