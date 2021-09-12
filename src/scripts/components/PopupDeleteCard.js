import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(formSelector, popupSelecor, handleDelete) {
    super(popupSelecor);
    this._formSelector = formSelector;
    this._handleDelete = handleDelete;
    this._formElement = document.querySelector(this._formSelector);
    // Привязка обработчика
    this._handleSubmitForm = this._submitDeletingForm.bind(this);
  }
  removeCard() {
    this._card.removeCard();
  }
  _submitDeletingForm(evt) {
    evt.preventDefault();
    this._handleDelete(this._card.getId());
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmitForm);
  }
  _removeEventListeners() {
    this._formElement.removeEventListener("submit", this._handleSubmitForm);
  }
  open(card) {
    super.open();
    this.setEventListeners();
    this._card = card;
  }
  close() {
    super.close();
    this._removeEventListeners();
  }
}
