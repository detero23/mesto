export class Section {
    constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._holder = document.querySelector(selector);
    // this._items = [];
  }

  renderInitial(items,userID) {
    items.forEach((item) => {
      this.renderItem(item,userID);
    });
  }

  renderItem(item,userID) {
    this._renderer(item,userID);
    // this._items.push(item);
  }

  addItem(item) {
    this._holder.prepend(item);
  }

  getItems(){
    return this._items;
  }
}
