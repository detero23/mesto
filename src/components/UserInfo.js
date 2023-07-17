export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
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
}
