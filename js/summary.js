function initSummary() {
  formattingDate();
  greetingTimeOfDay();
  loadUsers();
}

function formattingDate() {
  let timeElement = document.getElementById("myTime");
  let date = new Date(timeElement.getAttribute("datetime"));
  timeElement.textContent = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
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

