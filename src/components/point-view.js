import {TimeValue} from '../utils/enum.js';
import {leadIntoTwoDigitView} from '../utils/utils.js';
import {formatDateTime, formatDateTimeView} from '../utils/time.js';
import {pointViewConfig} from '../configs/configs.js';
import AbstractComponent from './abstract.js';


class PointView extends AbstractComponent {
  constructor({type, destination, time, basePrice, offers}) {
    super();
    this._type = type;
    this._destination = destination;
    this._time = time;
    this._timeDuration = {
      //  Точность до минуты (ТЗ)
      milliseconds: new Date(this._time.end).setSeconds(0, 0) - new Date(this._time.start).setSeconds(0, 0),

      get days() {
        return Math.floor(this.milliseconds / TimeValue.MILLISECONDS_IN_DAY);
      },
      get hours() {
        return Math.floor((this.milliseconds - this.days * TimeValue.MILLISECONDS_IN_DAY) / TimeValue.MILLISECONDS_IN_HOUR);
      },
      get minutes() {
        return Math.floor((this.milliseconds - this.days * TimeValue.MILLISECONDS_IN_DAY - this.hours * TimeValue.MILLISECONDS_IN_HOUR) / TimeValue.MILLISECONDS_IN_MINUTE);
      }};
    this._offers = offers;
    this._basePrice = basePrice;
  }

  _getTimeDurationString() {
    return `${this._timeDuration.days !== 0 ? `${leadIntoTwoDigitView(this._timeDuration.days)}D` : ``}
            ${(this._timeDuration.days !== 0 || this._timeDuration.hours !== 0) ? `${leadIntoTwoDigitView(this._timeDuration.hours)}H` : ``}
            ${leadIntoTwoDigitView(this._timeDuration.minutes)}M`;
  }

  _getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type.title} ${this._destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
              datetime="${formatDateTime(this._time.start)}"
              >${formatDateTimeView(this._time.start)}</time>
            —
            <time class="event__end-time" datetime="${formatDateTime(this._time.end)}">
            ${formatDateTimeView(this._time.end)}</time>
          </p>
          <p class="event__duration">${this._getTimeDurationString()}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${this._basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers.filter((offer) => offer.accepted).slice(0, pointViewConfig.maxOffers).map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          +
          €&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>`).join(``)}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`.trim();
  }
}


export default PointView;
