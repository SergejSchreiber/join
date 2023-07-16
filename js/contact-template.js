let contacts = [
    {
        'contactId': 0,
        'name': 'Anton Mayer',
        'mail': 'antom@gmail.com',
        'telefonnummer': '+491111111111'
    }, {
        'contactId': 1,
        'name': 'Anja Schulz',
        'mail': 'schulz@hotmail.com',
        'telefonnummer': '+491111111112'
    }, {
        'contactId': 2,
        'name': 'Benedikt Ziegler',
        'mail': 'benedikt@gmail.com',
        'telefonnummer': '+491111111113'
    }, {
        'contactId': 3,
        'name': 'Marcel Bauer',
        'mail': 'bauer@gmail.com',
        'telefonnummer': '+491111111114'
    }, {
        'contactId': 4,
        'name': 'Emmanuel Mauer',
        'mail': 'emmanuelMa@gmail.com',
        'telefonnummer': '+491111111115'
    }, {
        'contactId': 5,
        'name': 'Eva Fischer',
        'mail': 'eva@gmail.com',
        'telefonnummer': '+491111111116'
    }, {
        'contactId': 6,
        'name': 'David Eisenberg',
        'mail': 'davidberg@gmail.com',
        'telefonnummer': '+491111111117'
    }, {
        'contactId': 7,
        'name': 'Tatjana Wolf',
        'mail': 'wolf@gmail.com',
        'telefonnummer': '+492222222222'
    }
];

renderContacts();

function renderContacts() {
    let namesArr = getSortedNamesArray();
    let letterArr = [];
    for (let i = 0; i < namesArr.length; i++) {
        if(letterArr.includes(namesArr[i]['name'][0])  == false) {
            let contactList = document.getElementById('contact-list');
            contactList.innerHTML += `
                <div id="letter-${i}" class="letter">
                    <div class="letter-header">${namesArr[i]['name'][0]}</div>
                    <div class="horizontal-line"></div>
                    <div class="contact" onclick="showContactDetails(${namesArr[i]['contactId']})">
                        <div class="icon">${getInitials(namesArr[i]['name'])}</div>
                        <div class="contact-info">
                            <p>${namesArr[i]['name']}</p>
                            <div>${namesArr[i]['mail']}</div>
                        </div>
                    </div>
                </div>
            `; 
        }
        else {
            let j = i - 1;
            document.getElementById('letter-' + j).innerHTML += `
                <div class="contact" onclick="showContactDetails(${namesArr[i]['contactId']})">
                    <div class="icon">${getInitials(namesArr[i]['name'])}</div>
                    <div class="contact-info">
                        <p>${namesArr[i]['name']}</p>
                        <div>${namesArr[i]['mail']}</div>
                    </div>
                </div>
            `;
        }
        letterArr.push(namesArr[i]['name'][0]);
    }
}

function getContactDetails(contactArr) {
    return `
        <div class="chosen-contact-header">
            <div class="name-icon">${getInitials(contactArr['name'])}</div>
            <div class="contact-name">
                <div class="contact-name-part">${contactArr['name']}</div>
                <div class="task-button" onclick="NewContactSlide(1)">
                    <img src="../assets/img/plus_icon.png" alt="">
                    <p>Add Task</p>
                </div>
            </div>
        </div>
        <div class="contact-info-header">
            <p>Contact Information</p>
            <div class="edit-button" onclick="NewContactSlide(${1}, ${contactArr['contactId']})">
                <img src="../assets/img/edit.svg" alt="">
                <p>Edit</p>
            </div>
        </div>
        <div class="mail-info-header">Email</div>
        <div class="mail-info">${contactArr['mail']}</div>
        <div class="phone-info-header">Phone</div>
        <div class="phone-info">${contactArr['telefonnummer']}</div>
    `;
}

function getSlide(input, id) {
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
                    <form class="form-side">
                        <div onclick="removeSlide()" class="x-icon"><img src="../assets/img/x_icon.svg" alt=""></div>
                        ${getInputTags(input, id)}
                        <div id="slide-buttons" class="pop-up-buttons">${getCreateOrEditSlide(input, id)}</div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function getInputTags(input, id) {
    if (input === 0) {
        return `
            <div><input id="input-name" class="pop-up-input" type="text" placeholder="Name" required></div>
            <div><input id="input-email" class="pop-up-input" type="email" placeholder="Email" required></div>
            <div><input id="input-phone" class="pop-up-input" type="tel" placeholder="Phone" required></div>
        `;
    }
    else {
        return `
            <div><input id="input-name" class="pop-up-input" type="text" placeholder="Name" value="${contacts[id]['name']}" required></div>
            <div><input id="input-email" class="pop-up-input" type="email" placeholder="Email" value="${contacts[id]['mail']}" required></div>
            <div><input id="input-phone" class="pop-up-input" type="tel" placeholder="Phone" value="${contacts[id]['telefonnummer']}" required></div>
        `;
    }
}

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

 function getCreateOrEditSlide(input, id) {
    if (input == 0) {
        return `
            <button onclick="removeSlide()" class="cancel-btn">
                <p>Cancel</p>
                <img src="../assets/img/x_icon.svg" alt="">
            </button>
            <button class="create-btn">
                <p>Create Contact</p>
                <img src="../assets/img/hook_icon.svg" alt="">
            </button>
        `;
    }
    else if(input == 1) {
        return `
            <div>
                <button onclick="removeSlide()" class="delete-btn">Delete</button>
                <button onclick="editContact(${id})" class="save-btn">Save</button>
            </div>
        `;
    }
}

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