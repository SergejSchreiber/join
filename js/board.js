let currentDraggedElement;


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

function removeTaskHTML() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("awaitingfeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

// Dragging function
function startDraggin(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(progress) {
  todos[currentDraggedElement]["progress"] = progress;
  removeTaskHTML();
  setTodosWithUserId();
  render();
  removeHighlight(progress);
}

function highlight(progress) {
    document.getElementById(progress).classList.add('highlight-drag-area');
}

function removeHighlight(progress) {
    document.getElementById(progress).classList.remove('highlight-drag-area');
}

function showAddTaskSlideForBoardHTML() {
  document.getElementById("task-container").innerHTML += getTaskSlide();
  renderSubtask();
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