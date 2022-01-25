import Popup from "./Popup.js";

const cardImage = document.querySelector('.popup__image');
const cardName = document.querySelector('.popup__image-name');

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = cardImage;
    this._name = cardName;
  }
  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}