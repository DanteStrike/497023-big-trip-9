import {serverConfig} from './configs/configs.js';
import {Action, FilterType} from './utils/enum.js';
import {filterPoints} from './utils/filter-points.js';
import API from './utils/api.js';
import TripController from './controllers/trip-controller.js';
import TripInfoController from './controllers/trip-info-controller.js';
import PagesController from './controllers/pages-controller.js';
import StatsController from './controllers/stats-controller.js';
import FiltersController from './controllers/filters-controller.js';


const api = new API(serverConfig);
const tripInfoElement = document.querySelector(`.trip-info`);
const controlsElement = document.querySelector(`.trip-controls`);
const menuHeaderElement = controlsElement.querySelector(`h2:first-child`);
const filtersHeaderElement = controlsElement.querySelector(`h2:last-child`);
const createEventButton = document.querySelector(`.trip-main__event-add-btn`);
const tripPageMainContainer = document.querySelector(`.page-main .page-body__container`);
const tripListElement = tripPageMainContainer.querySelector(`.trip-events`);


let filterType = FilterType.EVERYTHING;
let downloadedPoints = null;

const downloadPoints = () => api.getPoints()
    .then((points) => {
      downloadedPoints = points;
      const filteredPoints = filterPoints(filterType, downloadedPoints);
      tripController.showPoints(filteredPoints);
      statsController.update(downloadedPoints);
      tripInfoController.update(downloadedPoints);
    });

const onFilterTypeChange = (newType) => {
  filterType = newType;
  const filteredPoints = filterPoints(filterType, downloadedPoints);
  tripController.showPoints(filteredPoints);
};

const onDataChange = (action, update) => {
  switch (action) {
    case Action.CREATE:
      api.createPoint(update.toRAW())
      .then(downloadPoints);
      break;

    case Action.UPDATE:
      api.updatePoint({
        id: update.id,
        data: update.toRAW()
      })
      .then(downloadPoints);
      break;

    case Action.DELETE:
      api.deletePoint(update.id)
      .then(downloadPoints);
      break;
  }
};

const tripInfoController = new TripInfoController(tripInfoElement);
const filtersController = new FiltersController(filtersHeaderElement, onFilterTypeChange);
const tripController = new TripController(tripListElement, onDataChange);
const statsController = new StatsController(tripPageMainContainer);
const pagesController = new PagesController(menuHeaderElement, filtersController, tripController, statsController, createEventButton);

tripInfoController.init();
tripController.init();
statsController.init();
pagesController.init();

api.getDestinations().
then((destinations) => {
  tripController.setDestinations(destinations);
  api.getOffers()
  .then((offers) => {
    tripController.setOffers(offers);
    downloadPoints()
      .then(() => filtersController.init());
  });
});
