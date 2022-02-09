import './index.css';

// Импрот констант
import { formValidatorData } from "../utils/formValidatorData.js";
import {
  serverAddress,
  userToken,
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
  popupAddForm,
  cardInputId
} from '../utils/constants.js';

// Импорт классов
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';

// Переменные для записи информации из ответа сервера
let userID = '';
let cardsListSection = '';
let deleteCard = '';

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

// Создание экземпляра класса API
const api = new Api({ address: serverAddress, token: userToken });

// Функция создания карточки
function createCard(item) {
  const card = new Card(
    item, 
    "#element-template", 
    () => popupOpenCard.open(item),
    (id) => {
      cardInputId.value = id;
      popupDeleteCard.open();
      deleteCard = card;
    },
    userID);
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание попапа открытия карточки и установка слушателей
const popupOpenCard = new PopupWithImage('.popup_type_open-element');
popupOpenCard.setEventListeners();

// Загрузка данных юзера с сервера
api.getUserData()
  .then(data => {
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    userID = data._id;
  })
  .catch(error => console.log(error));

// Создание класса данных пользователя и получение данных
const userInfo = new UserInfo({nameSelector: nameSelector, jobSelector: jobSelector, avatarSelector: avatarSelector});

// Создание попапа удаления карточки и установка слушателей
const popupDeleteCard = new PopupWithForm('.popup_type_delete-card', (inputValues) => {
  api.deleteCard(inputValues)
  .then(() => {
    deleteCard.deleteCard();
  })
  .catch(error => console.log(error));
});
popupDeleteCard.setEventListeners();

// Создание попапа добавления карточки и установка слушателей
const popupAddCard = new PopupWithForm('.popup_type_add-element', (inputValues) => {
  api.addCard(inputValues)
    .then(card => {
    const newCard = createCard(card);
    cardsListSection.setItem(newCard, 'prepend');
    })
    .catch(error => console.log(error));
});
popupAddCard.setEventListeners();

// Создание попапа изменения аватара и установка слушателей
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
  api.setUserAvatar(inputValues)
    .then(data => {
      userInfo.setUserAvatar(data);
    })
    .catch(error => console.log(error));
});
popupEditAvatar.setEventListeners();

// Создание попапа редактирования профиля и установка слушателей
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  api.setUserData(inputValues)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .catch(error => console.log(error));
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

// Получение и отрисовка карточек с сервера
api.getCards()
  .then(cards => {
    console.log(cards);
    const cardsList = new Section({
      items: cards,
      renderer: (item) => {
        const newCard = createCard(item);
        cardsList.setItem(newCard, 'append');
        },
      },
      '.elements__items'
    )
    cardsListSection = cardsList;
    cardsList.renderItems();
  })
  .catch(error => console.log(error));
