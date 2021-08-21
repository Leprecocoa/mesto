import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor() {
    super(".image-popup");
  }
  open(data) {
    super.open();
    this._popupImage = this._popupElement.querySelector(".image-popup__image");
    this._popupImageTitle = this._popupElement.querySelector(
      ".image-popup__title"
    );
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageTitle.textContent = data.name;
  }
}
