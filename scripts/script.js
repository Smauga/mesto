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
const popupEditSubmitButton = popupEditForm.querySelector('.popup__save'); 

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector('.popup_type_add-element');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const titleInput = popupAddForm.querySelector('.popup__input_info_title');
const imageInput = popupAddForm.querySelector('.popup__input_info_image');

// Константы в секции "Открыть элемент"
const popupElement = document.querySelector('.popup_type_open-element');
const popupElementImage = popupElement.querySelector('.popup__image');
const popupElementTitle = popupElement.querySelector('.popup__image-name');
const popupElementCloseButton = popupElement.querySelector('.popup__close');

// Константы в секции "Элементы"
const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element-template').content;

// Закрыть попап при нажатии на оверлей
function closePopupOverlay (evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Закрыть попап при нажатии Esc
function closePopupEsc (evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
    }
}

// Открыть поп-ап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
}

// Закрыть поп-ап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

// Удаление ошибок валидации при закрытии попапа без сохранения
function clearInputError (popup) {
  popup.querySelectorAll('.popup__error').forEach((popupErrorElement) => {
    popupErrorElement.textContent = '';
  });
  popup.querySelectorAll('.popup__input').forEach((popupInputElement) => {
    popupInputElement.classList.remove('popup__input_type_error');
  });
}

// Открыть попап "Редактировать профиль"
function popupEditOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  // Активация кнопки сохранить
  popupEditSubmitButton.classList.remove('popup__save_disabled');
  popupEditSubmitButton.removeAttribute('disabled');

  clearInputError(popupEdit);
  openPopup(popupEdit);
}

// Обработчик событий - Кнопка изменить профиль
editButton.addEventListener('click', popupEditOpen);

// Обработчик событий - Кнопка закрыть попап "Редактировать профиль"
popupEditCloseButton.addEventListener('click', function (){
  closePopup(popupEdit);
});

// Изменить имя и работу в профиле
function formEditSubmit () {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик событий - Кнопка сохранить изменения в форме "Редактировать профиль"
popupEditForm.addEventListener('submit', formEditSubmit);

// Обработчик событий - Кнопка открыть попап "Добавить элемент"
addButton.addEventListener('click', function () {
  popupAddForm.reset();
  clearInputError(popupAdd);
  openPopup(popupAdd);
});

// Обработчик событий - Кнопка закрыть попап "Добавить элемент"
popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAdd);
});

// Открыть элемент
function popupElementOpen(image, title) {
  popupElementImage.src = image.src;
  popupElementImage.alt = title.textContent.trim();
  popupElementTitle.textContent = title.textContent;
  openPopup(popupElement);
}

// Добавить элемент
function createElement (nameValue, imageSource) {
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
  const elementItemImage = elementItem.querySelector('.element__image');
  const elementItemTitle = elementItem.querySelector('.element__title');

  elementItemTitle.textContent = nameValue;
  elementItemImage.src = imageSource;
  elementItemImage.alt = nameValue;

  // Обработчик событий - Лайк
  elementItem.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  
  // Обработчик событий - Удаление элемента
  elementItem.querySelector('.element__button-delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  
   // Обработчик событий - Открыть элемент
   elementItemImage.addEventListener('click', () => popupElementOpen(elementItemImage, elementItemTitle));

  return elementItem;
}

// Обработчик событий - закрыть элемент
popupElementCloseButton.addEventListener('click', function () {
  closePopup(popupElement);
});

// Обработчик событий - Кнопка сохранить изменения в форме "Добавить элемент"
popupAddForm.addEventListener('submit', function (evt) {
  elementsItems.prepend(createElement(titleInput.value, imageInput.value));
  closePopup(popupAdd);
});

// Добавление элементов из массива
initialCards.forEach(element => {
  elementsItems.append(createElement(element.name, element.link));
}); 