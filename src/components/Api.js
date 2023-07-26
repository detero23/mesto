export class Api {
  constructor() {
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-71";
    this._token = "608e65cd-5c46-46a5-8324-f79e68e34120";
  }

  getInitialCards() {
    // ...
  }

  getUserInfo() {
    return this._get("/users/me");
  }

  _get(queryParams) {
    return fetch(this._baseUrl + queryParams, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}
