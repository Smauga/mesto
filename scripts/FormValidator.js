export default class FormValidator {
  // Конструктор с данными из formValidatorData
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButton = data.inactiveButtonClass;
    this._inputError = data.inputErrorClass;
    this._error = data.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  // Функция включения валидации
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      // Отмена перезагрузки страницы
      evt.preventDefault();
      this._toggleButtonState();
      // Перевод кнопки в неактивное состояние после отправки формы
      // this._submitButton.classList.add(this._inactiveButton);
      // this._submitButton.setAttribute('disabled', true);
    });
    
    // Вызов функции установки слушателей для формы
    this._setEventListeners();
  }

  // Очистить ошибки
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((_inputElement) => {
      this._hideInputError(_inputElement)
    });
  }

  // Функция установки слушателей на форму
  _setEventListeners() {
    this._inputList.forEach((_inputElement) => {
      // Установка слушателя на каждый инпут
      _inputElement.addEventListener('input', () => {
        this._checkInputValidity(_inputElement);

        // Вызов функции переключения кнопки в актвное/неактивное состояние
        this._toggleButtonState();
      });
    });
  }

  // Функция проверки валидности
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Показать ошибку валидации
  _showInputError(inputElement) {
    const _errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    _errorElement.textContent = inputElement.validationMessage;
    _errorElement.classList.add(this._error);
  }

  // Скрыть ошибку валидации
  _hideInputError(inputElement) {
    const _errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    _errorElement.classList.remove(this._error);
    _errorElement.textContent = '';
  }

  // Функция переключения кнопки в актвное/неактивное состояние
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // Неактивное состояние
      this._submitButton.classList.add(this._inactiveButton);
      this._submitButton.setAttribute('disabled', true);
    } else {
      // Активное состояние
      this._submitButton.classList.remove(this._inactiveButton);
      this._submitButton.removeAttribute('disabled');
    }
  }

  // Поиск невалидного инпута
  _hasInvalidInput() {
    return this._inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    });
  }
}
