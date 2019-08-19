export const createTripDayTemplate = ({date}, index, dayEventsList = ``) =>
  `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="${new Date(date).getFullYear()}-${new Date(date).getMonth()}-${new Date(date).getDate()}T${new Date(date).getHours()}:${new Date(date).getMinutes()}">
      ${new Date(date).toDateString()}</time>
    </div>

    <ul class="trip-events__list">${dayEventsList}</ul>
  </li>`;
