import {serverConfig} from './configs/configs.js';
import {Action, FilterType, BoardState} from './utils/enum.js';
import {filterPoints} from './utils/filter-points.js';
import API from './utils/api.js';
import TripController from './controllers/trip-controller.js';
import TripInfoController from './controllers/trip-info-controller.js';
import PagesController from './controllers/pages-controller.js';
import StatsController from './controllers/stats-controller.js';
import FiltersController from './controllers/filters-controller.js';


const tripInfoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = controlsElement.querySelector(`h2:first-child`);
const filtersHeaderElement = controlsElement.querySelector(`h2:last-child`);
const createEventButton = document.querySelector(`.trip-main__event-add-btn`);
const tripPageMainContainer = document.querySelector(`.page-main .page-body__container`);
const tripListElement = tripPageMainContainer.querySelector(`.trip-events`);

const api = new API(serverConfig);
const appData = {
  filterType: FilterType.EVERYTHING,
  downloadedPoints: []
};

const updateControllers = () => {
  if (appData.downloadedPoints.length === 0) {
    tripController.setBoardState(BoardState.NO_POINTS);
  } else {
    tripController.setBoardState(BoardState.DEFAULT);
    tripController.showPoints(filterPoints(appData));
  }
  statsController.update(appData.downloadedPoints);
  tripInfoController.update(appData.downloadedPoints);
};

const onFilterTypeChange = (newType) => {
  appData.filterType = newType;
  if (appData.downloadedPoints.length !== 0) {
    tripController.showPoints(filterPoints(appData));
  }
};

const onDataChange = (action, update, initiator) => {
  switch (action) {
    case Action.CREATE:
      api.createPoint(update.toRAW())
      .then((point) => {
        appData.downloadedPoints.push(point);
        updateControllers();
      })
      .catch(() => {
        initiator.onServerError();
      });
      break;

    case Action.UPDATE:
      api.updatePoint({
        id: update.id,
        data: update.toRAW()
      })
      .then((point) => {
        appData.downloadedPoints[appData.downloadedPoints.findIndex((downloadedPoint) => downloadedPoint.id === point.id)] = point;
        updateControllers();
      })
      .catch(() => {
        initiator.onServerError();
      });
      break;

    case Action.DELETE:
      api.deletePoint(update.id)
      .then(() => {
        appData.downloadedPoints.splice(appData.downloadedPoints.findIndex((downloadedPoint) => downloadedPoint.id === update.id), 1);
        updateControllers();
      })
      .catch(() => {
        initiator.onServerError();
      });
      break;
  }
};

const tripInfoController = new TripInfoController(tripInfoElement);
const filtersController = new FiltersController(filtersHeaderElement, onFilterTypeChange);
const tripController = new TripController(tripListElement, onDataChange);
const statsController = new StatsController(tripPageMainContainer);
const pagesController = new PagesController(menuHeaderElement, filtersController, tripController, statsController, createEventButton);
tripInfoController.init();
filtersController.init();
tripController.init();
statsController.init();
pagesController.init();

Promise.all([api.getDestinations(), api.getOffers(), api.getPoints()])
.then(([destinations, offers, points]) => {
  appData.downloadedPoints = points;
  tripController.setDestinations(destinations);
  tripController.setOffers(offers);
  if (appData.downloadedPoints.length === 0) {
    tripController.setBoardState(BoardState.NO_POINTS);
  } else {
    tripController.setBoardState(BoardState.DEFAULT);
    tripController.showPoints(filterPoints(appData));
  }
  statsController.update(appData.downloadedPoints);
  tripInfoController.update(appData.downloadedPoints);
});
