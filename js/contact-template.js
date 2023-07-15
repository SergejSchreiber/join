let contacts = [
    {
        'contactId': '0',
        'name': 'Anton Mayer',
        'mail': 'antom@gmail.com',
        'telefonnummer': '+491111111111'
    }, {
        'contactId': '1',
        'name': 'Anja Schulz',
        'mail': 'schulz@hotmail.com',
        'telefonnummer': '+491111111112'
    }, {
        'contactId': '2',
        'name': 'Benedikt Ziegler',
        'mail': 'benedikt@gmail.com',
        'telefonnummer': '+491111111113'
    }, {
        'contactId': '3',
        'name': 'Marcel Bauer',
        'mail': 'bauer@gmail.com',
        'telefonnummer': '+491111111114'
    }, {
        'contactId': '4',
        'name': 'Emmanuel Mauer',
        'mail': 'emmanuelMa@gmail.com',
        'telefonnummer': '+491111111115'
    }, {
        'contactId': '5',
        'name': 'Eva Fischer',
        'mail': 'eva@gmail.com',
        'telefonnummer': '+491111111116'
    }, {
        'contactId': '6',
        'name': 'David Eisenberg',
        'mail': 'davidberg@gmail.com',
        'telefonnummer': '+491111111117'
    }, {
        'contactId': '7',
        'name': 'Tatjana Wolf',
        'mail': 'wolf@gmail.com',
        'telefonnummer': '+492222222222'
    }
];

renderContacts();

function sortedNamesArray() {
    contacts.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });
    return 0;
}

function renderContacts() {
    sortedNamesArray();
    let letterArr = [];
    let indexArr = [];
    for (let i = 0; i < contacts.length; i++) {
        if(letterArr.includes(contacts[i][0])  == false) {
            console.log(contacts[i][0]);
            let contactList = document.getElementById('contact-list');
            contactList.innerHTML += `
                <div id="letter-${i}" class="letter">
                    <div class="letter-header">${contacts[i][0]}</div>
                    <div class="horizontal-line"></div>
                    <div class="contact">
                        <div class="icon">${getInitials(contacts[i]['name'])}</div>
                        <div class="contact-info">
                            <p>${contacts[i]['name']}</p>
                            <div>${contacts[i]['mail']}</div>
                        </div>
                    </div>
                </div>
            `; 
        }
        else {
            indexArr.push(i);
        }
        /* else {
            document.getElementById('letter-' + i).innerHTML += `
                <div class="contact">
                    <div class="icon">${getInitials(contacts[i]['name'])}</div>
                    <div class="contact-info">
                        <p>${contacts[i]['name']}HAAAAAA</p>
                        <div>benedikt@gmail.com</div>
                    </div>
                </div>
            `;
        } */
        letterArr.push(namesArr[i][0]);
    }
    for (let i = 0; i < indexArr.length; i++) {
        document.getElementById('letter-' + indexArr[i]).innerHTML += `
            <div class="contact">
                <div class="icon">${getInitials(contacts[i]['name'])}</div>
                <div class="contact-info">
                    <p>${contacts[indexArr[i]]['name']}HAAAAAA</p>
                    <div>benedikt@gmail.com</div>
                </div>
            </div>
        `;
    }
}

function getContactDetails() {
    return `
        <div class="chosen-contact-header">
            <div class="name-icon">AM</div>
            <div class="contact-name">
                <div class="contact-name-part">Anton Mayer</div>
                <div class="task-button">
                    <img src="../assets/img/plus_icon.png" alt="">
                    <p>Add Task</p>
                </div>
            </div>
        </div>
        <div class="contact-info-header">
            <p>Contact Information</p>
            <div class="edit-button">
                <img src="../assets/img/edit.svg" alt="">
                <p>Edit</p>
            </div>
        </div>
        <div class="mail-info-header">Email</div>
        <div class="mail-info">antom@gmail.com</div>
        <div class="phone-info-header">Phone</div>
        <div class="phone-info">+49 1111 111 11 1</div>
    `;
}

function getSlide(input) {
    return `
        <div id="slide-contact">
            <div class="pop-up">
                <div class="add-contact-left">
                    <img src="../assets/img/join_logo_white.png" alt="">
                    ${getLeftSideSlide(input)}
                    <span class="extra-horizontal-line"></span>
                </div>
                <div class="add-contact-right">
                    <div class="profile-icon"><img src="../assets/img/user-line.svg" alt=""></div>
                    <form class="form-side">
                        <div onclick="removeSlide()" class="x-icon"><img src="../assets/img/x_icon.svg" alt=""></div>
                        <div><input id="input-name" class="pop-up-input" type="text" placeholder="Name" required></div>
                        <div><input id="input-email" class="pop-up-input" type="email" placeholder="Email" required></div>
                        <div><input id="input-phone" class="pop-up-input" type="tel" placeholder="Phone" required></div>
                        <div id="slide-buttons" class="pop-up-buttons">
                            <button onclick="removeSlide()" class="cancel-btn">
                                <p>Cancel</p>
                                <img src="../assets/img/x_icon.svg" alt="">
                            </button>
                            <button class="create-btn">
                                <p>Create Contact</p>
                                <img src="../assets/img/hook_icon.svg" alt="">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
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

function getCreateSlide() {
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

function getEditSlide() {
    return `
        <div>
            <button onclick="removeSlide()" class="delete-btn">Delete</button>
            <button class="save-btn">Save</button>
        </div>
    `;
}