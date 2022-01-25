import {
  nameProfile,
  jobProfile
} from '../utils/constants.js';

export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  // Получить данные пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name,
      job: this._job
    };
    return userInfo;
  }

  // Установить и перезаписать данные пользователя
  setUserInfo({ name, job }) {
    this._name = name;
    this._job = job;
    nameProfile.textContent = this._name;
    jobProfile.textContent = this._job;
  }
}