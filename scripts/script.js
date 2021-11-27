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
const nameInput = popupEditForm.querySelector('.popup__input_info_name');
const jobInput = popupEditForm.querySelector('.popup__input_info_status');

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector('.popup_type_add-element');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const titleInput = popupAddForm.querySelector('.popup__input_info_title');
const imageInput = popupAddForm.querySelector('.popup__input_info_image');

// Константы в секции "Открыть элемент"
const popupElement = document.querySelector('.popup-element');
const popupElementImage = popupElement.querySelector('.popup-element__image');
const popupElementTitle = popupElement.querySelector('.popup-element__title');
const popupElementCloseButton = popupElement.querySelector('.popup-element__close');

// Константы в секции "Элементы"
const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template').content;
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

// Открыть поп-ап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрыть поп-ап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открыть попап "Редактировать профиль"
function popupEditOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEdit);
}

// Обработчик событий - Кнопка изменить профиль
editButton.addEventListener('click', popupEditOpen);

// Обработчик событий - Кнопка закрыть попап "Редактировать профиль"
popupEditCloseButton.addEventListener('click', function (){
  closePopup(popupEdit);
});

// Изменить имя и работу в профиле
function formEditSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик событий - Кнопка сохранить изменения в форме "Редактировать профиль"
popupEditForm.addEventListener('submit', formEditSubmit);

// Обработчик событий - Кнопка открыть попап "Добавить элемент"
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

// Обработчик событий - Кнопка закрыть попап "Добавить элемент"
popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAdd);
});

// Открыть элемент
function popupOpen(evt) {
  popupElementImage.src = evt.target.src;
  popupElementTitle.textContent = evt.target.nextElementSibling.textContent;
  popupElementImage.alt = popupElementTitle.textContent.trim() ;
  popupElement.classList.add('popup-element_opened');

   // Обработчик событий - закрыть элемент
   popupElementCloseButton.addEventListener('click', function () {
    popupElement.classList.remove('popup-element_opened');
  });
}

// Добавить элемент
function addElement (nameValue, imageSource) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  elementItem.querySelector('.element__title').textContent = nameValue;

  // Проверка на корректность ссылки изображения
  if(imageSource.includes('https://')) {
    elementItem.querySelector('.element__image').src = imageSource;
    elementItem.querySelector('.element__image').alt = nameValue;
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
  closePopup(popupAdd);
  titleInput.value = '';
  imageInput.value = '';
}

// Обработчик событий - Кнопка сохранить изменения в форме "Добавить элемент"
popupAddForm.addEventListener('submit', formAddSubmit);

// Добавление элементов из массива
initialCards.forEach(element => {
  addElement (element.name, element.link);
}); 