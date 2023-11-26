/** 
 * Generates HTML content for displaying task categories.
 */
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

/** 
 * Generates HTML content for displaying task choose categories.
 */
function showChooseCategoryHtml(i) {
  return `
    <div class="chooseOptions">
      <span class="spanChooseCategory" onclick="showSelectedCategory(${i})">${category[i]}</span>
      <div><img class="addTaskDeleteIcon" onclick="deleteCategory(${i})" src="../assets/img/delete.png"></div>
    </div> 
  `;
}

function hideCategoryHtml() {
  return `
        <div class="selectBox" onclick="showCategory()">   
            <span>Select task category</span>
            <img src="../assets/img/arrow_down.png">
        </div>
    `;
}

/**
 * Generates HTML content for adding a new category.
 */
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

/**
 * Displays the selected category HTML content.
 * @param {*} index - The index of the selected category.
 * @returns {string} - The HTML representation of the selected category display.
 */
function showSelectedCategoryHtml(index) {
  return `
        <div class="selectBox" onclick="showCategory()">   
            <span id="spanCategory">${category[index]}</span>
            <img src="../assets/img/arrow_down.png">
        </div> 
    `;
}

/**
 * Generates HTML content for displaying contacts.
 * @returns {string} - The HTML representation of the contact selection container.
 */
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

/**
 * Generates HTML content for displaying sorted contacts.
 * @param {number} index - The index of the contacts.
 * @returns {string} - The HTML representation of the contact selection container.
 */
function showContactsSortedHtml(i) {
  return `
    <label class="contactContainer">
      <span class="checkmark">${contactsSorted[i]['name']}</span>
      <input id="contactCheckbox${i}" type="checkbox">   
    </label>
  `;
}

/**
 * Generates HTML content for hiding contacts.
 * @returns {string} - The HTML representation of the hidden contact selection container.
 */
function hideContactHtml() {
  return `
        <div class="selectBox" onclick="sortContactsByName(contacts)">
            <span>Select contacts to assign</span>
            <img src="../assets/img/arrow_down.png">
        </div>
    `;
}

/**
 * Generates HTML content for displaying gobal subtasks.
 * @param {number} index - The index of the subtask.
 * @returns {string} - The HTML representation of the subtask.
 */
function subtaskHtml(index) {
  return `
      <div class="divShowSubtask">
        <label class="lableContainer">
            <input id="subtaskCheckbox${index}" checked type="checkbox">
            <span class="checkmark">${allSubtasks[index]}</span>
        </label>
        <div><img class="addTaskDeleteIcon" onclick="deleteSubtask(${index})" src="../assets/img/delete.png"></div>
      </div>
    `;
}

/**
 * Generates HTML content for displaying subtasks per item.
 * @param {number} index - The index of the subtask.
 * @returns {string} - The HTML representation of the subtask.
 */
function subtaskHtmlItem(index, id) {
  return `
      <div class="divShowSubtask">
        <label class="lableContainer">
            <input id="subtaskCheckbox${index}" type="checkbox" ${todos[id].subtasks[index].status} onclick="checkboxClick(${index}, ${id})">
            <span class="checkmark">${todos[id].subtasks[index].name}</span>
        </label>
        <div><img class="addTaskDeleteIcon" onclick="deleteSubtaskItem(${index}, ${id})" src="../assets/img/delete.png"></div>
      </div>
    `;
}