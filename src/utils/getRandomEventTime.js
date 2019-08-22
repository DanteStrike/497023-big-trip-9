import {getRandomNumber, TimeValue} from './utils.js';


const getRandomEventTime = (past, future) => {
  let start = Date.now()
  + getRandomNumber(past, future - 1) * TimeValue.MILLISECONDS_IN_DAY
  + getRandomNumber(0, TimeValue.HOURS_IN_DAY - 1) * TimeValue.MILLISECONDS_IN_HOUR
  + getRandomNumber(0, TimeValue.MINUTES_IN_HOUR - 1) * TimeValue.MILLISECONDS_IN_MINUTE;

  let end = start
  + getRandomNumber(0, TimeValue.HOURS_IN_DAY - 1) * TimeValue.MILLISECONDS_IN_HOUR
  + getRandomNumber(0, TimeValue.MINUTES_IN_HOUR - 1) * TimeValue.MILLISECONDS_IN_MINUTE;

  return {
    start,
    end
  };
};


export default getRandomEventTime;
