export class Card {
  constructor(data, cardSelector, showImagePopup) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._showImagePopup = showImagePopup;
  }
  // Получение шаблона карточки
  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".article")
      .cloneNode(true);
    return cardElement;
  }
  // Метод лайка карточки
  _setUpLike() {
    this._cardLikeButton.classList.toggle("article__like-button_state_active");
  }
  // Метод удаления карточки
  _setUpDelete() {
    this._element.remove();
  }
  // Установление слушателей на карточку
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._setUpLike();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._setUpDelete();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._showImagePopup(this._data.link, this._data.name);
    });
  }

  // Метод создания карточки
  generateCard() {
    this._element = this._getCardTemplate();
    this._element.querySelector(".article__image").src = this._data.link;
    this._element.querySelector(".article__image").alt = this._data.name;
    this._element.querySelector(".article__title").textContent =
      this._data.name;
    this._cardLikeButton = this._element.querySelector(".article__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".article__delete-button"
    );
    this._cardImageElement = this._element.querySelector(".article__image");
    this._setEventListeners();
    return this._element;
  }
}
