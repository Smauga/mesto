import './index.css';

// Импрот констант
import { initialCards } from "../utils/initialCards.js";
import { formValidatorData } from "../utils/formValidatorData.js";
import {
  editButton,
  addButton,
  avatarButton,
  nameSelector,
  jobSelector,
  avatarSelector,
  popupEditForm,
  popupEditAvatarForm,
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
function createCard(item) {
  const card = new Card(item, "#element-template", () => popupOpenCard.open(item));
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание попапа открытия карточки и установка слушателей
const popupOpenCard = new PopupWithImage('.popup_type_open-element');
popupOpenCard.setEventListeners();

// Загрузка данных юзера с сервера
fetch('https://nomoreparties.co/v1/cohort-35/users/me', {
  headers: {
    authorization: '96c866eb-92a9-4140-92ff-b1afa5e1671b'
  }
})
  .then(res => res.json())
  .then((result) => {
    userInfo.setUserInfo(result);
    userInfo.setUserAvatar(result);
  }); 

// Создание и рендер секции карточек с сервера
fetch('https://mesto.nomoreparties.co/v1/cohort-35/cards', {
  headers: {
    authorization: '96c866eb-92a9-4140-92ff-b1afa5e1671b'
  }
})
  .then(res => res.json())
  .then((result) => {
    const cardsList = new Section({
      items: result,
      renderer: (item) => {
        const newCard = createCard(item);
        cardsList.setItem(newCard, 'append');
        },
      },
      '.elements__items'
    );
    cardsList.renderItems();
  }); 

// Создание класса данных пользователя и получение данных
const userInfo = new UserInfo({nameSelector: nameSelector, jobSelector: jobSelector, avatarSelector: avatarSelector});

// Создание попапа добавления карточки и установка слушателей
const popupAddCard = new PopupWithForm('.popup_type_add-element', (inputValues) => {
  const newCard = createCard(inputValues);
  cardsList.setItem(newCard, 'prepend');
});
popupAddCard.setEventListeners();

// Создание попапа изменения аватара и установка слушателей
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
  userInfo.setUserAvatar(inputValues);
  fetch('https://mesto.nomoreparties.co/v1/cohort-35/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: '96c866eb-92a9-4140-92ff-b1afa5e1671b',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: userInfo.getUserAvatar()
    })
  });
});
popupEditAvatar.setEventListeners();

// Создание попапа редактирования профиля и установка слушателей
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  userInfo.setUserInfo(inputValues);
  fetch('https://mesto.nomoreparties.co/v1/cohort-35/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '96c866eb-92a9-4140-92ff-b1afa5e1671b',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userInfo.getUserInfo().name,
      about: userInfo.getUserInfo().job
    })
  });
});
popupEditProfile.setEventListeners();

// Добавление слушателя на кнопку добавления карточки
addButton.addEventListener('click', () => {
  formValidators[popupAddForm.getAttribute('name')].resetValidation();
  popupAddCard.open();
});

// Добавление слушателя на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  formValidators[popupEditForm.getAttribute('name')].resetValidation();
  popupEditProfile.open();
});
 
// Добавление слушателя на кнопку изменения аватара
avatarButton.addEventListener('click', () => {
  formValidators[popupEditAvatarForm.getAttribute('name')].resetValidation();
  popupEditAvatar.open();
});


  
// Токен: 96c866eb-92a9-4140-92ff-b1afa5e1671b
// Идентификатор группы: cohort-35