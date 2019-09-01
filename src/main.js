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


const menuNode = document.querySelector(`.trip-controls`);
const tripMainNode = document.querySelector(`.trip-main`);
const tripListNode = document.querySelector(`.trip-events`);
const tripController = new TripController(tripListNode, mock.eventsList);

if (mock.eventsList.length === 0) {
  tripMainNode.querySelector(`.trip-main__event-add-btn`).disabled = true;
} else {
  const tripInfoNode = tripMainNode.querySelector(`.trip-info`);
  render(tripInfoNode, new TripInfo(eventsList).getElement(), Position.AFTERBEGIN);
}

tripMainNode.querySelector(`.trip-info__cost-value`).innerHTML = tripController.getTripCost();
render(menuNode, new Menu(mock.tripMenu).getElement(), Position.AFTERBEGIN);
render(menuNode, new Filters(mock.tripFilters).getElement(), Position.BEFOREEND);
tripController.init();
