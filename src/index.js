import "./pages/index.css";
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
} from "./scripts/utils/constants.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { PopupDeleteCard } from "./scripts/components/PopupDeleteCard.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Api } from "./scripts/components/Api.js";

// Константы DOM элементов
const profileShowButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__addcard-button ");
const editAvatarButton = document.querySelector(".profile__avatar-edit");
const profileImageElement = document.querySelector(".profile__images");

// Экземпляр класса апи
const api = new Api({
  profileUrl: "https://nomoreparties.co/v1/cohort-27/users/me",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-27/cards",
});

// секция создания карточки

// Экземпляр класса попапа с картинкой
const popupWithImage = new PopupWithImage();
popupWithImage.setEventListeners();

// Рендер карточек
let cardList;
function getCards() {
  api
    .getCards()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cards) => {
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
    })
    .catch((err) => console.log(err));
}
getCards();

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
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => {
          getCards();
        })
        .catch((err) => console.log(err));
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        getCards();
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

// создание карточки конец

// секция профиля

let myId;
// Загрузка инфо пользователя
api
  .getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    myId = data._id;
    profileImageElement.style.backgroundImage = `url(${data.avatar})`;
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
          return api
            .sendProfileInfo(formData)
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
              userInfo.setUserInfo(res);
            })
            .catch((err) => console.log(err));
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
  })
  .catch((err) => console.log(err));

// Попап загрузки аватара профиля
const editAvatarPopup = new PopupWithForm(
  {
    formSelector: popupFormEditavatarSelector,
    handleFormSubmit: (formData) => {
      return api
        .editAvatar(formData["avatar-link"])
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
          profileImageElement.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch((err) => console.log(err));
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
