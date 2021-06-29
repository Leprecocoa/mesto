let showButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__name-input");
let aboutInput = document.querySelector(".popup__about-input");

function popupToggle() {
  document.querySelector(".popup").classList.toggle("popup_opened");

  nameInput.value = "";
  aboutInput.value = "";
}

function showPopup() {
  popupToggle();
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__subtitle").textContent = aboutInput.value;

  popupToggle();
}

showButton.addEventListener("click", showPopup);

closeButton.addEventListener("click", popupToggle);

formElement.addEventListener("submit", formSubmitHandler);
