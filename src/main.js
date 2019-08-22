import {tripInfo, tripFilters, tripMenu} from './data.js';
import {eventsList} from './eventsList.js';
import {render, Position} from './utils/utils.js';
import {firsInit, init} from './initialization.js';
import Menu from './components/menu.js';
import Filters from './components/trip-filters.js';

const data = {
  eventsList,
  tripInfo,
  tripFilters,
  tripMenu
};

const menuNode = document.querySelector(`.trip-controls`);
render(menuNode, new Menu(data.tripMenu).getElement(), Position.AFTERBEGIN);
render(menuNode, new Filters(data.tripFilters).getElement(), Position.BEFOREEND);

if (data.eventsList.length === 0) {
  firsInit();
} else {
  init(data);
}
