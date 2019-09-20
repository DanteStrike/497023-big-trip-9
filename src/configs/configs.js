import {getAuthToken} from '../utils/utils.js';


export const transferTypes = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);

export const pointViewConfig = {
  maxOffers: 3
};

export const serverConfig = {
  endPoint: `https://htmlacademy-es-9.appspot.com/big-trip`,
  authToken: `Basic ${getAuthToken()}`
};

export const chartContainerConfig = {
  rowHeight: 50,
  minContainerHeight: 250
};
