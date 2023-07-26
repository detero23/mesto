export class Section {
    constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._holder = document.querySelector(selector);
  }

  renderInitial(items) {
    items.forEach((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item) {
    this._renderer(item);
  }

  addItem(item) {
    this._holder.prepend(item);
  }
}
