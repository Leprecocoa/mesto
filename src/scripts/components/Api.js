export class Api {
  constructor(options) {
    this.url = options.url;
  }
  headers = {
    authorization: "15ef627d-6933-45cc-b246-9992258b4fe6",
    "Content-Type": "application/json",
  };
  getUserInfo() {
    return fetch(this.url, {
      method: "GET",
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
}
