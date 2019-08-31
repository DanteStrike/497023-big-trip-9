import {tripFilters, tripMenu} from './data.js';
import {eventsList} from './eventsList.js';
import {render, Position} from './utils/utils.js';
import TripController from './controllers/trip-controller.js';
import TripInfo from './components/trip-info.js';
import Menu from './components/menu.js';
import Filters from './components/trip-filters.js';


const data = {
  eventsList,
  tripFilters,
  tripMenu
};


const menuNode = document.querySelector(`.trip-controls`);
const tripMainNode = document.querySelector(`.trip-main`);
const tripListNode = document.querySelector(`.trip-events`);
const tripController = new TripController(tripListNode, data.eventsList);

if (data.eventsList.length === 0) {
  tripMainNode.querySelector(`.trip-main__event-add-btn`).disabled = true;
} else {
  const tripInfoNode = tripMainNode.querySelector(`.trip-info`);
  render(tripInfoNode, new TripInfo(eventsList).getElement(), Position.AFTERBEGIN);
}

tripMainNode.querySelector(`.trip-info__cost-value`).innerHTML = tripController.getTripCost();
render(menuNode, new Menu(data.tripMenu).getElement(), Position.AFTERBEGIN);
render(menuNode, new Filters(data.tripFilters).getElement(), Position.BEFOREEND);
tripController.init();
