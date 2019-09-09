import {render, Position, hideElement, showElement} from '../utils/utils';
import Stats from '../components/stats';


class StatsController {
  constructor(container) {
    this._container = container;
    this._stats = new Stats();
  }

  init() {
    render(this._container, this._stats.getElement(), Position.BEFOREEND);
  }

  show() {
    showElement(this._stats.getElement());
  }

  hide() {
    hideElement(this._stats.getElement());
  }
}


export default StatsController;
