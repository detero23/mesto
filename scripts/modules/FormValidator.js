export class FormValidator {
  constructor (validationNames, form) {
    this._names = validationNames;
    // this._form = form;

    this._forms = Array.from(document.querySelectorAll(this._names.formSelector));
  }

  enableValidation(names) {
    this._forms.forEach((form) => {
      this._setEventListeners(form);
    });
  };

  _setEventListeners(form) {
    const inputs = Array.from(form.querySelectorAll(this._names.inputSelector));
    const button = form.querySelector(this._names.submitButtonSelector);

    this._toggleButton(inputs, button);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(form, input);
        this._toggleButton(inputs, button);
      });
    });
  };

  _isValid(form, input) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage);
    } else {
      this._hideInputError(form, input);
    }
  };

  _showInputError(form, input, message) {
    const error = form.querySelector(`${this._names.errorSelector}_${input.id}`);

    input.classList.add(this._names.inputErrorClass);
    error.textContent = message;
    error.classList.add(this._names.errorClass);
  };

  _hideInputError(form, input) {
    const error = form.querySelector(`${this._names.errorSelector}_${input.id}`);

    input.classList.remove(this._names.inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._names.errorClass);
  };

  _toggleButton(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._names.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._names.inactiveButtonClass);
      button.disabled = false;
    }
  };

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    })
  };
}



// function enableValidation(names) {
//   const forms = Array.from(document.querySelectorAll(names.formSelector));

//   forms.forEach((form) => {
//     setEventListeners(form, names);
//   });
// };

// function setEventListeners(form, names) {
//   const inputs = Array.from(form.querySelectorAll(names.inputSelector));
//   const button = form.querySelector(names.submitButtonSelector);

//   toggleButton(inputs, button, names);
//   inputs.forEach((input) => {
//     input.addEventListener('input', () => {
//       isValid(form, input, names);
//       toggleButton(inputs, button, names);
//     });
//   });
// };

// function isValid(form, input, names) {
//   if (!input.validity.valid) {
//     showInputError(form, input, input.validationMessage, names);
//   } else {
//     hideInputError(form, input, names);
//   }
// };

function showInputError(form, input, message, names) {
  const error = form.querySelector(`${names.errorSelector}_${input.id}`);

  input.classList.add(names.inputErrorClass);
  error.textContent = message;
  error.classList.add(names.errorClass);
};

function hideInputError(form, input, names) {
  const error = form.querySelector(`${names.errorSelector}_${input.id}`);

  input.classList.remove(names.inputErrorClass);
  error.textContent = '';
  error.classList.remove(names.errorClass);
};

function toggleButton(inputs, button, names) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(names.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(names.inactiveButtonClass);
    button.disabled = false;
  }
};

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
};
