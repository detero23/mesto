export class Card {
  constructor(card, cardNames){
    this._card = card;
    this._names = cardNames;

    this._template = document.querySelector(cardNames.templateSelector).content
                              .querySelector(cardNames.elementSelector).cloneNode(true);
    this._image = this._template.querySelector(cardNames.imageSelector);
    this._name = this._template.querySelector(cardNames.nameSelector);
    this._heart = this._template.querySelector(cardNames.heartSelector);
    this._recycle = this._template.querySelector(cardNames.recycleSelector);
    this._heartClass = cardNames.heartClass;

    this._popup = document.querySelector(cardNames.popupSelector);
    this._popupImage = this._popup.querySelector(cardNames.popupImageSelector);
    this._popupCaption = this._popup.querySelector(cardNames.popupCaptionSelector);
    this._popupImageID = cardNames.popupImageID;
  }

  _deleteCard() {
    this._template.remove();
    console.log("Card deleted");
  }

  _toggleLike() {
    this._heart.classList.toggle(this._heartClass);
    console.log("Like toggled");
  }

  _addListeners() {
    this._heart.addEventListener("click", () => this._toggleLike());
    this._recycle.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () => this._showPopup());
    console.log("Listeners settled");
  }

  generateCard() {
    this._image.src = this._card.link;
    this._image.alt = `Фото ${this._card.name}`;
    this._name.textContent = this._card.name;

    this._addListeners();

    return this._template;
  }

  _showPopup() {
    this._updatePopup();
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", (evt) => this._handleButton(evt));
    // document.addEventListener("click", (evt) => this._handleClick(evt));

    console.log("Popup opened")
  }

  _updatePopup() {
    this._popupImage.src = this._card.link;
    this._popupCaption.textContent = this._card.name;
    console.log("Popup updated")
  }

  _clearPopup() {
    this._popupImage.src = "";
    this._popupCaption.textContent = "";
    console.log("Popup cleared")
  }

  _hidePopup() {
    this._popup.classList.remove("popup_opened");
    this._clearPopup();

    // document.removeEventListener("keydown", () => this._handleButton());  //не работает!!!
    // document.removeEventListener("click", () => this._handleClick()); //не работает!!!
    console.log("Popup closed");
  }

  _handleButton (evt) {
    if (evt.key === "Escape") {
      console.log('Esc pressed');
      this._hidePopup();
    }
  }

  _handleClick (evt) {
    if (this._popupImageID.includes(evt.target.id)) {
      console.log('Button clicked');
      this._hidePopup();
    }
  }
}