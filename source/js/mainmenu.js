let mainMenu = document.querySelector(".main-menu");
let button = document.querySelector(".main-menu__toggle");

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
