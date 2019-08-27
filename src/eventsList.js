import {getRandomNumber} from './utils/utils.js';
import {eventConfig, eventsListConfig} from './configs.js';
import {eventsData, getEventData} from './data.js';

const eventsList = new Array(getRandomNumber(eventsListConfig.minAmount, eventsListConfig.maxAmount))
  .fill(``)
  .map(() => getEventData(eventsData, eventConfig));

export {eventsList};
