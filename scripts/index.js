import { Card } from "./modules/card.js";
import { initialCards } from "./cards.js";


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
const buttonAddSubmit = popupAdd.querySelector(".popup__save-button");

const closeButtons = document.querySelectorAll('.popup__close-button');

const cardsHolder = document.querySelector(".elements");
// const templateCard = document.querySelector("#templateCard").content;

const validationNames = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form_type_error",
  errorClass: "popup__input-error_active",
  errorSelector: ".popup__input-error",
};

// enableValidation(validationNames);

// function showPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", refPressedListener = function(evt) {
//     if (evt.key === "Escape") {
//       hidePopup(popup);
//     }
//   });
//   document.addEventListener("click", refClickListener = function(evt) {
//     if (["popupImage","popupEdit","popupAdd"].includes(evt.target.id)) {
//       hidePopup(popup);
//     }
//   });
// }



// function hidePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", refPressedListener);
//   document.removeEventListener("click", refClickListener);
// }

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
  buttonAddSubmit.classList.add(validationNames.inactiveButtonClass);
  buttonAddSubmit.disabled = true;
});
popupAddForm.addEventListener("submit", (evt) => {
  submitForm(evt);
  renderCard({ name: inputAddName.value, link: inputAddRef.value });
  hidePopup(popupAdd);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => hidePopup(popup));
});

function renderCard(card) {
  cardsHolder.prepend(createCard(card));
}



initialCards.forEach((card) => {
  const newCard = new Card(card);
  const newCardInstance = newCard.generateCard(card);
  // newCard.render();
  // console.log(newCard._log());
  cardsHolder.prepend(newCardInstance);
});
