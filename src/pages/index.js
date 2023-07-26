import "./index.css";

import {
  validationNames,
  cardNames,
  userInfoNames,
  cardHolderSelector,
} from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const user = new UserInfo(userInfoNames);
const api = new Api();

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

api
  .getUserInfo()
  .then((result) => {
    user.setUserInfo(result.name, result.about);
    user.setAvatar(result.avatar);
  })
  .catch((err) => {
    console.error(`Инфо пользователя - ошибка ${err.status}`);
  });

api
  .getInitialCards()
  .then((result) => {
    cardsSection.renderInitial(result);
  })
  .catch((err) => {
    console.error(`Инициализация карточек - ошибка ${err.status}`);
  });

const editPopup = new PopupWithForm(".popup_type_edit", (inputs) => {
  user.setUserInfo(inputs.inputEditName, inputs.inputEditJob);
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", (inputs) => {
  cardsSection.renderItem({
    name: inputs.inputAddName,
    link: inputs.inputAddRef,
  });
});
addPopup.setEventListeners();

const imgPopup = new PopupWithImage(".popup_type_image");
imgPopup.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  editPopup.updateValues({
    inputEditName: userInfo.name,
    inputEditJob: userInfo.description,
  });
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
