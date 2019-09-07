import Filters from "../components/trip-filters";
import {render, Position} from "../utils/utils";

class FiltersController {
  constructor(container) {
    this._container = container;
    this._filters = new Filters();
  }

  init() {
    render(this._container, this._filters.getElement(), Position.AFTEREND);
  }
}


export default FiltersController;
