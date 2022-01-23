export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleButtonClose(evt) {
    if (evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventLisenter('click', this._handleButtonClose);
    this._popup.addEventLisenter('click', this._handleOverlayClose);
    this._popup.addEventLisenter('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._popup.removeEventLisenter('click', this._handleButtonClose);
    this._popup.removeEventLisenter('click', this._handleOverlayClose);
    this._popup.removeEventLisenter('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners()
  }


}