import {eventsData} from '../eventsList.js';
import AbstractComponent from './abstract.js';


class TripInfo extends AbstractComponent {
  constructor(eventsList) {
    super();
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
  }

  get _citiesAmount() {
    return new Set(this._cities).size;
  }

  _getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${(this._citiesAmount !== 0) ? `${this._cities[0]} ${(this._citiesAmount > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${this._cities[this._cities.length - 1]}` : ``}</h1>

        <p class="trip-info__dates">${new Date(this._dates.start).toDateString()}&nbsp;&mdash;&nbsp;${new Date(this._dates.end).toDateString()}</p>
      </div>`;
  }
}


export default TripInfo;
