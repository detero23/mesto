export class Popup {
  constructor (selector) {
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
    console.log(`Popup ${this._popupSelector} opened`);
  }

  close() {
    this._popup.classList.remove(this._openedClass);
    document.removeEventListener("keydown", this._handleEscClose);
    console.log(`Popup ${this._popupSelector} closed`);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log('Esc Pressed');
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener("click",this.close.bind(this));
    document.addEventListener("click",(evt) => {
      if (evt.target.classList.contains(this._popupSelector.replace('.',''))) {
        console.log('Clicked outside of popup');
        this.close();
      }
    })
  }
}
