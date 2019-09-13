import {getAuthToken} from './utils/utils';


export const transferTypes = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);

export const defaultPointData = {
  'id': null,
  'type': `flight`,
  'destination': {
    name: null,
    description: null,
    pictures: []
  },
  'date_from': Date.now(),
  'date_to': Date.now(),
  'base_price': 0,
  'offers': [],
  'is_favorite': false
};

export const pointConfig = {
  maxOffers: 3
};

export const serverConfig = {
  endPoint: `https://htmlacademy-es-9.appspot.com/big-trip`,
  authToken: `Basic ${getAuthToken()}`
};

