import {createElement} from '../utils/utils.js';

class Menu {
  constructor(menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  get citiesAmount() {
    return new Set(this._cities).size;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn ${this._menuItems[0].isActive ? `trip-tabs__btn--active` : ``}" href="#">${this._menuItems[0].title}</a>
      <a class="trip-tabs__btn ${this._menuItems[1].isActive ? `trip-tabs__btn--active` : ``}" href="#">${this._menuItems[1].title}</a>
    </nav>`;
  }
}

export default Menu;
