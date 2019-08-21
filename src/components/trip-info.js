export const createTripInfoTemplate = ({cities, dates, citiesAmount}) =>
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${cities[0]} ${(citiesAmount > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${cities[cities.length - 1]}</h1>

    <p class="trip-info__dates">${new Date(dates.start).toDateString()}&nbsp;&mdash;&nbsp;${new Date(dates.end).toDateString()}</p>
  </div>`;
