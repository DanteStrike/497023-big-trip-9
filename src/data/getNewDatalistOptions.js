import {eventsData} from './events-data.js';

const getNewDatalistOptions = (type) => {
  let options = [];

  switch (type) {
    case `flight`:
      options = Array.from(eventsData.destination.cities);
      break;

    case `check-in`:
      options = Array.from(eventsData.destination.checkinPoints);
      break;

    case `sightseeing`:
      options = Array.from(eventsData.destination.sights);
      break;

    case `restaurant`:
      options = Array.from(eventsData.destination.eatingPoints);
      break;

    default:
      options = Array.from(new Set([...eventsData.destination.cities,
        ...eventsData.destination.sights,
        ...eventsData.destination.eatingPoints,
        ...eventsData.destination.checkinPoints]));
  }

  return options;
};


export {getNewDatalistOptions};
