import {eventsData, getRandomDestinationData} from './events-data.js';
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

  return getRandomDestinationData(eventsData, eventConfig);
};


export {getNewDestinationData};
