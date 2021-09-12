export class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
    this._avatarElement = document.querySelector(avatar);
  }
  getUserInfo() {
    const profileValues = {};
    profileValues.name = this._nameElement.textContent;
    profileValues.about = this._aboutElement.textContent;
    return profileValues;
  }
  setAvatar(res) {
    this._avatarElement.style.backgroundImage = `url(${res.avatar})`;
  }
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarElement.style.backgroundImage = `url(${data.avatar})`;
  }
}
