function NewContactSlide() {
    let slide = document.getElementById('slide-contact-container');
    slide.innerHTML = '';
    slide.innerHTML = getSlide();
}

function removeSlide() {
    document.getElementById('slide-contact').remove();
}
