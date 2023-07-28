function initSummary() {
  loadCurrentUser().then(() => {
    loadTodosWithUserId().then(() => {
      findEarliestDueDate();
      greetingUsername();
      summaryNumbers();
    });
  });
}

//function to find the earliest upcoming due date, which is still in the future
function findEarliestDueDate() {
  let timeElement = document.getElementById("summary-due-date-time");
  const now = new Date();
  now.setDate(now.getDate() -1);
  const nextDueItem = todos.reduce((next, item) => {
    const dueDate = new Date(item.dueDate);
    return !next || (dueDate > now && dueDate < next.dueDate) ? { ...item, dueDate } : next;
  }, null);

  if (nextDueItem) {
    timeElement.textContent = nextDueItem.dueDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } else {
    timeElement.textContent = "No deadlines";
  }
}

//function to set the correct greeting depending on time of the day and the current user
function greetingUsername() {
  if (currentUser) {
  greetingTimeOfDay();
  document.getElementById("greetingUserName").innerHTML = JSON.parse(currentUser).user;
} else {
  greetingTimeOfDayGuest();
  document.getElementById("greetingUserName").innerHTML = "";
}}

function greetingTimeOfDay() {
  let greeting = document.getElementById("greeting");
  let hour = new Date().getHours();
  if (hour < 12) {
    greeting.textContent = "Good morning,";
  } else if (hour < 18) {
    greeting.textContent = "Good afternoon,";
  } else {
    greeting.textContent = "Good evening,";
  }
}

function greetingTimeOfDayGuest() {
  let greeting = document.getElementById("greeting");
  let hour = new Date().getHours();
  if (hour < 12) {
    greeting.textContent = "Good morning";
  } else if (hour < 18) {
    greeting.textContent = "Good afternoon";
  } else {
    greeting.textContent = "Good evening";
  }
}

// function to update the numbers in each box on the summary page
function summaryNumbers() {
  document.getElementById("summary-tasks-in-board-number").innerHTML = todos.length;
  document.getElementById("summary-tasks-in-progress-number").innerHTML = todos.filter((item) => item.progress === "inprogress").length;
  document.getElementById("summary-awaiting-feedback-number").innerHTML = todos.filter((item) => item.progress === "awaitingfeedback").length;
  document.getElementById("summary-urgent-number").innerHTML = todos.filter((item) => item.urgency[0] === "high").length;
  document.getElementById("summary-to-do-number").innerHTML = todos.filter((item) => item.progress === "todo").length;
  document.getElementById("summary-done-number").innerHTML = todos.filter((item) => item.progress === "done").length;
}
