let content = document.querySelector('.content');

// Переменные в секции "Профиль"
let editButton = content.querySelector('.profile__button-edit');
let nameProfile = content.querySelector('.profile__name');
let jobProfile = content.querySelector('.profile__status');

// Переменные в секции "Поп-ап"
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let popupCloseButton = formElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__input_info_name');
let jobInput = formElement.querySelector('.popup__input_info_status');

// Открыть поп-ап
function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
}

// Закрыть поп-ап
function popupClose() {
  popup.classList.remove('popup_opened');
} 

// Изменить имя и работу в профиле
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupClose();
}

// Кнопка изменить профиль
editButton.addEventListener('click', popupOpen);

// Кнопка закрыть поп-ап
popupCloseButton.addEventListener('click', popupClose);

// Кнопка сохранить изменения в форме
formElement.addEventListener('submit', formSubmitHandler);


