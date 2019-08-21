import * as data from './data.js';
import {render, Enum, createElement} from './utils/utils.js';
import TripInfo from './components/trip-info.js';
import Menu from './components/menu.js';
import Filters from './components/trip-filters.js';
import Event from './components/event.js';
import EditEvent from './components/event-edit.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTripBoardTemplate} from './components/trip-board.js';
import {createTripDayTemplate} from './components/trip-day.js';
import {createNoEventsTemplate} from './components/no-events.js';

const tripMainNode = document.querySelector(`.trip-main`);
const totalCost = data.eventsList.reduce((accum, event) => accum + event.price, 0);
tripMainNode.querySelector(`.trip-info__cost-value`).innerHTML = totalCost.toString();

const tripInfoNode = tripMainNode.querySelector(`.trip-info`);
if (data.eventsList.length !== 0) {
  render(tripInfoNode, new TripInfo(data.eventsList).getElement(), Enum.Position.AFTERBEGIN);
}

const menuNode = tripMainNode.querySelector(`.trip-controls`);
render(menuNode, new Menu(data.tripMenu).getElement(), Enum.Position.AFTERBEGIN);
render(menuNode, new Filters(data.tripFilters).getElement(), Enum.Position.BEFOREEND);

const tripListNode = document.querySelector(`.trip-events`);


const renderNoEvents = (container) => {
  render(container, createElement(createNoEventsTemplate()), Enum.Position.BEFOREEND);
};

const renderEvents = (container) => {
  render(container, createElement(createSortingTemplate()), Enum.Position.AFTERBEGIN);
  render(container, createElement(createTripBoardTemplate()), Enum.Position.BEFOREEND);

  const tripBoardNode = container.querySelector(`.trip-days`);
  render(tripBoardNode, createElement(createTripDayTemplate()), Enum.Position.BEFOREEND);

  const eventsListNode = tripBoardNode.querySelector(`.trip-events__list`);
  const renderEvent = (event) => {
    let newEvent = new Event(event);
    let newEditEvent = new EditEvent(event);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
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

    render(eventsListNode, newEvent.getElement(), Enum.Position.BEFOREEND);
  };

  data.eventsList.map(renderEvent);
};


if (data.eventsList.length === 0) {
  tripMainNode.querySelector(`.trip-main__event-add-btn`).disabled = true;
  renderNoEvents(tripListNode);
} else {
  renderEvents(tripListNode);
}
