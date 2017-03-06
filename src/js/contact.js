let contactBtn = document.querySelector('.contact-btn');
let contactMethods = document.querySelector('.contact-methods');

contactBtn.addEventListener('click', function () {
    contactBtn.classList.toggle('hide');
    contactMethods.classList.toggle('hide');
});

contactMethods.addEventListener('click', function () {
    contactBtn.classList.toggle('hide');
    contactMethods.classList.toggle('hide');
});
