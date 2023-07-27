let currentDraggedElement;

render();

function render() {
  loadCurrentUser().then(() => {
    loadTodosWithUserId().then(() => {
      for (let i = 0; i < todos.length; i++) {
        let addTodo = document.getElementById(todos[i]["progress"]);
        addTodo.innerHTML += createTaskContainer(i);
        giveCategoryBackgroundColor(i);
      }
    });
  });
}

function giveCategoryBackgroundColor(id) {
    let colorBackground = document.getElementById('category-' + id);
    colorBackground.style = `background-color: ${COLOR_FOR_CATEGORY[id]}`;
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
  render();
}

function highlight(progress) {
    document.getElementById(progress).classList.add('highlight-drag-area');
}

function removeHighlight(progress) {
    document.getElementById(progress).classList.remove('highlight-drag-area');
}

function showAddTaskSlideForBoardHTML() {
  document.getElementById("task-container").innerHTML += getTaskSlide();
}

function removeAddTaskSlide() {
  document.getElementById("slide-contact").remove();
}

function showTaskedInDetail(id) {
  document.getElementById("task-container").innerHTML += getTaskDetails(id);
}

function filterTasks() { // search function
    let search = document.getElementById('search-task').value.toLowerCase();
    removeTasksFromContainer();
    for (let i = 0; i < todos.length; i++) {
        let task = todos[i];
        if (task['title'].toLowerCase().includes(search)) {
            let addTodo = document.getElementById(todos[i]['progress']);
            addTodo.innerHTML += createTaskContainer(i);
            giveCategoryBackgroundColor(i);
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
    console.log(fullName);
    return firstInitial + secondInitial;
}
