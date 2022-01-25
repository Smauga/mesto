export default class Section{
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Вставка элемента в разметку
  setItem(element, place) {
    if (place === 'append') this._container.append(element);
    if (place === 'prepend') this._container.prepend(element);
  }

  // Отрисовка элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
