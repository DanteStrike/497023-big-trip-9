import {getAuthToken} from './utils/utils';


export const eventConfig = {
  maxOffers: 3
};

export const serverConfig = {
  endPoint: `https://htmlacademy-es-9.appspot.com/big-trip/`,
  authToken: `Basic ${getAuthToken()}`
};

