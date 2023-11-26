/**
 * Renders the content of the task management page. Loads user-related data, categories, subtasks, and renders the UI components.
 */
function renderContent() {
  loadCurrentUser().then(() => {
    loadContactsWithUserId().then(() => {
        loadTodosWithUserId();
        });
    });
    document.getElementById('inputDate').min = new Date().toISOString().split('T')[0];
    loadCategoryWithUserId();
    renderSubtask();
}

/**
 * Functions for category selection
 */
let categoryIndex;
let categoryIsSelected = 0;
function showCategory() {
  categoryIsSelected = 0;
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += showCategoryHtml();
  let chooseContainer = document.getElementById('chooseCategory');
  for (let i = 0; i < category.length; i++) {
    chooseContainer.innerHTML += showChooseCategoryHtml(i);
  }
}

/**
 * Hides the category selection dropdown.
 */
function hideCategory() {
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += hideCategoryHtml();
}

/**
 * Adds a new category to the category list.
 */
function addNewCategory() {
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += addNewCategoryHtml();
}

/**
 * Pushes a new category to the category list.
 */
function pushNewCategory() {
  let inputValue = document.getElementById('addNewCategoryInput').value;
  if (inputValue) {
    category.push(inputValue);
    setCategoryWithUserId();
    showCategory();
  } else {
    alert('Please enter a new category!');
  }
}

/**
 * Displays the selected category and handles category selection.
 * @param {number} index - The index of the selected category.
 * @returns {void}
 */
function showSelectedCategory(index) {
  categoryIndex = index;
  categoryIsSelected = 1;
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += showSelectedCategoryHtml(index);
}

/**
 * Deletes a category from the category list.
 * @param {*} index - The index of the selected category.
 */
function deleteCategory(index) {
  category.splice(index, 1);
  setCategoryWithUserId();
  showCategory();
}

/**
 * Sorts contacts by name and displays them.
 * @param {Array} contacts - An array of contact objects to be sorted.
 * @returns {void}
 */
let contactsSorted = [];
function sortContactsByName(contacts) {
  contacts.sort(function(a, b) {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1; // a kommt vor b
    }
    if (nameA > nameB) {
      return 1; // a kommt nach b
    }
    return 0; // Namen sind gleich
  });
  contactsSorted = contacts;
  showContacts(contactsSorted);
}

/**
 * Displays contacts and handles contact-related actions.
 * @param {Array} contactsSorted - An array of contacts sorted by name.
 * @returns {void}
 */
function showContacts(contactsSorted) {
  let selectContainer = document.getElementById('selectContact');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += showContactsHtml();
  let chooseContainer = document.getElementById('divShowContact');
  for (let i = 0; i < contactsSorted.length; i++) {
    chooseContainer.innerHTML += showContactsSortedHtml(i);
  }
}

/**
 * Hides the contact selection dropdown.
 */
function hideContact() {
  let selectContainer = document.getElementById('selectContact');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += hideContactHtml();
}

/**
 * Functions for priority selection
 */
let prioColor = ['#FF3D00', '#FFA800', '#7AE229'];
let prioIndex = [0, 0, 0];
let priorities = ['high', 'normal', 'low'];
let priorities2 = ['urgent', 'medium', 'low'];
let urgencyIcon = '';
let selectedUrgency = '';
let urgencyCounter = 0;

/**
 * Handles priority selection and displays priority-related UI.
 * @param {number} index - The index of the selected priority.
 * @returns {void}
 */
function selectPrio(index) {
  resetPrio(index);
  selectedUrgency = priorities[index];
  urgencyIcon = priorities2[index];
  if (prioIndex[index] == 0) {
    setPrioSelection(index)
  } else {
    prioIndex[index] = 0;
    urgencyCounter = 0;
  }
}

/**
 * Sets the prio selection on the index element
 * @param {number} index - The index of the priority to be selected.
 * @returns {void}
 */
function setPrioSelection(index) {
  let element = document.getElementById(`divPrio${index}`);
  let pathIcon1 = document.getElementById(`iconPath${index}`);
  let pathIcon2 = document.getElementById(`iconPath${index}${index}`);
  pathIcon1.setAttribute('fill', 'white');
  pathIcon2.setAttribute('fill', 'white');
  element.style.backgroundColor = prioColor[index];
  element.classList.add("prioIsSelected");
  prioIndex[0] = 0;
  prioIndex[1] = 0;
  prioIndex[2] = 0;
  prioIndex[index] = 1;
  urgencyCounter = 1;
}

/**
 * Resets priority selection UI.
 * @param {number} index - The index of the priority to exclude from the reset.
 * @returns {void}
 */
function resetPrio(index) {
  for (let i = 0; i < 3; i++) {
    let element = document.getElementById(`divPrio${i}`);
    let pathIcon1 = document.getElementById(`iconPath${i}`);
    let pathIcon2 = document.getElementById(`iconPath${i}${i}`);
    element.style.backgroundColor = "white";
    element.classList.remove("prioIsSelected");
    pathIcon1.setAttribute('fill', prioColor[i]);
    pathIcon2.setAttribute('fill', prioColor[i]);
  }
}

/**
 * Adds a new subtask to the subtask list.
 */
function addNewSubtask() {
  let newSubtask = document.getElementById('addNewSubtaskInput');
  if (newSubtask.value) {
    allSubtasks.push(newSubtask.value);
    newSubtask.value = "";
    renderSubtask();
  } else {    
    alert('Please enter a new subtask!');
  }
}

/**
 * Renders global subtasks and handles subtask-related actions.
 */
function renderSubtask() {
  let subDiv = document.getElementById(`divShowSubtasks`);
  subDiv.innerHTML = '';
  for (let i = 0; i < allSubtasks.length; i++) {
    subDiv.innerHTML += subtaskHtml(i);
  }
}

/**
 * Adds a new subtask to the subtask list.
 */
function addNewSubtaskItem(id) {
  let newSubtask = document.getElementById('addNewSubtaskInput');
  if (newSubtask.value) {
    todos[id].subtasks.push({ name: newSubtask.value, done: false });
    newSubtask.value = "";
    renderSubtaskItem(id);
  } else {    
    alert('Please enter a new subtask!');
  }
}

/**
 * Renders subtasks per item and handles subtask-related actions.
 */
function renderSubtaskItem(id) {
  if (todos[id].subtasks) {
  let subDiv = document.getElementById(`divShowSubtasksItem`);
  subDiv.innerHTML = '';
  for (let i = 0; i < todos[id].subtasks.length; i++) {
    subDiv.innerHTML += subtaskHtmlItem(i, id);
  }
}
}

/**
 * Deletes a subtask from the global subtask list.
 * @param {number} index - The index of the subtask to be deleted.
 * @returns {void}
 */
function deleteSubtask(index) {
  allSubtasks.splice(index, 1);
  renderSubtask();
}

/**
 * Deletes a subtask from the subtask per item list.
 * @param {number} index - The index of the subtask to be deleted.
 * @returns {void}
 */
function deleteSubtaskItem(index, id) {
  todos[id].subtasks.splice(index, 1);
  todos[id].progressnumber[1] = todos[id].subtasks.length;
  renderSubtaskItem(id);
  render();
  setTodosWithUserId();
}

/**
 * Functions for clear and create button
 */
let newTask = [];
let selectedProgress = 'todo';
const delay = 3000;
function xIconColor(index) {
  let numb = index;
  let pfad = document.getElementById('xIconPath');
  if (numb == 1) {
    pfad.setAttribute('stroke', '#29abe2');
  } else {
    pfad.setAttribute('stroke', '#2A3647');
  }
}

/**
 * Creates a new task, validates inputs, and saves it.
 * @param {number} progress - The progress indicator for the new task.
 * @returns {void}
 */
function createNewTask(progress) {
  if(categoryIsSelected == 1){
    if(urgencyCounter == 1){
      handleValidTaskCreation(progress);
    }else{
      handleInvalidUrgencySelection();
    }
  }else{
    handleInvalidCategorySelection();
  }
}

/**
 * Handles the case, when valid task selected
 * @param {number} progress - The progress indicator for the new task.
 * @returns {void}
 */
function handleValidTaskCreation(progress) {
  newTask = [];
  selectedProgress = progress;
  saveTaskToArray();
  pushNewTaskToTodos();
  document.getElementById('savedNotificationDiv').classList.remove('d-none');
  setTimeout(redirectToBoard, delay);
}

/**
 * Handles the case, when invalid urgency selected
 */
function handleInvalidUrgencySelection() {
  let categoryPrio = document.getElementById('categoryPrio');
  categoryPrio.textContent = 'Please select a Prio';
  categoryPrio.style.color = 'red';
  categoryPrio.style.fontWeight = 'bold';
  setTimeout(function () {
    resetCategoryLabel(categoryPrio);
  }, 5000);
}

/**
 * Handles the case, when invalid category selected
 */
function handleInvalidCategorySelection() {
  let categoryLabel = document.getElementById('categoryLabel');
    categoryLabel.textContent = 'Please select a category';
    categoryLabel.style.color = 'red';
    categoryLabel.style.fontWeight = 'bold';
    setTimeout(function() {
      categoryLabel.textContent = 'Category';
      categoryLabel.style.color = '';
      categoryLabel.style.fontWeight = '';
    }, 5000);
}

/**
 * Redirects the user to the task management board after a delay.
 */
function redirectToBoard() {
  window.location.href = '../html/board.html';
}

/**
 * Saves task data to an array.
 */
function saveTaskToArray() {
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
    saveTaskWithNoSubtasks(nextId, title, description, category, assinedContacts, prio, prioIcon, choosedDate);
  }else{
    saveTaskWithSubtasks(nextId, title, description, category, assinedContacts, prio, prioIcon, choosedDate, assinedSubtasks);
  }
}

/**
 * Saves a task with no assigned subtasks to the newTask array.
 */
function saveTaskWithNoSubtasks(nextId, title, description, category, assinedContacts, prio, prioIcon, choosedDate) {
  newTask.push({
    'id': nextId,
    'progress': selectedProgress,
    'category': category,
    'title': title,
    'description': description,
    'progressnumber': [],
    'subtasks': [],
    'participants': assinedContacts,
    'urgency': [prio, prioIcon],
    'dueDate': choosedDate,
  });
}

/**
 * Saves a task with assigned subtasks to the newTask array.
 */
function saveTaskWithSubtasks(nextId, title, description, category, assinedContacts, prio, prioIcon, choosedDate, assinedSubtasks) {
  newTask.push({
    'id': nextId,
    'progress': selectedProgress,
    'category': category,
    'title': title,
    'description': description,
    'progressnumber': [0, assinedSubtasks.length],
    'subtasks': assinedSubtasks,
    'participants': assinedContacts,
    'urgency': [prio, prioIcon],
    'dueDate': choosedDate,
  });
}

function progessNumberUpdate(id) {
  todos[id].progressnumber[1]
}

/**
 * Retrieves selected contacts from the UI.
 * @returns {Array} - An array of names representing the selected contacts.
 */
function searchAssinedContacts() {
  let choosedContacts = [];
  let contactsCheckboxCount = contactsSorted.length;
  for (let i = 0; i < contactsCheckboxCount; i++) {
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    if (checkbox && checkbox.checked) {
      choosedContacts.push(contactsSorted[i]['name']);
    }
  }
  return choosedContacts;
}

/**
 * Retrieves selected subtasks from the UI.
 * @returns {Array} - An array of subtasks representing the selected subtasks.
 */
function searchAssinedSubtask() {
  let choosedSubtasks = [];
  let noSubtask = '';
  for (let i = 0; i < allSubtasks.length; i++) {
    let currentCheckbox = document.getElementById(`subtaskCheckbox${i}`);
    if (currentCheckbox.checked) {
      choosedSubtasks.push({ name: allSubtasks[i], done: false });
    }
  }
  return choosedSubtasks;
}


function checkboxClick(index, id) {
  checkbox = document.getElementById(`subtaskCheckbox${index}`);
  let isChecked = checkbox.checked;
  todos[id].subtasks[index].done = isChecked;
  if (todos[id].subtasks[index].done) {
    todos[id].subtasks[index].status = "checked";
  } else {
    todos[id].subtasks[index].status = "";
  }
  todos[id].progressnumber[0] = todos[id].subtasks.filter(subtask => subtask.status === 'checked').length;
  let progressPercent = (todos[id].progressnumber[1] > 0) ? (todos[id].progressnumber[0] / todos[id].progressnumber[1]) * 100 : 0;
  todos[id].subtasksProgress = progressPercent;
  setTodosWithUserId();
  render();
}

/**
 * Adds a new task to the todos array and saves it.
 */
function pushNewTaskToTodos() {
  todos.push(newTask[0]);
  setTodosWithUserId();
  setCategoryWithUserId();
}

/**
 * Sets user-specific task data in local storage or database.
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
 * Loads user-specific task data from local storage or database.
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

/**
 * Sets user-specific category data in local storage or database.
 */
async function setCategoryWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`category_${currentUserJSON}`, category);
  } else {
    localStorage.setItem("category", JSON.stringify(category));
  }
  loadCategoryWithUserId();
}

/**
 * Loads user-specific category data from local storage or database.
 */
async function loadCategoryWithUserId() {
  if (currentUser) {
      let currentUserJSON = JSON.stringify(currentUser)
      category = JSON.parse(await getItem(`category_${currentUserJSON}`));
  } else {
    if (JSON.parse(localStorage.getItem("category"))) {
      category = JSON.parse(localStorage.getItem("category"));
    }
  }
}