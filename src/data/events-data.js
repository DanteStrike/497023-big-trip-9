import {getRandomFlag, getRandomElement, getRandomNumber, shuffle} from '../utils/utils.js';
import getRandomEventTime from '../utils/getRandomEventTime.js';
import {eventConfig} from '../configs.js';


const eventsData = {
  types: {
    transfer: new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]),
    activity: new Set([`Check-in`, `Sightseeing`, `Restaurant`])
  },
  destination: {
    cities: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
    sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
    eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
    checkinPoints: new Set([`Hotel`, `Motel`])
  },
  sentences: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`,
    `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],

  offerDescriptions: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],

  photosDefaultURL: `http://picsum.photos/300/150?r=`
};

// Подобрать приблизительно правдоподобную точку назначения согласно типу события.
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
      return getRandomElement(new Set([...data.destination.cities,
        ...data.destination.sights,
        ...data.destination.eatingPoints,
        ...data.destination.checkinPoints]));
  }
};

const getOffer = (offerDescription, config) => ({
  description: offerDescription,
  price: getRandomNumber(config.offer.price.min, config.offer.price.max),
  isActive: getRandomFlag()
});
const getEventData = (data, config) => {
  const randomType = getRandomElement(new Set([...data.types.transfer, ...data.types.activity]));

  return {
    type: randomType,
    destination: getRandomDestination(randomType, data),
    description: shuffle(data.sentences)
      .slice(0, getRandomNumber(config.sentences.minAmount, config.sentences.maxAmount))
      .join(`. `),
    time: getRandomEventTime(config.periodOfTime.past, config.periodOfTime.future),
    price: getRandomNumber(config.price.min, config.price.max),
    offers: shuffle(data.offerDescriptions)
      .slice(0, getRandomNumber(config.offer.minAmount, config.offer.maxAmount))
      .map((offerDescription) => getOffer(offerDescription, config)),
    photos: new Array(getRandomNumber(config.photos.minAmount, eventConfig.photos.maxAmount))
      .fill(``)
      .map(() => data.photosDefaultURL + Math.random()),
    isFavorite: getRandomFlag(),
  };
};


export {getEventData, eventsData};
