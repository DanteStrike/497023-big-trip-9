import {createElement} from '../utils/utils.js';
import {eventsData} from '../eventsList.js';

class TripInfo {
  constructor(eventsList) {
    this._cities = eventsList.reduce((accum, event) => {
      if (eventsData.destination.cities.has(event.destination)) {
        accum.push(event.destination);
      }

      return accum;
    }, []);

    this._dates = {
      start: eventsList[0].time.start,
      end: eventsList[eventsList.length - 1].time.end
    };

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
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${(this.citiesAmount !== 0) ? `${this._cities[0]} ${(this.citiesAmount > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${this._cities[this._cities.length - 1]}` : ``}</h1>

        <p class="trip-info__dates">${new Date(this._dates.start).toDateString()}&nbsp;&mdash;&nbsp;${new Date(this._dates.end).toDateString()}</p>
      </div>`;
  }
}

export default TripInfo;
