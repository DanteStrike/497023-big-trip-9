export const createMenuTemplate = (menuItems) =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${menuItems[0].isActive ? `trip-tabs__btn--active` : ``}" href="#">${menuItems[0].title}</a>
    <a class="trip-tabs__btn ${menuItems[1].isActive ? `trip-tabs__btn--active` : ``}" href="#">${menuItems[1].title}</a>
  </nav>`;
