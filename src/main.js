import {eventsList} from './data/events-list.js';
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


let eventsListMock = Array.from(eventsList);

const tripInfoController = new TripInfoController(tripInfoElement, eventsListMock);
const filtersController = new FiltersController(filtersHeaderElement);
const tripController = new TripController(tripListElement, eventsListMock);
const statsController = new StatsController(tripPageMainContainer);

const pagesController = new PagesController(menuHeaderElement, tripController, statsController, createEventButton);

tripInfoController.init();
filtersController.init();

pagesController.init();

tripController.init();
statsController.init();

