import AbstractComponent from './abstract.js';


class TripInfo extends AbstractComponent {
  constructor(cities, dates) {
    super();
    this._cities = cities;
    this._dates = dates;
  }

  _citiesAmount() {
    return new Set(this._cities).size;
  }

  _getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${(this._citiesAmount() !== 0) ? `${this._cities[0]} ${(this._citiesAmount() > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${this._cities[this._cities.length - 1]}` : ``}</h1>

        <p class="trip-info__dates">${new Date(this._dates.start).toDateString()}&nbsp;&mdash;&nbsp;${new Date(this._dates.end).toDateString()}</p>
      </div>`;
  }
}


export default TripInfo;
