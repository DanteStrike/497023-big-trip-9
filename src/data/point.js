import {capitalizeFirstLetter} from '../utils/utils.js';
import {transferTypes} from '../configs/configs.js';

/** Класс представляет адаптер между сервером и приложением по данным точек*/
class Point {
  //  Сформировать удобное/корректное для приложения представление данных
  constructor(data) {
    this.id = data[`id`];
    this.type = {
      name: data[`type`],
      icon: data[`type`],
      title: transferTypes.has(data[`type`]) ? `${capitalizeFirstLetter(data[`type`])} to` : `${capitalizeFirstLetter(data[`type`])} in`
    };
    this.destination = data[`destination`];
    this.time = {
      start: data[`date_from`],
      end: data[`date_to`]
    };
    this.basePrice = data[`base_price`];
    this.offers = data[`offers`];
    this.isFavorite = data[`is_favorite`];
  }

  //  Сформировать корректное для сервера представление данных
  toRAW() {
    return {
      'id': this.id,
      'type': this.type.name,
      'destination': this.destination,
      'date_from': this.time.start,
      'date_to': this.time.end,
      'base_price': this.basePrice,
      'offers': this.offers,
      'is_favorite': this.isFavorite
    };
  }

  //  Сформировать данные точки
  static parsePoint(pointData) {
    return new Point(pointData);
  }

  //  Сформировать массив данных точек
  static parsePoints(pointsData) {
    return pointsData.map((pointData) => new Point(pointData));
  }
}


export default Point;
