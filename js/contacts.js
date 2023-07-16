function NewContactSlide(input, id) {
    let slide = document.getElementById('slide-contact-container');
    slide.innerHTML = '';
    slide.innerHTML = getSlide(input, id);
}

function removeSlide() {
    document.getElementById('slide-contact').remove();
}

function sortedNamesArray(arr) {
    arr.sort((a, b) => {
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

function getSortedNamesArray() {
    let newArr = contacts.slice();
    sortedNamesArray(newArr);
    return newArr;
}

function getInitials(fullName) {
    let firstInitial = fullName[0];
    let secondInitial = fullName.split(' ')[1][0];
    return firstInitial + secondInitial;
}

function showContactDetails(id) {
    let contactArr;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i]['contactId'] === id) {
            contactArr = contacts[i];
        }
    }
    let contactDetails = document.getElementById('chosen-contact');
    contactDetails.innerHTML = getContactDetails(contactArr);
}

function editContact(id) {
    contacts[id]['name'] = document.getElementById('input-name').value;
    contacts[id]['mail'] = document.getElementById('input-email').value;
    contacts[id]['telefonnummer'] = document.getElementById('input-phone').value;
    removeSlide();
    renderContacts();
}