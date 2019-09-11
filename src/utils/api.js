
import {toJSON} from './utils.js';
import {Method} from './enum.js';
import Destinations from '../data/destinations.js';
import Offers from '../data/offers.js';
import Point from '../data/point.js';


class API {
  constructor({endPoint, authToken}) {
    this._endPoint = endPoint;
    this._authToken = authToken;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then((jsonData) => Point.parsePoints(jsonData));
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON)
      .then((jsonData) => new Destinations(jsonData));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(toJSON)
      .then((jsonData) => new Offers(jsonData));
  }

  createPoint({point}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-type': `application/json`})
    })
      .then(toJSON);
  }

  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-type': `application/json`})
    })
      .then(toJSON);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, headers = new Headers(), body = null}) {
    headers.append(`Authorization`, this._authToken);

    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    };

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}


export default API;
