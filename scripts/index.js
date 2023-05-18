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

const popupImage = document.querySelector('.popup_type_image');
const buttonImageClose = popupImage.querySelector('.popup__close-button');
const sourceFullImage = popupImage.querySelector('.popup__full-image');
const captionFullImage = popupImage.querySelector('.popup__full-image-caption');

const cardsHolder = document.querySelector('.elements');
const templateCard = document.querySelector('#templateCard').content;


function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  // console.log(`Попап ${popup.id} спрятан`);
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
  // console.log(`Попап ${popup.id} отрисован`);
}

function formSubmit (evt,form) {
  evt.preventDefault();
  // console.log(`Отправка формы ${form.name}`)
}

function updateInputFromText (input,text) {input.value = text.textContent;}
function updateTextFromInput (text,input) {text.textContent = input.value;}
function clearInput (input) {input.value = '';}
function updateFullImageSrc (link) {sourceFullImage.src = link;}
function updateFullImageCaption (text) {captionFullImage.textContent = text;}
function clearFullImageSrc () {sourceFullImage.src = '';}
function clearFullImageCaption () {captionFullImage.textContent = '';}

function toggleLike (el) {
  el.classList.toggle('element__heart-icon_active');
  // console.log(`Поставлен/убран лайк у карточки "${el.closest('.element').querySelector('.element__name').textContent}"`)
}

function deleteCard(card) {
  card.remove();
  // console.log(`Удалена карточка "${card.querySelector('.element__name').textContent}"`)
}

function addNewCard(name,link) {
  if (name&&link) {
    const newCard = templateCard.querySelector('.element').cloneNode(true);
    const newCardImage = newCard.querySelector('.element__image');
    newCardImage.src = link;
    newCardImage.alt = `Фото ${name}`;
    newCardImage.addEventListener('click',() => {
      updateFullImageSrc(link);
      updateFullImageCaption(name);
      showPopup(popupImage)
    });
    newCard.querySelector('.element__name').textContent = name;
    newCard.querySelector('.element__heart-icon').addEventListener('click',(evt) => toggleLike(evt.target));
    newCard.querySelector('.element__recycle').addEventListener('click',(evt) => deleteCard(evt.target.closest('.element')));
    cardsHolder.prepend(newCard);
    // console.log(`Добавлена карточка "${name}"`);
  }
  // else {
  //   console.log(`Имя карточки или ссылка пустые`);
  // }
}



buttonEdit.addEventListener('click', () => {
  updateInputFromText(inputEditName,textInfoName);
  updateInputFromText(inputEditJob,textInfoJob);
  showPopup(popupEdit);
});
buttonEditClose.addEventListener('click', () => {
  hidePopup(popupEdit);
});
popupEditForm.addEventListener('submit',(evt) => {
  formSubmit(evt,popupEditForm);
  updateTextFromInput(textInfoName,inputEditName);
  updateTextFromInput(textInfoJob,inputEditJob);
  hidePopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  showPopup(popupAdd);
  clearInput(inputAddName);
  clearInput(inputAddRef);
});
buttonAddClose.addEventListener('click', () => {
  hidePopup(popupAdd);
});
popupAddForm.addEventListener('submit',(evt) => {
  formSubmit(evt,popupAddForm);
  addNewCard(inputAddName.value, inputAddRef.value);
  hidePopup(popupAdd);
});

buttonImageClose.addEventListener('click', () => {
  hidePopup(popupImage);
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

initialCards.forEach(card => {
  addNewCard(card.name, card.link);
});
