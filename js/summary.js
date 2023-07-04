function formattingDate() {

const timeElement = document.querySelector('#myTime');
  const date = new Date(timeElement.getAttribute('datetime'));
  timeElement.textContent = date.toLocaleDateString('en-US', 
  { month: 'long', day: 'numeric', year: 'numeric' });

}
