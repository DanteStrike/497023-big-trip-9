import AbstractComponent from './abstract-component.js';


class NoPointsWarning extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}


export default NoPointsWarning;
