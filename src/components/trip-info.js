import {formatDateToMonthDay} from '../utils/time.js';
import AbstractComponent from './abstract.js';


class TripInfo extends AbstractComponent {
  constructor() {
    super();
    this._titleElement = this.getElement().querySelector(`.trip-info__title`);
    this._datesElement = this.getElement().querySelector(`.trip-info__dates`);
  }

  update({firstCity, lastCity, amount}, {firstDay, lastDay}) {
    this._titleElement.innerHTML = `${(amount !== 0) ? `${firstCity} ${(amount > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${lastCity}` : ``}`;
    this._datesElement.innerHTML = `${formatDateToMonthDay(firstDay)}&nbsp;&mdash;&nbsp;${formatDateToMonthDay(lastDay)}`;
  }

  _getTemplate() {
    return `<div class="trip-info__main">
        <h1 class="trip-info__title"></h1>

        <p class="trip-info__dates"></p>
      </div>`;
  }
}


export default TripInfo;
