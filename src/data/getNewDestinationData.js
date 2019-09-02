import {eventsData, getEventData} from './events-data.js';
import {eventConfig} from '../configs.js';

const getNewDestinationData = (destination) => {

  if (!new Set([...eventsData.destination.cities,
    ...eventsData.destination.sights,
    ...eventsData.destination.eatingPoints,
    ...eventsData.destination.checkinPoints]).has(destination)) {
    return null;
  }

  const newDestinationData = getEventData(eventsData, eventConfig);
  newDestinationData.destination = destination;
  delete newDestinationData.type;
  delete newDestinationData.time;
  delete newDestinationData.isFavorite;

  return newDestinationData;
};


export {getNewDestinationData};
