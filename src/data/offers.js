import {capitalizeFirstLetter} from '../utils/utils.js';
import {transferTypes} from '../configs/configs.js';

/** Класс представляет адаптер между сервером и приложением по возможным предложениям*/
class Offers {
  constructor(data) {
    this._data = data.map((element) => ({
      type: {
        name: element.type,
        icon: element.type,
        title: transferTypes.has(element.type) ? `${capitalizeFirstLetter(element.type)} to` : `${capitalizeFirstLetter(element.type)} in`
      },
      offers: element.offers.map((offer) => ({
        title: offer.name,
        price: offer.price
      }))
    }));
  }

  getTypeOffers(type) {
    const foundedData = this._data.find((data) => data.type.name === type);
    if (foundedData) {
      return foundedData;
    }

    return {
      type: {
        name: type,
        icon: type,
        title: transferTypes.has(type) ? `${capitalizeFirstLetter(type)} to` : `${capitalizeFirstLetter(type)} in`
      },
      offers: []
    };
  }
}


export default Offers;
