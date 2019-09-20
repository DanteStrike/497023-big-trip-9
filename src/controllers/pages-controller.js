import {Position, TagName, Page} from '../utils/enum.js';
import {render} from '../utils/dom.js';
import Menu from '../components/menu';

/** Класс представляет управление переключением страниц*/
class PagesController {
  constructor(menuContainer, filtersController, tripController, statsController, createPointButton) {
    this._menuContainer = menuContainer;

    this._filtersController = filtersController;
    this._tripController = tripController;
    this._statsController = statsController;
    this._createPointButton = createPointButton;
    this._createPointButtonDisabled = this._createPointButton.disabled;

    this._menu = new Menu();
  }

  init() {
    render(this._menuContainer, this._menu.getElement(), Position.AFTEREND);
    this._menu.getElement().addEventListener(`click`, (evt) => this._onMenuClick(evt));
    this._createPointButton.addEventListener(`click`, (evt) => this._onCreateEventButtonClick(evt));

    this._tripController.show();
    this._statsController.hide();
  }

  _onMenuClick(evt) {
    const activeClass = `trip-tabs__btn--active`;

    if (evt.target.tagName !== TagName.A || evt.target.classList.contains(activeClass)) {
      return;
    }

    const clickedButton = evt.target;
    const buttons = evt.currentTarget.children;
    for (const button of buttons) {
      button.classList.remove(activeClass);
    }
    clickedButton.classList.add(activeClass);

    switch (clickedButton.dataset.page) {
      case Page.TABLE:
        this._filtersController.show();
        this._tripController.show();
        this._statsController.hide();
        this._createPointButton.disabled = this._createPointButtonDisabled;
        break;

      case Page.STATS:
        this._filtersController.hide();
        this._tripController.hide();
        this._statsController.show();
        this._createPointButtonDisabled = this._createPointButton.disabled;
        this._createPointButton.disabled = true;
    }
  }

  _onCreateEventButtonClick(evt) {
    this._tripController.createPoint(evt.target);
    this._createPointButton.disabled = true;
  }
}


export default PagesController;
