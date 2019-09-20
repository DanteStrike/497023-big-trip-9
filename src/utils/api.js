
import {toJSON} from './utils.js';
import {Method} from './enum.js';
import Destinations from '../data/destinations.js';
import Offers from '../data/offers.js';
import Point from '../data/point.js';

/** Класс представляет возможности взаимодействия с сервером.  */
class API {
  /**
   * Выставить параметры соединения.
   * @param {string} endPoint - URL сервера.
   * @param {string} authToken - токен авторизации.
   */
  constructor({endPoint, authToken}) {
    this._endPoint = endPoint;
    this._authToken = authToken;
  }

  /**
   * Получить список точек.
   * @return {Promise} Обещание - Массив Объектов Point.
   */
  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then((jsonData) => Point.parsePoints(jsonData));
  }

  /**
   * Получить список возможных точек назначения.
   * @return {Promise} Обещание - Объект Destinations.
   */
  getDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON)
      .then((jsonData) => new Destinations(jsonData));
  }

  /**
   * Получить список возможных предложений по типам.
   * @return {Promise} Обещание - Объект Offers.
   */
  getOffers() {
    return this._load({url: `offers`})
      .then(toJSON)
      .then((jsonData) => new Offers(jsonData));
  }

  /**
   * Создать точку.
   * @param {json} data - данные новой точки.
   * @return {Promise} Обещание - Объект Point.
   */
  createPoint(data) {
    return this._load({
      url: `points/`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-type': `application/json`})
    })
      .then(toJSON)
      .then((jsonData) => Point.parsePoint(jsonData));
  }

  /**
   * Обновить точку.
   * @param {number} id - ID точки, подлежащей обновлению.
   * @param {json} data - обновленные данные.
   * @return {Promise} Обещание - Объект Point.
   */
  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-type': `application/json`})
    })
      .then(toJSON)
      .then((jsonData) => Point.parsePoint(jsonData));
  }

  /**
   * Удалить точку.
   * @param {number} id - ID точки, подлежащей удалению.
   * @return {Promise} Обещание - Ответ с сервера.
   */
  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  /**
   * Сформировать запрос.
   * @param {string} url - URL запроса.
   * @param {Method} method - метод запроса.
   * @param {Headers} headers - заголовки запроса.
   * @param {json} body - тело запроса.
   * @return {Promise} Обещание - сформированный по параметрам запрос к серверу.
   */
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
