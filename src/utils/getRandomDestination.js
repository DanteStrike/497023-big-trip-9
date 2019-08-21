import {getRandomElement} from './utils.js';

// Подобрать приблизительно правдоподобную точку назначения, согласно типу события.
const getRandomDestination = (type, data) => {
  switch (type) {
    case `Flight`:
      return getRandomElement(data.destination.cities);

    case `Check-in`:
      return getRandomElement(data.destination.checkinPoints);

    case `Sightseeing`:
      return getRandomElement(data.destination.sights);

    case `Restaurant`:
      return getRandomElement(data.destination.eatingPoints);

    default:
      if (data.types.transport.has(type)) {
        return getRandomElement(new Set([...data.destination.cities,
          ...data.destination.sights,
          ...data.destination.eatingPoints,
          ...data.destination.checkinPoints]));
      }
  }

  return null;
};


export default getRandomDestination;
