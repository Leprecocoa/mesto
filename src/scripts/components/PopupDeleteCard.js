import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(formSelector, popupSelecor, api, handleDelete) {
    super(popupSelecor);
    this._formSelector = formSelector;
    this._api = api;
    this._handleDelete = handleDelete;
    this._formElement = document.querySelector(this._formSelector);
    // Привязка обработчика
    this._handleSubmitForm = this._submitDeletingForm.bind(this);
  }
  _submitDeletingForm(evt) {
    evt.preventDefault();

    this._handleDelete(this._cardId);
    this.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmitForm);
  }
  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener("submit", this._handleSubmitForm);
  }
  open(data) {
    super.open();
    this.setEventListeners();
    this._cardId = data._id;
  }
}
