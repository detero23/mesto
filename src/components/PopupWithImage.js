import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._popup.querySelector(".popup__full-image");
    this._caption = this._popup.querySelector(".popup__full-image-caption");
  }

  open(name, link) {
    super.open();

    this._image.src = link;
    this._image.alt = `Фото ${name}`;
    this._caption.textContent = name;
  }
}
