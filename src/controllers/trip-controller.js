import Event from '../components/event.js';
import EditEvent from '../components/event-edit.js';
import NoEvents from '../components/no-events.js';
import Sort from '../components/sorting.js';
import TripBoard from '../components/trip-board.js';
import TripDay from '../components/trip-day.js';
import {render, createElement, Position, TimeValue} from '../utils/utils.js';

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
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortBtnClick(evt));
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    this._renderEventsByDays();

    //   const tripBoardNode = this._container.querySelector(`.trip-days`);
    //   render(tripBoardNode, createElement(createTripDayTemplate()), Position.BEFOREEND);

    //   const eventsListNode = this._container.querySelector(`.trip-events__list`);
    //   for (const event of this._eventsList) {
    //     this._renderEvent(event, eventsListNode);
    //   }

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
      };

      newEditEvent.getElement().querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, onEditEventRollupBtnClick);

      const onEditEventFormSubmit = (evt) => {
        evt.preventDefault();
        listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          listNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
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

  _onSortBtnClick(evt) {
    const target = evt.target;
    if (target.tagName !== `INPUT` || this._eventsList.length === 0) {
      return;
    }
    this._board.getElement().innerHTML = ``;
    let eventsListNode;

    switch (target.dataset.sortType) {
      case `time`:
        const sortedByEventDuration = this._eventsList.sort((a, b) => (b.time.end - b.time.start) - (a.time.end - a.time.start));
        render(this._board.getElement(), new TripDay().getElement(), Position.BEFOREEND);
        eventsListNode = this._board.getElement().querySelector(`.trip-events__list`);
        for (const event of sortedByEventDuration) {
          this._renderEvent(event, eventsListNode);
        }
        return;

      case `price`:
        const sortedByPrice = this._eventsList.sort((a, b) => b.price - a.price);
        render(this._board.getElement(), new TripDay().getElement(), Position.BEFOREEND);
        eventsListNode = this._board.getElement().querySelector(`.trip-events__list`);
        for (const event of sortedByPrice) {
          this._renderEvent(event, eventsListNode);
        }
        return;

      case `default`:
        this._renderEventsByDays();
        return;
    }
  }

  _renderEventsByDays() {
    const sortedByEvent = this._eventsList.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(this._eventsList[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(this._eventsList[this._eventsList.length - 1].time.start).setHours(0, 0, 0, 0);
    let dayIndex = 0;

    for (let day = firstTripDay; day <= lastTripDay; day += TimeValue.MILLISECONDS_IN_DAY) {
      const dayEvents = sortedByEvent.filter((event) => new Date(event.time.start).setHours(0, 0, 0, 0) === day);
      dayIndex++;

      const newTripDay = new TripDay(dayIndex, day);
      render(this._board.getElement(), newTripDay.getElement(), Position.BEFOREEND);

      for (const event of dayEvents) {
        this._renderEvent(event, newTripDay.getEventsListNode());
      }
    }
  }
}


export default TripController;
