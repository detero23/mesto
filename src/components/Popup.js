export class Popup {
  constructor(selector) {
    this._openedClass = "popup_opened";
    this._closeBtnSelector = ".popup__close-button";

    this._popupSelector = selector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeBtn = this._popup.querySelector(this._closeBtnSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._openedClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener("click", this.close.bind(this));
    document.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(this._openedClass)) {
        this.close();
      }
    });
  }
}
