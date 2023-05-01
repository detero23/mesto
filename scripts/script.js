let popupForm = document.querySelector('.popup__container');
let popupSection = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let nameText = document.querySelector('.profile__name').firstChild;
let jobText = document.querySelector('.profile__ocupation').firstChild;
let nameInput= document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__ocupation');


function showPopup() {
  popupSection.classList.add('popup_opened');
  console.log('Попап отрисован');

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

function hidePopup() {
  popupSection.classList.remove('popup_opened');
  console.log('Попап спрятан');
}

function formSubmit (evt) {
    console.log('Отправка формы')

    evt.preventDefault();

    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;

    console.log(`Передано: имя - ${nameInput.value}, занятие - ${jobInput.value}
      Записано: имя - ${nameText.textContent}, занятие - ${jobText.textContent}`);

    hidePopup();
}


editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);
popupForm.addEventListener('submit', formSubmit);
