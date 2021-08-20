import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(data) {
    super(".image-popup");
    this._data = data;
  }
  open() {
    super.open();
    this._popupImage = this._popupElement.querySelector(".image-popup__image");
    this._popupImageTitle = this._popupElement.querySelector(
      ".image-popup__title"
    );
    this._popupImage.src = this._data.link;
    this._popupImage.alt = this._data.name;
    this._popupImageTitle.textContent = this._data.name;
  }
}
