import {
  initialCards,
  validationNames,
  cardNames,
  cardHolderSelector,
} from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const textInfoName = document.querySelector(".profile__name");
const textInfoJob = document.querySelector(".profile__ocupation");

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
      const cardElement = new Card(
        cardNames,
        card,
        handleCardClick
      ).generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  cardHolderSelector
);
cardsSection.renderInitial();

const editPopup = new PopupWithForm(".popup_type_edit", (inputs) => {
  textInfoName.textContent = inputs[0].value;
  textInfoJob.textContent = inputs[1].value;
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", (inputs) => {
  cardsSection.renderItem({
    name: inputs[0].value,
    link: inputs[1].value,
  });
});
addPopup.setEventListeners();

const imgPopup = new PopupWithImage(".popup_type_image");
imgPopup.setEventListeners();

buttonEdit.addEventListener("click", () => {
  editPopup.updateValues([textInfoName.textContent,textInfoJob.textContent]);
  formValidators[editPopup.getForm().getAttribute("name")].resetValidation();
  editPopup.open();
});

buttonAdd.addEventListener("click", () => {
  addPopup.resetForm();
  formValidators[addPopup.getForm().getAttribute("name")].resetValidation();
  formValidators[addPopup.getForm().getAttribute("name")].disableButton();
  addPopup.open();
});

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}
