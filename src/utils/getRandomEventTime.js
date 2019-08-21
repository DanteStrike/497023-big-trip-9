import {getRandomNumber, Enum} from './utils.js';


const getRandomEventTime = (past, future) => {
  let start = Date.now()
  + getRandomNumber(past, future - 1) * Enum.MILLISECONDS_IN_DAY
  + getRandomNumber(0, Enum.HOURS_IN_DAY - 1) * Enum.MILLISECONDS_IN_HOUR
  + getRandomNumber(0, Enum.MINUTES_IN_HOUR - 1) * Enum.MILLISECONDS_IN_MINUTE;

  let end = start
  + getRandomNumber(0, Enum.HOURS_IN_DAY - 1) * Enum.MILLISECONDS_IN_HOUR
  + getRandomNumber(0, Enum.MINUTES_IN_HOUR - 1) * Enum.MILLISECONDS_IN_MINUTE;

  return {
    start,
    end
  };
};


export default getRandomEventTime;
