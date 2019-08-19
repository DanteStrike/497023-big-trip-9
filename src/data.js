
import * as utils from './utils.js';

const eventConfig = {
  types: {
    transport: new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]),
    arrival: new Set([`Check-in`, `Sightseeing`, `Restaurant`])
  },
  destination: {
    citys: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
    sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
    eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
    checkinPoints: new Set([`Hotel`, `Motel`])
  },
  descriptions: {
    sentences: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`, `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`, `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],
    minAmount: 1,
    maxAmount: 3
  },
  periodOfTime: {
    past: -1,
    future: 2
  },
  photos: {
    defaultURL: `http://picsum.photos/300/150?r=`,
    minAmount: 2,
    maxAmount: 5
  },
  price: {
    min: 0,
    max: 1000
  }
};

const offerConfig = {
  descriptions: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  price: {
    min: 0,
    max: 600
  },
  minAmount: 0,
  maxAmount: 3
};

const eventsListConfig = {
  minAmount: 20,
  maxAmount: 40
};

const tripFiltersConfig = {
  titles: new Set([`Everything`, `Future`, `Past`])
};

