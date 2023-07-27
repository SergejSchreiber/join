// functions for changing the icon in the password input field between eye-icon and eye-icon-crossed out and change the entered password between visible and non-visible
function showEyeIconCrossedOut() {
  document.getElementById("eye").classList.toggle("fa-eye-slash");
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
}

function showEyeIcon() {
  document.getElementById("eye").style.display = "block";
  document.getElementById("password-icon").style.display = "none";
}

function showEyeIconCrossedOutConf() {
  document.getElementById("eye-conf").classList.toggle("fa-eye-slash");
  const passwordInput = document.getElementById("password-conf");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
}

function showEyeIconConf() {
  document.getElementById("eye-conf").style.display = "block";
  document.getElementById("password-icon-conf").style.display = "none";
}

// functions for sending a password-reset-email and showing the confirmation message after password-reset-forms were submitted
function checkingEmailInUsers() {
  let email = document.getElementById("email").value;
  if (users.some((u) => u.email === email)) {
    sendMeEmail();
  } else {
    document.getElementById("message-existing-email").style.display = "block";
    return;
  }
}

async function sendMeEmail() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://f015d041@gruppe-610.developerakademie.net/join-610/reset-password.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("bg-sent-email").style.display = "block";
      document.getElementById("sent-email").style.animation = "sent-email 0.4s ease-in-out forwards";
    } else if (xhr.status !== 200) {
      alert("Bitte nochmal versuchen");
    }
  };
  xhr.send(encodeURI("email=" + document.getElementById("email").value));
}

function removeSendMeEmail() {
  document.getElementById("bg-sent-email").style.display = "none";
}

// function in Reset-Passwort window to check if entered passwords are the same
function checkConfirmedPassword() {
  let password = document.getElementById("password");
  let passwordConf = document.getElementById("password-conf");
  if (password.value === passwordConf.value) {
    changingPassword();
    password.value = "";
    passwordConf.value = "";
    return true;
  } else {
    password.value = "";
    passwordConf.value = "";
    document.getElementById("message-different-passwords").style.display = "block";
    return false;
  }
}

async function changingPassword() {
  let url = new URL(window.location.href);
  let email = url.searchParams.get("email");
  let password = document.getElementById("password").value;
  let user = users.find((user) => user.email === email);
  user.password = password;
  await setItem("users", JSON.stringify(users));
  document.getElementById("bg-sent-email").style.display = "block";
  document.getElementById("sent-email").style.animation = "sent-email 0.4s ease-in-out forwards";
}

// functions for user registration
const STORAGE_TOKEN = "5OOXS6IHMZ5ZRRW51702PKTI3F90E0QLEFCQMEKP"; // https://remote-storage.developerakademie.org/token-generator
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

let users = [];
let currentUser = null;

function init() {
  loadUsers();
  loadCurrentUser();
  loadTodosWithUserId();
  loadUserLocalStorage();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("loading error when loading users:", e);
  }
}

async function loadCurrentUser() {
  try {
    currentUser = JSON.parse(await getItem("currentUser"));
  } catch (e) {
    console.error("loading error when loading users:", e);
  }
}

async function addUser() {
  let user = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwordConf = document.getElementById("password-conf").value;

  if (password === passwordConf) {

  if (users.some((u) => u.user === user || u.email === email)) {
    document.getElementById("message-existing-user").style.display = "block";
    return;
  }

  users.push({ user, email, password });
  await setItem("users", JSON.stringify(users));
  window.location.href = "./index.html?msg=Du hast dich erfolgreich registriert";
  setTodosWithUserId();
  setContactsWithUserId();
}
 else {
  document.getElementById("message-different-passwords").style.display = "block";
    return false;
}
}

// function to delete users from users array
async function deleteUser(index) {
  users.splice(index, 1);
  await setItem("users", JSON.stringify(users));
}

// functions to login and load user from local Storage
function guestLogin() {

  window.location.replace("./summary.html?msg=User gefunden");
}

async function login() {
  let checkbox = document.getElementById("login-checkbox");
  let user = users.find((u) => u.email == email.value && u.password == password.value);
  if (user) {
    rememberMeLocalStorageSaveRemove(checkbox);
    currentUser = JSON.stringify(user);
    await setItem(`currentUser`, JSON.stringify(currentUser));
    window.location.replace(`./summary.html`);
  } else {
    document.getElementById("message-wrong-login").style.display = "block";
  }
}

async function logout() {
  currentUser = null;
    await setItem(`currentUser`, JSON.stringify(currentUser));
  window.location.href = "../html/index.html";
}

function rememberMeLocalStorageSaveRemove(checkbox) {
  if (checkbox.checked) {
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }
}

function loadUserLocalStorage() {
  let checkbox = document.getElementById("login-checkbox");
  if (localStorage.getItem("email")) {
    email.value = localStorage.getItem("email");
    password.value = localStorage.getItem("password");
    checkbox.checked = true;
  }
}


async function setTodosWithUserId() {
  if (currentUser) {
  await setItem(`todos_${currentUser}`, JSON.stringify(todos));
}
loadTodosWithUserId();
}

async function loadTodosWithUserId() {
  try {
    todos = JSON.parse(await getItem(`todos_${currentUser}`));
  } catch (e) {
  }
}

async function setContactsWithUserId() {
  if (currentUser) {
  await setItem(`contacts_${currentUser}`, JSON.stringify(contacts));
}
loadContactsWithUserId();
}

async function loadContactsWithUserId() {
  try {
    contacts = JSON.parse(await getItem(`contacts_${currentUser}`));
  } catch (e) {    
  }
}