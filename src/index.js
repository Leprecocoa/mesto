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

// Экземпляр класса попапа с картинкой
const popupWithImage = new PopupWithImage();

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
  // Рендер массива начальных карточек
  const cardList = new Section(
    {
      data: cards,
      renderer: (cardItem) => createCard(cardItem),
    },
    cardContainerSelector
  );
  cardList.renderItems();
  // Попап добавления карточки
  const addCardPopup = new PopupWithForm(
    {
      formSelector: popupFormAddcardSelector,
      handleFormSubmit: (formData) => {
        createCard({
          name: formData["place-name"],
          link: formData["image-source"],
        });
        console.log(formData);
        api.sendCards({
          name: formData["place-name"],
          link: formData["image-source"],
        });
      },
    },
    popupAddCardSelector
  );
  // Функция создания карточки
  function createCard(cardItem) {
    const card = new Card(cardItem, cardTemplateSelector, () => {
      popupWithImage.open(cardItem);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
  // Слушатели попапа добавления карточки
  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    addcardFormValidator.resetValidation();
  });
});
