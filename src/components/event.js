import {TimeValue} from '../utils/utils.js';
import {eventsData} from '../eventsList.js';
import {eventsData} from '../data.js';
import AbstractComponent from './abstract.js';


class Event extends AbstractComponent {
  constructor({type, destination, time, price, offers}) {
    super();
    this._type = type;
    this._destination = destination;
    this._time = time;
    this._timeDuration = {
      milliseconds: this._time.end - this._time.start,

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
    this._price = price;
    this._isTransportType = eventsData.types.transport.has(this._type);
  }

  _getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type} ${this._isTransportType ? `to` : `into`} ${this._destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
              datetime="${new Date(this._time.start).getFullYear()}-${new Date(this._time.start).getMonth()}-${new Date(this._time.start).getDate()}T${new Date(this._time.start).getHours()}:${new Date(this._time.start).getMinutes()}"
              >${new Date(this._time.start).getHours()}:${new Date(this._time.start).getMinutes()}</time>
            —
            <time class="event__end-time" datetime="${new Date(this._time.end).getFullYear()}-${new Date(this._time.end).getMonth()}-${new Date(this._time.end).getDate()}T${new Date(this._time.end).getHours()}:${new Date(this._time.end).getMinutes()}">
            ${new Date(this._time.end).getHours()}:${new Date(this._time.end).getMinutes()}</time>
          </p>
          <p class="event__duration">
            ${this._timeDuration.days !== 0 ? `${this._timeDuration.days}D` : ``} ${this._timeDuration.hours !== 0 ? `${this._timeDuration.hours}H` : ``} ${this._timeDuration.minutes !== 0 ? `${this._timeDuration.minutes}M` : ``}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers.map((offer) => `<li class="event__offer" ${offer.isActive ? `` : `style="color: gray;"`}>
          <span class="event__offer-title" ${offer.isActive ? `` : `style="color: gray;"`}>${offer.description}</span>
          +
          €&nbsp;<span class="event__offer-price" ${offer.isActive ? `` : `style="color: gray;"`}>${offer.price}</span>
          </li>`).join(``)}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`.trim();
  }
}


export default Event;
