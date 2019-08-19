
import * as utils from './utils.js';

const eventConfig = {
  types: {
    transport: new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]),
    arrival: new Set([`Check-in`, `Sightseeing`, `Restaurant`])
  },
  destination: {
    citys: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
    sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
    eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
    checkinPoints: new Set([`Hotel`, `Motel`])
  },
  descriptions: {
    sentences: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`, `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`, `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],
    minAmount: 1,
    maxAmount: 3
  },
  periodOfTime: {
    past: -1,
    future: 2
  },
  photos: {
    defaultURL: `http://picsum.photos/300/150?r=`,
    minAmount: 2,
    maxAmount: 5
  },
  price: {
    min: 0,
    max: 1000
  }
};

const offerConfig = {
  descriptions: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  price: {
    min: 0,
    max: 600
  },
  minAmount: 0,
  maxAmount: 3
};

const eventsListConfig = {
  minAmount: 20,
  maxAmount: 40
};

const tripFiltersConfig = {
  titles: new Set([`Everything`, `Future`, `Past`])
};

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

const getDayEvents = (date, dayEventsList) => ({
  date,
  dayEventsList
});

const sliceEventsByDays = (eventsList) => {
  let daysList = [];

  if (eventsList.length === 0) {
    return daysList;
  }

  const startDay = new Date(eventsList[0].time.start).setHours(0, 0, 0, 0);
  const lastDay = new Date(eventsList[eventsList.length - 1].time.start).setHours(0, 0, 0, 0);

  for (let day = startDay; day <= lastDay; day += utils.MILLISECONDS_IN_DAY) {
    let dayEvents = eventsList.filter((event) => new Date(event.time.start).setHours(0, 0, 0, 0) === day);
    daysList.push(getDayEvents(day, dayEvents));
  }

  return daysList;
};

const getFilterEvents = (title, eventsList) => {
  let daysList = [];

  switch (title) {
    case `Everything`:
      daysList = sliceEventsByDays(eventsList);
      break;

    case `Future`:
      daysList = sliceEventsByDays(eventsList.filter((event) => (Date.now() - event.time.start) < utils.MILLISECONDS_IN_MINUTE));
      break;

    case `Past`:
      daysList = sliceEventsByDays(eventsList.filter((event) => (Date.now() - event.time.end) > utils.MILLISECONDS_IN_MINUTE));
      break;

    default:
      break;
  }

  return daysList;
};

const getTripFilter = (title, eventsList) => {
  const currentTitle = title;

  return {
    title: currentTitle,
    filterEvents: getFilterEvents(currentTitle, eventsList)
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

const tripFilterData = Array.from(tripFiltersConfig.titles)
  .map((title) => getTripFilter(title, eventsList));


const tripDaysData = sliceEventsByDays(eventsList);

export {eventsList, tripInfoData, tripFilterData, tripDaysData};
