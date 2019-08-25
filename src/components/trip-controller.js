import Event from './event.js';
import EditEvent from './event-edit.js';
import NoEvents from './no-events.js';
import Sort from './sorting.js';
import TripBoard from './trip-board.js';
import {createTripDayTemplate} from './trip-day.js';
import {render, createElement, Position} from '../utils/utils.js';

class TripController {
  constructor(node, data) {
    this._container = node;
    this._eventsList = data;
    this._board = new TripBoard();
    this._sort = new Sort();
    this._noEvents = null;
  }

  getTripCost() {
    return this._eventsList.reduce((accum, event) => accum + event.price, 0);
  }

  init() {
    if (this._eventsList.length === 0) {
      this._firstInit();
      return;
    }

    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._board.getElement(), Position.BEFOREEND);


    const tripBoardNode = this._container.querySelector(`.trip-days`);
    render(tripBoardNode, createElement(createTripDayTemplate()), Position.BEFOREEND);

    const eventsListNode = this._container.querySelector(`.trip-events__list`);
    for (const event of this._eventsList) {
      this._renderEvent(event, eventsListNode);
    }
  }

  _firstInit() {
    this._noEvents = new NoEvents();
    render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
  }

  _renderEvent(event, listNode) {
    const newEvent = new Event(event);

    const onEventRollupBtnClick = () => {
      const newEditEvent = new EditEvent(event);
      listNode.replaceChild(newEditEvent.getElement(), newEvent.getElement());

      const onEditEventRollupBtnClick = () => {
        listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
        newEditEvent.removeElement();
      };

      newEditEvent.getElement().querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, onEditEventRollupBtnClick);

      const onEditEventFormSubmit = (evt) => {
        evt.preventDefault();
        listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
        newEditEvent.removeElement();
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
          newEditEvent.removeElement();
        }
      };

      newEditEvent.getElement().querySelector(`form`)
        .addEventListener(`submit`, onEditEventFormSubmit);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    newEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onEventRollupBtnClick);

    render(listNode, newEvent.getElement(), Position.BEFOREEND);
  }
}


export default TripController;
