let popup = document.querySelector('.popup');
let edit_button = document.querySelector('.profile__edit-button');
let close_button = document.querySelector('.popup__close-button');

edit_button.addEventListener('click', showPopup);
close_button.addEventListener('click', hidePopup);

function showPopup() {
  popup.classList.add('popup_opened');
  console.log('Попап отрисован');
}

function hidePopup() {
  popup.classList.remove('popup_opened');
  console.log('Попап спрятан');
}
