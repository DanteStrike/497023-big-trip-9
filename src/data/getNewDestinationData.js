import {eventsData, getEventData} from './events-data.js';
import {eventConfig} from '../configs.js';

//  Получить с сервера данные о пункте назначения
const getNewDestinationData = (destination) => {

  //  Проверка существования пункта назначения
  if (!new Set([...eventsData.destination.cities,
    ...eventsData.destination.sights,
    ...eventsData.destination.eatingPoints,
    ...eventsData.destination.checkinPoints]).has(destination)) {
    return null;
  }

  //  Данные пункта назначения получаются на основе случйно сгенерированных мок-данных точки, без части полей
  const newDestinationData = getEventData(eventsData, eventConfig);
  newDestinationData.destination = destination;
  delete newDestinationData.type;
  delete newDestinationData.time;
  delete newDestinationData.isFavorite;

  return newDestinationData;
};


export {getNewDestinationData};
