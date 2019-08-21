import * as data from './data.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createTripFiltersTemplate} from './components/trip-filters.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';
import {createEventTemplate} from './components/event.js';
import {createEditEventTemplate} from './components/event-edit.js';


const renderComponent = (node, markup, position = `beforeend`) => {
  node.insertAdjacentHTML(position, markup);
};

const tripMainNode = document.querySelector(`.trip-main`);
const totalCost = data.eventsList.reduce((accum, event) => accum + event.price, 0);
tripMainNode.querySelector(`.trip-info__cost-value`).innerHTML = totalCost.toString();

const tripInfoNode = tripMainNode.querySelector(`.trip-info`);
renderComponent(tripInfoNode, createTripInfoTemplate(data.tripInfo), `afterbegin`);

const menuNode = tripMainNode.querySelector(`.trip-controls h2:first-child`);
renderComponent(menuNode, createMenuTemplate(data.tripMenu), `afterend`);

const filtersNode = tripMainNode.querySelector(`.trip-controls h2:last-child`);
renderComponent(filtersNode, createTripFiltersTemplate(data.tripFilters), `afterend`);

const tripListNode = document.querySelector(`.trip-events`);
renderComponent(tripListNode, createSortingTemplate(), `afterbegin`);
renderComponent(tripListNode, createTripBoardTemplate());

const tripBoardNode = tripListNode.querySelector(`.trip-days`);
renderComponent(tripBoardNode, createTripDayTemplate());

const eventsListNode = tripBoardNode.querySelector(`.trip-events__list`);

let firstEvent;
let overEvents;
[firstEvent, ...overEvents] = data.eventsList;
renderComponent(eventsListNode, createEditEventTemplate(firstEvent));

const eventsList = overEvents.map((event) => createEventTemplate(event))
  .join(``);
renderComponent(eventsListNode, eventsList);
