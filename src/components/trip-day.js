import AbstractComponent from './abstract.js';
import {formatDateTime, formatDateToMonthDay} from '../utils/utils.js';


class TripDay extends AbstractComponent {
  constructor(dayIndex, date) {
    super();
    this._dayIndex = dayIndex;
    this._date = date;
  }

  getEventsListElement() {
    return this.getElement().querySelector(`.trip-events__list`);
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


// export const createTripDayTemplate = (counter, date) =>
//   `<li class="trip-days__item  day">
//     <div class="day__info">
//       <span class="day__counter">${(counter) ? counter : ``}</span>
//       <time class="day__date" datetime="${(date) ? `${new Date(date).getFullYear()}-${new Date(date).getMonth()}-${new Date(date).getDate()}T${new Date(date).getHours()}:${new Date(date).getMinutes()}` : ``}">
//       ${(date) ? new Date(date).toDateString() : ``}</time>
//     </div>

//     <ul class="trip-events__list"></ul>
//   </li>`;


export default TripDay;
