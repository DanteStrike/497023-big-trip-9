import {eventsData, generateTypeData} from './events-data.js';
import {eventConfig} from '../configs.js';

export const getTypeData = () => generateTypeData(eventsData, eventConfig);
