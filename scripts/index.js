import { Card } from "./modules/card.js";
import { initialCards, validationNames, cardNames } from "./initial.js";
import { FormValidator } from "./modules/FormValidator.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const textInfoName = document.querySelector(".profile__name");
const textInfoJob = document.querySelector(".profile__ocupation");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = popupEdit.querySelector(".popup__form");
const inputEditName = popupEdit.querySelector(".popup__input_type_info-name");
const inputEditJob = popupEdit.querySelector(".popup__input_type_info-job");

const popupAdd = document.querySelector(".popup_type_add");
const popupAddForm = popupAdd.querySelector(".popup__form");
const inputAddName = popupAdd.querySelector(".popup__input_type_img-name");
const inputAddRef = popupAdd.querySelector(".popup__input_type_img-ref");

const popupImage = document.querySelector(".popup_type_image");
const sourceFullImage = popupImage.querySelector(".popup__full-image");
const captionFullImage = popupImage.querySelector(".popup__full-image-caption");

const closeButtons = document.querySelectorAll(".popup__close-button");

const cardsHolder = document.querySelector(".elements");



const validatorAddForm = new FormValidator(validationNames, popupAddForm);
const validatorEditForm = new FormValidator(validationNames, popupEditForm);

validatorAddForm.enableValidation();
validatorEditForm.enableValidation();



function submitForm(evt) {
  evt.preventDefault();
}

function updateInputFromText(input, text) {
  input.value = text.textContent;
}
function updateTextFromInput(text, input) {
  text.textContent = input.value;
}


buttonEdit.addEventListener("click", () => {
  updateInputFromText(inputEditName, textInfoName);
  updateInputFromText(inputEditJob, textInfoJob);
  showPopup(popupEdit);
});
popupEditForm.addEventListener("submit", (evt) => {
  submitForm(evt);
  updateTextFromInput(textInfoName, inputEditName);
  updateTextFromInput(textInfoJob, inputEditJob);
  hidePopup(popupEdit);
});

buttonAdd.addEventListener("click", () => {
  popupAddForm.reset();
  showPopup(popupAdd);
  validatorAddForm.disableButton();
});
popupAddForm.addEventListener("submit", (evt) => {
  submitForm(evt);
  renderCard(createCard({ name: inputAddName.value, link: inputAddRef.value }));
  hidePopup(popupAdd);
});



closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => hidePopup(popup));
});

let popupOpened = "";

const refClickListener = function (evt) {
  if (["popupImage","popupEdit", "popupAdd"].includes(evt.target.id)) {
    hidePopup(popupOpened);
  }
};
const refPressedListener = function (evt) {
  if (evt.key === "Escape") {
    hidePopup(popupOpened);
  }
};

function showPopup(popup) {
  popupOpened = popup;
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", refPressedListener);
  document.addEventListener("click", refClickListener);
}

function hidePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", refPressedListener);
  document.removeEventListener("click", refClickListener);
}


function createCard(card) {
const cardElement = new Card(cardNames, card, handleCardClick).generateCard();
return cardElement
}

function renderCard(card) {
  cardsHolder.prepend(card);
}

initialCards.forEach((card) => {
  renderCard(createCard(card));
});

function handleCardClick(name, link) {
  sourceFullImage.src = link;
  sourceFullImage.alt = `Фото ${name}`;
  captionFullImage.textContent = name;
  showPopup(popupImage);
}
