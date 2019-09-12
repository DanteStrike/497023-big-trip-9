import TripInfo from '../components/trip-info.js';
import {Position} from '../utils/enum.js';
import {render, unrender} from '../utils/dom.js';


class TripInfoController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._tripInfo = new TripInfo();
    this._tripPriceElement = container.querySelector(`.trip-info__cost-value`);
  }

  init() {
    this.update(this._points);
  }

  update(newData) {
    this._points = newData.sort((a, b) => a.time.start - b.time.start);
    this._tripPriceElement.innerHTML = `${this._getTripPrice()}`;

    if (newData.length === 0) {
      if (this._container.contains(this._tripInfo.getElement())) {
        unrender(this._tripInfo.getElement());
      }
      return;
    }

    if (!this._container.contains(this._tripInfo.getElement())) {
      render(this._container, this._tripInfo.getElement(), Position.AFTERBEGIN);
    }

    const cities = this._getCities(this._points);

    const citiesData = {
      firstCity: cities[0],
      lastCity: cities[cities.length - 1],
      amount: cities.length
    };
    const datesData = {
      firstDay: this._points[0].time.start,
      lastDay: this._points[this._points.length - 1].time.end
    };

    this._tripInfo.update(citiesData, datesData);
  }

  _getOffersCost(offers) {
    return offers.reduce((accum, offer) => {
      if (offer.accepted) {
        accum += offer.price;
      }
      return accum;
    }, 0);
  }

  _getCities() {
    return this._points.reduce((cities, point) => {
      cities.push(point.destination.name);
      return cities;
    }, []);
  }

  _getTripPrice() {
    return this._points.reduce((totalCost, point) => {
      totalCost += point.basePrice;
      totalCost += point.offers.reduce((additionalCost, offer) => {
        if (offer.accepted) {
          additionalCost += offer.price;
        }
        return additionalCost;
      }, 0);
      return totalCost;
    }, 0);
  }

}


export default TripInfoController;
