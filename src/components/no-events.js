import AbstractComponent from './abstract.js';


class NoEvents extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}


export default NoEvents;
