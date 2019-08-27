import AbstractComponent from './abstract.js';

class Menu extends AbstractComponent {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
  }

  _getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn ${this._menuItems[0].isActive ? `trip-tabs__btn--active` : ``}" href="#">${this._menuItems[0].title}</a>
      <a class="trip-tabs__btn ${this._menuItems[1].isActive ? `trip-tabs__btn--active` : ``}" href="#">${this._menuItems[1].title}</a>
    </nav>`;
  }
}


export default Menu;
