export default class Card {
  // Конструктор
  constructor(data, selector, handleCardClick) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  // Функция генерации карточки
  generateCard() {
    this._element = this._getElement();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
  	this._element.querySelector('.element__title').textContent = this._name;

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
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
			this._handleDeleteCard();
		});

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
			this._handleLikeCard();
		});

    this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handleOpenCard();
		});
  }

  // Удаление элемента нажатием на корзину
  _handleDeleteCard() {
    this._element.querySelector('.element__button-delete').closest('.element').remove();
  }

  // Удаление/установка лайка
  _handleLikeCard() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }
  
  // Открыть попап элемента
  _handleOpenCard() {
    this._handleCardClick(this._link, this._name);
  }
}