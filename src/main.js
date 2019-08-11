import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createTripFiltersTemplate} from './components/trip-filters.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';
import {createEventTemplate} from './components/event.js';
import {createEditeEventTemplate} from './components/event-edit.js';

const renderComponent = (node, markup, position = `beforeend`) => {
  node.insertAdjacentHTML(position, markup);
};

const tripMain = document.querySelector(`.trip-main`);

const tripInfo = tripMain.querySelector(`.trip-info`);
renderComponent(tripInfo, createTripInfoTemplate(), `afterbegin`);

const menu = tripMain.querySelector(`.trip-controls h2:first-child`);
renderComponent(menu, createMenuTemplate(), `afterend`);

const filters = tripMain.querySelector(`.trip-controls h2:last-child`);
renderComponent(filters, createTripFiltersTemplate(), `afterend`);

const tripList = document.querySelector(`.trip-events`);
renderComponent(tripList, createSortingTemplate(), `afterbegin`);
renderComponent(tripList, createTripBoardTemplate());

const tripBoard = tripList.querySelector(`.trip-days`);
renderComponent(tripBoard, createTripDayTemplate());

const dayEventList = tripBoard.querySelector(`.trip-events__list`);
renderComponent(dayEventList, createEditeEventTemplate());

for (let i = 0; i < 3; i++) {
  renderComponent(dayEventList, createEventTemplate());
}
