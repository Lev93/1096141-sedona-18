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

document.addEventListener("DOMContentLoaded", function(event) {

  var mapEl = document.querySelector("#map");

  if (mapEl) {
    ymaps.ready(init); // активируем карту после загрузки страницы
    var map;
    function init() {
        map = new ymaps.Map("map", { // в кавычках id элемента куда загружается карта
            center: [34.8696661, -111.7611616],
            zoom: 7,
            controls: []
        });
        var placemark = new ymaps.Placemark([34.8696661, -111.7611616], {}, { // координаты метки
            iconLayout: "default#image",
            iconImageHref: "img/map-marker.svg", // иконка метки
            iconImageSize: [27, 27] // размер метки
        });
        map.geoObjects.add(placemark);
    }
  }
});

var sendForm = document.querySelector(".button--send-form");
var popupSuccess = document.querySelector(".popup--success");
var closePopup = document.querySelector(".button--popup-close");

sendForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupSuccess.classList.remove("popup--closed");
});


closePopup.addEventListener("click", function (evt) {
  evt.preventDefault();

  popupSuccess.classList.add("popup--closed");
});

  for (var i = 0; i < closePopup.length; i++) {
    closePopup[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      hideCover();
      popupError.classList.remove('popup--show');
      popupSuccess.classList.remove('popup--show');
    });
};
