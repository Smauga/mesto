const content = document.querySelector('.content');

// Константы в секции "Профиль"
const editButton = content.querySelector('.profile__button-edit');
const addButton = content.querySelector('.profile__button-add');
const nameProfile = content.querySelector('.profile__name');
const jobProfile = content.querySelector('.profile__status');

// Константы в секции "Редактировать профиль"
const popup = document.querySelector('.popup_type_edit-profile');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_info_name');
let jobInput = formElement.querySelector('.popup__input_info_status');

const popupAddElement = document.querySelector('.popup_type_add-element');
const popupAddElementClose = popupAddElement.querySelector('.popup__close');
const formAddElement = popupAddElement.querySelector('.popup__form');
let titleInput = formAddElement.querySelector('.popup__input_info_title');
let imageInput = formAddElement.querySelector('.popup__input_info_image');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template').content;

function addElement (nameValue, imageSource) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  elementItem.querySelector('.element__title').textContent = nameValue;

  if(imageSource.includes('https://')) {
    elementItem.querySelector('.element__image').src = imageSource;
  }
    else {
      elementItem.querySelector('.element__image').src = 'images/element-no-image.jpg';
    }
  elementItem.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  
  elementItem.querySelector('.element__button-delete').addEventListener('click', function (evt) {  
    evt.target.parentElement.parentElement.remove();
  });
  
  elementItem.querySelector('.element__image').addEventListener('click', function (evt) {
    const popupElement = document.querySelector('.popup-element');
    const elementImage = popupElement.querySelector('.popup-element__image');
    const elementTitle = popupElement.querySelector('.popup-element__title');
    const popupElementClose = popupElement.querySelector('.popup-element__close');
    popupElementClose.addEventListener('click', function () {
      popupElement.classList.remove('popup-element_opened');
    });
    elementImage.src = evt.target.src;
    elementTitle.textContent = evt.target.nextElementSibling.textContent;
    popupElement.classList.add('popup-element_opened');
  });

  elementsItems.prepend(elementItem);
}

initialCards.forEach(element => {
  addElement (element.name, element.link);
}); 

// Открыть попап "Редактировать профиль"
function popupOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add('popup_opened');
}

// Закрыть попап "Редактировать профиль"
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

// Кнопка закрыть попап "Редактировать профиль"
popupCloseButton.addEventListener('click', popupClose);

// Кнопка сохранить изменения в форме "Редактировать профиль"
formElement.addEventListener('submit', formSubmitHandler);

function addElementOpen() {
  popupAddElement.classList.add('popup_opened');
}

function addElementClose() {
  popupAddElement.classList.remove('popup_opened');
  titleInput.value = '';
  imageInput.value = '';
}

addButton.addEventListener('click', addElementOpen);
popupAddElementClose.addEventListener('click', addElementClose);

function formSubmitAddElement (evt) {
  evt.preventDefault();
  addElement(titleInput.value, imageInput.value);
  addElementClose();
}

formAddElement.addEventListener('submit', formSubmitAddElement);




