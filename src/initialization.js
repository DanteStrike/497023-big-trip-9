import Event from './components/event.js';
import EditEvent from './components/event-edit.js';
import TripInfo from './components/trip-info.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';
import {createNoEventsTemplate} from './components/no-events.js';
import {createElement, render, Position, Key} from './utils/utils.js';

const tripMainNode = document.querySelector(`.trip-main`);
const tripListNode = document.querySelector(`.trip-events`);

export const firsInit = () => {
  tripMainNode.querySelector(`.trip-main__event-add-btn`).disabled = true;
  render(tripListNode, createElement(createNoEventsTemplate()), Position.BEFOREEND);
};

export const init = (data) => {
  const totalCost = data.eventsList.reduce((accum, event) => accum + event.price, 0);
  tripMainNode.querySelector(`.trip-info__cost-value`).innerHTML = totalCost.toString();

  const tripInfoNode = tripMainNode.querySelector(`.trip-info`);
  render(tripInfoNode, new TripInfo(data.eventsList).getElement(), Position.AFTERBEGIN);
  render(tripListNode, createElement(createSortingTemplate()), Position.AFTERBEGIN);
  render(tripListNode, createElement(createTripBoardTemplate()), Position.BEFOREEND);

  const tripBoardNode = tripListNode.querySelector(`.trip-days`);
  render(tripBoardNode, createElement(createTripDayTemplate()), Position.BEFOREEND);

  const eventsListNode = tripBoardNode.querySelector(`.trip-events__list`);

  const renderEvent = (event) => {
    const newEvent = new Event(event);
    const newEditEvent = new EditEvent(event);

    const onEscKeyDown = (evt) => {
      if (Key.ESCAPE.has(evt.key)) {
        eventsListNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onEventRollupBtnClick = () => {
      eventsListNode.replaceChild(newEditEvent.getElement(), newEvent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    newEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onEventRollupBtnClick);

    const onEditEventRollupBtnClick = () => eventsListNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
    newEditEvent.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, onEditEventRollupBtnClick);

    const onEditEventFormSubmit = (evt) => {
      evt.preventDefault();
      eventsListNode.replaceChild(newEvent.getElement(), newEditEvent.getElement());
    };
    newEditEvent.getElement().querySelector(`form`)
      .addEventListener(`submit`, onEditEventFormSubmit);

    render(eventsListNode, newEvent.getElement(), Position.BEFOREEND);
  };

  data.eventsList.map(renderEvent);
};
