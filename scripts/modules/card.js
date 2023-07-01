export class Card {
  constructor(card){
    this._card = card;
  }

  _getTemplate() {
    const template = document.querySelector("#templateCard").content.querySelector(".element").cloneNode(true);
    return template;
  }

  _getPopup() {
    const popup = document.querySelector(".popup_type_image");
    return popup;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementName = this._element.querySelector(".element__name");

    this._elementImage.src = this._card.link;
    this._elementImage.alt = `Фото ${this._card.name}`;
    this._elementName.textContent = this._card.name;

    this._addListeners(this._element);

    return this._element;
  }

  _addListeners(el) {
    this._elementHeart = el.querySelector(".element__heart-icon");
    this._elementRecycle = el.querySelector(".element__recycle");
    this._elementImage = el.querySelector(".element__image");

    this._elementHeart.addEventListener("click", () => this._toggleLike(this._elementHeart));
    this._elementRecycle.addEventListener("click", () => this._deleteCard(el));
    this._elementImage.addEventListener("click", () => {
      this._showPopup(this._card);
    });
  }

  _deleteCard(el) {
    el.remove();
  }

  _toggleLike(el) {
    el.classList.toggle("element__heart-icon_active");
  }

  _updatePopup(el) {
    this._popupImage.src = el.link;
    this._popupCaption.textContent = el.name;
  }

  _showPopup(el) {
    this._popup = this._getPopup();
    this._popupImage = this._popup.querySelector(".popup__full-image");
    this._popupCaption = this._popup.querySelector(".popup__full-image-caption");

    this._popupImage.src = el.link;
    this._popupCaption.textContent = el.name;

    this._popup.classList.add("popup_opened");


    document.addEventListener("keydown", (evt) => this._handleButton(evt, this._popup));
    document.addEventListener("click", (evt) => this._handleClick(evt, this._popup));
  }

  _handleButton (evt, el) {
    if (evt.key === "Escape") {
      this._hidePopup(el);
      console.log('pressed');
    }
  }

  _handleClick (evt, el) {
    if (["popupImage","popupEdit","popupAdd"].includes(evt.target.id)) {
      this._hidePopup(el);
      console.log('pressed');
    }
  }

  _hidePopup(el) {
    el.classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => this._handleButton(evt, this._popup));
    document.removeEventListener("click", (evt) => this._handleClick(evt, this._popup));
  }

  _clearPopupImage(el) {
    sourceFullImage.src = "";
    captionFullImage.textContent = "";
  }
}
