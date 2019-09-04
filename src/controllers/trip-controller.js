import NoEvents from '../components/no-events.js';
import Sort from '../components/sorting.js';
import TripBoard from '../components/trip-board.js';
import TripDay from '../components/trip-day.js';
import {render, Position, TimeValue} from '../utils/utils.js';
import PointController from './point-controller.js';

class TripController {
  constructor(container, data) {
    this._container = container;
    this._events = data;
    this._board = new TripBoard();
    this._noEvents = new NoEvents();
    this._sort = new Sort();

    //  Тип текущей сортировки. Сортировка при изменении данных должна сохраняться.
    this._sortType = `default`;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  getTripCost() {
    return this._events.reduce((accum, event) => accum + event.price, 0);
  }

  init() {
    if (this._events.length === 0) {
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
      return;
    }

    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortBtnClick(evt));
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    this._renderEventsByDays();
  }

  _renderEvent(event, listNode) {
    const newPointController = new PointController(listNode, event, this._onChangeView, this._onDataChange);
    newPointController.init();

    this._subscriptions.push(newPointController.setDefaultView.bind(newPointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  _onDataChange(oldData, newData) {
    this._events[this._events.findIndex((task) => task === oldData)] = newData;

    //  Согласно ТЗ обновленные данные должны соответствовать текущей сортировке
    this._sortEvents();
  }

  _onSortBtnClick(evt) {
    const target = evt.target;
    if (target.tagName !== `INPUT` || this._events.length === 0) {
      return;
    }

    this._sortType = target.dataset ? target.dataset.sortType : `default`;
    this._sortEvents();
  }

  //  Отсортировать точки согласно текущей сортировке (this._sortType)
  _sortEvents() {
    // Закрыть все карточки и убрать обработчики нажатия кнопки ESC
    this._onChangeView();
    // Обнулить всех "подписчиков", не допускать утечку памяти
    this._subscriptions = [];
    this._board.getElement().innerHTML = ``;
    const newTripDay = new TripDay();

    switch (this._sortType) {
      case `time`:
        const sortedByEventDuration = this._events.sort((a, b) => (b.time.end - b.time.start) - (a.time.end - a.time.start));
        render(this._board.getElement(), newTripDay.getElement(), Position.BEFOREEND);

        for (const event of sortedByEventDuration) {
          this._renderEvent(event, newTripDay.getEventsListNode());
        }
        return;

      case `price`:
        const sortedByPrice = this._events.sort((a, b) => b.price - a.price);
        render(this._board.getElement(), newTripDay.getElement(), Position.BEFOREEND);

        for (const event of sortedByPrice) {
          this._renderEvent(event, newTripDay.getEventsListNode());
        }
        return;

      case `default`:
        this._renderEventsByDays();
        return;
    }
  }

  _renderEventsByDays() {
    const sortedByEvent = this._events.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(this._events[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(this._events[this._events.length - 1].time.start).setHours(0, 0, 0, 0);
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
