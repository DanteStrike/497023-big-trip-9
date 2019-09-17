import {Mode, TagName, Key} from '../utils/enum.js';
import {createElement, hideElement, showElement} from '../utils/dom.js';
import {formatDateTime} from '../utils/time.js';
import AbstractComponent from './abstract.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';


class PointEditView extends AbstractComponent {
  constructor({type, destination, time, basePrice, offers, isFavorite}, {datalistOptions, mode, onDestinationChange, onTypeChange}) {
    super();
    this._type = type;
    this._destination = destination;
    this._time = time;
    this._basePrice = basePrice;
    this._isFavorite = isFavorite;
    this._datalistOptions = datalistOptions;
    this._mode = mode;
    //  Передать контроллеру информацию о соответствующих событиях
    this._onDestinationChange = onDestinationChange;
    this._onTypeChange = onTypeChange;

    this._offers = (this._mode === Mode.DEFAULT) ? offers : this._onTypeChange(this._type.name).offers;

    this._currentIconImg = this.getElement().querySelector(`.event__type-icon`);
    this._typeOutput = this.getElement().querySelector(`.event__type-output`);
    this._typeToggle = this.getElement().querySelector(`.event__type-toggle`);
    this._typeListElement = this.getElement().querySelector(`.event__type-list`);
    this._destinationInputElement = this.getElement().querySelector(`.event__input--destination`);
    this._detailsSectionElement = this.getElement().querySelector(`.event__details`);
    this._destinationSectionElement = this._detailsSectionElement.querySelector(`.event__section--destination`);
    this._destinationDescriptionElement = this._destinationSectionElement.querySelector(`.event__destination-description`);
    this._offersSectionElement = this._detailsSectionElement.querySelector(`.event__section--offers`);
    this._offersElement = this._offersSectionElement.querySelector(`.event__available-offers`);
    this._picturesContainerElement = this._detailsSectionElement.querySelector(`.event__photos-container`);
    this._picturesElement = this._picturesContainerElement.querySelector(`.event__photos-tape`);

    this._initFlatpickr();
    this._hangHandlers();
  }

  _initFlatpickr() {
    const startFlatpickr = flatpickr(this.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      altFormat: `d.m.Y H:i`,
      dateFormat: `Y-m-dTH:i:S`,
      enableTime: true,
      defaultDate: this._time.start ? this._time.start : Date.now(),
      //  ТЗ: Дата начала не может быть больше даты окончания
      onClose(selectedDates) {
        if (endFlatpickr.selectedDates[0] < selectedDates[0]) {
          endFlatpickr.setDate(selectedDates[0]);
        }
      }
    });

    const endFlatpickr = flatpickr(this.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      altFormat: `d.m.Y H:i`,
      dateFormat: `Y-m-dTH:i:S`,
      enableTime: true,
      defaultDate: this._time.end ? this._time.end : Date.now(),
      //  ТЗ: Дата окончания не может быть меньше даты начала
      onClose(selectedDates) {
        if (startFlatpickr.selectedDates[0] > selectedDates[0]) {
          startFlatpickr.setDate(selectedDates[0]);
        }
      }
    });
  }

  _hangHandlers() {
    this._typeListElement.addEventListener(`click`, (evt) => this._onPointTypeListClick(evt));
    this._destinationInputElement.addEventListener(`input`, (evt) => this._onDestinationInput(evt));
    this._destinationInputElement.addEventListener(`keydown`, (evt) => this._onDestinationKeyDown(evt));
  }

  //  При изменении типа точки, изменить доступные варианты выбора пункта назначения
  _onPointTypeListClick(evt) {
    const target = evt.target;
    if (target.tagName !== TagName.INPUT) {
      return;
    }
    const newType = target.value;
    const {type, offers} = this._onTypeChange(newType);
    const newOffersElement = createElement(this._getOffersTemplate(offers));

    if (offers.length === 0) {
      hideElement(this._offersSectionElement);
    } else {
      showElement(this._offersSectionElement);
    }
    this._offersSectionElement.replaceChild(newOffersElement, this._offersElement);
    this._offersElement = newOffersElement;

    this._currentIconImg.src = `${this._currentIconImg.baseURI.replace(`#`, ``)}img/icons/${type.icon}.png`;
    this._typeOutput.textContent = `${type.title}`;
    this._typeToggle.checked = false;
  }

  //  При изменении пункта назначения изменить отображение согласно новым данным, поступившим с сервера.
  _onDestinationInput(evt) {
    evt.preventDefault();
    const newDestination = evt.currentTarget.value;
    const newDestinationData = this._onDestinationChange(newDestination);
    const newPhotosElement = createElement(this._getPhotosTemplate(newDestinationData.pictures));

    showElement(this._destinationSectionElement);
    this._destinationDescriptionElement.innerHTML = newDestinationData.description;
    this._picturesContainerElement.replaceChild(newPhotosElement, this._picturesElement);
    this._picturesElement = newPhotosElement;
  }

  //  Согласно ТЗ пользователь не может вводить сам пункт назначения
  _onDestinationKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === Key.BACKSPACE || evt.key === Key.DELETE) {
      hideElement(this._destinationSectionElement);
      this._destinationInputElement.value = ``;
    }
  }

  _getPhotosTemplate(pictures) {
    return `<div class="event__photos-tape">
              ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`)
                .join(``)}
            </div>`;
  }

  _getOffersTemplate(offers) {
    return `<div class="event__available-offers">
      ${offers.map((offer, index) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-${index}" value="${offer.price}" ${offer.accepted ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${index}">
            <span class="event__offer-title">${offer.title}</span>
            +
            €&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`).join(``)}
      </div>`;
  }

  _getDataListTemplate(options) {
    return `<datalist id="destination-list-1">
              ${options.map((option) => `<option value="${option}"></option>`).join(``)}
            </datalist>`.trim();
  }

  _getTemplate() {
    return `${this._mode === Mode.ADDING ? `` : `<li class="trip-events__item">`}
      <form class="event  event--edit ${this._mode === Mode.ADDING ? `trip-events__item` : ``}" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type.icon}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${(this._type.name === `taxi`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${(this._type.name === `bus`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${(this._type.name === `train`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${(this._type.name === `ship`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${(this._type.name === `transport`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${(this._type.name === `drive`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${(this._type.name === `flight`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${(this._type.name === `check-in`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${(this._type.name === `sightseeing`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${(this._type.name === `restaurant`) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${this._type.title}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination.name ? `${this._destination.name}` : ``}" list="destination-list-1" required autocomplete="off">
            ${this._getDataListTemplate(this._datalistOptions)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(this._time.start)}" required>
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(this._time.end)}" required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${this._mode === Mode.ADDING ? `` : `${this._basePrice}`}" required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
          ${this._mode === Mode.ADDING ? `` : `
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
            </svg>
          </label>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`}
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers ${(this._offers.length === 0) ? `visually-hidden` : ``}">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            ${this._getOffersTemplate(this._offers)}
          </section>

          <section class="event__section  event__section--destination ${this._mode === Mode.ADDING ? `visually-hidden` : ``}">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._destination.description ? `${this._destination.description}` : ``}</p>

            <div class="event__photos-container">
              ${this._getPhotosTemplate(this._destination.pictures)}
            </div>
          </section>
        </section>
      </form>
    ${this._mode === Mode.ADDING ? `` : `</li>`}`.trim();
  }
}


export default PointEditView;
