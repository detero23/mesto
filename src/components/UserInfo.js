export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(nameValue, descriptionValue) {
    this._name.textContent = nameValue;
    this._description.textContent = descriptionValue;
  }

  setAvatar(imgLink) {
    this._avatar.src = imgLink;
  }
}
