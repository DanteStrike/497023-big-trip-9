import {Position, FilterType, TagName} from '../utils/enum.js';
import {render, unrender} from '../utils/dom.js';
import Filters from '../components/trip-filters';

class FiltersController {
  constructor(container, onFilterTypeChange) {
    this._container = container;
    this._filters = new Filters();
    this._currentType = FilterType.EVERYTHING;

    this._onFilterTypeChange = onFilterTypeChange;
  }

  init() {
    this.show();
    this._filters.getElement().addEventListener(`click`, (evt) => this._onFiltersClick(evt));
  }

  show() {
    render(this._container, this._filters.getElement(), Position.AFTEREND);
  }

  hide() {
    unrender(this._filters.getElement());
  }

  _onFiltersClick(evt) {
    if (evt.target.tagName !== TagName.INPUT || evt.target.value === this._currentType) {
      return;
    }

    const newType = evt.target.value;
    this._currentType = newType;
    this._onFilterTypeChange(newType);
  }
}


export default FiltersController;
