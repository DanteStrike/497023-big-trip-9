import {getAuthToken} from './utils/utils';


export const eventConfig = {
  descriptions: {
    minAmount: 1,
    maxAmount: 3
  },
  periodOfTime: {
    past: -2,
    future: 2
  },

  sentences: {
    minAmount: 1,
    maxAmount: 3
  },
  photos: {
    minAmount: 2,
    maxAmount: 5
  },
  price: {
    min: 400,
    max: 1000
  },

  offer: {
    price: {
      min: 20,
      max: 100
    },
    minAmount: 0,
    maxAmount: 3
  }
};

export const eventsListConfig = {
  minAmount: 10,
  maxAmount: 15
};

export const serverConfig = {
  endPoint: `https://htmlacademy-es-9.appspot.com/big-trip/`,
  authToken: `Basic ${getAuthToken()}`
};

