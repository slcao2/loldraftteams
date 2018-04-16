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
import { generateId } from './StringUtils';

export const generateBannerId = (response) => {
  switch (response.statusCode) {
    case FORBIDDEN:
      return generateId(`${FORBIDDEN_ERROR_BASE_ID}`);
    case NOT_FOUND:
      return generateId(`${NOT_FOUND_ERROR_BASE_ID}`);
    case RATE_LIMIT_EXCEEDED:
      return generateId(`${RATE_LIMIT_EXCEEDED_BASE_ID}`);
    case INTERNAL_SERVER_ERROR:
      return generateId(`${INTERNAL_SERVER_ERROR_BASE_ID}`);
    case BAD_GATEWAY:
      return generateId(`${BAD_GATEWAY_ERROR_BASE_ID}`);
    case SERVICE_UNAVAILABLE:
      return generateId(`${SERVICE_UNAVAILABLE_ERROR_BASE_ID}`);
    case GATEWAY_TIMEOUT:
      return generateId(`${GATEWAY_TIMEOUT_ERROR_BASE_ID}`);
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
