const COLOR_FOR_CATEGORY = [
    "#FF7A00",
    "#FC71FF",
    "#1FD7C1",
    "#0038FF",
    "#FFC701",
    "#9327FF",
    "#CB02CF",
    "#4E963D",
    "#32DAFF",
    "#FF7A00",
    "#FC71FF",
    "#1FD7C1",
    "#0038FF",
    "#FFC701",
    "#9327FF",
    "#CB02CF",
    "#4E963D",
    "#32DAFF",
  ];

  /**
   * beginning function if th site is clicked
   */
function initContacts() {
loadCurrentUser().then(() => {
        loadContactsWithUserId();
        loadTodosWithUserId();
        loadSubtaskWithUserId();
        loadCategoryWithUserId();
        renderContacts();
    });
}

/**
 * renders the site
 */
function renderContacts() {
    let namesArr = getSortedNamesArray();
    let letterArr = [];
    let contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    let lastNumber;
    for (let i = 0; i < namesArr.length; i++) {
        if(letterArr.includes(namesArr[i]['name'][0].toUpperCase())  == false) {
            contactList.innerHTML += `
                <div id="letter-${i}" class="letter">
                    <div class="letter-header">${namesArr[i]['name'][0].toUpperCase()}</div>
                    <div class="horizontal-line"></div>
                    <div class="contact" onclick="showContactDetails(${namesArr[i]['contactId']})">
                        <div id="backgroundcolor-initials-${i}" class="icon">${getInitials(namesArr[i]['name'])}</div>
                        <div class="contact-info">
                            <p>${namesArr[i]['name']}</p>
                            <div>${namesArr[i]['mail']}</div>
                        </div>
                    </div>
                </div>
            `; 
            lastNumber = i;
        }
        else {
            document.getElementById('letter-' + lastNumber).innerHTML += `
                <div class="contact" onclick="showContactDetails(${namesArr[i]['contactId']})">
                    <div id="backgroundcolor-initials-${i}" class="icon">${getInitials(namesArr[i]['name'])}</div>
                    <div class="contact-info">
                        <p>${namesArr[i]['name']}</p>
                        <div>${namesArr[i]['mail']}</div>
                    </div>
                </div>
            `;
        }
        letterArr.push(namesArr[i]['name'][0].toUpperCase());
        giveInitialsBackgroundColor(i);
    }
}

/**
 * returns the HTML-code for details of the chosen contact
 * 
 * @param {Array} contactArr - array with the conacts array
 * @returns 
 */
function getContactDetails(contactArr) {
    return `
        <div class="chosen-contact-header">
            <div class="name-icon">${getInitials(contactArr['name'])}</div>
            <div class="contact-name">
                <div class="contact-name-part">${contactArr['name']}</div>
                <div class="task-button" onclick="showAddTaskSlide()">
                    <img src="../assets/img/plus_icon.png" alt="">
                    <p>Add Task</p>
                </div>
            </div>
        </div>
        <div class="contact-info-header">
            <p>Contact Information</p>
            <div class="edit-delete-button">
                <div class="edit-button" onclick="NewContactSlide(${1}, ${contactArr['contactId']}, 'edit')">
                    <img src="../assets/img/edit.svg" alt="">
                    <p>Edit</p>
                </div>
                <div class="delete-button" onclick="deleteContact(${contactArr['contactId']})">
                    <img src="../assets/img/delete.png" alt="">
                    <p>Delete</p>
                </div>
            </div>
        </div>
        <div class="mail-info-header">Email</div>
        <div class="mail-info">${contactArr['mail']}</div>
        <div class="phone-info-header">Phone</div>
        <div class="phone-info">${contactArr['telefonnummer']}</div>
    `;
}

/**
 * returns the HTML-code slide for either edit or new contact
 * 
 * @param {number} input - variable which decides if it is a edit or new contact slide
 * @param {number} id - id of the chosen contact
 * @param {string} submitVariable - variable for the shown header in the slide
 * @returns 
 */
function getSlide(input, id, submitVariable) {
    return `
        <div id="slide-contact">
            <div class="pop-up">
                <div class="add-contact-left">
                    <img src="../assets/img/join_logo_white.png" alt="">
                    ${getLeftSideSlide(input)}
                    <span class="extra-horizontal-line"></span>
                </div>
                <div class="add-contact-right">
                    ${getProfilePic(input, id)}
                    <form onsubmit="${returnFunctionHTMLForSubmit(id, submitVariable)} removeSlide(); return false;" class="form-side" action="">
                        <div onclick="removeSlide()" class="x-icon"><img src="../assets/img/x_icon.svg" alt=""></div>
                        <div onclick="removeSlide()" class="x-icon-white"><img src="../assets/img/x_icon_white.png" alt=""></div>
                        ${getInputTags(input, id)}
                        <div id="slide-buttons" class="pop-up-buttons">${getCreateOrEditSlide(input, id)}</div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

/**
 * returns the HTML-code as the header of either edit or new contact
 * 
 * @param {number} id - id of the chosen contact
 * @param {string} submitVariable - variable to decide the 
 * @returns 
 */
function returnFunctionHTMLForSubmit(id, submitVariable) {
    if(submitVariable == 'new') {
        return 'addContact();';
    } else {
        return `editContact(${id});`;
    }
}

/**
 * returns the HTML-code for inputfield for either new or edit contact
 * 
 * @param {number} input - number to decide if edit or new contact
 * @param {number} id - id of the chosen contact
 * @returns 
 */
function getInputTags(input, id) {
    if (input === 0) {
        return `
            <div><input id="input-name" class="pop-up-input" type="text" placeholder="Name" required /></div>
            <div><input id="input-email" class="pop-up-input" type="email" placeholder="Email" required /></div>
            <div><input id="input-phone" class="pop-up-input" type="number" placeholder="Phone" required /></div>
        `;
    }
    else {
        return `
            <div><input id="input-name" class="pop-up-input" type="text" placeholder="Name" value="${contacts[id]['name']}" required /></div>
            <div><input id="input-email" class="pop-up-input" type="email" placeholder="Email" value="${contacts[id]['mail']}" required /></div>
            <div><input id="input-phone" class="pop-up-input" type="number" placeholder="Phone" value="${contacts[id]['telefonnummer']}" required /></div>
        `;
    }
}

/**
 * returns the HTML-code for the profile pic 
 * 
 * @param {number} input - number to decide if edit or new contact
 * @param {*} id - id of the chosen contact
 * @returns 
 */
function getProfilePic(input, id) {
    if (input === 0) {
        return `
            <div class="profile-icon"><img src="../assets/img/user-line.svg" alt=""></div>
        `;
    }
    else {
        return `
            <div class="specific-profile-icon"><p>${getInitials(contacts[id]['name'])}</p></div>
        `;
    }
}

/**
 * returns the HTML-code for the button for either eid oder new contact
 * 
 * @param {number} input - number to decide if edit or new contact
 * @param {number} id - id of the chosen contact
 * @returns 
 */
 function getCreateOrEditSlide(input, id) {
    if (input == 0) {
        return `
            <button type="button" onclick="cancelNewContactInfos()" class="cancel-btn">
                <p>Cancel</p>
                <img src="../assets/img/x_icon.svg" alt="">
            </button>
            <button type="submit" class="create-btn">
                <p>Create Contact</p>
                <img src="../assets/img/hook_icon.svg" alt="">
            </button>
        `;
    }
    else if(input == 1) {
        return `
            <div>
                <button type="button" onclick="deleteContactFromEditSlide(${id})" class="delete-btn">Delete</button>
                <button type="submit" class="save-btn">Save</button>
            </div>
        `;
    }
}

/**
 * returns the HTML-code for the left side of the slide
 * 
 * @param {number} input - number to decide if edit or new contact
 * @returns 
 */
function getLeftSideSlide(input) {
    if (input == 0) {
        return `
            <div>Add contact</div>
            <p>Tasks are better with a team!</p>
        `;
    }
    else if(input == 1) {
        return `
            <div>Edit Contact</div>
        `;
    }
}

/**
 * 
 * @returns HTML-code for the task slide
 */
function getTaskSlide() {
    return `
        <div id="slide-contact">
          <form class="addTaskForm" onsubmit="createNewTask('todo'); return false;">
              <div class="addTaskFormContent">
                  <div class="addTaskFormContentLeft">
                      <div class="addTaskDivTitle">
                          <span class="addTaskInputHead">Title</span>
                          <input id="InputTitle" class="addTaskInputTitle" required placeholder="Enter a title" type="text" name="title" id="addTaskTitle"/>
                      </div>
                      <div class="addTaskDivDescription">
                          <span class="addTaskInputHead">Description</span>
                          <textarea id="InputDescription" class="addTaskInputDescription" required placeholder="Enter a Description" type="text" name="title"></textarea>
                      </div>
                      <div class="addTaskDivCategory">
                          <span class="addTaskInputHead">Category</span>
                          <div id="selectCategory" class="selectCategory">
                              <div class="selectBox" onclick="showCategory()">   
                                  <span>Select task category</span>
                                  <img src="../assets/img/arrow_down.png">
                              </div>
                          </div>
                      </div>
                      <div class="addTaskDivAssign">
                          <span class="addTaskInputHead">Assigned to</span>
                          <div id="selectContact" class="selectCategory">
                              <div class="selectBox" onclick="sortContactsByName(contacts)">
                                  <span>Select contacts to assign</span>
                                  <img src="../assets/img/arrow_down.png">
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="addTaskFormContentMiddle"></div>
                  <div class="addTaskFormContentRight">
                      <div class="addTaskDivDate">
                          <span class="addTaskInputHead">Due date</span>
                          <input required id="inputDate" class="addTaskInputDate" type="text" placeholder="dd/mm/yyyy" onfocus="(this.type = 'date')">
                      </div>
                      <div class="addTaskDivPrio">
                          <span class="addTaskInputHead">Prio</span>
                          <div class="addTaskPrio">
                              <div id="divPrio0" class="divPrio" style="background-color: #FFFFFF;" onclick="selectPrio(0)">Urgent
                                  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path id="iconPath0" d="M19.4043 14.7547C19.1696 14.7551 18.9411 14.6803 18.7522 14.5412L10.5001 8.458L2.24809 14.5412C2.13224 14.6267 2.00066 14.6887 1.86086 14.7234C1.72106 14.7582 1.57577 14.7651 1.43331 14.7437C1.29084 14.7223 1.15397 14.6732 1.03053 14.599C0.907083 14.5247 0.799474 14.427 0.713845 14.3112C0.628216 14.1954 0.566244 14.0639 0.531467 13.9243C0.49669 13.7846 0.48979 13.6394 0.51116 13.497C0.554319 13.2095 0.71001 12.9509 0.943982 12.7781L9.84809 6.20761C10.0368 6.06802 10.2654 5.99268 10.5001 5.99268C10.7349 5.99268 10.9635 6.06802 11.1522 6.20761L20.0563 12.7781C20.2422 12.915 20.3801 13.1071 20.4503 13.327C20.5204 13.5469 20.5193 13.7833 20.4469 14.0025C20.3746 14.2216 20.2349 14.4124 20.0476 14.5475C19.8604 14.6826 19.6352 14.7551 19.4043 14.7547Z" fill="#FF3D00"/>
                                  <path id="iconPath00" d="M19.4043 9.00568C19.1696 9.00609 18.9411 8.93124 18.7522 8.79214L10.5002 2.70898L2.2481 8.79214C2.01412 8.96495 1.72104 9.0378 1.43331 8.99468C1.14558 8.95155 0.886785 8.79597 0.713849 8.56218C0.540914 8.32838 0.468006 8.03551 0.511165 7.74799C0.554324 7.46048 0.710015 7.20187 0.943986 7.02906L9.8481 0.458588C10.0368 0.318997 10.2654 0.243652 10.5002 0.243652C10.7349 0.243652 10.9635 0.318997 11.1522 0.458588L20.0563 7.02906C20.2422 7.16598 20.3801 7.35809 20.4503 7.57797C20.5204 7.79785 20.5193 8.03426 20.447 8.25344C20.3746 8.47262 20.2349 8.66338 20.0476 8.79847C19.8604 8.93356 19.6352 9.00608 19.4043 9.00568Z" fill="#FF3D00"/>
                                  </svg>   
                              </div>
                              <div id="divPrio1" class="divPrio" style="background-color: #FFFFFF;" onclick="selectPrio(1)">Medium
                                  <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path id="iconPath1" d="M18.9041 8.22528H1.09589C0.805242 8.22528 0.526498 8.10898 0.320979 7.90197C0.11546 7.69495 0 7.41419 0 7.12143C0 6.82867 0.11546 6.5479 0.320979 6.34089C0.526498 6.13388 0.805242 6.01758 1.09589 6.01758H18.9041C19.1948 6.01758 19.4735 6.13388 19.679 6.34089C19.8845 6.5479 20 6.82867 20 7.12143C20 7.41419 19.8845 7.69495 19.679 7.90197C19.4735 8.10898 19.1948 8.22528 18.9041 8.22528Z" fill="#FFA800"/>
                                  <path id="iconPath11" d="M18.9041 2.98211H1.09589C0.805242 2.98211 0.526498 2.86581 0.320979 2.6588C0.11546 2.45179 0 2.17102 0 1.87826C0 1.5855 0.11546 1.30474 0.320979 1.09772C0.526498 0.890712 0.805242 0.774414 1.09589 0.774414L18.9041 0.774414C19.1948 0.774414 19.4735 0.890712 19.679 1.09772C19.8845 1.30474 20 1.5855 20 1.87826C20 2.17102 19.8845 2.45179 19.679 2.6588C19.4735 2.86581 19.1948 2.98211 18.9041 2.98211Z" fill="#FFA800"/>
                                  </svg>    
                              </div>
                              <div id="divPrio2" class="divPrio" style="background-color: #FFFFFF;" onclick="selectPrio(2)">Low
                                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path id="iconPath2" d="M10 9.00614C9.7654 9.00654 9.53687 8.9317 9.34802 8.79262L0.444913 2.22288C0.329075 2.13733 0.231235 2.02981 0.15698 1.90647C0.0827245 1.78313 0.033508 1.64638 0.0121402 1.50404C-0.031014 1.21655 0.0418855 0.923717 0.214802 0.689945C0.387718 0.456173 0.646486 0.300615 0.934181 0.257493C1.22188 0.21437 1.51493 0.287216 1.74888 0.460004L10 6.54248L18.2511 0.460004C18.367 0.374448 18.4985 0.312529 18.6383 0.277782C18.7781 0.243035 18.9234 0.236141 19.0658 0.257493C19.2083 0.278844 19.3451 0.328025 19.4685 0.402225C19.592 0.476425 19.6996 0.574193 19.7852 0.689945C19.8708 0.805697 19.9328 0.937168 19.9676 1.07685C20.0023 1.21653 20.0092 1.36169 19.9879 1.50404C19.9665 1.64638 19.9173 1.78313 19.843 1.90647C19.7688 2.02981 19.6709 2.13733 19.5551 2.22288L10.652 8.79262C10.4631 8.9317 10.2346 9.00654 10 9.00614Z" fill="#7AE229"/>
                                  <path id="iconPath22" d="M10 14.7547C9.7654 14.7551 9.53687 14.6802 9.34802 14.5412L0.444913 7.97142C0.210967 7.79863 0.0552944 7.54005 0.0121402 7.25257C-0.031014 6.96509 0.0418855 6.67225 0.214802 6.43848C0.387718 6.20471 0.646486 6.04915 0.934181 6.00603C1.22188 5.96291 1.51493 6.03575 1.74888 6.20854L10 12.291L18.2511 6.20854C18.4851 6.03575 18.7781 5.96291 19.0658 6.00603C19.3535 6.04915 19.6123 6.20471 19.7852 6.43848C19.9581 6.67225 20.031 6.96509 19.9879 7.25257C19.9447 7.54005 19.789 7.79863 19.5551 7.97142L10.652 14.5412C10.4631 14.6802 10.2346 14.7551 10 14.7547Z" fill="#7AE229"/>
                                  </svg>   
                              </div>
                          </div>
                      </div>
                      <div class="addTaskDivSubtask">
                          <span class="addTaskInputHead">Subtasks</span>
                          <div class="addNewCategoryContainer">
                              <input id="addNewSubtaskInput" class="addNewCategoryInput" placeholder="Add new subtask" type="text"/>
                              <div class="addNewCategoryContainerIcons">
                                  <div class="dividingLineCategory"></div>
                                  <div class ="hookIconCategory" onclick="addNewSubtask()">
                                      <svg class ="hookIconCategory" width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1 7.5L7 13.5L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div id="divShowSubtasks" class="divShowSubtasks"></div> 
                  </div>  
              </div>
              <div class="addTaskButtons">
                  <button type="button" class="clearButton" onmouseover="xIconColor(1)" onmouseout="xIconColor(2)" onclick="removeAddTaskSlide()">
                      Clear 
                      <svg class ="xIcon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path id="xIconPath" d="M12.5011 12.5001L17.7441 17.7431M7.25806 17.7431L12.5011 12.5001L7.25806 17.7431ZM17.7441 7.25708L12.5001 12.5001L17.7441 7.25708ZM12.5001 12.5001L7.25806 7.25708L12.5001 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </button>
                  <button id="formSubmitButton" type="submit" class="createButton">Create Task <img class="hookIcon" src="../assets/img/hook_icon.png"></button>
              </div>
          </form>
          <div id="savedNotificationDiv" class="savedNotificationDiv d-none" >
              <div id="savedNotification" class="savedNotification">
                  New task added to board! 
              </div>
          </div>
        </div>
      `;
  }