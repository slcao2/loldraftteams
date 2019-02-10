// Regional Endpoints
export const BASE_ENDPOINT = 'https://zw2jqoghui.execute-api.us-east-1.amazonaws.com/prod';

// API Endpoints
export const SUMMONER_NAME_ENDPOINT = '/summoner';
export const RANKED_POSITION_ENDPOINT = '/league';
export const MATCH_LIST_ENDPOINT = '/matchlist';
export const MATCH_ENDPOINT = '/match';
export const CHAMPION_MASTERY_ENDPOINT = '/mastery';
export const STATIC_CHAMPION_ENDPOINT = '/lol/static-data/v3/champions/';

// Region List
export const REGION_LIST = ['BR', 'EUNE', 'EUW', 'JP', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'TR', 'RU', 'PBE'];

// Matchmaking Queues
export const SR_DRAFT_ID = '400';
export const RANKED_SOLO_ID = '420';
export const SR_BLIND_ID = '430';
export const RANKED_FLEX_ID = '440';

// Ranked Type
export const RANKED_SOLO_5x5 = 'RANKED_SOLO_5x5';
export const RANKED_FLEX_SR = 'RANKED_FLEX_SR';
export const RANKED_FLEX_TT = 'RANKED_FLEX_TT';

// Lane Constants
export const TOP = 'TOP';
export const JUNGLE = 'JUNGLE';
export const MID = 'MID';
export const BOTTOM = 'BOTTOM';
export const DUO_CARRY = 'DUO_CARRY';
export const DUO_SUPPORT = 'DUO_SUPPORT';

// Response Codes
export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const UNSUPPORTED_MEDIA_TYPE = 415;
export const RATE_LIMIT_EXCEEDED = 429;
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;

// Base Response Id
export const FORBIDDEN_ERROR_BASE_ID = 'error403';
export const NOT_FOUND_ERROR_BASE_ID = 'error404';
export const RATE_LIMIT_EXCEEDED_BASE_ID = 'error429';
export const INTERNAL_SERVER_ERROR_BASE_ID = 'error500';
export const BAD_GATEWAY_ERROR_BASE_ID = 'error502';
export const SERVICE_UNAVAILABLE_ERROR_BASE_ID = 'error503';
export const GATEWAY_TIMEOUT_ERROR_BASE_ID = 'error504';

// Required Fields
export const REQUIRED_FIELDS = ['name', 'league', 'soloMatchList', 'flexMatchList', 'draftMatchList', 'blindMatchList'];
export const MATCH_FIELDS = ['soloMatch', 'flexMatch'];
export const MASTERY_FIELDS = ['mastery'];

// Mastery Properties
export const MASTERY_PROPERTIES = ['championLevel', 'championId', 'championPoints'];

export const mapRoleToIndex = (role) => {
  switch (role) {
    case TOP:
      return 0;
    case JUNGLE:
      return 1;
    case MID:
      return 2;
    case DUO_CARRY:
      return 3;
    case DUO_SUPPORT:
      return 4;
    default:
  }
};

export const mapIndexToRole = (index) => {
  switch (index) {
    case 0:
      return TOP;
    case 1:
      return JUNGLE;
    case 2:
      return MID;
    case 3:
      return DUO_CARRY;
    case 4:
      return DUO_SUPPORT;
    default:
  }
};

export const mapRoleToAltName = (role) => {
  switch (role) {
    case TOP:
      return 'TOP';
    case JUNGLE:
      return 'JGL';
    case MID:
      return 'MID';
    case DUO_CARRY:
      return 'ADC';
    case DUO_SUPPORT:
      return 'SUP';
    default:
      return '';
  }
};
