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

// Переменные карточки
const cardElements = document.querySelector(".elements");
const cardTemplateContent =
  document.querySelector(".article__template").content;

// Переменные попапа с картинкой
const imagePopupContainer = document.querySelector(".image-popup");
const imagePopupClose = document.querySelector(".image-popup__close");
const image = document.querySelector(".image-popup__image");
const imageTitle = document.querySelector(".image-popup__title");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// секция создания карточки

// Функция открытия попапа с картинкой
function showImagePopup() {
  openPopup(imagePopupContainer);
}

// Функция закрытия попапа с картинкой
function hideImagePopup() {
  closePopup(imagePopupContainer);
}

// Инициализация картинки карточки
function setUpImage(card, item) {
  const cardImage = card.querySelector(".article__image");
  const cardTitle = card.querySelector(".article__title");
  // Попап картинки карточки
  cardImage.addEventListener("click", () => {
    showImagePopup();
    image.src = cardImage.src;
    image.alt = cardTitle.textContent;
    imageTitle.textContent = cardTitle.textContent;
  });
  // Добавление контента в карточку
  cardImage.src = item.link;
  cardImage.alt = item.name;
}

// Попап добавления карточек
function showAddCardPopup() {
  openPopup(addCardPopup);
}

// Функция закрытия попапа добавления карточек
function hideAddCardPopup() {
  closePopup(addCardPopup);
}

// Инициализация описания карточки
function setUpTitle(card, item) {
  const cardTitle = card.querySelector(".article__title");
  cardTitle.textContent = item.name;
}

// Инициализация функции удаления
function setUpDelete(card) {
  const deleteButton = card.querySelector(".article__delete-button");
  const cardElem = card.querySelector(".article");
  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    cardElem.remove();
  });
}

// Инициализиция лайка карточки
function setUpLike(card) {
  const likeButton = card.querySelector(".article__like-button");
  // Лайк карточки
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("article__like-button_state_active");
  });
}

// Создание карточки
function createCard(item) {
  const card = cardTemplateContent.cloneNode(true);
  setUpDelete(card);
  setUpLike(card);
  setUpImage(card, item);
  setUpTitle(card, item);
  return card;
}

// Добавление карточки на страницу
function prependCard(card, place) {
  place.prepend(card);
}

// Добавление карточки
function addCard(item) {
  prependCard(createCard(item), cardElements);
}

// Добавление карточки из элементов массива
function addInitialCards() {
  initialCards.forEach(addCard);
}

// Обработчик формы добавления карточек
function onAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = placeInputAddCard.value;
  const link = imageInputAddCard.value;
  addCard({ name, link });
  hideAddCardPopup();
  addCardFormElement.reset();
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

// Функция закрытия попапов при клике на оверлей

function closePopupByClickingOutside(evt) {
  if (evt.target === evt.currentTarget) {
    evt.target.classList.remove("popup_opened");
  }
  evt.target.removeEventListener("mousedown", closePopupByClickingOutside);
}

// Слушатель закрытия попапов при клике на оверлей

const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupByClickingOutside);
});

// Функция закрытия попапов при нажатии на Esc

function closePopupByPressingEsc(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popup) => {
      popup.classList.remove("popup_opened");
    });
  }
  document.removeEventListener("keydown", closePopupByPressingEsc);
}

// Слушатель закрытия попапов при нажатии на Esc

document.addEventListener("keydown", closePopupByPressingEsc);

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

addInitialCards();
