import "./index.css";
import {
  cardTemplateSelector,
  cardContainerSelector,
  popupFormAddcardSelector,
  popupFormProfileSelector,
  popupAddCardSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  nameInputSelector,
  aboutInputSelector,
  popupDeleteCardSelector,
  popupFormDeleteCardSelector,
  popupFormEditavatarSelector,
  popupEditavatarSelector,
  profileImageSelector,
} from "../scripts/utils/constants.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupDeleteCard } from "../scripts/components/PopupDeleteCard.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Api } from "../scripts/components/Api.js";

// Константы DOM элементов
const profileShowButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__addcard-button ");
const editAvatarButton = document.querySelector(".profile__avatar-edit");
const profileImageElement = document.querySelector(profileImageSelector);

let cardList;
let myId;

// Экземпляр класса апи
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-27",
  headers: {
    authorization: "15ef627d-6933-45cc-b246-9992258b4fe6",
    "Content-Type": "application/json",
  },
});

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// секция создания карточки

// Экземпляр класса попапа с картинкой
const popupWithImage = new PopupWithImage();
popupWithImage.setEventListeners();

Promise.all([
  api.getUserInfo().then(getResponse),
  api.getCards().then(getResponse),
])
  .then(([userInfo, cards]) => {
    myId = userInfo._id;
    initUser(userInfo);
    initCards(cards);
  })
  .catch((err) => console.log(err));

// Попап добавления карточки
const addCardPopup = new PopupWithForm(
  {
    formSelector: popupFormAddcardSelector,
    handleFormSubmit: (formData) => {
      return api
        .sendCards({
          name: formData["place-name"],
          link: formData["image-source"],
        })
        .then(getResponse)
        .then((res) => {
          createCard(res);
        });
    },
  },
  popupAddCardSelector
);
addCardPopup.setEventListeners();

// Попап удаления карточки
const popupDeleteCard = new PopupDeleteCard(
  popupFormDeleteCardSelector,
  popupDeleteCardSelector,
  (cardId) => {
    api
      .deleteCard(cardId)
      .then(getResponse)
      .then(() => {
        api.getCards().then(getResponse).then(initCards);
      })
      .catch((err) => console.log(err));
  }
);

// Функция создания карточки
function createCard(cardItem) {
  const card = new Card(
    cardItem,
    cardTemplateSelector,
    () => {
      popupWithImage.open(cardItem);
    },
    () => {
      popupDeleteCard.open(cardItem);
    },
    api,
    myId
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// Рендер карточек
function initCards(cards) {
  cards.reverse();
  // Рендер массива начальных карточек
  cardList = new Section(
    {
      data: cards,
      renderer: (cardItem) => createCard(cardItem),
    },
    cardContainerSelector
  );
  cardList.renderItems();
}

// создание карточки конец

// секция профиля

// Загрузка инфо профиля
function initUser(data) {
  // Экземпляр класса пропиля пользователя
  const userInfo = new UserInfo({
    name: profileTitleSelector,
    about: profileSubtitleSelector,
    avatar: profileImageSelector,
  });

  userInfo.setUserInfo(data);
  // Попап редактирования профиля пользователя
  const profilePopup = new PopupWithForm(
    {
      formSelector: popupFormProfileSelector,
      handleFormSubmit: (formData) => {
        return api
          .sendProfileInfo(formData)
          .then(getResponse)
          .then((res) => {
            userInfo.setUserInfo(res);
          });
      },
    },
    ".popup-profile"
  );
  profilePopup.setEventListeners();
  // Слушатели попапа профиля
  profileShowButton.addEventListener("click", () => {
    profilePopup.open();
    const profileUserInfo = userInfo.getUserInfo();
    document.querySelector(nameInputSelector).value = profileUserInfo.name;
    document.querySelector(aboutInputSelector).value = profileUserInfo.about;
    profileFormValidator.resetValidation();
  });
}

// Попап загрузки аватара профиля
const editAvatarPopup = new PopupWithForm(
  {
    formSelector: popupFormEditavatarSelector,
    handleFormSubmit: (formData) => {
      const promise = api
        .editAvatar(formData["avatar-link"])
        .then(getResponse)
        .then((res) => {
          profileImageElement.style.backgroundImage = `url(${res.avatar})`;
        });
      return promise;
    },
  },
  popupEditavatarSelector
);
editAvatarPopup.setEventListeners();

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

// Экземпляр класса валидации формы загрузки аватара
const editavatarFormValidator = new FormValidator(
  validationParams,
  popupFormEditavatarSelector
);
editavatarFormValidator.enableValidation();

// Слушатели попапа добавления карточки
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addcardFormValidator.resetValidation();
});

// Слушатели попапа загрузки аватара
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  editavatarFormValidator.resetValidation();
});
