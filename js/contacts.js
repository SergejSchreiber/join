function NewContactSlide(input, id) {
  let slide = document.getElementById('slide-contact-container');
  slide.innerHTML = '';
  slide.innerHTML += getSlide(input, id);
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
  document.getElementById("contact-display").style.display = "block";
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
  contacts[id]['telefonnummer'] = document.getElementById("input-phone").value;
  removeSlide();
  setContactsWithUserId();
  renderContacts();
  showContactDetails(id);
}

function addContact() {
  if (document.getElementById('input-name').value && document.getElementById('input-email').value && document.getElementById('input-phone').value) {
    contacts.push({
      'contactId': contacts.length,
      'name': document.getElementById('input-name').value,
      'mail': document.getElementById('input-email').value,
      'telefonnummer': document.getElementById('input-phone').value,
    });
    distributeContactId();
    renderContacts();
    showContactDetails(contacts.length - 1);
    setContactsWithUserId();
    removeSlide();
  }
}

function deleteContact(id) {
  contacts.splice(id, 1);
  document.getElementById('chosen-contact').innerHTML = '';
  distributeContactId();
  setContactsWithUserId();
  renderContacts();
}

function deleteContactFromEditSlide(id) {
  contacts.splice(id, 1);
  document.getElementById('chosen-contact').innerHTML = '';
  distributeContactId();
  setContactsWithUserId();
  renderContacts();
  removeSlide();
}

function showAddTaskSlide() {
  document.getElementById('slide-contact-container').innerHTML += getTaskSlide();
  renderSubtask();
}

function distributeContactId() {
  for (let i = 0; i < contacts.length; i++) {
    contacts[i]['contactId'] = i;
  }
}

async function setContactsWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
    await setItem(`contacts_${currentUserJSON}`, contacts);
  } else {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  loadContactsWithUserId();
}

async function loadContactsWithUserId() {
  if (currentUser) {
    let currentUserJSON = JSON.stringify(currentUser)
      contacts = JSON.parse(await getItem(`contacts_${currentUserJSON}`));
  } else {
    if (JSON.parse(localStorage.getItem("contacts"))) {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
  }
}

function hideContactDisplayArrowBack() {
  document.getElementById("contact-display").style.display = "none";
}

function giveInitialsBackgroundColor(id) {
  let newId = id;
  while (id >= COLOR_FOR_CATEGORY.length) {
    newId -= COLOR_FOR_CATEGORY.length;
  }
  document.getElementById('backgroundcolor-initials-' + id).style = 'background-color: ' + COLOR_FOR_CATEGORY[newId] + ';';
}