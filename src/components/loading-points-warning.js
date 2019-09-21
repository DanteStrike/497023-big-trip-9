import AbstractComponent from './abstract-component.js';


class LoadingPointsWarning extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
}


export default LoadingPointsWarning;
