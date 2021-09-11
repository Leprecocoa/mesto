export class Popup {
  constructor(popupSelecor) {
    this._popupSelecor = popupSelecor;
    this._popupElement = document.querySelector(this._popupSelecor);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
    // Привязка обработчиков
    this._handleClickOutsideClose = this._clickedOutsideClose.bind(this);
    this._handleEscClose = this._pressingEscClose.bind(this);
    this._handleClose = this.close.bind(this);
  }
  //   Обработчик закрытия по клику на оверлей
  _clickedOutsideClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  //   Обработчик закрытия по нажатию на Esc
  _pressingEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  //   Метод удаления слушателей
  _removeEventListeners() {
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleClickOutsideClose
    );
    this._popupCloseButton.removeEventListener("click", this._handleClose);
  }
  //   Метод добавления слушателей
  setEventListeners() {
    this._popupCloseButton.addEventListener("click", this._handleClose);
    this._popupElement.addEventListener(
      "mousedown",
      this._handleClickOutsideClose
    );
  }
  //   Открытие попапа
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.add("popup_opened");
  }
  //   Закрытие попапа
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
