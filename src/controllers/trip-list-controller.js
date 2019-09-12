import {defaultPointData} from '../configs.js';
import {Position, TimeValue, Mode} from '../utils/enum.js';
import {render} from '../utils/dom.js';
import PointController from './point-controller.js';
import TripDay from '../components/trip-day.js';
import Point from '../data/point.js';

class TripListController {
  constructor(container, createTaskContainer, onDataChange) {
    this._container = container;
    this._createTaskContainer = createTaskContainer;
    this._points = [];
    this._creatingPoint = null;
    this._destinations = [];
    this._offers = [];

    this._onBoardDataChange = onDataChange;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  createEvent(createButton) {
    //  Запретить создавать более одной карточки за раз
    if (this._creatingPoint) {
      return;
    }

    const defaultPoint = new Point(defaultPointData);
    this._creatingPoint = new PointController(this._createTaskContainer, defaultPoint, this._destinations, this._offers, Mode.ADDING, this._onChangeView,
        (...arg) => {
          this._creatingPoint = null;
          createButton.disabled = false;
          this._onDataChange(...arg);
        });
    this._creatingPoint.init();
  }

  setPoints(points) {
    this._updatePoints(points);

    const newTripDay = new TripDay();
    render(this._container, newTripDay.getElement(), Position.BEFOREEND);

    for (const point of this._points) {
      this._renderPoint(point, newTripDay.getEventsListElement());
    }
  }

  setPointsByDays(points) {
    this._updatePoints(points);

    const sortedByEvent = this._points.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(this._points[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(this._points[this._points.length - 1].time.start).setHours(0, 0, 0, 0);
    let dayIndex = 0;

    for (let day = firstTripDay; day <= lastTripDay; day += TimeValue.MILLISECONDS_IN_DAY) {
      const dayPoints = sortedByEvent.filter((point) => new Date(point.time.start).setHours(0, 0, 0, 0) === day);
      dayIndex++;

      //  Не вставлять в разметку пустые дни
      if (dayPoints.length === 0) {
        continue;
      }

      const newTripDay = new TripDay(dayIndex, day);
      render(this._container, newTripDay.getElement(), Position.BEFOREEND);

      for (const dayEvent of dayPoints) {
        this._renderPoint(dayEvent, newTripDay.getEventsListElement());
      }
    }
  }

  _updatePoints(points) {
    //  Убрать всех слушателей
    this._onChangeView();
    this._subscriptions = [];
    //  Ререндер
    this._points = points;
    this._container.innerHTML = ``;
  }

  _renderPoint(point, listElement) {
    const newPointController = new PointController(listElement, point, this._destinations, this._offers, Mode.DEFAULT, this._onChangeView, this._onDataChange);
    newPointController.init();

    this._subscriptions.push(newPointController.setDefaultView.bind(newPointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  _onDataChange(action, data) {
    this._onBoardDataChange(action, data);
  }
}


export default TripListController;
