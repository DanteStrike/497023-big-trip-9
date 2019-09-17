import {formatDateToMonthDay} from '../utils/time.js';
import AbstractComponent from './abstract.js';


class TripInfo extends AbstractComponent {
  constructor() {
    super();
    this._titleElement = this.getElement().querySelector(`.trip-info__title`);
    this._datesElement = this.getElement().querySelector(`.trip-info__dates`);
  }

  update({firstCity, secondCity, lastCity, amount}, {firstDay, lastDay}) {
    //  Вывести информацию согласно ТЗ
    switch (amount) {
      case 0:
        this._titleElement.innerHTML = ``;
        break;
      case 1: case 2:
        this._titleElement.innerHTML = `${firstCity} &mdash; ${lastCity}`;
        break;

      case 3:
        this._titleElement.innerHTML = `${firstCity} &mdash; ${secondCity} &mdash; ${lastCity}`;
        break;

      default:
        this._titleElement.innerHTML = `${firstCity} &mdash; ... &mdash; ${lastCity}`;
        break;
    }
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
