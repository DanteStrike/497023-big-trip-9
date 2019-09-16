import {Position, SortType, TagName, BoardState, Action} from '../utils/enum.js';
import {render, showElement, hideElement, unrender} from '../utils/dom.js';
import NoPoints from '../components/no-points.js';
import Sort from '../components/sorting.js';
import TripBoard from '../components/trip-board.js';
import TripListController from './trip-list-controller.js';
import LoadingPoints from '../components/loading-points.js';

class TripController {
  constructor(container, onDataChange) {
    this._container = container;
    this._points = [];

    this._boardState = BoardState.LOADING;
    this._loadingPoints = new LoadingPoints();
    this._board = new TripBoard();
    this._noPoints = new NoPoints();
    this._sort = new Sort();

    //  Тип текущей сортировки. Сортировка при изменении данных должна сохраняться.
    this._sortType = SortType.DEFAULT;

    this._onDataChange = this._onDataChange.bind(this);
    this._tripListController = new TripListController(this._board.getElement(), this._onDataChange);

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
    render(this._container, this._loadingPoints.getElement(), Position.BEFOREEND);
  }

  show() {
    showElement(this._container);
  }

  hide() {
    hideElement(this._container);
  }

  createPoint(createButton) {
    if (this._boardState === BoardState.NO_POINTS) {
      this.setBoardState(BoardState.FIRST_POINT);
      this._tripListController.createPoint(createButton, this._container, Position.AFTERBEGIN);
    } else {
      this._tripListController.createPoint(createButton, this._sort.getElement(), Position.AFTEREND);
    }
  }

  showPoints(points) {
    this._points = points;
    this._renderBoard();
  }

  setBoardState(state) {
    if (state === this._boardState) {
      return;
    }

    if (this._boardState === BoardState.LOADING) {
      unrender(this._loadingPoints.getElement());
    }

    switch (state) {
      case BoardState.NO_POINTS:
        this._board.getElement().innerHTML = ``;
        unrender(this._board.getElement());
        unrender(this._sort.getElement());
        if (!this._container.contains(this._noPoints.getElement())) {
          render(this._container, this._noPoints.getElement(), Position.BEFOREEND);
        }
        break;

      case BoardState.FIRST_POINT:
        unrender(this._noPoints.getElement());
        break;

      case BoardState.DEFAULT:
        unrender(this._noPoints.getElement());

        if (!this._container.contains(this._sort.getElement())) {
          render(this._container, this._sort.getElement(), Position.BEFOREEND);
        }

        if (!this._container.contains(this._board.getElement())) {
          render(this._container, this._board.getElement(), Position.BEFOREEND);
        }
        break;
    }

    this._boardState = state;
  }

  _onDataChange(action, data, initiator) {
    if (action === Action.NONE && this._boardState === BoardState.FIRST_POINT) {
      this.setBoardState(BoardState.NO_POINTS);
    }
    this._onMainDataChange(action, data, initiator);
  }

  _renderBoard() {
    this._board.getElement().innerHTML = ``;
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
