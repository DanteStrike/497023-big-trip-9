import {getRandomNumber, shuffle} from '../utils/utils.js';
import {eventsData, getOffer} from './events-data.js';
import {eventConfig} from '../configs.js';

//  Получить с сервера данные о пункте назначения
const getNewDestinationData = (destination) => {
  const destinations = new Set([...eventsData.destination.cities,
    ...eventsData.destination.sights,
    ...eventsData.destination.eatingPoints,
    ...eventsData.destination.checkinPoints]);

  if (!destinations.has(destination)) {
    return null;
  }

  return {
    destination,
    description: shuffle(eventsData.sentences)
        .slice(0, getRandomNumber(eventConfig.sentences.minAmount, eventConfig.sentences.maxAmount))
        .join(`. `),
    price: getRandomNumber(eventConfig.price.min, eventConfig.price.max),
    offers: shuffle(eventsData.offerDescriptions)
        .slice(0, getRandomNumber(eventConfig.offer.minAmount, eventConfig.offer.maxAmount))
        .map((offerDescription) => getOffer(offerDescription, eventConfig)),
    photos: new Array(getRandomNumber(eventConfig.photos.minAmount, eventConfig.photos.maxAmount))
        .fill(``)
        .map(() => eventsData.photosDefaultURL + Math.random()),
  };
};


export {getNewDestinationData};
