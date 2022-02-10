export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector); 
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Получить данные пользователя
  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
    return userInfo;
  }

  // Установить и перезаписать данные пользователя
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }

  getUserAvatar() {
    return this._avatarElement.src;
  }

  setUserAvatar({ avatar }) {;
    this._avatarElement.src = avatar;
  }
}