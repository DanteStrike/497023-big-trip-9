import {render, Position} from './utils/utils.js';
import {tripMenu} from './data/menu-data';
import {tripFilters} from './data/filter-data.js';
import {eventsList} from './data/events-list.js';
import TripController from './controllers/trip-controller.js';
import TripInfo from './components/trip-info.js';
import Menu from './components/menu.js';
import Filters from './components/trip-filters.js';


const mock = {
  eventsList,
  tripFilters,
  tripMenu
};


const menuElement = document.querySelector(`.trip-controls`);
const tripMainElement = document.querySelector(`.trip-main`);
const tripListElement = document.querySelector(`.trip-events`);
const tripController = new TripController(tripListElement, mock.eventsList);

if (mock.eventsList.length === 0) {
  tripMainElement.querySelector(`.trip-main__event-add-btn`).disabled = true;
} else {
  const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
  render(tripInfoElement, new TripInfo(eventsList).getElement(), Position.AFTERBEGIN);
}

tripMainElement.querySelector(`.trip-info__cost-value`).innerHTML = tripController.getTripCost();
render(menuElement, new Menu(mock.tripMenu).getElement(), Position.AFTERBEGIN);
render(menuElement, new Filters(mock.tripFilters).getElement(), Position.BEFOREEND);
tripController.init();
