export class FormValidator {
  constructor(validationNames, form) {
    this._names = validationNames;
    this._form = form;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._names.inputSelector)
    );
    const button = this._form.querySelector(this._names.submitButtonSelector);

    this._toggleButton(inputs, button);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButton(inputs, button);
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

  _toggleButton(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._names.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._names.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }
}
