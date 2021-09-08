export class Api {
  constructor(options) {
    this.profileUrl = options.profileUrl;
    this.cardsUrl = options.cardsUrl;
  }
  headers = {
    authorization: "15ef627d-6933-45cc-b246-9992258b4fe6",
    "Content-Type": "application/json",
  };
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getUserInfo() {
    return fetch(this.profileUrl, {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
  getCards() {
    return fetch(this.cardsUrl, {
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
  sendProfileInfo(data) {
    return fetch(this.profileUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
  sendCards(card) {
    return fetch(this.cardsUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
  sendLikes(id) {
    return fetch(`${this.cardsUrl}/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
  deleteCard(id) {
    return fetch(`${this.cardsUrl}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
}
