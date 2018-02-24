import request from 'request';
import {
  CHAMPION_MASTERY_ENDPOINT,
  MATCH_ENDPOINT,
  MATCH_LIST_ENDPOINT,
  RANKED_POSITION_ENDPOINT,
  SUMMONER_NAME_ENDPOINT,
  NA,
  RATE_LIMIT_EXCEEDED,
  NOT_FOUND,
  FORBIDDEN, BAD_REQUEST,
} from '../constants/riotConstants';

const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const apiKey = 'RGAPI-1d4c21d6-0a8d-4251-915f-8a4f6cc7f08f';

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
    url: corsProxy + NA + SUMMONER_NAME_ENDPOINT + summonerName,
    method: 'GET',
    headers: {
      'X-Riot-Token': apiKey,
    },
  };

  return promiseWithErrorHandler(options);
};

const getRankedData = (summonerId) => {
  const options = {
    url: corsProxy + NA + RANKED_POSITION_ENDPOINT + summonerId,
    method: 'GET',
    headers: {
      'X-Riot-Token': apiKey,
    },
  };

  return promiseWithErrorHandler(options);
};

const getMatchListForQueue = (accountId, queue) => {
  const options = {
    url: `${corsProxy + NA + MATCH_LIST_ENDPOINT + accountId}?queue=${queue}`,
    method: 'GET',
    headers: {
      'X-Riot-Token': apiKey,
    },
  };

  return promiseWithErrorHandler(options);
};

const getMatchData = (matchId) => {
  const options = {
    url: corsProxy + NA + MATCH_ENDPOINT + matchId,
    method: 'GET',
    headers: {
      'X-Riot-Token': apiKey,
    },
  };

  return promiseWithErrorHandler(options);
};

const getChampionMasteryData = (summonerId) => {
  const options = {
    url: corsProxy + NA + CHAMPION_MASTERY_ENDPOINT + summonerId,
    method: 'GET',
    headers: {
      'X-Riot-Token': apiKey,
    },
  };

  return promiseWithErrorHandler(options);
};

const getStaticChampionData = (championId) => {
  const options = {
    url: `${corsProxy }http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`, // corsProxy + NA + STATIC_CHAMPION_ENDPOINT + championId,
    method: 'GET',
    headers: {
      'X-Riot-Token': apiKey,
    },
  };

  return promiseWithErrorHandler(options);
};

export default {
  getSummonerData,
  getRankedData,
  getMatchListForQueue,
  getMatchData,
  getChampionMasteryData,
  getStaticChampionData,
};
