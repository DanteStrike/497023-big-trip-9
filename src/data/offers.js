import {capitalizeFirstLetter} from '../utils/utils.js';
import {transferTypes} from '../configs.js';


class Offers {
  constructor(data) {
    this._data = data;
  }

  getTypeOffers(type) {
    const foundedOffers = this._data.find((data) => data.type === type);

    if (foundedOffers) {
      return {
        type: {
          name: foundedOffers.type,
          icon: foundedOffers.type,
          title: transferTypes.has(foundedOffers.type) ? `${capitalizeFirstLetter(foundedOffers.type)} to` : `${capitalizeFirstLetter(foundedOffers.type)} in`
        },
        offers: foundedOffers.offers.map((offer) => ({
          title: offer.name,
          price: offer.price
        }))
      };
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
