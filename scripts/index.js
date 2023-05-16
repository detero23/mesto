const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const textInfoName = document.querySelector('.profile__name');
const textInfoJob = document.querySelector('.profile__ocupation');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const inputEditName= popupEdit.querySelector('.popup__input_type_info-name');
const inputEditJob = popupEdit.querySelector('.popup__input_type_info-job');
const buttonEditClose = popupEdit.querySelector('.popup__close-button');

const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const inputAddName= popupAdd.querySelector('.popup__input_type_img-name');
const inputAddRef = popupAdd.querySelector('.popup__input_type_img-ref');
const buttonAddClose = popupAdd.querySelector('.popup__close-button');


function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  console.log(`Попап ${popup.id} спрятан`);
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
  console.log(`Попап ${popup.id} отрисован`);
}

function formSubmit (evt,popup) {
  evt.preventDefault();
  hidePopup(popup);
  console.log(`Отправка формы попапа ${popup.id}`)
}

function updateInputFromText (input,text) {input.value = text.textContent;}
function updateTextFromInput (text,input) {text.textContent = input.value;}


buttonEdit.addEventListener('click', () => {
  updateInputFromText(inputEditName,textInfoName);
  updateInputFromText(inputEditJob,textInfoJob);
  showPopup(popupEdit);
});
buttonEditClose.addEventListener('click', () => {
  hidePopup(popupEdit);
});
popupEditForm.addEventListener('submit',(evt) => {
  formSubmit(evt,popupEdit);
  updateTextFromInput(textInfoName,inputEditName);
  updateTextFromInput(textInfoJob,inputEditJob);
});

buttonAdd.addEventListener('click', () => {
  showPopup(popupAdd);
});
buttonAddClose.addEventListener('click', () => {
  hidePopup(popupAdd);
});
popupAddForm.addEventListener('submit',(evt) => {
  formSubmit(evt,popupAdd);
});


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
