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

// functions for showing the confirmation message after password-reset-forms were submitted
async function sendMeEmail() {
  document.getElementById("bg-sent-email").style.display = "block";
  document.getElementById("sent-email").style.animation = "sent-email 0.4s ease-in-out forwards";
}

function removeSendMeEmail() {
  document.getElementById("bg-sent-email").style.display = "none";
}

// function in Reset-Passwort window to check if entered passwords are the same
function checkConfirmedPassword() {
  let password = document.getElementById("password");
  let passwordConf = document.getElementById("password-conf");
  if (password.value === passwordConf.value) {
    password.value = "";
    passwordConf.value = "";
    sendMeEmail();
    return true;
  } else {
    password.value = "";
    passwordConf.value = "";
    document.getElementById("message-different-passwords").style.display = "block";
    return false;
  }
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

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("loading error when loading users:", e);
  }
}

async function addUser() {
  let user = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (users.some((u) => u.user === user || u.email === email)) {  
    document.getElementById("message-existing-user").style.display = "block";  
    return;
  }

  users.push({ user, email, password });
  await setItem("users", JSON.stringify(users));

  window.location.href = "./index.html?msg=Du hast dich erfolgreich registriert";
}

// function to delete users from users array
async function deleteUser(index) {
  users.splice(index, 1);
  await setItem("users", JSON.stringify(users));
}

// function to login
function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find((u) => u.email == email.value && u.password == password.value);
  console.log(user);
  if (user) {
    window.location.replace("./summary.html?msg=User gefunden");
  } else {
    document.getElementById("message-wrong-login").style.display = "block";
  }
}

function guestLogin() {
  window.location.replace("./summary.html?msg=User gefunden");
  
}
