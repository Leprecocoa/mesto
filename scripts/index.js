let showButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_value_name");
let aboutInput = document.querySelector(".popup__input_value_about");
let popupTitle = document.querySelector(".profile__title");
let popupSubtitle = document.querySelector(".profile__subtitle");

// Функция открытия попапа
function showPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = popupTitle.textContent;
  aboutInput.value = popupSubtitle.textContent;
}

// Функция закрытия попапа
function hidePopup() {
  popup.classList.remove("popup_opened");
}

// Функция-обработчик формы
function formHandle(evt) {
  evt.preventDefault();
  popupTitle.textContent = nameInput.value;
  popupSubtitle.textContent = aboutInput.value;
  hidePopup();
}

showButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", hidePopup);
formElement.addEventListener("submit", formHandle);
