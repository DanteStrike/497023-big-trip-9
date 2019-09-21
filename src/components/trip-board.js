import AbstractComponent from './abstract-component.js';


class TripBoard extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}


export default TripBoard;
