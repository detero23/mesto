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
const avatarImage = document.querySelector(".profile__avatar");

const user = new UserInfo(userInfoNames);
const api = new Api();
let userID = "";
let curCardID = "";

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
        handleDeleteClick,
        handleLikeClick
      ).generateCard();
      cardsSection.addItem(cardElement, card._id);
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
      setInitialCards();
      userID = result._id;
    })
    .catch((err) => {
      console.error(`Инфо пользователя - ошибка ${err.status}`);
    });
}
setUserInfo();

function setInitialCards() {
  api
    .getCards()
    .then((result) => {
      cardsSection.renderInitial(result);
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
      cardsSection.renderItem(result);
    })
    .catch((err) => {
      console.error(`Добавление новой карточки - ошибка ${err.status}`);
    });
});
addPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", (inputs) => {
  console.log('колбек')
  api
    .patchUserAvatar({ link: inputs.inputAvatarRef })
    .then(() => {
      user.setAvatar(inputs.inputAvatarRef);
    })
    .catch((err) => {
      console.error(`Обновление аватара - ошибка ${err.status}`);
    });
});
avatarPopup.setEventListeners();

const deletePopup = new PopupWithConfirmation(".popup_type_delete", () => {
  api
    .deleteCard({ id: curCardID })
    .then(() => {
      console.log(`Card ${curCardID} deleted`);
      cardsSection.deleteItem(curCardID);
    })
    .catch((err) => {
      console.error(`Удаление карточки ${id}- ошибка ${err.status}`);
    });
});
deletePopup.setEventListeners();

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
avatarImage.addEventListener("click", () => {
  avatarPopup.resetForm();
  formValidators[avatarPopup.getForm().getAttribute("name")].resetValidation();
  formValidators[avatarPopup.getForm().getAttribute("name")].disableButton();
  avatarPopup.open();
});

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function handleDeleteClick(id) {
  curCardID = id;
  deletePopup.open();
}

function handleLikeClick(cardData, toggleLike, updateLikes, isLiked) {
  if (isLiked) {
    api
      .deleteCardLike({ id: cardData._id })
      .then(() => {
        console.log(`Card ${cardData._id} disliked`);
        toggleLike();
        updateCardLikes(cardData._id, updateLikes);
      })
      .catch((err) => {
        console.error(`Лайк карточки ${cardData}- ошибка ${err.status}`);
      });
  } else {
    api
      .putCardLike({ id: cardData._id })
      .then(() => {
        console.log(`Card ${cardData._id} liked`);
        toggleLike();
        updateCardLikes(cardData._id, updateLikes);
      })
      .catch((err) => {
        console.error(`Дизлайк карточки ${cardData}- ошибка ${err.status}`);
      });
  }
}

function updateCardLikes(cardID, updateLike) {
  api
    .getCards()
    .then((result) => {
      const filteredRes = result.filter((obj) => obj._id == cardID);
      updateLike(filteredRes[0].likes.length);
    })
    .catch((err) => {
      console.error(
        `Получение лайков карточки ${cardID}- ошибка ${err.status}`
      );
    });
}
