import NoEvents from '../components/no-events.js';
import Sort from '../components/sorting.js';
import TripBoard from '../components/trip-board.js';
import {render, Position, showElement, hideElement, unrender} from '../utils/utils.js';
import TripListController from './trip-list-controller.js';

class TripController {
  constructor(container, data, onDataChange) {
    this._container = container;
    this._events = data;
    this._board = new TripBoard();
    this._noEvents = new NoEvents();
    this._sort = new Sort();

    //  Тип текущей сортировки. Сортировка при изменении данных должна сохраняться.
    this._sortType = `default`;

    this._onDataChange = this._onDataChange.bind(this);
    this._tripListController = new TripListController(this._board.getElement(), this._sort.getElement(), this._onDataChange);

    this._onMainDataChange = onDataChange;
  }

  init() {
    if (this._events.length === 0) {
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
      return;
    }

    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortBtnClick(evt));
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    this._tripListController.setEventsByDays(this._events);
  }

  show() {
    showElement(this._container);
  }

  hide() {
    hideElement(this._container);
  }

  createEvent(createButton) {
    if (this._events.length === 0) {
      unrender(this._noEvents.getElement());
      render(this._container, this._sort.getElement(), Position.BEFOREEND);
      render(this._container, this._board.getElement(), Position.BEFOREEND);
    }

    this._tripListController.createEvent(createButton);
  }

  setFilterType(newType) {
    this._tripListController.setFilterType(newType);
    this._renderBoard();
  }

  _onDataChange(events) {
    this._events = events;

    this._renderBoard();
    this._onMainDataChange(events);
  }

  _renderBoard() {
    this._sortEvents();

    if (this._events.length === 0) {
      unrender(this._board.getElement());
      unrender(this._sort.getElement());
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
    }
  }

  //  Отсортировать точки согласно текущей сортировке (this._sortType)
  _sortEvents() {
    switch (this._sortType) {
      case `time`:
        const sortedByEventDuration = this._events.sort((a, b) => (b.time.end - b.time.start) - (a.time.end - a.time.start));
        this._tripListController.setEvents(sortedByEventDuration);
        return;

      case `price`:
        const sortedByPrice = this._events.sort((a, b) => b.price - a.price);
        this._tripListController.setEvents(sortedByPrice);
        return;

      case `default`:
        this._tripListController.setEventsByDays(this._events);
        return;
    }
  }

  _onSortBtnClick(evt) {
    const target = evt.target;
    if (target.tagName !== `INPUT` || target.dataset.sortType === this._sortType) {
      return;
    }

    this._sortType = target.dataset.sortType;
    this._renderBoard();
  }
}


export default TripController;
