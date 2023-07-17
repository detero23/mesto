import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;

    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
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

  updateValues(textArray) {
    for (let i = 0; i < textArray.length; i++) {
      this._getInputValues()[i].value = textArray[i];
    }
  }
}
