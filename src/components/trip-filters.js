export const createTripFiltersTemplate = (filters) =>
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${filters[0].isActive ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-everything">${filters[0].title}</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future"  ${filters[1].isActive ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-future">${filters[1].title}</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"  ${filters[2].isActive ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-past">${filters[2].title}</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
