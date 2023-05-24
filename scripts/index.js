const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const textInfoName = document.querySelector(".profile__name");
const textInfoJob = document.querySelector(".profile__ocupation");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = popupEdit.querySelector(".popup__form");
const inputEditName = popupEdit.querySelector(".popup__input_type_info-name");
const inputEditJob = popupEdit.querySelector(".popup__input_type_info-job");
const buttonEditClose = popupEdit.querySelector(".popup__close-button");

const popupAdd = document.querySelector(".popup_type_add");
const popupAddForm = popupAdd.querySelector(".popup__form");
const inputAddName = popupAdd.querySelector(".popup__input_type_img-name");
const inputAddRef = popupAdd.querySelector(".popup__input_type_img-ref");
const buttonAddClose = popupAdd.querySelector(".popup__close-button");

const popupImage = document.querySelector(".popup_type_image");
const buttonImageClose = popupImage.querySelector(".popup__close-button");
const sourceFullImage = popupImage.querySelector(".popup__full-image");
const captionFullImage = popupImage.querySelector(".popup__full-image-caption");

const cardsHolder = document.querySelector(".elements");
const templateCard = document.querySelector("#templateCard").content;




function showInputError(form, input, message) {
  const error = form.querySelector(`.popup__form_error_${input.id}`);

  input.classList.add('popup__form_type_error');
  error.textContent = message;
  error.classList.add('popup__input-error_active');
};

function hideInputError(form, input) {
  const error = form.querySelector(`.popup__form_error_${input.id}`);

  input.classList.remove('popup__form_type_error');
  error.classList.remove('popup__input-error_active');
  error.textContent = '';
};


function isValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};


function setEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__save-button');

  toggleButton(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButton(inputs, button);
    });
  });
};

function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));

  forms.forEach((form) => {
    setEventListeners(form);
  });
};

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
};

function toggleButton(inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.classList.add('popup__save-button_disabled');
    button.disabled = true;
  } else {
    button.classList.remove('popup__save-button_disabled');
    button.disabled = false;
  }
};




enableValidation();









function hidePopup(popup) {
  popup.classList.remove("popup_opened");
  // console.log(`Попап ${popup.id} спрятан`);
}

function showPopup(popup) {
  popup.classList.add("popup_opened");
  // console.log(`Попап ${popup.id} отрисован`);
}

function formSubmit(evt) {
  evt.preventDefault();
  // console.log(`Отправка формы ${evt.target.closest('.popup__form').name}`)
}

function updateInputFromText(input, text) {
  input.value = text.textContent;
}
function updateTextFromInput(text, input) {
  text.textContent = input.value;
}
function updateFullImageSrc(link) {
  sourceFullImage.src = link;
}
function updateFullImageCaption(text) {
  captionFullImage.textContent = text;
}
function clearFullImageSrc() {
  sourceFullImage.src = "";
}
function clearFullImageCaption() {
  captionFullImage.textContent = "";
}

function toggleLike(el) {
  el.classList.toggle("element__heart-icon_active");
  // console.log(`Поставлен/убран лайк у карточки "${el.closest('.element').querySelector('.element__name').textContent}"`)
}

function deleteCard(card) {
  card.remove();
  // console.log(`Удалена карточка "${card.querySelector('.element__name').textContent}"`)
}

function createCard(card) {
  const newCard = templateCard.querySelector(".element").cloneNode(true);
  const newCardImage = newCard.querySelector(".element__image");
  newCardImage.src = card.link;
  newCardImage.alt = `Фото ${card.name}`;
  newCardImage.addEventListener("click", () => {
    updateFullImageSrc(card.link);
    updateFullImageCaption(card.name);
    showPopup(popupImage);
  });
  newCard.querySelector(".element__name").textContent = card.name;
  newCard
    .querySelector(".element__heart-icon")
    .addEventListener("click", (evt) => toggleLike(evt.target));
  newCard
    .querySelector(".element__recycle")
    .addEventListener("click", (evt) =>
      deleteCard(evt.target.closest(".element"))
    );
  // console.log(`Создана карточка "${card.name}"`);
  return newCard;
}

function renderCard(card) {
  cardsHolder.prepend(createCard(card));
  // console.log(`Отрисована карточка "${card.name}"`);
}

buttonEdit.addEventListener("click", () => {
  updateInputFromText(inputEditName, textInfoName);
  updateInputFromText(inputEditJob, textInfoJob);
  showPopup(popupEdit);
});
buttonEditClose.addEventListener("click", () => {
  hidePopup(popupEdit);
});
popupEditForm.addEventListener("submit", (evt) => {
  formSubmit(evt);
  updateTextFromInput(textInfoName, inputEditName);
  updateTextFromInput(textInfoJob, inputEditJob);
  hidePopup(popupEdit);
});

buttonAdd.addEventListener("click", () => {
  showPopup(popupAdd);
  popupAddForm.reset();
});
buttonAddClose.addEventListener("click", () => {
  hidePopup(popupAdd);
});
popupAddForm.addEventListener("submit", (evt) => {
  formSubmit(evt);
  renderCard({ name: inputAddName.value, link: inputAddRef.value });
  hidePopup(popupAdd);
});

buttonImageClose.addEventListener("click", () => {
  hidePopup(popupImage);
});

initialCards.forEach((card) => {
  renderCard(card);
});
