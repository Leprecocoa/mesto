import "./pages/index.css";
import {
  profileShowButton,
  addCardButton,
  cardTemplateSelector,
  cardContainerSelector,
  popupFormAddcardSelector,
  popupFormProfileSelector,
  popupAddCardSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  nameInputSelector,
  aboutInputSelector,
} from "./scripts/utils/constants.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Api } from "./scripts/components/Api.js";

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

// Экземпляр класса попапа с картинкой
const popupWithImage = new PopupWithImage();

// Попап добавления карточки
const addCardPopup = new PopupWithForm(
  {
    formSelector: popupFormAddcardSelector,
    handleFormSubmit: (formData) => {
      createCard({
        name: formData["place-name"],
        link: formData["image-source"],
      });
    },
  },
  popupAddCardSelector
);

// создание карточки конец

// секция профиля

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
  popupFormProfileSelector
);
profileFormValidator.enableValidation();

// Экземпляр класса валидации формы добавления карточки
const addcardFormValidator = new FormValidator(
  validationParams,
  popupFormAddcardSelector
);
addcardFormValidator.enableValidation();

// Слушатели попапа добавления карточки
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addcardFormValidator.resetValidation();
});

const api = new Api({
  profileUrl: "https://nomoreparties.co/v1/cohort-27/users/me",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-27/cards",
});

// Загрузка инфо пользователя
api.getUserInfo().then((data) => {
  // Экземпляр класса пропиля пользователя
  const userInfo = new UserInfo({
    name: profileTitleSelector,
    about: profileSubtitleSelector,
  });
  userInfo.setUserInfo(data);
  // Попап редактирования профиля пользователя
  const profilePopup = new PopupWithForm(
    {
      formSelector: popupFormProfileSelector,
      handleFormSubmit: (formData) => {
        api.sendProfileInfo(formData);
        userInfo.setUserInfo(formData);
      },
    },
    ".popup-profile"
  );
  // Слушатели попапа профиля
  profileShowButton.addEventListener("click", () => {
    profilePopup.open();
    const profileUserInfo = userInfo.getUserInfo();
    document.querySelector(nameInputSelector).value = profileUserInfo.name;
    document.querySelector(aboutInputSelector).value = profileUserInfo.about;
    profileFormValidator.resetValidation();
  });
});

api.getCards().then((cards) => {
  // Рендер массива начальных карточекы
  const cardList = new Section(
    {
      data: cards,
      renderer: (cardItem) => createCard(cardItem),
    },
    cardContainerSelector
  );
  cardList.renderItems();
  // Функция создания карточки
  function createCard(cardItem) {
    const card = new Card(cardItem, cardTemplateSelector, () => {
      popupWithImage.open(cardItem);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
});
