const content = document.querySelector('.content');

// Константы в секции "Профиль"
const editButton = content.querySelector('.profile__button-edit');
const addButton = content.querySelector('.profile__button-add');
const nameProfile = content.querySelector('.profile__name');
const jobProfile = content.querySelector('.profile__status');

// Константы в секции "Редактировать профиль"
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupEditForm = popupEdit.querySelector('.popup__form');

// Переменные в секции "Редактировать профиль"
let nameInput = popupEditForm.querySelector('.popup__input_info_name');
let jobInput = popupEditForm.querySelector('.popup__input_info_status');

// Открыть попап "Редактировать профиль"
function popupEditOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popupEdit.classList.add('popup_opened');
}

// Обработчик событий - Кнопка изменить профиль
editButton.addEventListener('click', popupEditOpen);

// Закрыть попап "Редактировать профиль"
function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
} 

// Обработчик событий - Кнопка закрыть попап "Редактировать профиль"
popupEditCloseButton.addEventListener('click', popupEditClose);

// Изменить имя и работу в профиле
function formEditSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupEditClose();
}

// Обработчик событий - Кнопка сохранить изменения в форме "Редактировать профиль"
popupEditForm.addEventListener('submit', formEditSubmit);

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector('.popup_type_add-element');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddForm = popupAdd.querySelector('.popup__form');

// Переменные в секции "Добавить элемент"
let titleInput = popupAddForm.querySelector('.popup__input_info_title');
let imageInput = popupAddForm.querySelector('.popup__input_info_image');

// Открыть попап "Добавить элемент"
function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
}

// Обработчик событий - Кнопка открыть попап "Добавить элемент"
addButton.addEventListener('click', popupAddOpen);

// Закрыть попап "Добавить элемент"
function popupAddClose() {
  popupAdd.classList.remove('popup_opened');
  titleInput.value = '';
  imageInput.value = '';
}

// Обработчик событий - Кнопка закрыть попап "Добавить элемент"
popupAddCloseButton.addEventListener('click', popupAddClose);

// Открыть элемент
function popupOpen(evt) {
  const popupElement = document.querySelector('.popup-element');
  const popupElementImage = popupElement.querySelector('.popup-element__image');
  const popupElementTitle = popupElement.querySelector('.popup-element__title');
  const popupElementCloseButton = popupElement.querySelector('.popup-element__close');

  // Обработчик событий - закрыть элемент
  popupElementCloseButton.addEventListener('click', function () {
    popupElement.classList.remove('popup-element_opened');
  });

  popupElementImage.src = evt.target.src;
  popupElementTitle.textContent = evt.target.nextElementSibling.textContent;
  popupElement.classList.add('popup-element_opened');
}

// Добавить элемент
function addElement (nameValue, imageSource) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  elementItem.querySelector('.element__title').textContent = nameValue;

  // Проверка на корректность ссылки изображения
  if(imageSource.includes('https://')) {
    elementItem.querySelector('.element__image').src = imageSource;
  }
  else {
    elementItem.querySelector('.element__image').src = 'images/element-no-image.jpg';
  }

  // Обработчик событий - Лайк
  elementItem.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  
  // Обработчик событий - Удаление элемента
  elementItem.querySelector('.element__button-delete').addEventListener('click', function (evt) {  
    evt.target.parentElement.parentElement.remove();
  });
  
   // Обработчик событий - Открыть элемент
  elementItem.querySelector('.element__image').addEventListener('click', popupOpen);

  // Добавить элемент на страницу
  elementsItems.prepend(elementItem);
}

// Форма добавления элемента
function formAddSubmit (evt) {
  evt.preventDefault();
  addElement(titleInput.value, imageInput.value);
  popupAddClose();
}

// Обработчик событий - Кнопка сохранить изменения в форме "Добавить элемент"
popupAddForm.addEventListener('submit', formAddSubmit);

// Константы в секции "Элементы"
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

// Добавление элементов из массива
initialCards.forEach(element => {
  addElement (element.name, element.link);
}); 