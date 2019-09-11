import {getAuthToken} from './utils/utils';


export const transferTypes = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);

export const pointConfig = {
  maxOffers: 3
};

export const serverConfig = {
  endPoint: `https://htmlacademy-es-9.appspot.com/big-trip/`,
  authToken: `Basic ${getAuthToken()}`
};

