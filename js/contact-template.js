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
                <div id="add-contact-left" class="add-contact-left"></div>
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
    getLeftSideSlide(input);
}

function getLeftSideSlide(input) {
    let leftSlide = document.getElementById('add-contact-left');
    if (input == 0) {
        leftSlide.innerHTML = `
            <img src="../assets/img/join_logo_white.png" alt="">
            <div>Add contact</div>
            <p>Tasks are better with a team!</p>
        `;
    }
    else if(input === 1) {
        leftSlide.innerHTML = `
            <img src="../assets/img/join_logo_white.png" alt="">
            <div>Edit Contact</div>
            <span class="extra-horizontal-line"></span>
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