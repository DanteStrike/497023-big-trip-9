import AbstractComponent from './abstract.js';


class LoadingPoints extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
}


export default LoadingPoints;
