import {render, Position} from '../utils/utils';
import Menu from '../components/menu';


class PagesController {
  constructor(menuContainer, tripController, statsController, createEventButton) {
    this._menuContainer = menuContainer;

    this._tripController = tripController;
    this._statsController = statsController;

    this._createEventButton = createEventButton;

    this._menu = new Menu();
    this._onMenuClick = this._onMenuClick.bind(this);
  }

  init() {
    render(this._menuContainer, this._menu.getElement(), Position.AFTEREND);
    this._menu.getElement().addEventListener(`click`, this._onMenuClick);

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
        this._tripController.show();
        this._statsController.hide();
        this._createEventButton.disabled = false;
        break;

      case `stats`:
        this._tripController.hide();
        this._statsController.show();
        this._createEventButton.disabled = true;
    }
  }
}


export default PagesController;
