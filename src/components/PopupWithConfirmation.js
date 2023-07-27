import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;

    this._form = this._popup.querySelector(".popup__form");
  }

  close() {
    super.close();
    this._form.reset();
  }

  getForm() {
    return this._form;
  }

  resetForm() {
    this._form.reset();
  }

  open(id) {
    super.open()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(id);
      this.close();
    });
  }
}
