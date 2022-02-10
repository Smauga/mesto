import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submit = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save');
    this._textButton = this._submitButton.textContent;
  }

  // Получение введенных данных
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
   });

  return this._formValues;
  }

  // Отправка данных
  _handleSubmitForm(evt) {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
  }

  // Установка слушателей
  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmitForm.bind(this));
    super.setEventListeners();
  }

  // Переопределение закрытия попапа
  close() {
    this._form.reset();
    super.close();
  }

  // Загрузка информации с сервера
  renderLoading(isLoading, loadingText) {
    if(isLoading) {
      this._popup.classList.add('popup_is-loading');
      this._submitButton.textContent = loadingText;
    }
    else {
      this._popup.classList.remove('popup_is-loading');
      this._submitButton.textContent = this._textButton;
    }
  }
}