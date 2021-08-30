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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }
  getCards() {
    return fetch(this.cardsUrl, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
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
    });
  }
}
