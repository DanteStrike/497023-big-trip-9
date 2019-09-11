import {serverConfig} from './configs.js';
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


const onFilterTypeChange = (newType) => {
  tripController.setFilterType(newType);
};

const onDataChange = (events) => {
};

const tripInfoController = new TripInfoController(tripInfoElement);
const filtersController = new FiltersController(filtersHeaderElement, onFilterTypeChange);
const tripController = new TripController(tripListElement, onDataChange);
const statsController = new StatsController(tripPageMainContainer);
const pagesController = new PagesController(menuHeaderElement, filtersController, tripController, statsController, createEventButton);

//tripInfoController.init();
filtersController.init();

tripController.init();
statsController.init();
api.getDestinations().then((destinations) => tripController.setDestinations(destinations));
api.getOffers().then((offers) => tripController.setOffers(offers));
api.getPoints().then((points) => {
  tripController.showPoints(points);
//  statsController.setPoints(points);
});

pagesController.init();


