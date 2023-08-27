// function to create the desktop template when "JoinHeader" Element is entered on the page

class JoinHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Join</title>
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/desktop_template.css" />
    <script src="../js/login.js"></script>
  </head>
  <body onload="highlightActivePage()">
    <div  class="side-bar">
      <img class="join-logo" src="../assets/img/join_logo_white.png" alt="join_logo" />
      <a href="../html/summary.html">
        <div class="side-menu" id="side-menu-summary">
        <img src="../assets/img/summary_icon.png" alt="summary_icon" />
        <span>Summary</span>
        </div>
      </a>
      <a href="../html/add_task.html">
        <div class="side-menu" id="side-menu-add-task">
        <img src="../assets/img/add_task_icon.png" alt="add_task_icon" />
        <span>Add Task</span>
        </div>
      </a>
      <a href="../html/board.html">
        <div class="side-menu" id="side-menu-board">
        <img src="../assets/img/board_icon.png" alt="board_icon" />
        <span>Board</span>
        </div>
      </a>      
      <a href="../html/contacts.html">
        <div class="side-menu" id="side-menu-contacts">
        <img src="../assets/img/contacts_icon.png" alt="contacts" />
        <span>Contacts</span>
        </div>
      </a>
      <div class="legal-notice">
        <a href="../html/privacy_policy.html" target="_blank">Privacy Policy</a>
        <a href="../html/legal_notice.html" target="_blank">Legal notice</a>
      </div>
    </div>

    <div class="top-bar">
      <img class="join-logo-mobile" src="../assets/img/join_logo_dark.png" alt="join_logo_dark">
      <span class="kanban-text"> Kanban Project Management Tool</span>
      <div class="top-bar-icons">
        <a href="../html/help.html"><img src="../assets/img/question_icon.png" alt="question_icon" /></a>
        <div class="user-icon-border" onclick="showLogout()">
          <span class="user-initials" id="user-initials"></span>
        </div>
        <div onclick="hideLogout()" class="log-out-bg" id="logOutBg"></div>
          <button class="btn btn-logout" id="logOut" onclick="logout(event)">Log out</button>
      </div>
      <div class="top-bar-icons-mobile">
        <div class="user-icon-border" onclick="showLogoutMobile()">
          <span class="user-initials" id="user-initials-mobile"></span>
        </div>
        <div onclick="hideLogoutMobile()" class="log-out-bg" id="logOutBgMobile"></div>
          <button class="btn btn-logout" id="logOutMobile">
            <a href="../html/help.html" id="help">Help</a>
            <a href="../html/legal_notice.html" target="_blank" id="legalNotice">Legal notice</a>
            <a href="../html/privacy_policy.html" target="_blank" id="privacyPolicy">Privacy Policy</a>  
            <span onclick="logout(event)">Log out</span>
          </button>
      </div>
    </div>
    </body>
        `;
    loadCurrentUser();
    loadingUserInitials();
    if (window.location.href.includes('summary.html')) {
      document.getElementById("side-menu-summary").style.background = '#091931';
    }
    if (window.location.href.includes('add_task.html')) {
      document.getElementById("side-menu-add-task").style.background = '#091931';
    }
    if (window.location.href.includes('board.html')) {
      document.getElementById("side-menu-board").style.background = '#091931';
    }
    if (window.location.href.includes('contacts.html')) {
      document.getElementById("side-menu-contacts").style.background = '#091931';
    }
  }
}

customElements.define("join-header", JoinHeader);

// functions to show/hide the logout button
function showLogout() {
  document.getElementById("logOut").style.visibility = "visible";
  document.getElementById("logOutBg").style.visibility = "visible";
}

function hideLogout() {
  document.getElementById("logOut").style.visibility = "hidden";
  document.getElementById("logOutBg").style.visibility = "hidden";
}

function showLogoutMobile() {
  document.getElementById("logOutMobile").style.visibility = "visible";
  document.getElementById("logOutBgMobile").style.visibility = "visible";
  document.getElementById("help").style.visibility = "visible";
  document.getElementById("legalNotice").style.visibility = "visible";
}

function hideLogoutMobile() {
  document.getElementById("logOutMobile").style.visibility = "hidden";
  document.getElementById("logOutBgMobile").style.visibility = "hidden";
  document.getElementById("help").style.visibility = "hidden";
  document.getElementById("legalNotice").style.visibility = "hidden";
}

// function to load the Intiatials from the active user
async function loadingUserInitials() {
  if (currentUser) {
    let userName = currentUser.user;
    let initials = userName.match(/\b\w/g).join("").toUpperCase();
    document.getElementById("user-initials").innerHTML = initials;
    document.getElementById("user-initials-mobile").innerHTML = initials;
  } else {
    document.getElementById("user-initials").innerHTML = "G";
    document.getElementById("user-initials-mobile").innerHTML = "G";
  }
}
