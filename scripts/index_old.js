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

const popupImage = document.querySelector(".popup_type_image");
const sourceFullImage = popupImage.querySelector(".popup__full-image");
const captionFullImage = popupImage.querySelector(".popup__full-image-caption");

const closeButtons = document.querySelectorAll('.popup__close-button');

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

function showPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", refPressedListener = function(evt) {
    if (evt.key === "Escape") {
      hidePopup(popup);
    }
  });
  document.addEventListener("click", refClickListener = function(evt) {
    if (["popupImage","popupEdit","popupAdd"].includes(evt.target.id)) {
      hidePopup(popup);
    }
  });
}

function hidePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", refPressedListener);
  document.removeEventListener("click", refClickListener);
}

function submitForm(evt) {
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



initialCards.forEach((card) => {
  renderCard(card);
});
