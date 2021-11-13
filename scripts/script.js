let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__button-edit');
let nameProfile = content.querySelector('.profile__name');
let jobProfile = content.querySelector('.profile__status');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let popupCloseButton = formElement.querySelector('.popup__close');
let nameInput = formElement.querySelector('.popup__input_info_name');
let jobInput = formElement.querySelector('.popup__input_info_status');

function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
} 

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);


