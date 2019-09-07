import {getRandomNumber} from '../utils/utils.js';
import {getEventData, eventsData} from './events-data.js';
import {eventsListConfig, eventConfig} from '../configs.js';

//  Сгенерировать список мок-данных точек
const eventsListMock = new Array(getRandomNumber(eventsListConfig.minAmount, eventsListConfig.maxAmount))
  .fill(``)
  .map((el, index) => getEventData(eventsData, eventConfig, index))
  .sort((a, b) => a.time.start - b.time.start);

export {eventsListMock};
