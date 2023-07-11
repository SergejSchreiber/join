function initSummary() {
  loadCurrentUser().then(() => {
    findEarliestDueDate();
    greetingTimeOfDay();
    greetingUsername();
    summaryNumbers();
  });
}

function findEarliestDueDate() {
  let timeElement = document.getElementById("summary-due-date-time");

  const now = new Date();
  const nextDueItem = todos.reduce((next, item) => {
    const dueDate = new Date(item.dueDate);
    return !next || (dueDate > now && dueDate < next.dueDate) ? { ...item, dueDate } : next;
  }, null);

  timeElement.textContent = nextDueItem.dueDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function greetingTimeOfDay() {
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

function greetingUsername() {
  document.getElementById("greetingUserName").innerHTML = JSON.parse(currentUser).user;
}

function summaryNumbers() {
  document.getElementById("summary-tasks-in-board-number").innerHTML = todos.length;
  document.getElementById("summary-tasks-in-progress-number").innerHTML = todos.filter((item) => item.progress === "inprogress").length;
  document.getElementById("summary-awaiting-feedback-number").innerHTML = todos.filter((item) => item.progress === "awaitingfeedback").length;
  document.getElementById("summary-urgent-number").innerHTML = todos.filter((item) => item.urgency[0] === "high").length;
  document.getElementById("summary-to-do-number").innerHTML = todos.filter((item) => item.progress === "todo").length;
  document.getElementById("summary-done-number").innerHTML = todos.filter((item) => item.progress === "done").length;
}
