import {Position, TimeValue, Mode} from '../utils/enum.js';
import {render} from '../utils/dom.js';
import PointController from './point-controller.js';
import TripDay from '../components/trip-day.js';

class TripListController {
  constructor(container, createTaskContainer, onDataChange) {
    this._container = container;
    this._createTaskContainer = createTaskContainer;

    this._points = [];

    this._creatingEvent = null;
    // this._filterType = `everything`;

    this._onBoardDataChange = onDataChange;

    this._subscriptions = [];
    // this._onChangeView = this._onChangeView.bind(this);
    // this._onDataChange = this._onDataChange.bind(this);
  }

  // setFilterType(newType) {
  //   this._filterType = newType;
  // }

  // createEvent(createButton) {
  //   //  Запретить создавать более одной карточки за раз
  //   if (this._creatingEvent) {
  //     return;
  //   }

  //   const defaultEventData = {
  //     type: {
  //       name: `flight`,
  //       icon: `flight`,
  //       title: `Flight to`
  //     },
  //     destination: null,
  //     description: null,
  //     time: {
  //       start: Date.now(),
  //       end: Date.now(),
  //     },
  //     price: null,
  //     offers: [],
  //     photos: [],
  //     isFavorite: false
  //   };

  //   this._creatingEvent = new PointController(this._createTaskContainer, defaultEventData, Mode.ADDING, this._onChangeView,
  //       (...arg) => {
  //         this._creatingEvent = null;
  //         createButton.disabled = false;
  //         this._onDataChange(...arg);
  //       });
  //   this._creatingEvent.init();
  // }

  setPoints(points) {
    this._updateEvents(points);

    const newTripDay = new TripDay();
    render(this._container, newTripDay.getElement(), Position.BEFOREEND);

    for (const point of this._points) {
      this._renderPoint(point, newTripDay.getEventsListElement());
    }
  }

  setPointsByDays(points) {
    this._updateEvents(points);

//    const sortedByEvent = this._points.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(this._points[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(this._points[this._points.length - 1].time.start).setHours(0, 0, 0, 0);
    let dayIndex = 0;

    for (let day = firstTripDay; day <= lastTripDay; day += TimeValue.MILLISECONDS_IN_DAY) {
      const dayEvents = sortedByEvent.filter((point) => new Date(point.time.start).setHours(0, 0, 0, 0) === day);
      dayIndex++;

      //  Не вставлять в разметку пустые дни
      if (dayEvents.length === 0) {
        continue;
      }

      const newTripDay = new TripDay(dayIndex, day);
      render(this._container, newTripDay.getElement(), Position.BEFOREEND);

      for (const dayEvent of dayEvents) {
        this._renderPoint(dayEvent, newTripDay.getEventsListElement());
      }
    }
  }

  _updateEvents(points) {
    //  Убрать всех слушателей
    this._onChangeView();
    this._subscriptions = [];
    //  Ререндер
    this._points = points;
    this._container.innerHTML = ``;
  }

  _renderPoint(point, listElement) {
    const newPointController = new PointController(listElement, point, Mode.DEFAULT, this._onChangeView, this._onDataChange);
    newPointController.init();

    this._subscriptions.push(newPointController.setDefaultView.bind(newPointController));
  }

  // _filterEvents() {
  //   switch (this._filterType) {
  //     case `everything`:
  //       return this._points;

  //     case `future`:
  //       return this._points.filter((point) => (Date.now() - point.time.start) < TimeValue.MILLISECONDS_IN_MINUTE);

  //     case `past`:
  //       return this._points.filter((point) => (Date.now() - point.time.end) > TimeValue.MILLISECONDS_IN_MINUTE);
  //   }
  //   return null;
  // }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  // _onDataChange(oldData, newData) {
  //   // NONE
  //   if (oldData === null && newData === null && this._points.length !== 0) {
  //     return;
  //   }
  //   //  ADD
  //   if (oldData === null && newData !== null) {
  //     this._points = [newData, ...this._points];
  //   }
  //   //  DEL
  //   if (oldData !== null && newData === null) {
  //     const index = this._points.findIndex((point) => point === oldData);
  //     this._points = [...this._points.slice(0, index), ...this._points.slice(index + 1)];
  //   }
  //   //  UPDATE
  //   if (oldData !== null && newData !== null) {
  //     const index = this._points.findIndex((point) => point === oldData);
  //     this._points[index] = newData;
  //   }

  //   this._onBoardDataChange(this._points);
  // }
}


export default TripListController;
