export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton =  this._popup.querySelector('.popup__close');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventLisenter('keydown', () => {
      _handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventLisenter('keydown', () => {
      _handleEscClose(evt);
    });
  }

  setEventListeners() {
    this._closeButton.addEventLisenter('click', () => {
      this.close();
    });
    this._popup.addEventLisenter('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}