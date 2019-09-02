import {getRandomNumber} from '../utils/utils.js';
import {getEventData, eventsData} from './events-data.js';
import {eventsListConfig, eventConfig} from '../configs.js';

//  Сгенерировать список мок-данных точек
const eventsList = new Array(getRandomNumber(eventsListConfig.minAmount, eventsListConfig.maxAmount))
  .fill(``)
  .map(() => getEventData(eventsData, eventConfig))
  .sort((a, b) => a.time.start - b.time.start);

export {eventsList};
