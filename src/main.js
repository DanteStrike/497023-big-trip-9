import {render, Position, createElement} from './utils.js';

import Menu from './components/menu.js';
import TripInfo from './components/trip-info.js';
import Filters from './components/trip-filters.js';
import Event from './components/event.js';
import EventEdit from './components/event-edit.js';

import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';

import {eventsList, menuData, tripFilterData} from './data.js';


const tripMain = document.querySelector(`.trip-main`);

const totalCost = eventsList.reduce((accum, event) => accum + event.price, 0);
tripMain.querySelector(`.trip-info__cost-value`).innerHTML = totalCost.toString();

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, new TripInfo(eventsList).getElement(), Position.AFTERBEGIN);

const tripControls = tripMain.querySelector(`.trip-controls`);
render(tripControls, new Menu(menuData).getElement(), Position.AFTERBEGIN);
render(tripControls, new Filters(tripFilterData).getElement(), Position.BEFOREEND);

const tripList = document.querySelector(`.trip-events`);
render(tripList, createElement(createSortingTemplate()), Position.AFTERBEGIN);
render(tripList, createElement(createTripBoardTemplate()), Position.BEFOREEND);

const tripBoard = tripList.querySelector(`.trip-days`);
render(tripBoard, createElement(createTripDayTemplate()), Position.BEFOREEND);

const tripEventsList = tripBoard.querySelector(`.trip-events__list`);
eventsList.forEach((eventData) => {
  const event = new Event(eventData);
  const eventEdit = new Event(eventData);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tripEventsList.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  event.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      tripEventsList.replaceChild(eventEdit.getElement(), event.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  // eventEdit.getElement().querySelector(`textarea`)
  //   .addEventListener(`focus`, () => {
  //     document.removeEventListener(`keydown`, onEscKeyDown);
  //   });

  // eventEdit.getElement().querySelector(`textarea`)
  //   .addEventListener(`blur`, () => {
  //     document.addEventListener(`keydown`, onEscKeyDown);
  //   });

  // eventEdit.getElement()
  //   .querySelector(`.event__rollup-btn`)
  //   .addEventListener(`click`, () => {
  //     tripEventsList.replaceChild(event.getElement(), eventEdit.getElement());
  //     document.removeEventListener(`keydown`, onEscKeyDown);
  //   });
  render(tripEventsList, event.getElement(), Position.BEFOREEND);
});

// //  Сформировать разметку, потом вывести
// const tripDays = tripDaysData.map((tripDay, index) => {
//   let list = ``;

//   //  Первый элемент на странице сделать event-edit
//   if (index === 0) {
//     list = tripDay.dayEventsList.map((event, ind) =>
//       (ind === 0) ? createEditEventTemplate(event) : createEventTemplate(event)).join(``);
//   } else {
//     list = tripDay.dayEventsList.map((event) => createEventTemplate(event)).join(``);
//   }

//   return createTripDayTemplate(tripDay, index, list);
// }).join(``);

// renderComponent(tripBoard, tripDays);
