import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;

    this._form = this._popup.querySelector(".popup__form");
    this._submitBtn = this._popup.querySelector(".popup__save-button");
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

  setEventListeners() {
    super.setEventListeners();

    const initialBtnValue = this._submitBtn.value;

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitBtn.value = "Удаление...";
      this._submitCallback()
        .then(() => this.close())
        .finally(() => {
          this._submitBtn.value = initialBtnValue;
        });
    });
  }

  setTempBtnState() {
    this._submitBtn.value = this._tempBtnValue;
  }

  setInitialBtnState() {
    this._submitBtn.value = this._initialBtnValue;
  }
}
