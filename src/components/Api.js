export class Api {
  constructor() {
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-71";
    this._token = "608e65cd-5c46-46a5-8324-f79e68e34120";
  }

  getInitialCards() {
    return this._get("/cards");
  }

  getUserInfo() {
    return this._get("/users/me");
  }

  patchUserInfo({ name, about }) {
    return this._patch("/users/me", { name: name, about: about });
  }

  postCard({ name, link }) {
    return this._post("/cards", { name: name, link: link });
  }

  _get(queryParams) {
    return fetch(this._baseUrl + queryParams, {
      method: "GET",
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

  _patch(queryParams, body) {
    return fetch(this._baseUrl + queryParams, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  _post(queryParams, body) {
    return fetch(this._baseUrl + queryParams, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}
