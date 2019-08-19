export const createTripInfoTemplate = ({citys, dates, citysAmount}) =>
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${citys[0]} ${(citysAmount > 2) ? `&mdash; ... &mdash;` : `&mdash;`} ${citys[citys.length - 1]}</h1>

    <p class="trip-info__dates">${new Date(dates.start).toDateString()}&nbsp;&mdash;&nbsp;${new Date(dates.end).toDateString()}</p>
  </div>`;
