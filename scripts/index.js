// Переменные попапа редактирования профиля
const showButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close_type_profile");
const popupProfile = document.querySelector(".popup-profile");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInputProfile = document.querySelector(".popup__input_value_name");
const aboutInputProfile = document.querySelector(".popup__input_value_about");
const popupTitle = document.querySelector(".profile__title");
const popupSubtitle = document.querySelector(".profile__subtitle");

// Переменные попапа добавления карточки
const addCardButton = document.querySelector(".profile__addcard-button ");
const addCardCloseButton = document.querySelector(".popup__close_type_addcard");
const popupAddCard = document.querySelector(".popup-addcard");
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

// Переменные попапа с картинкой
const imagePopupContainer = document.querySelector(".image-popup");
const imagePopupClose = document.querySelector(".image-popup__close");
const image = document.querySelector(".image-popup__image");
const imageTitle = document.querySelector(".image-popup__title");

// Добавление карточки
function addCard(item) {
  // Переменные
  const card = cardTemplateContent.cloneNode(true);
  const cardElem = card.querySelector(".article");
  const cardImage = card.querySelector(".article__image");
  const cardTitle = card.querySelector(".article__title");
  const deleteButton = card.querySelector(".article__delete-button");
  const likeButton = card.querySelector(".article__like-button");
  // Добавление контента в карточку
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    cardElem.remove();
  });
  // Попап картинки карточки
  cardImage.addEventListener("click", () => {
    popupImage();
    image.src = cardImage.src;
    imageTitle.textContent = cardTitle.textContent;
  });
  // Лайк карточки
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("article__like-button_state_active");
  });
  // Добавление карточки на страницу
  cardElements.prepend(card);
}

// Добавление карточки из элементов массива
function addInitialCards() {
  initialCards.forEach(addCard);
}

addInitialCards();

// Попап изменения профиля
function showPopupProfile() {
  popupProfile.classList.add("popup_opened");
  nameInputProfile.value = popupTitle.textContent;
  aboutInputProfile.value = popupSubtitle.textContent;
}

// Функция закрытия попапа профиля
function hideProfilePopup() {
  popupProfile.classList.remove("popup_opened");
}

// Функция-обработчик формы профиля
function formHandle(evt) {
  evt.preventDefault();
  popupTitle.textContent = nameInputProfile.value;
  popupSubtitle.textContent = aboutInputProfile.value;
  hideProfilePopup();
}

// Попап добавления карточек
function showPopupAddCard() {
  popupAddCard.classList.add("popup_opened");
}

// Функция закрытия попапа добавления карточек
function hideAddCardPopup() {
  popupAddCard.classList.remove("popup_opened");
}

// Обработчик формы добавления карточек
function addCardForm(evt) {
  evt.preventDefault();
  const name = placeInputAddCard.value;
  const link = imageInputAddCard.value;
  addCard({ name, link });
  hideAddCardPopup();
  addCardFormElement.reset();
}

// Функция открытия попапа с картинкой
function popupImage() {
  imagePopupContainer.classList.add("popup_opened");
}

// Функция закрытия попапа с картинкой

function hideImagePopup() {
  imagePopupContainer.classList.remove("popup_opened");
}

// Слушатели попапа профиля
showButton.addEventListener("click", showPopupProfile);
profileCloseButton.addEventListener("click", hideProfilePopup);
profileFormElement.addEventListener("submit", formHandle);

// Слушатели попапа добавления карточки
addCardButton.addEventListener("click", showPopupAddCard);
addCardCloseButton.addEventListener("click", hideAddCardPopup);
addCardFormElement.addEventListener("submit", addCardForm);

// Слушатели попапа с картинкой
imagePopupClose.addEventListener("click", hideImagePopup);
