let popup_form = document.querySelector('.popup');
let edit_button = document.querySelector('.profile__edit-button');
let close_button = document.querySelector('.popup__close-button');
let name_text = document.querySelector('.profile__name').firstChild;
let ocupation_text = document.querySelector('.profile__ocupation').firstChild;
let name_input= document.querySelector('.popup__name');
let job_input = document.querySelector('.popup__ocupation');


function showPopup() {
  popup_form.classList.add('popup_opened');
  console.log('Попап отрисован');

  name_input.value = name_text.textContent;
  job_input.value = ocupation_text.textContent;
}

function hidePopup() {
  popup_form.classList.remove('popup_opened');
  console.log('Попап спрятан');
}

function formSubmit (evt) {
    console.log('Отправка формы')

    evt.preventDefault();

    name_text.textContent = name_input.value;
    ocupation_text.textContent = job_input.value;

    console.log(`Передано: имя - ${name_input.value}, занятие - ${job_input.value}
      Записано: имя - ${name_text.textContent}, занятие - ${ocupation_text.textContent}`);

    hidePopup();
}


edit_button.addEventListener('click', showPopup);
close_button.addEventListener('click', hidePopup);
popup_form.addEventListener('submit', formSubmit);
