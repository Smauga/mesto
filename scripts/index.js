import { initialCards } from "../utils/cards.js";
import { formValidatorData } from "../utils/formValidatorData.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const content = document.querySelector(".content");

// Константы в секции "Профиль"
const editButton = content.querySelector(".profile__button-edit");
const addButton = content.querySelector(".profile__button-add");
const nameProfile = content.querySelector(".profile__name");
const jobProfile = content.querySelector(".profile__status");

// Константы в секции "Редактировать профиль"
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEdit.querySelector(".popup__form");
const nameInput = popupEditForm.querySelector(".popup__input_info_name");
const jobInput = popupEditForm.querySelector(".popup__input_info_status");

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector(".popup_type_add-element");
const popupAddForm = popupAdd.querySelector(".popup__form");
const titleInput = popupAddForm.querySelector(".popup__input_info_title");
const imageInput = popupAddForm.querySelector(".popup__input_info_image");

// Константы в секции "Открыть элемент"
const popupElement = document.querySelector(".popup_type_open-element");
const popupElementImage = popupElement.querySelector(".popup__image");
const popupElementTitle = popupElement.querySelector(".popup__image-name");

// Константы в секции "Элементы"
const elementsItems = document.querySelector(".elements__items");

// Все поп-апы на странице
const popupList = document.querySelectorAll(".popup");

// Массив для валидаторов форм
const formValidators = {};

// Универсальная функция включения валидации на всех формах
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
}

// Включить валидацию
enableValidation(formValidatorData);

// Закрыть попап при нажатии на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

// Закрыть попап при нажатии Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Открыть поп-ап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
}

// Закрыть поп-ап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", closePopupEsc);
}

// Обработчик событий - Кнопка изменить профиль
editButton.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  formValidators['edit-profile'].resetValidation();
  openPopup(popupEdit);
});

// Изменить имя и работу в профиле
function submitEditForm() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик событий - Кнопка сохранить изменения в форме "Редактировать профиль"
popupEditForm.addEventListener("submit", submitEditForm);

// Обработчик событий - Кнопка открыть попап "Добавить элемент"
addButton.addEventListener("click", function () {
  popupAddForm.reset();
  formValidators['add-element'].resetValidation();
  openPopup(popupAdd);
});

// Открыть элемент
function handleCardClick(image, title) {
  popupElementImage.src = image;
  popupElementImage.alt = title;
  popupElementTitle.textContent = title;
  openPopup(popupElement);
}

// Слушатели для закрытия поп-апов на крестик и нажатием по оверлею
popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popupElement)
    }
  });
});

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Обработчик событий - Кнопка сохранить изменения в форме "Добавить элемент"
popupAddForm.addEventListener("submit", () => {
  // Создание карточки с введеной информацией
  const item = {
    name: titleInput.value,
    link: imageInput.value,
  };
  const cardElement = createCard(item);
  elementsItems.prepend(cardElement);
  closePopup(popupAdd);
});

// Создание карточек с информацией из cards
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elementsItems.append(cardElement);
});
