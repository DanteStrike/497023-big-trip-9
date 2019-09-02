import AbstractComponent from './abstract.js';
import {eventsData} from '../data/events-data.js';

class TripInfo extends AbstractComponent {
  constructor(eventsList) {
    super();
    this._cities = this._getCities(eventsList);
    this._dates = this._getDates(eventsList);
  }

  // update(eventsList) {
  //   this._cities = this._getCities(eventsList);
  //   this._dates = this._getDates(eventsList);
  //   this._element = createElement(this._getTemplate());
  // }

  _getCities(eventsList) {
    return eventsList.reduce((accum, event) => {
      if (eventsData.destination.cities.has(event.destination)) {
        accum.push(event.destination);
      }

      return accum;
    }, []);
  }

  _getDates(eventsList) {
    return {
      start: (eventsList.length !== 0) ? eventsList[0].time.start : 0,
      end: (eventsList.length !== 0) ? eventsList[eventsList.length - 1].time.end : 0
    };
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
