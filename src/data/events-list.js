import {getRandomNumber} from '../utils/utils.js';
import {eventsListConfig} from '../configs.js';
import {getEventData} from './events-data.js';

//  Сгенерировать список мок-данных точек
const eventsList = new Array(getRandomNumber(eventsListConfig.minAmount, eventsListConfig.maxAmount))
  .fill(``)
  .map(() => getEventData());

export {eventsList};
