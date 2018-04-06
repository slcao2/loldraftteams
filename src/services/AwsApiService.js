import {
  MATCH_ENDPOINT,
  MATCH_LIST_ENDPOINT,
  RANKED_POSITION_ENDPOINT,
  SUMMONER_NAME_ENDPOINT,
  BASE_ENDPOINT,
} from '../constants/riotConstants';
import { promiseWithErrorHandler } from '../utilities/HttpUtils';

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
