import TripInfo from '../components/trip-info';
import {render, Position, unrender} from '../utils/utils';
import {eventsData} from '../data/events-data.js';


class TripInfoController {
  constructor(container, data) {
    this._container = container;
    this._events = data;
    this._tripInfo = new TripInfo();
    this._tripPriceElement = container.querySelector(`.trip-info__cost-value`);
  }

  init() {
    this.update(this._events);
  }

  update(newData) {
    if (newData.length === 0) {
      if (this._container.contains(this._tripInfo.getElement())) {
        unrender(this._tripInfo.getElement());
        this._tripInfo.removeElement();
      }
      return;
    }

    if (!this._container.contains(this._tripInfo.getElement())) {
      render(this._container, this._tripInfo.getElement(), Position.AFTERBEGIN);
    }

    this._events = newData.sort((a, b) => a.time.start - b.time.start);
    const cities = this._getCities(this._events);

    const citiesData = {
      firstCity: cities[0],
      lastCity: cities[cities.length - 1],
      amount: cities.length
    };
    const datesData = {
      firstDay: this._events[0].time.start,
      lastDay: this._events[this._events.length - 1].time.end
    };

    this._tripInfo.update(citiesData, datesData);
    this._tripPriceElement.innerHTML = `${this._getTripPrice()}`;
  }

  _getCities() {
    return this._events.reduce((accum, event) => {
      if (eventsData.destination.cities.has(event.destination) && !accum.find((el) => el === event.destination)) {
        accum.push(event.destination);
      }

      return accum;
    }, []);
  }

  _getTripPrice() {
    return this._events.reduce((accum, event) => accum + event.price, 0);
  }

}


export default TripInfoController;
