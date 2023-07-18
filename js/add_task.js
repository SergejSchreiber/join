// Functions for category selection
let category = ['Sales', 'Backoffice','Design','Marketing','Media'];
let categoryIndex;


function showCategory() {
    let selectContainer = document.getElementById('selectCategory');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML += showCategoryHtml();

    let chooseContainer = document.getElementById('chooseCategory');

    for(let i = 0; i < category.length; i++) {
        chooseContainer.innerHTML += `
            <div class="chooseOptions" onclick="showSelectedCategory(${i})">
                <span>${category[i]}</span>
            </div>
        `;
    }
}

function showCategoryHtml() {
    return `
        <div id="chooseCategory" class="chooseCategory">
            <div class="chooseBox" onclick="hideCategory()">
                <span>Select task category</span>
                <img src="../assets/img/arrow_down.png">
            </div>
            <div class="chooseOptions" onclick="addNewCategory()">
                <span>New category</span>
            </div>
        </div>
    `;
}

function hideCategory() {
    let selectContainer = document.getElementById('selectCategory');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML += hideCategoryHtml();
}

function hideCategoryHtml() {
    return `
        <div class="selectBox" onclick="showCategory()">   
            <span>Select task category</span>
            <img src="../assets/img/arrow_down.png">
        </div>
    `;
}

function addNewCategory() {
    let selectContainer = document.getElementById('selectCategory');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML += addNewCategoryHtml();
}

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

function pushNewCategory() {
    let inputValue = document.getElementById('addNewCategoryInput').value
    if(inputValue){
        category.push(inputValue);
        showCategory();  
    }else{
        alert('Please enter a new category!');
    } 
}

function showSelectedCategory(index) {
    categoryIndex = index;
    let selectContainer = document.getElementById('selectCategory');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML += showSelectedCategoryHtml(index);
}

function showSelectedCategoryHtml(index) {
    return `
        <div class="selectBox" onclick="showCategory()">   
            <span id="spanCategory">${category[index]}</span>
            <img src="../assets/img/arrow_down.png">
        </div> 
    `;
}
// Functions for assign contacts selection
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

  function showContacts(contactsSorted) {
    let selectContainer = document.getElementById('selectContact');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML += showContactsHtml();

    let chooseContainer = document.getElementById('divShowContact');

    for(let i = 0; i < category.length; i++) {
        chooseContainer.innerHTML += `
            <label class="contactContainer">
                <span class="checkmark">${contactsSorted[i]['name']}</span>
                <input id="contactCheckbox${i}" type="checkbox">   
            </label>
        `;
    }
  }

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

  function hideContact() {
    let selectContainer = document.getElementById('selectContact');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML += hideContactHtml();
  }

  function hideContactHtml() {
    return `
        <div class="selectBox" onclick="sortContactsByName(contacts)">
            <span>Select contacts to assign</span>
            <img src="../assets/img/arrow_down.png">
        </div>
    `;
  }

// Functions for priority selection
let prioColor = ['#FF3D00','#FFA800','#7AE229'];
let prioIndex = [0,0,0]
let priorities = ['high', 'middle', 'low'];
let selectedUrgency = '';

function selectPrio(index) {
    resetPrio(index);
    selectedUrgency = priorities[index];

    if(prioIndex[index] == 0){
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
    } else {
        prioIndex[index] = 0;  
    }
}


function resetPrio(index) {
    for(let i = 0; i < 3; i++) {
        let element = document.getElementById(`divPrio${i}`);
        let pathIcon1 = document.getElementById(`iconPath${i}`);
        let pathIcon2 = document.getElementById(`iconPath${i}${i}`);
        element.style.backgroundColor = "white";
        element.classList.remove("prioIsSelected");
        pathIcon1.setAttribute('fill', prioColor[i]);
        pathIcon2.setAttribute('fill', prioColor[i]);
    }
}

// Functions for subtask selection
let allSubtasks = ['Subtask 1', 'Subtask 2'];

function addNewSubtask(){
    let newSubtask = document.getElementById('addNewSubtaskInput');
    if(newSubtask.value) {
    allSubtasks.push(newSubtask.value);
    newSubtask.value = "";
    renderSubtask();
    } else {
        alert('Please enter a new subtask!');
    }
}

function renderSubtask() {
    let subDiv = document.getElementById(`divShowSubtasks`);
    subDiv.innerHTML = ''; 

    for(let i = 0; i < allSubtasks.length; i++){
        subDiv.innerHTML += subtaskHtml(i); 
    }   
}

function subtaskHtml(index) {
    return `
        <label class="lableContainer">
            <input id="subtaskCheckbox${index}" type="checkbox">
            <span class="checkmark">${allSubtasks[index]}</span>
        </label>
    `;
}

// Functions for clear and create button
let newTask = [];

function xIconColor(index) {
    let numb = index;
    let pfad = document.getElementById('xIconPath');

    if(numb == 1){
        pfad.setAttribute('stroke', '#29abe2');    
    }else {
        pfad.setAttribute('stroke', '#2A3647'); 
    }
}

function ceateNewTask() {
    saveTaskToArray();
}

function saveTaskToArray() {
    let nextId = todos.length + 1; 
    let title = document.getElementById('InputTitle').value;
    let description = document.getElementById('InputDescription').value;
    let category = document.getElementById('spanCategory').innerHTML;
    let assinedContacts = searchAssinedContacts();
    let choosedDate = document.getElementById('inputDate').value;
    let prio = selectedUrgency;
    let assinedSubtasks = searchAssinedSubtask();
    
    newTask.push(
        {
            'id': nextId,
            'progress': 'inprogress',
            'category': category,
            'title': title,
            'description': description,
            'progress-number': [],
            'participants': assinedContacts,
            'urgency': [
                prio,
                '../assets/img/urgent_icon.png'
            ],
            'dueDate': choosedDate
        }
    ); 
}

function searchAssinedContacts() {
    let choosedContacts = [];

    for(let i = 0; i < contactsSorted.length; i++) {
        let currentCheckbox = document.getElementById(`contactCheckbox${i}`);
        
        if(currentCheckbox.checked){
            choosedContacts.push(contactsSorted[i]['name']);
        }
    }

    return choosedContacts; 
}

function searchAssinedSubtask() {
        let choosedSubtasks = [];

    for(let i = 0; i < allSubtasks.length; i++) {
        let currentCheckbox = document.getElementById(`subtaskCheckbox${i}`);
        
        if(currentCheckbox.checked){
            choosedSubtasks.push(allSubtasks[i]);
        }
    }

    return choosedSubtasks; 
}  



















