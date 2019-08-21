


const filterData = {
  titles: [`Everything`, `Future`, `Past`]
};

const menuData = {
  titles: [`Table`, `Stats`]
};


const tripInfoData = {
  citys: eventsList.reduce((accum, event) => {
    if (eventConfig.destination.citys.has(event.destination)) {
      accum.push(event.destination);
    }

    return accum;
  }, []),
  dates: {
    start: eventsList[0].time.start,
    end: eventsList[eventsList.length - 1].time.end
  },

  get citysAmount() {
    return new Set(this.citys).size;
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
