import {createElement} from '../utils/utils.js';

class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
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
    return `<form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._filters[0].title.toLowerCase()}" ${this._filters[0].isActive ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-everything">${this._filters[0].title}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._filters[1].title.toLowerCase()}" ${this._filters[1].isActive ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-future">${this._filters[1].title}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._filters[2].title.toLowerCase()}" ${this._filters[2].isActive ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-past">${this._filters[2].title}</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
  }
}

export default Filters;
