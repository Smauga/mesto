import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submit = submitForm;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
   });

  return this._formValues;
  }

  _handleSubmitForm() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  setEventListeners() {
    this._popup.addEventLisenter('submit', this._handleSubmitForm);
    super.setEventListeners();
    
  }

  removeEventListeners() {
    this._popup.removeEventLisenter('submit', this._handleSubmitForm);
    super.removeEventListeners();
  }

  open() {

  }

  close() {

  }
}