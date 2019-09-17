import TripInfo from '../components/trip-info.js';
import {Position} from '../utils/enum.js';
import {render, unrender} from '../utils/dom.js';

/** Класс представляет управление выводом информации об путешествия*/
class TripInfoController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._view = new TripInfo();
    this._tripPriceElement = container.querySelector(`.trip-info__cost-value`);
  }

  init() {
    this.update(this._points);
  }

  update(newData) {
    this._points = newData.sort((a, b) => a.time.start - b.time.start);
    this._tripPriceElement.innerHTML = `${this._getTripPrice()}`;
    //  Контроль отрисовки.
    if (newData.length === 0) {
      if (this._container.contains(this._view.getElement())) {
        unrender(this._view.getElement());
      }
      return;
    }
    if (!this._container.contains(this._view.getElement())) {
      render(this._container, this._view.getElement(), Position.AFTERBEGIN);
    }

    //  Привести данные в удобные для отрисовки вид.
    const cities = this._getCities(this._points);
    const citiesData = {
      firstCity: cities[0],
      secondCity: cities.length > 2 ? cities[1] : null,
      lastCity: cities[cities.length - 1],
      amount: cities.length
    };
    const datesData = {
      firstDay: this._points[0].time.start,
      lastDay: this._points[this._points.length - 1].time.end
    };
    //  Отрисовать изменения
    this._view.update(citiesData, datesData);
  }

  _getCities() {
    return this._points.reduce((cities, point) => {
      cities.push(point.destination.name);
      return cities;
    }, []);
  }

  _getOffersCost(offers) {
    return offers.reduce((additionalCost, offer) => {
      if (offer.accepted) {
        additionalCost += offer.price;
      }
      return additionalCost;
    }, 0);
  }

  //  ТЗ: Итоговая цена формируется из стоимости всех точек + стоимость всех принятых предложений.
  _getTripPrice() {
    return this._points.reduce((totalCost, point) => {
      totalCost += point.basePrice + this._getOffersCost(point.offers);
      return totalCost;
    }, 0);
  }

}


export default TripInfoController;
