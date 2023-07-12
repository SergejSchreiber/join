// Functions for category selection
let category = ['Sales', 'Backoffice'];
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
            <span>${category[index]}</span>
            <img src="../assets/img/arrow_down.png">
        </div> 
    `;
}
// Functions for assign selection

// Functions for priority selection

// Functions for subtask selection

// Functions for clear and create button
function xIconColor(index) {
    let numb = index;
    let pfad = document.getElementById('xIconPath');

    if(numb == 1){
        pfad.setAttribute('stroke', '#29abe2');    
    }else {
        pfad.setAttribute('stroke', '#2A3647'); 
    }
}
















