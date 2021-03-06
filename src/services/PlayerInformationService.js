import _ from 'lodash';
import AwsApiService from './AwsApiService';
import {
  SR_BLIND_ID,
  SR_DRAFT_ID,
  RANKED_SOLO_ID,
  RANKED_FLEX_ID,
  RANKED_SOLO_5x5,
  RANKED_FLEX_SR,
  TOP,
  JUNGLE,
  MID,
  BOTTOM,
  DUO_CARRY,
  DUO_SUPPORT,
  REQUIRED_FIELDS,
  MATCH_FIELDS,
  MASTERY_FIELDS,
  MASTERY_PROPERTIES,
} from '../constants/riotConstants';
import RankedTierEnum from '../constants/RankedTierEnum';

const getParticipantId = (summonerId, participants) => {
  const summoner = participants.find(participant =>
    participant.player.summonerId === summonerId);
  return summoner ? summoner.participantId : undefined;
};

const getHighestRankForSeasonFromMatch = (summonerId, match) => {
  const participantId = getParticipantId(summonerId, match.participantIdentities);
  const summoner = match.participants.find(participant =>
    participant.participantId === participantId);
  return summoner ? summoner.highestAchievedSeasonTier : undefined;
};

const getRankForCurrentSeason = (ranks, league) => {
  const leagueRank = ranks.find(rank => rank.queueType === league);
  const rank = leagueRank ? `${leagueRank.tier}_${leagueRank.rank}` : undefined;
  return rank;
};

const calculateEffectiveSummonerRank = (summoner, ranked, soloMatch, flexMatch) => {
  const currentSoloRank = ranked ? getRankForCurrentSeason(ranked, RANKED_SOLO_5x5) : undefined;
  const currentFlexRank = ranked ? getRankForCurrentSeason(ranked, RANKED_FLEX_SR) : undefined;
  const lastSoloRank = soloMatch ? getHighestRankForSeasonFromMatch(summoner.id, soloMatch) : undefined;
  const lastFlexRank = flexMatch ? getHighestRankForSeasonFromMatch(summoner.id, flexMatch) : undefined;

  if (currentSoloRank && currentSoloRank !== RankedTierEnum.UNRANKED.name &&
    RankedTierEnum[currentSoloRank].ordinal >= (lastSoloRank ? RankedTierEnum[lastSoloRank].ordinal : RankedTierEnum.UNRANKED.ordinal)) {
    return currentSoloRank;
  } else if (lastSoloRank && lastSoloRank !== RankedTierEnum.UNRANKED.name) {
    return RankedTierEnum[lastSoloRank] === RankedTierEnum.MASTER || RankedTierEnum[lastSoloRank] === RankedTierEnum.CHALLENGER ? `${lastSoloRank}_I` : `${lastSoloRank}_V`;
  } else if (currentFlexRank && currentFlexRank !== RankedTierEnum.UNRANKED.name &&
    RankedTierEnum[currentFlexRank].ordinal >= (lastFlexRank ? RankedTierEnum[lastFlexRank].ordinal : RankedTierEnum.UNRANKED.ordinal)) {
    return currentFlexRank;
  } else if (lastFlexRank && lastFlexRank !== RankedTierEnum.UNRANKED.name) {
    return RankedTierEnum[lastFlexRank] === RankedTierEnum.MASTER || RankedTierEnum[lastFlexRank] === RankedTierEnum.CHALLENGER ? `${lastFlexRank}_I` : `${lastFlexRank}_V`;
  }
  return RankedTierEnum.UNRANKED.name;
};

const aggregatePositionCount = (list) => {
  const initialCount = {
    TOP: 0,
    JUNGLE: 0,
    MID: 0,
    DUO_CARRY: 0,
    DUO_SUPPORT: 0,
  };
  const positionCount = list ? list.reduce((acc, match) => {
    const newAcc = Object.assign({}, acc);
    switch (match.lane) {
      case TOP:
        newAcc.TOP += 1;
        break;
      case JUNGLE:
        newAcc.JUNGLE += 1;
        break;
      case MID:
        newAcc.MID += 1;
        break;
      case BOTTOM:
        if (match.role === DUO_CARRY) {
          newAcc.DUO_CARRY += 1;
        } else if (match.role === DUO_SUPPORT) {
          newAcc.DUO_SUPPORT += 1;
        }
        break;
      default:
    }
    return newAcc;
  }, initialCount) : initialCount;
  return positionCount;
};

const combineAndWeightPositionCounts = (solo, flex, draft, blind) => {
  const soloWeight = 2.25;
  const flexWeight = 1.5;
  const draftWeight = 1;
  const blindWeight = 0.75;
  return (solo * soloWeight) + (flex * flexWeight) + (draft * draftWeight) + (blind * blindWeight);
};

const applyWeightedPositions = (positions) => {
  const totalPoints = positions.TOP + positions.JUNGLE + positions.MID +
    positions.DUO_CARRY + positions.DUO_SUPPORT;
  const percentages = [];
  percentages.push(totalPoints ? positions.TOP / totalPoints : 0);
  percentages.push(totalPoints ? positions.JUNGLE / totalPoints : 0);
  percentages.push(totalPoints ? positions.MID / totalPoints : 0);
  percentages.push(totalPoints ? positions.DUO_CARRY / totalPoints : 0);
  percentages.push(totalPoints ? positions.DUO_SUPPORT / totalPoints : 0);
  return percentages;
  // const calculatedPositions = [];
  // const primaryIndex = getHighestPercentagePosition(percentages);
  // calculatedPositions.push(mapIndexToRole(primaryIndex));
  // percentages[primaryIndex] = 0;
  // const secondaryIndex = getHighestPercentagePosition(percentages);
  // calculatedPositions.push(mapIndexToRole(secondaryIndex));
  // return calculatedPositions;
};

const calculateDefaultPositions = (soloList, flexList, draftList, blindList) => {
  const rankedSoloPositions = aggregatePositionCount(soloList);
  const rankedFlexPositions = aggregatePositionCount(flexList);
  const draftPositions = aggregatePositionCount(draftList);
  const blindPositions = aggregatePositionCount(blindList);

  const weightedPositions = {
    TOP: combineAndWeightPositionCounts(
      rankedSoloPositions.TOP,
      rankedFlexPositions.TOP,
      draftPositions.TOP,
      blindPositions.TOP,
    ),
    JUNGLE: combineAndWeightPositionCounts(
      rankedSoloPositions.JUNGLE,
      rankedFlexPositions.JUNGLE,
      draftPositions.JUNGLE,
      blindPositions.JUNGLE,
    ),
    MID: combineAndWeightPositionCounts(
      rankedSoloPositions.MID,
      rankedFlexPositions.MID,
      draftPositions.MID,
      blindPositions.MID,
    ),
    DUO_CARRY: combineAndWeightPositionCounts(
      rankedSoloPositions.DUO_CARRY,
      rankedFlexPositions.DUO_CARRY,
      draftPositions.DUO_CARRY,
      blindPositions.DUO_CARRY,
    ),
    DUO_SUPPORT: combineAndWeightPositionCounts(
      rankedSoloPositions.DUO_SUPPORT,
      rankedFlexPositions.DUO_SUPPORT,
      draftPositions.DUO_SUPPORT,
      blindPositions.DUO_SUPPORT,
    ),
  };
  return applyWeightedPositions(weightedPositions);
};

const hasRequiredData = (summonerData, requiredFields) => {
  let containsRequiredData = true;
  const summonerDataKeys = _.keys(summonerData);
  requiredFields.forEach((field) => {
    if (!summonerDataKeys.includes(field)) {
      containsRequiredData = false;
    }
  });
  return containsRequiredData;
};

const filterProperties = (object, properties) => _.pick(object, properties);

const getPlayerData = async (summonerName, region) => {
  let rankedData;
  let rankedSoloMatchData;
  let rankedFlexMatchData;
  let draftMatchData;
  let blindMatchData;
  let latestSoloMatchData;
  let latestFlexMatchData;
  let championMasteryData;
  const summonerData = await AwsApiService.getSummonerData(summonerName, region);

  if (hasRequiredData(summonerData, REQUIRED_FIELDS)) {
    rankedData = summonerData.league;

    rankedSoloMatchData = summonerData.soloMatchList;
    rankedFlexMatchData = summonerData.flexMatchList;
    draftMatchData = summonerData.draftMatchList;
    blindMatchData = summonerData.blindMatchList;

    if (hasRequiredData(summonerData, MATCH_FIELDS)) {
      latestSoloMatchData = summonerData.soloMatch;
      latestFlexMatchData = summonerData.flexMatch;
    } else {
      latestSoloMatchData = rankedSoloMatchData.matches ?
        await AwsApiService.getMatchData(summonerData.name, rankedSoloMatchData.matches[0].gameId, RANKED_SOLO_ID, region) : undefined;
      latestFlexMatchData = rankedFlexMatchData.matches ?
        await AwsApiService.getMatchData(summonerData.name, rankedFlexMatchData.matches[0].gameId, RANKED_FLEX_ID, region) : undefined;
    }

    if (hasRequiredData(summonerData, MASTERY_FIELDS)) {
      championMasteryData = summonerData.mastery;
    } else {
      championMasteryData = summonerData ?
        await AwsApiService.getChampionMasteryData(summonerData.name, summonerData.id, region) : undefined;
    }
  } else {
    rankedData = summonerData ? await AwsApiService.getRankedData(summonerData.name, summonerData.id, region) : undefined;

    rankedSoloMatchData = summonerData ?
      await AwsApiService.getMatchListForQueue(summonerData.name, summonerData.accountId, RANKED_SOLO_ID, region) : undefined;
    rankedFlexMatchData = summonerData ?
      await AwsApiService.getMatchListForQueue(summonerData.name, summonerData.accountId, RANKED_FLEX_ID, region) : undefined;
    blindMatchData = summonerData ?
      await AwsApiService.getMatchListForQueue(summonerData.name, summonerData.accountId, SR_BLIND_ID, region) : undefined;
    draftMatchData = summonerData ?
      await AwsApiService.getMatchListForQueue(summonerData.name, summonerData.accountId, SR_DRAFT_ID, region) : undefined;

    latestSoloMatchData = rankedSoloMatchData.matches ?
      await AwsApiService.getMatchData(summonerData.name, rankedSoloMatchData.matches[0].gameId, RANKED_SOLO_ID, region) : undefined;
    latestFlexMatchData = rankedFlexMatchData.matches ?
      await AwsApiService.getMatchData(summonerData.name, rankedFlexMatchData.matches[0].gameId, RANKED_FLEX_ID, region) : undefined;

    championMasteryData = summonerData ?
      await AwsApiService.getChampionMasteryData(summonerData.name, summonerData.id, region) : undefined;
  }

  const playerData = {};
  const effectiveRank = calculateEffectiveSummonerRank(
    summonerData,
    rankedData,
    latestSoloMatchData,
    latestFlexMatchData,
  );
  const defaultPositions = calculateDefaultPositions(
    rankedSoloMatchData ? rankedSoloMatchData.matches : undefined,
    rankedFlexMatchData ? rankedFlexMatchData.matches : undefined,
    draftMatchData ? draftMatchData.matches : undefined,
    blindMatchData ? blindMatchData.matches : undefined,
  );
  playerData.summonerName = summonerData.name;
  playerData.rank = RankedTierEnum[effectiveRank].shortName;
  playerData.roles = defaultPositions;
  playerData.mastery = _.slice(championMasteryData, 0, 3).map(mastery => filterProperties(mastery, MASTERY_PROPERTIES));

  return playerData;
};

export default {
  getPlayerData,
};
