import {Mode, render, TimeValue, Position} from '../utils/utils';
import PointController from './point-controller';
import TripDay from '../components/trip-day';

class TripListController {
  constructor(container, createTaskContainer, onDataChange) {
    this._container = container;
    this._createTaskContainer = createTaskContainer;

    this._events = [];

    this._creatingEvent = null;
    this._filterType = `everything`;

    this._onBoardDataChange = onDataChange;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setFilterType(newType) {
    this._filterType = newType;
  }

  createEvent(createButton) {
    //  Запретить создавать более одной карточки за раз
    if (this._creatingEvent) {
      return;
    }

    const defaultEventData = {
      type: {
        name: `flight`,
        icon: `flight`,
        title: `Flight to`
      },
      destination: null,
      description: null,
      time: {
        start: Date.now(),
        end: Date.now(),
      },
      price: null,
      offers: [],
      photos: [],
      isFavorite: false
    };

    this._creatingEvent = new PointController(this._createTaskContainer, defaultEventData, Mode.ADDING, this._onChangeView,
        (...arg) => {
          this._creatingEvent = null;
          createButton.disabled = false;
          this._onDataChange(...arg);
        });
    this._creatingEvent.init();
  }

  setEvents(events) {
    this._updateEvents(events);

    if (this._events.length === 0) {
      return;
    }

    const filteredEvents = this._filterEvents();

    const newTripDay = new TripDay();
    render(this._container, newTripDay.getElement(), Position.BEFOREEND);

    for (const event of filteredEvents) {
      this._renderEvent(event, newTripDay.getEventsListElement());
    }
  }

  setEventsByDays(events) {
    this._updateEvents(events);

    if (this._events.length === 0) {
      return;
    }

    const filteredEvents = this._filterEvents();

    const sortedByEvent = filteredEvents.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(filteredEvents[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(filteredEvents[filteredEvents.length - 1].time.start).setHours(0, 0, 0, 0);
    let dayIndex = 0;

    for (let day = firstTripDay; day <= lastTripDay; day += TimeValue.MILLISECONDS_IN_DAY) {
      const dayEvents = sortedByEvent.filter((event) => new Date(event.time.start).setHours(0, 0, 0, 0) === day);
      dayIndex++;

      //  Не вставлять в разметку пустые дни
      if (dayEvents.length === 0) {
        continue;
      }

      const newTripDay = new TripDay(dayIndex, day);
      render(this._container, newTripDay.getElement(), Position.BEFOREEND);

      for (const dayEvent of dayEvents) {
        this._renderEvent(dayEvent, newTripDay.getEventsListElement());
      }
    }
  }

  _updateEvents(events) {
    //  Убрать всех слушателей
    this._onChangeView();
    this._subscriptions = [];
    //  Ререндер
    this._events = events;
    this._container.innerHTML = ``;
  }

  _renderEvent(event, listElement) {
    const newPointController = new PointController(listElement, event, Mode.DEFAULT, this._onChangeView, this._onDataChange);
    newPointController.init();

    this._subscriptions.push(newPointController.setDefaultView.bind(newPointController));
  }

  _filterEvents() {
    switch (this._filterType) {
      case `everything`:
        return this._events;

      case `future`:
        return this._events.filter((event) => (Date.now() - event.time.start) < TimeValue.MILLISECONDS_IN_MINUTE);

      case `past`:
        return this._events.filter((event) => (Date.now() - event.time.end) > TimeValue.MILLISECONDS_IN_MINUTE);
    }
    return null;
  }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  _onDataChange(oldData, newData) {
    // NONE
    if (oldData === null && newData === null && this._events.length !== 0) {
      return;
    }
    //  ADD
    if (oldData === null && newData !== null) {
      this._events = [newData, ...this._events];
    }
    //  DEL
    if (oldData !== null && newData === null) {
      const index = this._events.findIndex((event) => event === oldData);
      this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
    }
    //  UPDATE
    if (oldData !== null && newData !== null) {
      const index = this._events.findIndex((event) => event === oldData);
      this._events[index] = newData;
    }

    this._onBoardDataChange(this._events);
  }
}


export default TripListController;
