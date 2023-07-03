export class FormValidator {
  constructor(validationNames, formToValidate) {
    this._names = validationNames;
    this._form = formToValidate;

    this._inputs = Array.from(
      this._form.querySelectorAll(this._names.inputSelector)
    );
    this._button = this._form.querySelector(this._names.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButton();
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }

  disableButton() {
    this._button.classList.add(this._names.inactiveButtonClass);
    this._button.disabled = true;
  }

  _setEventListeners() {
    this._toggleButton();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButton();
      });
    });
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, message) {
    const error = this._form.querySelector(
      `${this._names.errorSelector}_${input.id}`
    );

    input.classList.add(this._names.inputErrorClass);
    error.textContent = message;
    error.classList.add(this._names.errorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(
      `${this._names.errorSelector}_${input.id}`
    );

    input.classList.remove(this._names.inputErrorClass);
    error.textContent = "";
    error.classList.remove(this._names.errorClass);
  }

  _toggleButton() {
    if (this._hasInvalidInput(this._inputs)) {
      this._button.classList.add(this._names.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._names.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }
}
