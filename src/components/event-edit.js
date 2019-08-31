import {eventsData} from '../data.js';
import AbstractComponent from './abstract.js';
import {capitalizeFirstLetter, createElement} from '../utils/utils.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';


class EventEdit extends AbstractComponent {
  constructor({type, description, destination, time, price, offers, isFavorite, photos}) {
    super();
    this._type = type;
    this._destination = destination;
    this._description = description;
    this._time = time;
    this._offers = offers;
    this._price = price;
    this._photos = photos;
    this._isFavorite = isFavorite;

    this._initFlatpickr();
    this._hangHandlers();
  }

  _isTransportType() {
    return eventsData.types.transport.has(this._type);
  }

  _initFlatpickr() {
    flatpickr(this.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      altFormat: `d/m/Y H:i`,
      dateFormat: `Y-m-d H:i:S`,
      enableTime: true,
      defaultDate: this._time.start ? this._time.start : Date.now()
    });

    flatpickr(this.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      altFormat: `d/m/Y H:i`,
      dateFormat: `Y-m-d H:i:S`,
      enableTime: true,
      defaultDate: this._time.end ? this._time.end : Date.now()
    });

    this.getElement().querySelectorAll(`.event__input--time`).forEach((node) => {
      node.style.width = `140px`;
    });
  }

  _hangHandlers() {
    this.getElement().querySelector(`.event__type-list`)
      .addEventListener(`click`, (evt) => this._onEventTypeListClick(evt));
    this.getElement().querySelector(`input.event__input--destination`)
      .addEventListener(`keydown`, (evt) => this._onInputDestinationKeysDown(evt));
  }

  _onEventTypeListClick(evt) {
    const target = evt.target;

    if (target.tagName !== `INPUT`) {
      return;
    }

    this._type = target.value;

    const eventIconImg = this.getElement().querySelector(`img.event__type-icon`);
    eventIconImg.src = `${eventIconImg.baseURI}img/icons/${this._type.toLowerCase()}.png`;

    const eventTypeOutput = this.getElement().querySelector(`label.event__type-output`);
    eventTypeOutput.textContent = `${capitalizeFirstLetter(this._type)} ${this._isTransportType() ? `to` : `into`}`;

    const eventInputDestination = this.getElement().querySelector(`input.event__input--destination`);
    eventInputDestination.value = ``;

    const oldDatalist = this.getElement().querySelector(`datalist#destination-list-1`);
    const newDataList = createElement(this._getDataListTemplate());

    oldDatalist.parentNode.replaceChild(newDataList, oldDatalist);
    eventInputDestination.placeholder = newDataList.options[0].value;
  }

  //  Запретить ввод точки назначения согласно ТЗ
  _onInputDestinationKeysDown(evt) {
    evt.preventDefault();
  }

  _getDataListTemplate() {
    let options = ``;

    switch (this._type) {
      case `flight`:
        options = Array.from(eventsData.destination.cities);
        break;

      case `check-in`:
        options = Array.from(eventsData.destination.checkinPoints);
        break;

      case `sightseeing`:
        options = Array.from(eventsData.destination.sights);
        break;

      case `restaurant`:
        options = Array.from(eventsData.destination.eatingPoints);
        break;

      default:
        options = Array.from(new Set([...eventsData.destination.cities,
          ...eventsData.destination.sights,
          ...eventsData.destination.eatingPoints,
          ...eventsData.destination.checkinPoints]));
    }

    return `<datalist id="destination-list-1">
              ${options.map((option) => `<option value="${option}"></option>`).join(``)}
            </datalist>`.trim();
  }

  _getTemplate() {
    return `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${(this._type.toLowerCase() === `taxi`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${(this._type.toLowerCase() === `bus`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${(this._type.toLowerCase() === `train`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${(this._type.toLowerCase() === `ship`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${(this._type.toLowerCase() === `transport`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${(this._type.toLowerCase() === `drive`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${(this._type.toLowerCase() === `flight`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${(this._type.toLowerCase() === `check-in`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${(this._type.toLowerCase() === `sightseeing`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${(this._type.toLowerCase() === `restaurant`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(this._type)} ${this._isTransportType() ? `to` : `into`}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1" required>
            ${this._getDataListTemplate()}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${new Date(this._time.start).getDate()}/${new Date(this._time.start).getMonth()}/${new Date(this._time.start).getFullYear()} ${new Date(this._time.start).getHours()}:${new Date(this._time.start).getMinutes()}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${new Date(this._time.end).getDate()}/${new Date(this._time.end).getMonth()}/${new Date(this._time.end).getFullYear()} ${new Date(this._time.end).getHours()}:${new Date(this._time.end).getMinutes()}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${this._offers.map((offer, index) => `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage-${index}" ${offer.isActive ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-luggage-${index}">
                  <span class="event__offer-title">${offer.description}</span>
                  +
                  €&nbsp;<span class="event__offer-price">${offer.price}</span>
                </label>
              </div>`).join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${this._photos.map((photoURL) => `<img class="event__photo" src="${photoURL}" alt="Event photo">`)
                  .join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`.trim();
  }
}


export default EventEdit;
