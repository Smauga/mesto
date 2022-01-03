import { popupElementOpen } from './index.js';

export default class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
  }

  generateCard() {
    this._element = this._getElement();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
  	this._element.querySelector('.element__title').textContent = this._name;

  	return this._element;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  }

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

  _handleDeleteCard() {
    this._element.querySelector('.element__button-delete').closest('.element').remove();
  }

  _handleLikeCard() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }
  
  _handleOpenCard() {
    popupElementOpen(this._link, this._name);
  }
}