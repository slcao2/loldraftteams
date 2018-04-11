import request from 'request';
import { store } from '../index';
import {
  RATE_LIMIT_EXCEEDED,
  NOT_FOUND,
  FORBIDDEN, BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_BASE_ID,
  BAD_GATEWAY_ERROR_BASE_ID,
  SERVICE_UNAVAILABLE_ERROR_BASE_ID,
  GATEWAY_TIMEOUT_ERROR_BASE_ID,
  BAD_GATEWAY,
  SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT,
  FORBIDDEN_ERROR_BASE_ID,
  NOT_FOUND_ERROR_BASE_ID,
  RATE_LIMIT_EXCEEDED_BASE_ID,
  SUCCESS,
} from '../constants/riotConstants';
import { setSearchEnabled, setSearchDisabled } from '../actions/searchActions';
import { addBanner, removeBanner } from '../actions/bannerActions';

let idCounter = 0;

export const generateBannerId = (response) => {
  switch (response.statusCode) {
    case FORBIDDEN:
      idCounter += 1;
      return `${FORBIDDEN_ERROR_BASE_ID}_${idCounter}`;
    case NOT_FOUND:
      idCounter += 1;
      return `${NOT_FOUND_ERROR_BASE_ID}_${idCounter}`;
    case RATE_LIMIT_EXCEEDED:
      idCounter += 1;
      return `${RATE_LIMIT_EXCEEDED_BASE_ID}_${idCounter}`;
    case INTERNAL_SERVER_ERROR:
      idCounter += 1;
      return `${INTERNAL_SERVER_ERROR_BASE_ID}_${idCounter}`;
    case BAD_GATEWAY:
      idCounter += 1;
      return `${BAD_GATEWAY_ERROR_BASE_ID}_${idCounter}`;
    case SERVICE_UNAVAILABLE:
      idCounter += 1;
      return `${SERVICE_UNAVAILABLE_ERROR_BASE_ID}_${idCounter}`;
    case GATEWAY_TIMEOUT:
      idCounter += 1;
      return `${GATEWAY_TIMEOUT_ERROR_BASE_ID}_${idCounter}`;
    default:
      return 'errorGeneric';
  }
};

const generateBannerMessage = (response, body) => {
  switch (response.statusCode) {
    case FORBIDDEN:
      return 'API key expired. Please regenerate the key.';
    case NOT_FOUND:
      return `Summoner ${body} not found. Please check the spelling and region and try again.`;
    case RATE_LIMIT_EXCEEDED:
      return `Rate limit exceeded. Search will be locked. Please wait ${body} seconds before trying again.`;
    case INTERNAL_SERVER_ERROR:
    case BAD_GATEWAY:
    case SERVICE_UNAVAILABLE:
    case GATEWAY_TIMEOUT:
      return 'Internal server error. Please try again.';
    default:
      return 'Some unknown error occured. Please try again.';
  }
};

const dispatchSearchActions = (response, body) => {
  store.dispatch(setSearchDisabled());
  setTimeout(() => {
    store.dispatch(setSearchEnabled());
  }, body * 1000);
};

const dispatchBannerActions = (bannerId, bannerMessage) => {
  store.dispatch(addBanner(bannerId, bannerMessage));
  setTimeout(() => {
    store.dispatch(removeBanner(bannerId));
  }, 5000);
};

export const promiseWithErrorHandler = options => new Promise((resolve, reject) => {
  request(options, (error, response, body) => {
    const bannerId = generateBannerId(response);
    const bannerMessage = generateBannerMessage(response, body);
    switch (response.statusCode) {
      case SUCCESS:
        resolve(JSON.parse(body));
        return;
      case FORBIDDEN:
        dispatchBannerActions(bannerId, bannerMessage);
        reject(new Error('Forbidden'));
        return;
      case NOT_FOUND:
        dispatchBannerActions(bannerId, bannerMessage);
        resolve(undefined);
        return;
      case RATE_LIMIT_EXCEEDED:
        dispatchBannerActions(bannerId, bannerMessage);
        dispatchSearchActions(response, parseInt(body, 10));
        reject(new Error('Rate Limit Exceeded'));
        return;
      case INTERNAL_SERVER_ERROR:
      case BAD_GATEWAY:
      case SERVICE_UNAVAILABLE:
      case GATEWAY_TIMEOUT:
        dispatchBannerActions(bannerId, bannerMessage);
        reject(new Error('Server-side Error'));
        return;
      default:
        dispatchBannerActions(bannerId, bannerMessage);
        reject(new Error('Some unknown error occured. Please try again.'));
    }
  });
});
