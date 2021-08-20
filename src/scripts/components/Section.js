export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._initialArray.forEach((element) => {
      this._renderer(element);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
