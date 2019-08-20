import * as utils from '../utils.js';
import {eventConfig} from '../configs.js';

class TripInfo {
  constructor(eventsList) {
    this._citys = eventsList.reduce((accum, event) => {
      if (eventConfig.destination.citys.has(event.destination)) {
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

  get citysAmount() {
    return new Set(this.citys).size;
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title">${this._citys[0]} ${(this.citysAmount > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${this._citys[this._citys.length - 1]}</h1>

        <p class="trip-info__dates">${new Date(this._dates.start).toDateString()}&nbsp;&mdash;&nbsp;${new Date(this._dates.end).toDateString()}</p>
      </div>`;
  }
}

export default TripInfo;
