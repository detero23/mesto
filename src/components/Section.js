export class Section {
  constructor({ items, renderer }, selector) {
    this._initials = items;
    this._renderer = renderer;

    this._holder = document.querySelector(selector);
  }

  renderInitial() {
    this._initials.forEach((initial) => {
      this.renderItem(initial);
    });
  }

  renderItem(item) {
    this._renderer(item);
  }

  addItem(item) {
    this._holder.prepend(item);
  }
}
