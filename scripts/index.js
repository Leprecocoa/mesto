import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// Переменные попапа редактирования профиля
const profileShowButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close_type_profile");
const profilePopup = document.querySelector(".popup-profile");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInputProfile = document.querySelector(".popup__input_value_name");
const aboutInputProfile = document.querySelector(".popup__input_value_about");
const popupTitle = document.querySelector(".profile__title");
const popupSubtitle = document.querySelector(".profile__subtitle");

// Переменные попапа добавления карточки
const addCardButton = document.querySelector(".profile__addcard-button ");
const addCardCloseButton = document.querySelector(".popup__close_type_addcard");
const addCardPopup = document.querySelector(".popup-addcard");
const addCardFormElement = document.querySelector(".popup__form_type_addcard");
const placeInputAddCard = document.querySelector(
  ".popup__input_value_place-name"
);
const imageInputAddCard = document.querySelector(
  ".popup__input_value_image-source"
);

// Переменные попапа с картинкой
const imagePopupContainer = document.querySelector(".image-popup");
const imagePopupClose = document.querySelector(".image-popup__close");
const imagePopup = document.querySelector(".image-popup__image");
const imagePopupTitle = document.querySelector(".image-popup__title");

// Удаление слушателей
function removeEventListeners() {
  popup.removeEventListener("mousedown", closePopupByClickingOutside);
  document.removeEventListener("keydown", closePopupByPressingEsc);
}

// Функция закрытия попапов при клике на оверлей
function closePopupByClickingOutside(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Функция закрытия попапов при нажатии на Esc
function closePopupByPressingEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Открытие попапа и навешивание слушателей
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupByClickingOutside);
  document.addEventListener("keydown", closePopupByPressingEsc);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeEventListeners();
}

// секция создания карточки

// Массив начальных карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция открытия попапа с картинкой
function showImagePopup(cardImageSrc, cardTitleTextContent) {
  imagePopup.src = cardImageSrc;
  imagePopup.alt = cardTitleTextContent;
  imagePopupTitle.textContent = cardTitleTextContent;
  openPopup(imagePopupContainer);
}

// Функция закрытия попапа с картинкой
function hideImagePopup() {
  closePopup(imagePopupContainer);
}

// Попап добавления карточек
function showAddCardPopup() {
  openPopup(addCardPopup);
}

// Функция закрытия попапа добавления карточек
function hideAddCardPopup() {
  closePopup(addCardPopup);
}

// Функция добавления карточки на страницу
function prependCard(card, cardsContainerSelector) {
  document.querySelector(cardsContainerSelector).prepend(card);
}

// Рендер начальных карточек
initialCards.forEach((item) => {
  const card = new Card(item, ".article-template", showImagePopup);
  prependCard(card.generateCard(), ".elements");
});

// Обработчик формы добавления карточек
function onAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = placeInputAddCard.value;
  const link = imageInputAddCard.value;
  const card = new Card({ name, link }, ".article-template", showImagePopup);
  prependCard(card.generateCard(), ".elements");
  hideAddCardPopup();
  addCardFormElement.reset();
  addCardFormElement
    .querySelector(".popup__submit")
    .classList.add("popup__submit_disabled");
}

// создание карточки конец

// секция профиля

// Заполнение профиля
function fillProfilePopup() {
  nameInputProfile.value = popupTitle.textContent;
  aboutInputProfile.value = popupSubtitle.textContent;
}

// Попап изменения профиля
function showProfilePopup() {
  fillProfilePopup();
  openPopup(profilePopup);
}

// Функция закрытия попапа профиля
function hideProfilePopup() {
  closePopup(profilePopup);
}

// Функция-обработчик формы профиля
function onProfileFormSubmit(evt) {
  evt.preventDefault();
  popupTitle.textContent = nameInputProfile.value;
  popupSubtitle.textContent = aboutInputProfile.value;
  hideProfilePopup();
}

// профиль конец

// Объект параметров валидации
const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-span_visible",
};

// Экземпляр класса валидации формы профиля
const profileFormValidator = new FormValidator(
  validationParams,
  ".popup__form_type_profile"
);
profileFormValidator.enableValidation();

// Экземпляр класса валидации формы добавления карточки
const addcardFormValidator = new FormValidator(
  validationParams,
  ".popup__form_type_addcard"
);
addcardFormValidator.enableValidation();

// Слушатели попапа профиля
profileShowButton.addEventListener("click", showProfilePopup);
profileCloseButton.addEventListener("click", hideProfilePopup);
profileFormElement.addEventListener("submit", onProfileFormSubmit);

// Слушатели попапа добавления карточки
addCardButton.addEventListener("click", showAddCardPopup);
addCardCloseButton.addEventListener("click", hideAddCardPopup);
addCardFormElement.addEventListener("submit", onAddCardFormSubmit);

// Слушатели попапа с картинкой
imagePopupClose.addEventListener("click", hideImagePopup);
