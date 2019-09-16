import {formatDateTime, formatDateToMonthDay} from '../utils/time.js';
import AbstractComponent from './abstract.js';


class TripDay extends AbstractComponent {
  constructor(dayIndex, date) {
    super();
    this._dayIndex = dayIndex;
    this._date = date;
  }

  _getTemplate() {
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${(this._dayIndex) ? this._dayIndex : ``}</span>
                <time class="day__date" datetime="${(this._date) ? formatDateTime(this._date) : ``}">
                ${(this._date) ? formatDateToMonthDay(this._date) : ``}</time>
              </div>

              <ul class="trip-events__list"></ul>
            </li>`;
  }
}


export default TripDay;
