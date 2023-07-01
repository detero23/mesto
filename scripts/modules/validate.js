function enableValidation(names) {
  const forms = Array.from(document.querySelectorAll(names.formSelector));

  forms.forEach((form) => {
    setEventListeners(form, names);
  });
};

function setEventListeners(form, names) {
  const inputs = Array.from(form.querySelectorAll(names.inputSelector));
  const button = form.querySelector(names.submitButtonSelector);

  toggleButton(inputs, button, names);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, names);
      toggleButton(inputs, button, names);
    });
  });
};

function isValid(form, input, names) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, names);
  } else {
    hideInputError(form, input, names);
  }
};

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
