export class UserInfo {
  constructor({ name, about }) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
  }
  getUserInfo() {
    const profileValues = {};
    profileValues.name = this._nameElement.textContent;
    profileValues.about = this._aboutElement.textContent;
    return profileValues;
  }
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }
}
