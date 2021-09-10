export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDelete,
    api,
    myId,
    cardId
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._api = api;
    this._myId = myId;
  }
  // Получение шаблона карточки
  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".article")
      .cloneNode(true);
    return cardElement;
  }
  _setLike() {
    this._api.sendLikes(this._data._id).then((res) => {
      this._element.querySelector(".article__like-number").textContent =
        res.likes.length;
      this._data.likes = res.likes;
    });
    this._cardLikeButton.classList.add("article__like-button_state_active");
  }
  _deleteLike() {
    this._api.deleteLikes(this._data._id).then((res) => {
      this._element.querySelector(".article__like-number").textContent =
        res.likes.length;
      this._data.likes = res.likes;
    });
    this._cardLikeButton.classList.remove("article__like-button_state_active");
  }
  // Метод лайка карточки
  _setUpLike() {
    this._data.likes.some((like) => {
      return like._id === this._myId;
    })
      ? this._deleteLike()
      : this._setLike();
  }
  // Установление слушателей на карточку
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._setUpLike();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
  _setDeleteButton() {
    if (this._data.owner._id === this._myId) {
      this._element
        .querySelector(".article__delete-button")
        .classList.add("article__delete-button_visible");
    }
  }
  // Метод создания карточки
  generateCard() {
    this._element = this._getCardTemplate();
    this._element.querySelector(".article__like-number").textContent =
      this._data.likes.length;
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
    this._setDeleteButton();
    if (
      this._data.likes.some((like) => {
        return like._id === this._myId;
      })
    ) {
      this._cardLikeButton.classList.add("article__like-button_state_active");
    }
    return this._element;
  }
}
