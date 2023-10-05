// Renders the content of the task management page.
// Loads user-related data, categories, subtasks, and renders the UI components.

function renderContent() {
  loadCurrentUser().then(() => {
    loadContactsWithUserId().then(() => {
        loadTodosWithUserId();
        });
    });
    document.getElementById('inputDate').min = new Date().toISOString().split('T')[0];
    loadSubtaskWithUserId();
    loadCategoryWithUserId();
    renderSubtask();  
}

// Functions for category selection
let categoryIndex;
let categoryIsSelected = 0;

function showCategory() {
  categoryIsSelected = 0;
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += showCategoryHtml();
  let chooseContainer = document.getElementById('chooseCategory');
  for (let i = 0; i < category.length; i++) {
    chooseContainer.innerHTML += `
            <div class="chooseOptions">
                <span class="spanChooseCategory" onclick="showSelectedCategory(${i})">${category[i]}</span>
                <div><img class="addTaskDeleteIcon" onclick="deleteCategory(${i})" src="../assets/img/delete.png"></div>
            </div>
        `;
  }
}

// Generates HTML content for displaying task categories.
function showCategoryHtml() {
  return `
        <div id="chooseCategory" class="chooseCategory">
            <div class="chooseBox" onclick="hideCategory()">
                <span>Select task category</span>
                <img src="../assets/img/arrow_down.png">
            </div>
            <div class="chooseOptionsNew" onclick="addNewCategory()">
                <span>New category</span>
            </div>
        </div>
    `;
}

// Hides the category selection dropdown.
function hideCategory() {
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += hideCategoryHtml();
}

// Generates HTML content for hiding task categories.
function hideCategoryHtml() {
  return `
        <div class="selectBox" onclick="showCategory()">   
            <span>Select task category</span>
            <img src="../assets/img/arrow_down.png">
        </div>
    `;
}

// Adds a new category to the category list.
function addNewCategory() {
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += addNewCategoryHtml();
}

// Generates HTML content for adding a new category.
function addNewCategoryHtml() {
  return ` 
        <div class="addNewCategoryContainer">  
            <input id="addNewCategoryInput" class="addNewCategoryInput" placeholder="New category name" type="text"/> 
            <div class="addNewCategoryContainerIcons">
                <div class ="xIconCategory" onclick="showCategory()">
                    <svg class ="xIconCategory" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="xIconPath" d="M12.5011 12.5001L17.7441 17.7431M7.25806 17.7431L12.5011 12.5001L7.25806 17.7431ZM17.7441 7.25708L12.5001 12.5001L17.7441 7.25708ZM12.5001 12.5001L7.25806 7.25708L12.5001 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                    <div class="dividingLineCategory"></div>
                <div class ="hookIconCategory" onclick="pushNewCategory()">
                    <svg class ="hookIconCategory" width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5L7 13.5L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                <div>
            </div>
        </div>
    `;
}

// Pushes a new category to the category list.
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

// Displays the selected category and handles category selection.
function showSelectedCategory(index) {
  categoryIndex = index;
  categoryIsSelected = 1;
  let selectContainer = document.getElementById('selectCategory');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += showSelectedCategoryHtml(index);
}

// Displays the selected category HTML content.
function showSelectedCategoryHtml(index) {
  return `
        <div class="selectBox" onclick="showCategory()">   
            <span id="spanCategory">${category[index]}</span>
            <img src="../assets/img/arrow_down.png">
        </div> 
    `;
}

// Deletes a category from the category list.
function deleteCategory(index) {
  category.splice(index, 1);

  setCategoryWithUserId();
  showCategory();
}

// Functions for assign contacts selection
let contactsSorted = [];

// Sorts contacts by name and displays them.
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

// Displays contacts and handles contact-related actions.
function showContacts(contactsSorted) {
  let selectContainer = document.getElementById('selectContact');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += showContactsHtml();
  let chooseContainer = document.getElementById('divShowContact');
  for (let i = 0; i < contactsSorted.length; i++) {
    chooseContainer.innerHTML += `
            <label class="contactContainer">
                <span class="checkmark">${contactsSorted[i]['name']}</span>
                <input id="contactCheckbox${i}" type="checkbox">   
            </label>
        `;
  }
}

// Generates HTML content for displaying contacts.
function showContactsHtml() {
  return `
        <div id="chooseContact" class="chooseCategory">
            <div class="chooseBox" onclick="hideContact()">
                <span>Select contacts to assign</span>
                <img src="../assets/img/arrow_down.png">
            </div>
            <div id="divShowContact" class="divShowSubtasks"></div>
        </div>
    `;
}

// Hides the contact selection dropdown.
function hideContact() {
  let selectContainer = document.getElementById('selectContact');
  selectContainer.innerHTML = '';
  selectContainer.innerHTML += hideContactHtml();
}

// Generates HTML content for hiding contacts.
function hideContactHtml() {
  return `
        <div class="selectBox" onclick="sortContactsByName(contacts)">
            <span>Select contacts to assign</span>
            <img src="../assets/img/arrow_down.png">
        </div>
    `;
}

// Functions for priority selection
let prioColor = ['#FF3D00', '#FFA800', '#7AE229'];
let prioIndex = [0, 0, 0];
let priorities = ['high', 'normal', 'low'];
let priorities2 = ['urgent', 'medium', 'low'];
let urgencyIcon = '';
let selectedUrgency = '';
let urgencyCounter = 0;

// Handles priority selection and displays priority-related UI.
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

// sets the prio selection on the index element
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

// Resets priority selection UI.
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

// Adds a new subtask to the subtask list.
function addNewSubtask() {
  let newSubtask = document.getElementById('addNewSubtaskInput');
  if (newSubtask.value) {
    allSubtasks.push(newSubtask.value);
    newSubtask.value = "";
    setSubtaskWithUserId();
    renderSubtask();
  } else {    
    alert('Please enter a new subtask!');
  }
}

// Renders subtasks and handles subtask-related actions.
function renderSubtask() {
  let subDiv = document.getElementById(`divShowSubtasks`);
  subDiv.innerHTML = '';
  for (let i = 0; i < allSubtasks.length; i++) {
    subDiv.innerHTML += subtaskHtml(i);
  }
}

// Generates HTML content for displaying subtasks.
function subtaskHtml(index) {
  return `
      <div class="divShowSubtask">
        <label class="lableContainer">
            <input id="subtaskCheckbox${index}" type="checkbox">
            <span class="checkmark">${allSubtasks[index]}</span>
        </label>
        <div><img class="addTaskDeleteIcon" onclick="deleteSubtask(${index})" src="../assets/img/delete.png"></div>
      </div>
    `;
}

// Deletes a subtask from the subtask list.
function deleteSubtask(index) {
  allSubtasks.splice(index, 1);

  setSubtaskWithUserId();
  renderSubtask();
}

// Functions for clear and create button
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

// Creates a new task, validates inputs, and saves it.
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

// Handles the case, when valid task selected
function handleValidTaskCreation(progress) {
  newTask = [];
  selectedProgress = progress;
  saveTaskToArray();
  pushNewTaskToTodos();
  showSavedNotification();
  setTimeout(redirectToBoard, delay);
}

// Handles the case, when invalid urgency selected
function handleInvalidUrgencySelection() {
  let categoryPrio = document.getElementById('categoryPrio');
  categoryPrio.textContent = 'Please select a Prio';
  categoryPrio.style.color = 'red';
  categoryPrio.style.fontWeight = 'bold';
  setTimeout(function () {
    resetCategoryLabel(categoryPrio);
  }, 5000);
}

// Handles the case, when invalid category selected
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

// Displays a notification indicating the task has been saved.
function showSavedNotification() {
  document.getElementById('savedNotificationDiv').classList.remove('d-none');
}

// Redirects the user to the task management board after a delay.
function redirectToBoard() {
  window.location.href = '../html/board.html';
}

// Saves task data to an array.
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

// Saves a task with no assigned subtasks to the newTask array.
function saveTaskWithNoSubtasks(nextId, title, description, category, assinedContacts, prio, prioIcon, choosedDate) {
  newTask.push({
    'id': nextId,
    'progress': selectedProgress,
    'category': category,
    'title': title,
    'description': description,
    'progress-number': [],
    'participants': assinedContacts,
    'urgency': [prio, prioIcon],
    'dueDate': choosedDate,
  });
}

// Saves a task with assigned subtasks to the newTask array.
function saveTaskWithSubtasks(nextId, title, description, category, assinedContacts, prio, prioIcon, choosedDate, assinedSubtasks) {
  newTask.push({
    'id': nextId,
    'progress': selectedProgress,
    'category': category,
    'title': title,
    'description': description,
    'progress-number': [0, assinedSubtasks.length],
    'participants': assinedContacts,
    'urgency': [prio, prioIcon],
    'dueDate': choosedDate,
  });
}

// Retrieves selected contacts from the UI.
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

// Retrieves selected subtasks from the UI.
function searchAssinedSubtask() {
  let choosedSubtasks = [];
  let noSubtask = '';
  for (let i = 0; i < allSubtasks.length; i++) {
    let currentCheckbox = document.getElementById(`subtaskCheckbox${i}`);
    if (currentCheckbox.checked) {
      choosedSubtasks.push(allSubtasks[i]);
    }
  }
  return choosedSubtasks;
}

// Adds a new task to the todos array and saves it.
function pushNewTaskToTodos() {
  todos.push(newTask[0]);
  setTodosWithUserId();
  setSubtaskWithUserId();
  setCategoryWithUserId();
}

// Sets user-specific task data in local storage or database.
async function setTodosWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`todos_${currentUserJSON}`, todos);
  } else {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  loadTodosWithUserId();
}

// Loads user-specific task data from local storage or database.
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

// Sets user-specific subtask data in local storage or database.
async function setSubtaskWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`allSubtasks_${currentUserJSON}`, allSubtasks);
  } else {
    localStorage.setItem("allSubtasks", JSON.stringify(allSubtasks));
  }
  loadSubtaskWithUserId();
}

// Loads user-specific subtask data from local storage or database.
async function loadSubtaskWithUserId() {
  if (currentUser) {
      let currentUserJSON = JSON.stringify(currentUser)
      allSubtasks = JSON.parse(await getItem(`allSubtasks_${currentUserJSON}`));
  } else {
    if (JSON.parse(localStorage.getItem("allSubtasks"))) {
      allSubtasks = JSON.parse(localStorage.getItem("allSubtasks"));
    }
  }
}

// Sets user-specific category data in local storage or database.
async function setCategoryWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`category_${currentUserJSON}`, category);
  } else {
    localStorage.setItem("category", JSON.stringify(category));
  }
  loadCategoryWithUserId();
}

// Loads user-specific category data from local storage or database.
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