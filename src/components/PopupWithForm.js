import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;

    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));

    this._submitBtn = this._popup.querySelector(".popup__save-button");
    this._initialBtnValue = this._submitBtn.value;
    this._tempBtnValue = 'Сохранение...';
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _setInputValues(newValues) {
    this._inputs.forEach((input) => {
      input.value = newValues[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
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

  updateValues(newValues) {
    this._setInputValues(newValues);
  }

  setTempBtnState() {
    this._submitBtn.value = this._tempBtnValue;
  }

  setInitialBtnState() {
    this._submitBtn.value = this._initialBtnValue;
  }
}
