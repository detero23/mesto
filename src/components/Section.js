export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._holder = document.querySelector(selector);
    this._items = {};
  }

  renderInitial(items) {
    items.forEach((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item) {
    this._renderer(item);
  }

  addItem(item, cardID) {
    this._holder.prepend(item);
    this._items[cardID] = item;
  }

  getItems() {
    return this._items;
  }

  deleteItem(itemID) {
    this._items[itemID].remove();
    delete this._items[itemID];
  }
}
