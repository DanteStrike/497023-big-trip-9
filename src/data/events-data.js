import {destinationsData} from './destination-data.js';
import {eventConfig} from '../configs.js';
import {getRandomFlag, getRandomElement} from '../utils/utils.js';
import getRandomEventTime from '../utils/getRandomEventTime.js';

//  Согласно ТЗ существует две группы типов точек (transfer и activity)
const eventTypes = {
  transfer: new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]),
  activity: new Set([`check-in`, `sightseeing`, `restaurant`])
};

//  Разбить точки назначения по смыслу
const destinationTypes = {
  cities: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
  sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
  eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
  checkinPoints: new Set([`Hotel`, `Motel`])
};

// Подобрать приблизительно правдоподобную точку назначения согласно типу события.
const getRandomDestination = (eventType) => {
  switch (eventType) {
    case `flight`:
      return getRandomElement(destinationTypes.cities);

    case `check-in`:
      return getRandomElement(destinationTypes.checkinPoints);

    case `sightseeing`:
      return getRandomElement(destinationTypes.sights);

    case `restaurant`:
      return getRandomElement(destinationTypes.eatingPoints);

    default:
      return getRandomElement(new Set([...destinationTypes.cities,
        ...destinationTypes.sights,
        ...destinationTypes.eatingPoints,
        ...destinationTypes.checkinPoints]));
  }
};

//  Сгенерировать мок для 1-ой точки
const getEventData = () => {
  const randomType = getRandomElement(new Set([...eventTypes.transfer, ...eventTypes.activity]));
  const randomDestination = getRandomDestination(randomType, destinationTypes);

  return {
    type: randomType,
    destination: randomDestination,
    time: getRandomEventTime(eventConfig.periodOfTime.past, eventConfig.periodOfTime.future),
    isFavorite: getRandomFlag(),

    //  Каждому пункту назначения соответствует свое описание, цена, предложения, фотографии
    //  Все данные по точкам назначения сгенерырованы в destinationsData
    description: destinationsData[randomDestination].description,
    price: destinationsData[randomDestination].price,
    offers: destinationsData[randomDestination].offers,
    photos: destinationsData[randomDestination].photos
  };
};


export {getEventData, eventTypes, destinationTypes};
