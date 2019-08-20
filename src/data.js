
import * as utils from './utils.js';
import {eventConfig, offerConfig, eventsListConfig, tripFiltersConfig, menuConfig} from './configs.js';

// Подобрать приблизительно правдоподобную точку назначения, согласно типу события.
const getRandomDestination = (type) => {
  if (type === `Flight`) {
    return utils.getRandomElement(eventConfig.destination.citys);
  }

  if (type === `Check-in`) {
    return utils.getRandomElement(eventConfig.destination.checkinPoints);
  }

  if (type === `Sightseeing`) {
    return utils.getRandomElement(eventConfig.destination.sights);
  }

  if (type === `Restaurant`) {
    return utils.getRandomElement(eventConfig.destination.eatingPoints);
  }

  if (eventConfig.types.transport.has(type)) {
    return utils.getRandomElement(new Set([...eventConfig.destination.citys,
      ...eventConfig.destination.sights,
      ...eventConfig.destination.eatingPoints,
      ...eventConfig.destination.checkinPoints]));
  }

  return `Error`;
};

//  Срандомить начало и конец события
const getRandomEventTime = (past, future) => {
  let start = Date.now()
  + utils.getRandomNumber(past, future - 1) * utils.MILLISECONDS_IN_DAY
  + utils.getRandomNumber(0, utils.HOURS_IN_DAY - 1) * utils.MILLISECONDS_IN_HOUR
  + utils.getRandomNumber(0, utils.MINUTES_IN_HOUR - 1) * utils.MILLISECONDS_IN_MINUTE;

  let end = start
  + utils.getRandomNumber(0, utils.HOURS_IN_DAY - 1) * utils.MILLISECONDS_IN_HOUR
  + utils.getRandomNumber(0, utils.MINUTES_IN_HOUR - 1) * utils.MILLISECONDS_IN_MINUTE;

  return {
    start,
    end
  };
};

const getOffer = (offerDescription) => ({
  description: offerDescription,
  price: utils.getRandomNumber(offerConfig.price.min, offerConfig.price.max),
  isCheck: utils.getRandomFlag()
});

const getEventData = () => {
  const randomType = utils.getRandomElement(new Set([...eventConfig.types.transport, ...eventConfig.types.arrival]));

  return {
    type: randomType,
    destination: getRandomDestination(randomType),
    description: utils.shuffle(eventConfig.descriptions.sentences)
      .slice(0, utils.getRandomNumber(eventConfig.descriptions.minAmount, eventConfig.descriptions.maxAmount))
      .join(`. `),
    time: getRandomEventTime(eventConfig.periodOfTime.past, eventConfig.periodOfTime.future),
    price: utils.getRandomNumber(eventConfig.price.min, eventConfig.price.max),
    offers: utils.shuffle(offerConfig.descriptions)
      .slice(0, utils.getRandomNumber(offerConfig.minAmount, offerConfig.maxAmount))
      .map((offerDescription) => getOffer(offerDescription)),
    photos: new Array(utils.getRandomNumber(eventConfig.photos.minAmount, eventConfig.photos.maxAmount))
      .fill(``)
      .map(() => eventConfig.photos.defaultURL + Math.random()),
    isFavorite: utils.getRandomFlag(),

    //  Геттеры для удобного вывода в шаблон компонента event-edit и event
    get isTransportType() {
      return eventConfig.types.transport.has(this.type);
    },
    get timeDuration() {
      return {
        duration: this.time.end - this.time.start,

        get days() {
          return Math.floor(this.duration / utils.MILLISECONDS_IN_DAY);
        },
        get hours() {
          return Math.floor((this.duration - this.days * utils.MILLISECONDS_IN_DAY) / utils.MILLISECONDS_IN_HOUR);
        },
        get minutes() {
          return Math.floor((this.duration - this.days * utils.MILLISECONDS_IN_DAY - this.hours * utils.MILLISECONDS_IN_HOUR) / utils.MILLISECONDS_IN_MINUTE);
        }
      };
    }
  };
};

const eventsList = new Array(utils.getRandomNumber(eventsListConfig.minAmount, eventsListConfig.maxAmount))
  .fill(``)
  .map(() => getEventData())
  .sort((a, b) => a.time.start - b.time.start);

const tripInfoData = {
  citys: eventsList.reduce((accum, event) => {
    if (eventConfig.destination.citys.has(event.destination)) {
      accum.push(event.destination);
    }

    return accum;
  }, []),
  dates: {
    start: eventsList[0].time.start,
    end: eventsList[eventsList.length - 1].time.end
  },

  get citysAmount() {
    return new Set(this.citys).size;
  }
};

const tripFilterData = Array.from(tripFiltersConfig.titles);

const menuData = Array.from(menuConfig.titles);

export {eventsList, tripInfoData, menuData, tripFilterData};
