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
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

const user = new UserInfo(userInfoNames);
const api = new Api();
let userID = "";

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
        userID,
        handleCardClick,
        handleDeleteClick
      ).generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  cardHolderSelector
);

function setUserInfo() {
  api
    .getUserInfo()
    .then((result) => {
      user.setUserInfo(result.name, result.about);
      user.setAvatar(result.avatar);
      setInitialCards(result._id);
      userID = result._id;
    })
    .catch((err) => {
      console.error(`Инфо пользователя - ошибка ${err.status}`);
    });
}
setUserInfo();

function setInitialCards() {
  api
    // .getUserInfo()
    // .then((result) => {
    //   userID.id = result._id;
    //   userID.cohort = result.cohort;
    // })
    .getInitialCards()
    .then((result) => {
      cardsSection.renderInitial(result); //Добавить проверку на то загруженна ли карточка
    })
    .catch((err) => {
      console.error(`Инициализация карточек - ошибка ${err.status}`);
    });
}

const editPopup = new PopupWithForm(".popup_type_edit", (inputs) => {
  api
    .patchUserInfo({ name: inputs.inputEditName, about: inputs.inputEditJob })
    .then(() => {
      user.setUserInfo(inputs.inputEditName, inputs.inputEditJob);
    })
    .catch((err) => {
      console.error(`Обновление инфо пользователя - ошибка ${err.status}`);
    });
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", (inputs) => {
  api
    .postCard({ name: inputs.inputAddName, link: inputs.inputAddRef })
    .then((result) => {
      cardsSection.renderItem(result); //Добавить проверку на то загруженна ли карточка
    })
    .catch((err) => {
      console.error(`Добавление новой карточки - ошибка ${err.status}`);
    });
});
addPopup.setEventListeners();

// const deletePopup = new PopupWithConfirmation(".popup_type_delete", (id) => {
// api
// .deleteCard({id: id})
// .then(() => {
//   console.log(`Card ${id} deleted`);
// cardsSection.getItems().forEach((item) => console.log(item));
// })
// .catch((err) => {
// console.error(`Удаление карточки ${id}- ошибка ${err.status}`);
// });
// });
// deletePopup.setEventListeners();

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

function handleDeleteClick(id) {
  deletePopup.open(id);
}
