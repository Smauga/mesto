// Показать ошибку валидации
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Скрыть ошибку валидации
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// Поиск невалидного инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Функция переключения кнопки в актвное/неактивное состояние
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

  if (hasInvalidInput(inputList)) {
    // Неактивное состояние
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    // Активное состояние
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 


// Функция установки слушателей на форму
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  // Установка слушателя на каждый инпут
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {

      // Вызов функции проверки валидности
      checkInputValidity(formElement, inputElement, rest);

      // Вызов функции переключения кнопки в актвное/неактивное состояние
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Функция включения валидации
const enableValidation = ({formSelector, ...rest}) => {
  // Поиск всех форм на странице
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // Отмена перезагрузки страницы
        evt.preventDefault();

        // Перевод кнопки в неактивное состояние после отправки формы
        const formSubmitButton = formElement.querySelector(rest.submitButtonSelector);
        formSubmitButton.classList.add(rest.inactiveButtonClass);
        formSubmitButton.setAttribute('disabled', true);
      });

      // Вызов функции установки слушателей для формы
      setEventListeners(formElement, rest);
  });
}

// Вызов функции включения валидации с указанными значениями
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});