export class Card {
  constructor(cardNames, card) {
    this._card = card;
    this._names = cardNames;

    this._template = document
      .querySelector(this._names.templateSelector)
      .content.querySelector(this._names.elementSelector)
      .cloneNode(true);
    this._image = this._template.querySelector(this._names.imageSelector);
    this._name = this._template.querySelector(this._names.nameSelector);
    this._heart = this._template.querySelector(this._names.heartSelector);
    this._recycle = this._template.querySelector(this._names.recycleSelector);
    this._heartClass = this._names.heartClass;

    this._popup = document.querySelector(this._names.popupSelector);
    this._popupImage = this._popup.querySelector(
      this._names.popupImageSelector
    );
    this._popupCaption = this._popup.querySelector(
      this._names.popupCaptionSelector
    );
    this._popupImageID = this._names.popupImageID;

    this._keyListener = this._handleButton.bind(this);
    this._clickListener = this._handleClick.bind(this);
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
    this._image.addEventListener("click", () => this._showPopup());
    // console.log("Listeners set");
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

    document.addEventListener("keydown", this._keyListener);
    document.addEventListener("click", this._clickListener, true);

    // console.log("Popup opened");
  }

  _updatePopup() {
    this._popupImage.src = this._card.link;
    this._popupImage.alt = `Фото ${this._card.name}`;
    this._popupCaption.textContent = this._card.name;
    // console.log("Popup updated");
  }

  _clearPopup() {
    this._popupImage.src = "";
    this._popupCaption.textContent = "";
    // console.log("Popup cleared");
  }

  _hidePopup() {
    this._popup.classList.remove("popup_opened");
    this._clearPopup();

    document.removeEventListener("keydown", this._keyListener);
    document.removeEventListener("click", this._clickListener, true);
    // console.log("Popup closed");
  }

  _handleButton = function (evt) {
    if (evt.key === "Escape") {
      // console.log("Esc pressed");
      this._hidePopup();
    }
  };

  _handleClick = function (evt) {
    if (this._popupImageID.includes(evt.target.id)) {
      // console.log("Button clicked");
      this._hidePopup();
    }
  };
}
