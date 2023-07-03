export class Card {
  constructor(cardNames, card, handleCardClick) {
    this._card = card;
    this._names = cardNames;
    this._handleCardClick = handleCardClick;

    this._template = document
      .querySelector(this._names.templateSelector)
      .content.querySelector(this._names.elementSelector)
      .cloneNode(true);
    this._image = this._template.querySelector(this._names.imageSelector);
    this._name = this._template.querySelector(this._names.nameSelector);
    this._heart = this._template.querySelector(this._names.heartSelector);
    this._recycle = this._template.querySelector(this._names.recycleSelector);
    this._heartClass = this._names.heartClass;
  }

  _deleteCard() {
    this._template.remove();
    // console.log("Card deleted");
  }

  _toggleLike() {
    this._heart.classList.toggle(this._heartClass);
    // console.log("Like toggled");
  }

  _addListeners() {
    this._heart.addEventListener("click", () => this._toggleLike());
    this._recycle.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._card.name, this._card.link)
    });
    // console.log("Listeners set");
  }

  generateCard() {
    this._image.src = this._card.link;
    this._image.alt = `Фото ${this._card.name}`;
    this._name.textContent = this._card.name;

    this._addListeners();

    return this._template;
  }
}
