import {Position, SortType, TagName} from '../utils/enum.js';
import {render, showElement, hideElement, unrender} from '../utils/dom.js';
import NoEvents from '../components/no-events.js';
import Sort from '../components/sorting.js';
import TripBoard from '../components/trip-board.js';
import TripListController from './trip-list-controller.js';

class TripController {
  constructor(container, onDataChange) {
    this._container = container;
    this._points = [];

    this._board = new TripBoard();
    this._noPoints = new NoEvents();
    this._sort = new Sort();

    //  Тип текущей сортировки. Сортировка при изменении данных должна сохраняться.
    this._sortType = SortType.DEFAULT;

    this._onDataChange = this._onDataChange.bind(this);
    this._tripListController = new TripListController(this._board.getElement(), this._sort.getElement(), this._onDataChange);

    this._onMainDataChange = onDataChange;
  }

  setDestinations(destinations) {
    this._tripListController.setDestinations(destinations);
  }

  setOffers(offers) {
    this._tripListController.setOffers(offers);
  }

  init() {
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortBtnClick(evt));
  }

  show() {
    showElement(this._container);
  }

  hide() {
    hideElement(this._container);
  }

  createEvent(createButton) {
    if (this._points.length === 0) {
      unrender(this._noPoints.getElement());
      render(this._container, this._board.getElement(), Position.BEFOREEND);
    }
    this._tripListController.createEvent(createButton);
  }

  showPoints(points) {
    this._points = points;
    if (points.length === 0 && !this._container.contains(this._noPoints.getElement())) {
      this._board.getElement.innerHTML = ``;
      unrender(this._board.getElement());
      unrender(this._sort.getElement());
      render(this._container, this._noPoints.getElement(), Position.BEFOREEND);
      return;
    }

    if (this._container.contains(this._noPoints.getElement())) {
      unrender(this._noPoints.getElement());
    }

    if (!this._container.contains(this._sort.getElement())) {
      render(this._container, this._sort.getElement(), Position.BEFOREEND);
    }

    if (!this._container.contains(this._board.getElement())) {
      render(this._container, this._board.getElement(), Position.BEFOREEND);
    }

    this._renderBoard();
  }

  createPoint(createButton) {
    if (this._points.length === 0) {
      unrender(this._noPoints.getElement());
      render(this._container, this._sort.getElement(), Position.BEFOREEND);
      render(this._container, this._board.getElement(), Position.BEFOREEND);
    }

    this._tripListController.createPoint(createButton);
  }

  _onDataChange(action, data) {
    this._onMainDataChange(action, data);
  }

  _renderBoard() {
    switch (this._sortType) {
      case SortType.TIME:
        const sortedByEventDuration = this._points.sort((a, b) => (b.time.end - b.time.start) - (a.time.end - a.time.start));
        this._tripListController.setPoints(sortedByEventDuration);
        return;

      case SortType.PRICE:
        const sortedByPrice = this._points.sort((a, b) => b.basePrice - a.basePrice);
        this._tripListController.setPoints(sortedByPrice);
        return;

      case SortType.DEFAULT:
        this._tripListController.setPointsByDays(this._points);
        return;
    }
  }

  _onSortBtnClick(evt) {
    const target = evt.target;
    if (target.tagName !== TagName.INPUT || target.dataset.sortType === this._sortType) {
      return;
    }

    this._sortType = target.dataset.sortType;
    this._renderBoard();
  }
}


export default TripController;
