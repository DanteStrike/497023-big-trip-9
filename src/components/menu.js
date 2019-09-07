import AbstractComponent from './abstract.js';


class Menu extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-page="table">Table</a>
      <a class="trip-tabs__btn" href="#" data-page="stats">Stats</a>
    </nav>`;
  }
}


export default Menu;
