import "./pages/index.css";
import { Section } from "./scripts/components/Section.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";

// Переменные попапа редактирования профиля
const profileShowButton = document.querySelector(".profile__edit-button");

// Переменные попапа добавления карточки
const addCardButton = document.querySelector(".profile__addcard-button ");

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

const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, ".article-template", () => {
        const popup = new PopupWithImage(cardItem);
        popup.open();
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);
cardList.renderItems();

const addCardPopup = new PopupWithForm(
  {
    formSelector: ".popup__form_type_addcard",
    handleFormSubmit: (formData) => {
      const card = new Card(
        {
          name: formData["place-name"],
          link: formData["image-source"],
        },
        ".article-template",
        () => {
          const popup = new PopupWithImage({
            name: formData["place-name"],
            link: formData["image-source"],
          });
          popup.open();
        }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".popup-addcard"
);

// создание карточки конец

// секция профиля

const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
});

const profilePopup = new PopupWithForm(
  {
    formSelector: ".popup__form_type_profile",
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
    },
  },
  ".popup-profile"
);

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
profileShowButton.addEventListener("click", () => {
  profilePopup.open();
  const profileUserInfo = userInfo.getUserInfo();
  document.querySelector(".popup__input_value_name").value =
    profileUserInfo.name;
  document.querySelector(".popup__input_value_about").value =
    profileUserInfo.about;
  profileFormValidator.resetValidation();
});

// Слушатели попапа добавления карточки
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addcardFormValidator.resetValidation();
});
