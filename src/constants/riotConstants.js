// Regional Endpoints
export const NA = 'https://na1.api.riotgames.com';

// API Endpoints
export const SUMMONER_NAME_ENDPOINT = '/lol/summoner/v3/summoners/by-name/';
export const RANKED_POSITION_ENDPOINT = '/lol/league/v3/positions/by-summoner/';
export const MATCH_LIST_ENDPOINT = '/lol/match/v3/matchlists/by-account/';
export const MATCH_ENDPOINT = '/lol/match/v3/matches/';
export const CHAMPION_MASTERY_ENDPOINT = '/lol/champion-mastery/v3/champion-masteries/by-summoner/';
export const STATIC_CHAMPION_ENDPOINT = '/lol/static-data/v3/champions/';

// Matchmaking Queues
export const SR_DRAFT_ID = 400;
export const RANKED_SOLO_ID = 420;
export const SR_BLIND_ID = 430;
export const RANKED_FLEX_ID = 440;

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
export const BAD_REQUEST = 400;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const RATE_LIMIT_EXCEEDED = 429;

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
