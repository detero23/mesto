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

const validationNames = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form_type_error",
  errorClass: "popup__input-error_active",
  errorSelector: ".popup__input-error",
};

enableValidation(validationNames);

function hidePopup(popup) {
  popup.classList.remove("popup_opened");
}

function showPopup(popup) {
  popup.classList.add("popup_opened");
}

function showImagePopup(popup) {
  showPopup(popup);
  addImageListeners();
}

function hideImagePopup(popup) {
  hidePopup(popup);
  removeImageListeners();
}

function addImageListeners() {
  document.addEventListener("keydown", checkPressedKey);
  document.addEventListener("click", checkClickTarget);
}

function removeImageListeners() {
  document.removeEventListener("keydown", checkPressedKey);
  document.removeEventListener("click", checkClickTarget);
}

function checkPressedKey(evt) {
  console.log(evt);
  if (evt.keyCode === 27) {
    hideImagePopup(popupImage);
  }
}

function checkClickTarget(evt) {
  console.log(evt.target.id);
  if (evt.target.id === "popupImage") {
    hideImagePopup(popupImage);
  }
}

function formSubmit(evt) {
  evt.preventDefault();
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
}

function deleteCard(card) {
  card.remove();
}

function createCard(card) {
  const newCard = templateCard.querySelector(".element").cloneNode(true);
  const newCardImage = newCard.querySelector(".element__image");
  newCardImage.src = card.link;
  newCardImage.alt = `Фото ${card.name}`;
  newCardImage.addEventListener("click", () => {
    updateFullImageSrc(card.link);
    updateFullImageCaption(card.name);
    showImagePopup(popupImage);
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
  return newCard;
}

function renderCard(card) {
  cardsHolder.prepend(createCard(card));
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
  popupAddForm.reset();
  showPopup(popupAdd);
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
  hideImagePopup(popupImage);
});

initialCards.forEach((card) => {
  renderCard(card);
});
