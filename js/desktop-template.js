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
  <body>
    <div  class="side-bar">
      <img class="join-logo" src="../assets/img/join_logo_white.png" alt="join_logo" />
      <a href="../html/summary.html"><div class="side-menu">
        <img src="../assets/img/summary_icon.png" alt="summary_icon" />
        <span>Summary</span>
      </div></a>
      <a href="../html/board.html"><div class="side-menu">
        <img src="../assets/img/board_icon.png" alt="board_icon" />
        <span>Board</span>
      </div></a>
      <a href="../html/add_task.html"><div class="side-menu">
        <img src="../assets/img/add_task_icon.png" alt="add_task_icon" />
        <span>Add Task</span>
      </div></a>
      <a href="../html/contacts.html"><div class="side-menu">
        <img src="../assets/img/contacts_icon.png" alt="contacts" />
        <span>Contact</span>
      </div></a>
      <a href="../html/legal_notice.html"><div class="legal-notice">
        <div class="side-menu">
          <img src="../assets/img/info_icon.png" alt="info_icon" />
          <span>Legal notice</span>
        </div></a>
      </div>
    </div>

    <div class="top-bar">
      <span> Kanban Project Management Tool</span>
      <div class="top-bar-icons">
        <a href="../html/help.html"><img src="../assets/img/question_icon.png" alt="question_icon" /></a>
        <div class="user-icon-border" onclick="showLogout()">
          <span class="user-initials" id="user-initials"></span>
        </div>
        <div onclick="hideLogout()" class="log-out-bg" id="logOutBg"></div>
        <!-- <a href="../html/index.html"> -->
          <button class="btn btn-logout" id="logOut" onclick="logout(event)">Log out</button>
        <!-- </a> -->
        </div>
    </div>
    </body>
        `;
    loadCurrentUser();
    loadingUserInitials();
  }
}

customElements.define("join-header", JoinHeader);

// function to show the logout button
function showLogout() {
  document.getElementById("logOut").style.visibility = "visible";
  document.getElementById("logOutBg").style.visibility = "visible";
}

function hideLogout() {
  document.getElementById("logOut").style.visibility = "hidden";
  document.getElementById("logOutBg").style.visibility = "hidden";
}

// function to load the Intiatials from the active user
async function loadingUserInitials() {
  let currentUser = JSON.parse(await getItem("currentUser"));
  let userName = JSON.parse(currentUser).user;
  let initials = userName.match(/\b\w/g).join('').toUpperCase();

  document.getElementById("user-initials").innerHTML = initials;
}
