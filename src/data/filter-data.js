const filterData = {
  titles: [`Everything`, `Future`, `Past`]
};
const getTripFilter = (title, index) => {
  return {
    title,
    isActive: (index === 0) ? true : false
  };
};
const tripFilters = filterData.titles.map((title, index) => getTripFilter(title, index));


export {tripFilters};
