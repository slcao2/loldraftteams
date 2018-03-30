import request from 'request';
import {
  MATCH_ENDPOINT,
  MATCH_LIST_ENDPOINT,
  RANKED_POSITION_ENDPOINT,
  SUMMONER_NAME_ENDPOINT,
  BASE_ENDPOINT,
  RATE_LIMIT_EXCEEDED,
  NOT_FOUND,
  FORBIDDEN, BAD_REQUEST,
} from '../constants/riotConstants';

// TODO: Create promise handler for errors from request
const promiseWithErrorHandler = options => new Promise((resolve, reject) => {
  request(options, (error, response, body) => {
    if (response.statusCode === RATE_LIMIT_EXCEEDED) {
      reject(new Error('Rate limit exceeded. Please try again in 2 minutes'));
    } else if (response.statusCode === FORBIDDEN) {
      reject(new Error('API key expired. Generate new api key.'));
    } else if (response.statusCode === NOT_FOUND || response.statusCode === BAD_REQUEST) {
      resolve(undefined);
    }
    resolve(JSON.parse(body));
  });
});


const getSummonerData = (summonerName) => {
  const options = {
    url: `${BASE_ENDPOINT + SUMMONER_NAME_ENDPOINT}/${summonerName}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getRankedData = (summonerName, summonerId) => {
  const options = {
    url: `${BASE_ENDPOINT + RANKED_POSITION_ENDPOINT}/${summonerName}/${summonerId}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getMatchListForQueue = (summonerName, accountId, queue) => {
  const options = {
    url: `${BASE_ENDPOINT + MATCH_LIST_ENDPOINT}/${summonerName}/${accountId}/${queue}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getMatchData = (summonerName, gameId, queueId) => {
  const options = {
    url: `${BASE_ENDPOINT + MATCH_ENDPOINT}/${summonerName}/${gameId}/${queueId}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

export default {
  getSummonerData,
  getRankedData,
  getMatchListForQueue,
  getMatchData,
};
