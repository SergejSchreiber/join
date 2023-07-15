function NewContactSlide(input) {
    let slide = document.getElementById('slide-contact-container');
    slide.innerHTML = '';
    slide.innerHTML = getSlide(input);
}

function removeSlide() {
    document.getElementById('slide-contact').remove();
}

function getInitials(fullName) {
    let firstInitial = fullName[0];
    let secondInitial = fullName.split(' ')[1][0];
    return firstInitial + secondInitial;
}