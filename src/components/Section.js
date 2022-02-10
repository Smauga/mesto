export default class Section{
  constructor({ renderer, deleteItem }, containerSelector) {
    this._delete = deleteItem;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Вставка элемента в разметку
  setItem(element, place) {
    if (place === 'append') this._container.append(element);
    if (place === 'prepend') this._container.prepend(element);
  }

  // Отрисовка элементов
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
