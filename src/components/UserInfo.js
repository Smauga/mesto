export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector); 
    this._jobElement = document.querySelector(jobSelector);
  }

  // Получить данные пользователя
  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
    return userInfo;
  }

  // Установить и перезаписать данные пользователя
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}