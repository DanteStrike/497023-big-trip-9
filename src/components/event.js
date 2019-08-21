export const createEventTemplate = ({type, isTransportType, destination, time, timeDuration, price, offers}) =>
  `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${isTransportType ? `to` : `into`} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time"
            datetime="${new Date(time.start).getFullYear()}-${new Date(time.start).getMonth()}-${new Date(time.start).getDate()}T${new Date(time.start).getHours()}:${new Date(time.start).getMinutes()}"
            >${new Date(time.start).getHours()}:${new Date(time.start).getMinutes()}</time>
          —
          <time class="event__end-time" datetime="${new Date(time.end).getFullYear()}-${new Date(time.end).getMonth()}-${new Date(time.end).getDate()}T${new Date(time.end).getHours()}:${new Date(time.end).getMinutes()}">
          ${new Date(time.end).getHours()}:${new Date(time.end).getMinutes()}</time>
        </p>
        <p class="event__duration">
          ${timeDuration.days !== 0 ? `${timeDuration.days}D` : ``} ${timeDuration.hours !== 0 ? `${timeDuration.hours}H` : ``} ${timeDuration.minutes !== 0 ? `${timeDuration.minutes}M` : ``}</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map((offer) => `<li class="event__offer" ${offer.isCheck ? `` : `style="color: gray;"`}>
        <span class="event__offer-title" ${offer.isCheck ? `` : `style="color: gray;"`}>${offer.description}</span>
        +
        €&nbsp;<span class="event__offer-price" ${offer.isCheck ? `` : `style="color: gray;"`}>${offer.price}</span>
        </li>`).join(``)}

      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`.trim();
