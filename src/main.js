import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createTripFiltersTemplate} from './components/trip-filters.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';
import {createEventTemplate} from './components/event.js';
import {createEditEventTemplate} from './components/event-edit.js';
import {tripInfoData, tripFilterData, tripDaysData} from './data.js';

const renderComponent = (node, markup, position = `beforeend`) => {
  node.insertAdjacentHTML(position, markup);
};

const tripMain = document.querySelector(`.trip-main`);

const tripInfo = tripMain.querySelector(`.trip-info`);
renderComponent(tripInfo, createTripInfoTemplate(tripInfoData), `afterbegin`);

const menu = tripMain.querySelector(`.trip-controls h2:first-child`);
renderComponent(menu, createMenuTemplate(), `afterend`);

const filters = tripMain.querySelector(`.trip-controls h2:last-child`);
renderComponent(filters, createTripFiltersTemplate(tripFilterData), `afterend`);

const tripList = document.querySelector(`.trip-events`);
renderComponent(tripList, createSortingTemplate(), `afterbegin`);
renderComponent(tripList, createTripBoardTemplate());

const tripBoard = tripList.querySelector(`.trip-days`);

//  Сформировать разметку, потом вывести
const tripDays = tripDaysData.map((tripDay, index) => {
  let list = ``;

  //  Первый элемент на странице сделать event-edit
  if (index === 0) {
    list = tripDay.dayEventsList.map((event, ind) =>
      (ind === 0) ? createEditEventTemplate(event) : createEventTemplate(event)).join(``);
  } else {
    list = tripDay.dayEventsList.map((event) => createEventTemplate(event)).join(``);
  }

  return createTripDayTemplate(tripDay, index, list);
}).join(``);

renderComponent(tripBoard, tripDays);
