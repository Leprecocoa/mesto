import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ formSelector, handleFormSubmit }, popupSelecor) {
    super(popupSelecor);
    this._formSelector = formSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = document.querySelector(this._formSelector);
    // Привязка обработчика
    this._handleSubmitForm = this._submitForm.bind(this);
  }
  //Обработчик сабмита формы
  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this._formElement.reset();
    this.close();
  }
  // Метод получения значений инпутов
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleSubmitForm);
  }
  _removeEventListeners() {
    super._removeEventListeners();
    this._formElement.removeEventListener("submit", this._handleSubmitForm);
  }
}
