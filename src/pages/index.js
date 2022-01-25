import './index.css';

// Импрот констант
import { initialCards } from "../utils/initialCards.js";
import { formValidatorData } from "../utils/formValidatorData.js";
import {
  editButton,
  addButton,
  nameProfile,
  jobProfile,
  popupEditForm,
  nameInput,
  jobInput,
  popupAddForm
} from '../utils/constants.js';

// Импорт классов
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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
enableValidation(formValidatorData);

// Функция создания карточки
function createCard(item, place) {
  const card = new Card(item, "#element-template", () => popupOpenCard.open(item));
  const cardElement = card.generateCard();
  cardsList.setItem(cardElement, place);
}

// Создание попапа открытия карточки и установка слушателей
const popupOpenCard = new PopupWithImage('.popup_type_open-element');
popupOpenCard.setEventListeners();

// Создание и рендер секции с карточками
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item, 'append');
    },
  },
  '.elements__items'
);
cardsList.renderItems();

// Создание класса данных пользователя и получение данных
const userInfo = new UserInfo({name: nameProfile, job: jobProfile});
const userInfoValues = userInfo.getUserInfo();

// Создание попапа добавления карточки и установка слушателей
const popupAddCard = new PopupWithForm('.popup_type_add-element', (inputValues) => {
  createCard(inputValues, 'prepend');
});
popupAddCard.setEventListeners();

// Создание попапа редактирования профиля и установка слушателей
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
popupEditProfile.setEventListeners();

// Добавление слушателя на кнопку добавления карточки
addButton.addEventListener('click', () => {
  formValidators[popupAddForm.getAttribute('name')].resetValidation();
  popupAddCard.open()
});

// Добавление слушателя на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = userInfoValues.name.textContent;
  jobInput.value = userInfoValues.job.textContent;
  formValidators[popupEditForm.getAttribute('name')].resetValidation();
  popupEditProfile.open();
});