/**
 * functions for changing the icon in the password input field between eye-icon and eye-icon-crossed out and change the entered password between visible and non-visible
 */
function showEyeIconCrossedOut() {
  document.getElementById("eye").classList.toggle("fa-eye-slash");
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
}

/**
 * Displays the eye icon for the password input.
 */
function showEyeIcon() {
  document.getElementById("eye").style.display = "block";
  document.getElementById("password-icon").style.display = "none";
}

/**
 * Toggles the visibility of the password confirmation input and switches the eye icon between visible and crossed out.
 */
function showEyeIconCrossedOutConf() {
  document.getElementById("eye-conf").classList.toggle("fa-eye-slash");
  const passwordInput = document.getElementById("password-conf");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
}

/**
 * Displays the eye icon for the password confirmation input.
 */
function showEyeIconConf() {
  document.getElementById("eye-conf").style.display = "block";
  document.getElementById("password-icon-conf").style.display = "none";
}

/**
 * functions for sending a password-reset-email and showing the confirmation message after password-reset-forms were submitted
 * @returns {void}
 */
function checkingEmailInUsers() {
  let email = document.getElementById("email").value;
  if (users.some((u) => u.email === email)) {
    sendMeEmail();
  } else {
    document.getElementById("message-existing-email").style.display = "block";
    return;
  }
}

/**
 * Sends a password-reset email to the entered email address.
 */
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

/**
 * Removes the sent email confirmation message.
 */
function removeSendMeEmail() {
  document.getElementById("bg-sent-email").style.display = "none";
}

/**
 * functions in Reset-Passwort window to check if entered passwords are the same
 * @returns {boolean} - Returns true if the passwords match, false otherwise.
 */
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

/**
 * Changes the password of the current user and updates the data.
 */
async function changingPassword() {
  let url = new URL(window.location.href);
  let email = url.searchParams.get("email");
  let password = document.getElementById("password").value;
  let user = users.find((user) => user.email === email);
  currentUser = user;
  await loadDataWithUserId();
  user.password = password;
  setDataWithUserId();
  await setItem("users", JSON.stringify(users));
  document.getElementById("bg-sent-email").style.display = "block";
  document.getElementById("sent-email").style.animation = "sent-email 0.4s ease-in-out forwards";
}

/**
 * Loading Todos, Categories and Contacts according to the User ID
 */
async function loadDataWithUserId() {
  await loadTodosWithUserId();
  await loadCategoryWithUserId();
  await loadContactsWithUserId();
}

/**
 * Setting Todos, Categories, Subtasks and Contacts according to the User ID
 */
function setDataWithUserId() {
  setTodosWithUserId();
  setContactsWithUserId();
  setSubtaskWithUserId();
  setCategoryWithUserId();
}

/**
 * functions for user registration
 */
const STORAGE_TOKEN = "5OOXS6IHMZ5ZRRW51702PKTI3F90E0QLEFCQMEKP"; // https://remote-storage.developerakademie.org/token-generator
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * saving object in database
 * @param {string} key - The key for the item to be set.
 * @param {any} value - The value to be associated with the key.
 * @returns {Promise} - A Promise that resolves to the result of the storage operation.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

/**
 * loading object from database
 * @param {string} key - The key of the item to be retrieved.
 * @returns {Promise} - A Promise that resolves to the value associated with the specified key.
 * @throws {string} - Throws an error if the item with the specified key is not found.
 */
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

/**
 * Initializes the app by loading users from server and current user from local storage.
 */
function init() {
  loadUsers();
  loadCurrentUser();
  loadUserLocalStorage();
}

/**
 * loading users from server
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("loading error when loading users:", e);
  }
}

/**
 * loading users from server and current user from local storage.
 */
async function loadCurrentUser() {
  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
  } catch (e) {
    console.error("loading error when loading users:", e);
  }
}

/**
 * function to add new signed user to server and first login
 * @returns {Promise<boolean>} - A Promise that resolves to true if the user is successfully added, false otherwise.
 */
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
    await addUserAndRedirect(user, email, password);
  } else {
    document.getElementById("message-different-passwords").style.display = "block";
    return false;
  }
}

/**
 * Adds a new user and forward to main page
 * @param {string} user - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<void>} - A Promise that resolves once the user is added and data is stored successfully.
 */
async function addUserAndRedirect(user, email, password) {
  users.push({ user, email, password });
  await setItem("users", JSON.stringify(users));
  currentUser = {user: user, email: email, password: password}
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  await setItem(`contacts_${currentUser}`, contacts);
  await setItem(`todos_${currentUser}`, todos);
  window.location.href = "./summary.html?msg=Du hast dich erfolgreich registriert";
}

/**
 * function to delete users from users array
 * @param {number} index - The index of the user to be deleted.
 * @returns {Promise<void>} - A Promise that resolves once the user is deleted and data is stored successfully.
 */
async function deleteUser(index) {
  users.splice(index, 1);
  await setItem("users", JSON.stringify(users));
}

/**
 * functions to login/logout and load user from local Storage
 */
function guestLogin() {
  window.location.replace("./summary.html?msg=GuestAccount");
}

/**
 * Logs in the user and sets them as the current user.
 */
async function login() {
  let checkbox = document.getElementById("login-checkbox");
  let user = users.find((u) => u.email == email.value && u.password == password.value);
  if (user) {
    rememberMeLocalStorageSaveRemove(checkbox);
    currentUser = user;
    localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
    window.location.replace(`./summary.html`);
  } else {
    document.getElementById("message-wrong-login").style.display = "block";
  }
}

/**
 * Logs out the current user.
 */
async function logout() {
  currentUser = null;
  localStorage.setItem(`currentUser`, JSON.stringify(currentUser));
  window.location.href = "../html/index.html";
}

/**
 * function for saving/loading the signed in user in the local storage when the "Remember me" checkbox activated
 * @param {HTMLInputElement} checkbox - The "Remember Me" checkbox element.
 * @returns {void}
 */
function rememberMeLocalStorageSaveRemove(checkbox) {
  if (checkbox.checked) {
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
  } else {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }
}

/**
 * loading the email and password from local storage when checkbox activated
 */
function loadUserLocalStorage() {
  let checkbox = document.getElementById("login-checkbox");
  if (localStorage.getItem("email")) {
    email.value = localStorage.getItem("email");
    password.value = localStorage.getItem("password");
    checkbox.checked = true;
  }
}
