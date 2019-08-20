import * as utils from '../utils.js';

class Menu {
  constructor(menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  get citysAmount() {
    return new Set(this.citys).size;
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${this._menuItems[0]}</a>
        <a class="trip-tabs__btn" href="#">${this._menuItems[1]}</a>
      </nav>`;
  }
}

export default Menu;
