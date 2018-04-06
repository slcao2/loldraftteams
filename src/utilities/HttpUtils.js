import request from 'request';
import {
  RATE_LIMIT_EXCEEDED,
  NOT_FOUND,
  FORBIDDEN, BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from '../constants/riotConstants';

export const blank = 0;

export const promiseWithErrorHandler = options => new Promise((resolve, reject) => {
  request(options, (error, response, body) => {
    if (response.statusCode >= INTERNAL_SERVER_ERROR) {
      reject(new Error('Server-side error. Please try again.'));
      return;
    } else if (response.statusCode === RATE_LIMIT_EXCEEDED) {
      reject(new Error('Rate limit exceeded. Please try again in 2 minutes'));
      return;
    } else if (response.statusCode === FORBIDDEN) {
      reject(new Error('API key expired. Generate new api key.'));
      return;
    } else if (response.statusCode === NOT_FOUND || response.statusCode === BAD_REQUEST) {
      resolve(undefined);
      return;
    }
    resolve(JSON.parse(body));
  });
});
