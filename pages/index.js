import { initialCards, validationNames, cardNames, cardHolderSelector } from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";


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


const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(validationNames);

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = new Card(cardNames, card, handleCardClick).generateCard();
      cardsSection.addItem(cardElement);
    }
  },
  cardHolderSelector
)
cardsSection.renderInitial();




buttonEdit.addEventListener("click", () => {
  inputEditName.value = textInfoName.textContent;
  inputEditJob.value = textInfoJob.textContent;
  formValidators[popupEditForm.getAttribute("name")].resetValidation();
  showPopup(popupEdit);
});
popupEditForm.addEventListener("submit", (evt) => {
  submitForm(evt);
  textInfoName.textContent = inputEditName.value;
  textInfoJob.textContent = inputEditJob.value;
  hidePopup(popupEdit);
});

buttonAdd.addEventListener("click", () => {
  popupAddForm.reset();
  formValidators[popupAddForm.getAttribute("name")].resetValidation();
  formValidators[popupAddForm.getAttribute("name")].disableButton();
  showPopup(popupAdd);
});
popupAddForm.addEventListener("submit", (evt) => {
  submitForm(evt);
  cardsSection.renderItem({ name: inputAddName.value, link: inputAddRef.value });
  hidePopup(popupAdd);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => hidePopup(popup));
});

function submitForm(evt) {
  evt.preventDefault();
}

const refClickListener = function (evt) {
  if (["popupImage", "popupEdit", "popupAdd"].includes(evt.target.id)) {
    hidePopup(popupOpened);
  }
};
const refPressedListener = function (evt) {
  if (evt.key === "Escape") {
    hidePopup(popupOpened);
  }
};

let popupOpened = "";

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

function handleCardClick(name, link) {
  sourceFullImage.src = link;
  sourceFullImage.alt = `Фото ${name}`;
  captionFullImage.textContent = name;
  showPopup(popupImage);
}
