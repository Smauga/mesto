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
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupEditForm = popupEdit.querySelector(".popup__form");
const nameInput = popupEditForm.querySelector(".popup__input_info_name");
const jobInput = popupEditForm.querySelector(".popup__input_info_status");
const popupEditSubmitButton = popupEditForm.querySelector(".popup__save");
const popupEditErrorList = popupEdit.querySelectorAll(".popup__error");
const popupEditInputList = popupEdit.querySelectorAll(".popup__input");

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector(".popup_type_add-element");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
const popupAddForm = popupAdd.querySelector(".popup__form");
const titleInput = popupAddForm.querySelector(".popup__input_info_title");
const imageInput = popupAddForm.querySelector(".popup__input_info_image");
const popupAddErrorList = popupAdd.querySelectorAll(".popup__error");
const popupAddInputList = popupAdd.querySelectorAll(".popup__input");

// Константы в секции "Открыть элемент"
const popupElement = document.querySelector(".popup_type_open-element");
const popupElementImage = popupElement.querySelector(".popup__image");
const popupElementTitle = popupElement.querySelector(".popup__image-name");
const popupElementCloseButton = popupElement.querySelector(".popup__close");

// Константы в секции "Элементы"
const elementsItems = document.querySelector(".elements__items");
const elementTemplate = document.querySelector("#element-template").content;

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

// Удаление ошибок валидации при закрытии попапа без сохранения
function clearInputError(popupErrorList, popupInputList) {
  popupErrorList.forEach((popupErrorElement) => {
    popupErrorElement.textContent = "";
  });
  popupInputList.forEach((popupInputElement) => {
    popupInputElement.classList.remove("popup__input_type_error");
  });
}

// Открыть попап "Редактировать профиль"
function popupEditOpen() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  // Активация кнопки сохранить
  popupEditSubmitButton.classList.remove("popup__save_disabled");
  popupEditSubmitButton.removeAttribute("disabled");

  clearInputError(popupEditErrorList, popupEditInputList);
  openPopup(popupEdit);
}

// Обработчик событий - Кнопка изменить профиль
editButton.addEventListener("click", popupEditOpen);

// Обработчик событий - Кнопка закрыть попап "Редактировать профиль"
popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEdit);
});

// Изменить имя и работу в профиле
function formEditSubmit() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик событий - Кнопка сохранить изменения в форме "Редактировать профиль"
popupEditForm.addEventListener("submit", formEditSubmit);

// Обработчик событий - Кнопка открыть попап "Добавить элемент"
addButton.addEventListener("click", function () {
  popupAddForm.reset();
  clearInputError(popupAddErrorList, popupAddInputList);
  openPopup(popupAdd);
});

// Обработчик событий - Кнопка закрыть попап "Добавить элемент"
popupAddCloseButton.addEventListener("click", function () {
  closePopup(popupAdd);
});

// Открыть элемент
export function popupElementOpen(image, title) {
  popupElementImage.src = image;
  popupElementImage.alt = title;
  popupElementTitle.textContent = title;
  openPopup(popupElement);
}

// Обработчик событий - закрыть элемент
popupElementCloseButton.addEventListener("click", function () {
  closePopup(popupElement);
});

// Обработчик событий - Кнопка сохранить изменения в форме "Добавить элемент"
popupAddForm.addEventListener("submit", () => {
  // Создание карточки с введеной информацией
  const item = {
    name: titleInput.value,
    link: imageInput.value,
  };
  const card = new Card(item, "#element-template");
  const cardElement = card.generateCard();
  elementsItems.prepend(cardElement);
  closePopup(popupAdd);
});

// Создание карточек с информацией из cards
initialCards.forEach((item) => {
  const card = new Card(item, "#element-template");
  const cardElement = card.generateCard();
  elementsItems.append(cardElement);
});

// Включение валидации формы на попапе создания карточки
const addFormValidation = new FormValidator(formValidatorData, popupAddForm);
addFormValidation.enableValidation();

// Включение валидации формы на попапе редактирования профиля
const editFormValidation = new FormValidator(formValidatorData, popupEditForm);
editFormValidation.enableValidation();
