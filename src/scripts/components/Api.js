export class Api {
  constructor(options) {
    this.profileUrl = options.profileUrl;
    this.cardsUrl = options.cardsUrl;
  }
  headers = {
    authorization: "15ef627d-6933-45cc-b246-9992258b4fe6",
    "Content-Type": "application/json",
  };
  getUserInfo() {
    return fetch(this.profileUrl, {
      headers: this.headers,
    });
  }
  getCards() {
    return fetch(this.cardsUrl, {
      headers: this.headers,
    });
  }
  sendProfileInfo(data) {
    return fetch(this.profileUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
  sendCards(card) {
    return fetch(this.cardsUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }
  deleteCard(id) {
    return fetch(`${this.cardsUrl}/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
  sendLikes(id) {
    return fetch(`${this.cardsUrl}/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    });
  }
  deleteLikes(id) {
    return fetch(`${this.cardsUrl}/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
  editAvatar(link) {
    return fetch(`${this.profileUrl}/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}
