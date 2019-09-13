import {Position} from '../utils/enum.js';
import {render} from '../utils/dom.js';
import Menu from '../components/menu';


class PagesController {
  constructor(menuContainer, filtersController, tripController, statsController, createEventButton) {
    this._menuContainer = menuContainer;

    this._filtersController = filtersController;
    this._tripController = tripController;
    this._statsController = statsController;

    this._createEventButton = createEventButton;

    this._menu = new Menu();
  }

  init() {
    render(this._menuContainer, this._menu.getElement(), Position.AFTEREND);
    this._menu.getElement().addEventListener(`click`, (evt) => this._onMenuClick(evt));
    this._createEventButton.addEventListener(`click`, (evt) => this._onCreateEventButtonClick(evt));

    this._tripController.show();
    this._statsController.hide();
  }

  _onMenuClick(evt) {
    const activeClass = `trip-tabs__btn--active`;

    if (evt.target.tagName !== `A` || evt.target.classList.contains(activeClass)) {
      return;
    }

    const clickedButton = evt.target;
    const buttons = evt.currentTarget.children;

    for (const button of buttons) {
      button.classList.remove(activeClass);
    }
    clickedButton.classList.add(activeClass);

    switch (clickedButton.dataset.page) {
      case `table`:
        this._filtersController.show();
        this._tripController.show();
        this._statsController.hide();
        this._createEventButton.disabled = false;
        break;

      case `stats`:
        this._filtersController.hide();
        this._tripController.hide();
        this._statsController.show();
        this._createEventButton.disabled = true;
    }
  }

  _onCreateEventButtonClick(evt) {
    this._tripController.createEvent(evt.target);
    this._createEventButton.disabled = true;
  }
}


export default PagesController;
