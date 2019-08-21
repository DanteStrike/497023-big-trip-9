
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


export {eventsList, tripInfoData, tripFilterData, tripDaysData};
