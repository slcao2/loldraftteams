import {
  MATCH_ENDPOINT,
  MATCH_LIST_ENDPOINT,
  RANKED_POSITION_ENDPOINT,
  SUMMONER_NAME_ENDPOINT,
  BASE_ENDPOINT,
  CHAMPION_MASTERY_ENDPOINT,
} from '../constants/riotConstants';
import { promiseWithErrorHandler } from '../utilities/HttpUtils';

const getSummonerData = (summonerName, region) => {
  const options = {
    url: `${BASE_ENDPOINT + SUMMONER_NAME_ENDPOINT}/${region}/${summonerName}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getRankedData = (summonerName, summonerId, region) => {
  const options = {
    url: `${BASE_ENDPOINT + RANKED_POSITION_ENDPOINT}/${region}/${summonerName}/${summonerId}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getMatchListForQueue = (summonerName, accountId, queue, region) => {
  const options = {
    url: `${BASE_ENDPOINT + MATCH_LIST_ENDPOINT}/${region}/${summonerName}/${accountId}/${queue}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getMatchData = (summonerName, gameId, queueId, region) => {
  const options = {
    url: `${BASE_ENDPOINT + MATCH_ENDPOINT}/${region}/${summonerName}/${gameId}/${queueId}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

const getChampionMasteryData = (summonerName, summonerId, region) => {
  const options = {
    url: `${BASE_ENDPOINT + CHAMPION_MASTERY_ENDPOINT}/${region}/${summonerName}/${summonerId}`,
    method: 'GET',
  };

  return promiseWithErrorHandler(options);
};

export default {
  getSummonerData,
  getRankedData,
  getMatchListForQueue,
  getMatchData,
  getChampionMasteryData,
};
