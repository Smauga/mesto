export default class Card {
  // Конструктор
  constructor(data, selector, handleCardClick, handleCardDelete, userID) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._id = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._userID = userID;
  }

  // Функция генерации карточки
  generateCard() {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector('.element__image');
    this._cardName = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._deleteButton = this._element.querySelector('.element__button-delete');
    
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  	this._cardName.textContent = this._name;

  	return this._element;
  }

  // Получение разметки элемента
  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  }

  // Установка слушателей
  _setEventListeners() {

    if(this._id === this._userID) {
      this._deleteButton.classList.add('element__button-delete_active');
      this._deleteButton.addEventListener('click', () => {
        this._handleCardDelete(this._userID);
      });
    }

    this._likeButton.addEventListener('click', () => {
			this._handleLikeCard();
		});

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this);
		});
  }

  // Удаление/установка лайка
  _handleLikeCard() {
    this._likeButton.classList.toggle('element__button-like_active');
  }
}