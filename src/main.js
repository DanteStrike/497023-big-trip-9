import * as data from './data.js';
import {render, Enum, createElement} from './utils/utils.js';
import TripInfo from './components/trip-info.js';
import Menu from './components/menu.js';
import Filters from './components/trip-filters.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';
import Event from './components/event.js';
import EditEvent from './components/event-edit.js';

const tripMainNode = document.querySelector(`.trip-main`);
const totalCost = data.eventsList.reduce((accum, event) => accum + event.price, 0);
tripMainNode.querySelector(`.trip-info__cost-value`).innerHTML = totalCost.toString();

const tripInfoNode = tripMainNode.querySelector(`.trip-info`);
render(tripInfoNode, new TripInfo(data.eventsList).getElement(), Enum.Position.AFTERBEGIN);

const menuNode = tripMainNode.querySelector(`.trip-controls`);
render(menuNode, new Menu(data.tripMenu).getElement(), Enum.Position.AFTERBEGIN);
render(menuNode, new Filters(data.tripFilters).getElement(), Enum.Position.BEFOREEND);

const tripListNode = document.querySelector(`.trip-events`);
render(tripListNode, createElement(createSortingTemplate()), Enum.Position.AFTERBEGIN);
render(tripListNode, createElement(createTripBoardTemplate()), Enum.Position.BEFOREEND);

const tripBoardNode = tripListNode.querySelector(`.trip-days`);
render(tripBoardNode, createElement(createTripDayTemplate()), Enum.Position.BEFOREEND);

const eventsListNode = tripBoardNode.querySelector(`.trip-events__list`);
render(eventsListNode, new EditEvent(data.eventsList[0]).getElement(), Enum.Position.BEFOREEND);
render(eventsListNode, new Event(data.eventsList[1]).getElement(), Enum.Position.BEFOREEND);

// let firstEvent;
// let overEvents;
// [firstEvent, ...overEvents] = data.eventsList;
// renderComponent(eventsListNode, createEditEventTemplate(firstEvent));

// const eventsList = overEvents.map((event) => createEventTemplate(event))
//   .join(``);
// renderComponent(eventsListNode, eventsList);
