let currentDraggedElement;

render();

function render() {
    for (let i = 0; i < todos.length; i++) {
        let addTodo = document.getElementById(todos[i]['progress']);
        addTodo.innerHTML += createTaskContainer(i);
        giveCategoryBackgroundColor(i);
    }
}

function removeTaskHTML() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('awaitingfeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}

function startDraggin(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(progress) {
    todos[currentDraggedElement]['progress'] = progress;
    removeTaskHTML();
    render();
}

function showAddTaskSlideForBoardHTML() {
    document.getElementById('task-container').innerHTML += getTaskSlide();
}

function removeAddTaskSlide() {
    document.getElementById('slide-contact').remove();
}

function highlight(progress) {
    document.getElementById(progress).classList.add('highlight-drag-area')
}

function removeHighlight(progress) {
    document.getElementById(progress).classList.remove('highlight-drag-area')
}

function showTaskedInDetail(id) {
    document.getElementById('task-container').innerHTML += getTaskDetails(id);
}

function giveCategoryBackgroundColor(id) {
    let colorBackground = document.getElementById('category-' + id);
    colorBackground.style = `background-color: ${colorCategory[todos[id]['category']]}`;
}

function getInitials(fullName) {
    console.log(fullName);
    let firstInitial = fullName[0];
    let secondInitial = fullName.split(' ')[1][0];
    return firstInitial + secondInitial;
}

function filterTasks() { // search function
    let search = document.getElementById('search-task').value.toLowerCase();
    removeTasksFromContainer();
    for (let i = 0; i < todos.length; i++) {
        let task = todos[i];
        if (task['title'].toLowerCase().includes(search)) {
            let addTodo = document.getElementById(todos[i]['progress']);
            addTodo.innerHTML += createTaskContainer(todos[i]['id'], todos[i]['category'], todos[i]['title'], todos[i]['description'], todos[i]['progress-number'], todos[i]['participants'], todos[i]['urgency']);
            giveCategoryBackgroundColor(i);
        }
    }
}

function removeTasksFromContainer() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('awaitingfeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}