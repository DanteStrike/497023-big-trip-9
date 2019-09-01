import {getRandomElement} from './utils.js';

// Подобрать приблизительно правдоподобную точку назначения, согласно типу события.
const getRandomDestination = (eventType, destinationsTypes) => {
  switch (eventType) {
    case `flight`:
      return getRandomElement(destinationsTypes.cities);

    case `check-in`:
      return getRandomElement(destinationsTypes.checkinPoints);

    case `sightseeing`:
      return getRandomElement(destinationsTypes.sights);

    case `restaurant`:
      return getRandomElement(destinationsTypes.eatingPoints);

    default:
      return getRandomElement(new Set([...destinationsTypes.cities,
        ...destinationsTypes.sights,
        ...destinationsTypes.eatingPoints,
        ...destinationsTypes.checkinPoints]));
  }
};


export default getRandomDestination;
