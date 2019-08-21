
import {eventsData, eventsList} from './eventsList.js';


const filterData = {
  titles: [`Everything`, `Future`, `Past`]
};

const menuData = {
  titles: [`Table`, `Stats`]
};


const tripInfo = {
  cities: eventsList.reduce((accum, event) => {
    if (eventsData.destination.cities.has(event.destination)) {
      accum.push(event.destination);
    }

    return accum;
  }, []),

  dates: {
    start: eventsList[0].time.start,
    end: eventsList[eventsList.length - 1].time.end
  },

  get citiesAmount() {
    return new Set(this.cities).size;
  }
};

const getTripFilter = (title, list) => {
  const currentTitle = title;

  return {
    title: currentTitle,
    filterEvents: getFilterEvents(currentTitle, list)
  };
};


export {eventsList, tripInfoData, tripFilterData, tripDaysData};
