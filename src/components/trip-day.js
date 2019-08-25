// import AbstractComponent from './abstract.js';


// class TripDay extends AbstractComponent {
//   constructor(index, date) {
//     super();
//     this._index = index;
//     this._date = date;
//   }

//   _getTemplate() {
//     return `<li class="trip-days__item  day">
//               <div class="day__info">
//                 <span class="day__counter">${(this._index) ? this._index : ``}</span>
//                 <time class="day__date" datetime="2019-03-18">${(this._date) ? new Date(this._date) : ``}</time>
//               </div>
//               <ul class="trip-events__list"></ul>
//             </li>`;
//   }
// }


export const createTripDayTemplate = (counter, date) =>
  `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${(counter) ? counter : ``}</span>
      <time class="day__date" datetime="${(date) ? `${new Date(date).getFullYear()}-${new Date(date).getMonth()}-${new Date(date).getDate()}T${new Date(date).getHours()}:${new Date(date).getMinutes()}` : ``}">
      ${(date) ? new Date(date).toDateString() : ``}</time>
    </div>

    <ul class="trip-events__list"></ul>
  </li>`;


//  export default TripDay;
