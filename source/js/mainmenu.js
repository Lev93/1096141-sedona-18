var mainMenu = document.querySelector(".main-menu");
var button = document.querySelector(".main-menu__toggle");

button.addEventListener("click", function (e) {
  e.preventDefault();
  if (mainMenu.classList.contains('main-menu--opened')) {
  mainMenu.classList.remove("main-menu--opened");
  button.classList.add("main-menu__toggle--closed");
  }else {
    mainMenu.classList.add("main-menu--opened");
    button.classList.remove("main-menu__toggle--closed");
  };
});

var sendForm = document.querySelector('.button--send-form');
var popupSuccess = document.querySelector('.popup--success');
var closePopup = document.querySelectorAll('.button--popup-close');

sendForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupSuccess.classList.add("modal-show");
});

closePopup.addEventListener("click", function (evt2) {
  evt2.preventDefault();
  popupSuccess.classList.remove("modal-show");
});

