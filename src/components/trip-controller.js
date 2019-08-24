import Event from './event.js';
import EditEvent from './event-edit.js';
import {createTripDayTemplate} from './trip-day.js';
import {render, createElement, Position, Key} from '../utils/utils.js';

class TripController {
  constructor(node, data) {
    this._container = node;
    this._eventsList = data;
  }

  getTripCost() {
    return this._eventsList.reduce((accum, event) => accum + event.price, 0);
  }

  init() {
    if (this._eventsList.length === 0) {
      this._firstInit();
      return;
    }

    render(this._container, createElement(this._getTripBoardTemplate()), Position.BEFOREEND);


    const tripBoardNode = this._container.querySelector(`.trip-days`);
    render(tripBoardNode, createElement(createTripDayTemplate()), Position.BEFOREEND);

    const eventsListNode = this._container.querySelector(`.trip-events__list`);
    for (const event of this._eventsList) {
      this._renderEvent(event, eventsListNode);
    }
  }

  _firstInit() {
    render(this._container, createElement(this._getNoEventsTemplate()), Position.BEFOREEND);
  }

  _renderEvent(event, listNode) {
    const newEvent = new Event(event);
    const newEditEvent = new EditEvent(event);

    const onEscKeyDown = (evt) => {
      if (Key.ESCAPE.has(evt.key)) {
        listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onEventRollupBtnClick = () => {
      listNode.replaceChild(newEditEvent.getElement(), newEvent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    newEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onEventRollupBtnClick);

    const onEditEventRollupBtnClick = () => listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
    newEditEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onEditEventRollupBtnClick);

    const onEditEventFormSubmit = (evt) => {
      evt.preventDefault();
      listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
    };
    newEditEvent.getElement().querySelector(`form`)
      .addEventListener(`submit`, onEditEventFormSubmit);

    render(listNode, newEvent.getElement(), Position.BEFOREEND);
  }

  _getNoEventsTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }

  _getTripBoardTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}


export default TripController;
