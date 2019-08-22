
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
    start: (eventsList.length !== 0) ? eventsList[0].time.start : 0,
    end: (eventsList.length !== 0) ? eventsList[eventsList.length - 1].time.end : 0
  },

  get citiesAmount() {
    return new Set(this.cities).size;
  }
};

const getTripFilter = (title, index) => {
  return {
    title,
    isActive: (index === 0) ? true : false
  };
};
const tripFilters = filterData.titles.map((title, index) => getTripFilter(title, index));

const getMenuItem = (title, index) => {
  return {
    title,
    isActive: (index === 0) ? true : false
  };
};
const tripMenu = menuData.titles.map((title, index) => getMenuItem(title, index));


export {eventsList, tripInfo, tripFilters, tripMenu};
