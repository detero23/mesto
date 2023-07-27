export class Card {
  constructor(cardSelectors, cardData, userID, handleCardClick, handleDeleteClick) {
    this._cardData = cardData;
    this._cardSelectors = cardSelectors;
    this._userID = userID;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;

    this._template = document
      .querySelector(this._cardSelectors.templateSelector)
      .content.querySelector(this._cardSelectors.elementSelector)
      .cloneNode(true);
    this._image = this._template.querySelector(
      this._cardSelectors.imageSelector
    );
    this._name = this._template.querySelector(this._cardSelectors.nameSelector);
    this._heart = this._template.querySelector(
      this._cardSelectors.heartSelector
    );
    this._likes = this._template.querySelector(
      this._cardSelectors.likesSelector
    );
    this._recycle = this._template.querySelector(
      this._cardSelectors.recycleSelector
    );
    this._inactiveRecycle = this._cardSelectors.inactiveRecycleClass;
    this._heartClass = this._cardSelectors.heartClass;
  }

  _deleteCard() {
    this._template.remove();
  }

  deleteCardByID(id) {
    this._cardData._id == id ? console.log('yes') : console.log('No');
    // this._template.remove();
  }

  _toggleLike() {
    this._heart.classList.toggle(this._heartClass);
  }

  _addListeners() {
    this._heart.addEventListener("click", () => this._toggleLike());
    this._recycle.addEventListener("click", () => {
      this._handleDeleteClick(this._cardData._id);
    });
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._cardData.name, this._cardData.link);
    });
  }

  _disableNotUsersRecycle() {
    this._userID == this._cardData.owner._id ? "" : this._recycle.classList.add(this._inactiveRecycle);
  }


  generateCard() {
    this._image.src = this._cardData.link;
    this._image.alt = `Фото ${this._cardData.name}`;
    this._name.textContent = this._cardData.name;
    this._likes.textContent = this._cardData.likes.length;

    this._addListeners();
    this._disableNotUsersRecycle();

    return this._template;
  }
}
