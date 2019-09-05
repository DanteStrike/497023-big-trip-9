import {eventsData, generateTypeData} from './events-data.js';

export const getTypeData = (type) => generateTypeData(type, eventsData);
