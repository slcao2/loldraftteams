import _ from 'lodash';
import update from 'immutability-helper';
import {
  TOP,
  JUNGLE,
  MID,
  DUO_CARRY,
  DUO_SUPPORT,
  mapRoleToIndex,
  mapIndexToRole,
} from '../constants/riotConstants';
import { getEnumFromShortName, getEnumWeightValue } from '../constants/RankedTierEnum';

const getWeightedRoleValues = (players, role) => {
  const roleIndex = mapRoleToIndex(role);
  const weightedValues = players.map(player => ({
    name: player.summonerName,
    value: player.roles[roleIndex] * getEnumWeightValue(getEnumFromShortName(player.rank).ordinal),
  }));
  return weightedValues;
};

const removePlayerFromWeights = (weights, playerName) => {
  const newWeights = weights.map(roleArr => _.filter(roleArr, player => player.name !== playerName));
  return newWeights;
};

const getMaxWeightPlayerForRole = (weights, roleIndex) => {
  const roleWeights = weights[roleIndex];
  let max = { value: 0 };
  roleWeights.forEach((player) => {
    max = player.value >= max.value ? player : max;
  });
  max = update(max, { role: { $set: mapIndexToRole(roleIndex) } });
  return max;
};

const getMaxWeightPlayer = (weights) => {
  let maxPlayer = { value: 0 };
  weights.forEach((roleArr, index) => {
    let max = { value: 0 };
    roleArr.forEach((player) => {
      max = player.value >= max.value ? player : max;
    });
    if (max.name && max.value >= maxPlayer.value) {
      maxPlayer = update(max, { role: { $set: mapIndexToRole(index) } });
    }
  });
  return maxPlayer;
};

const emptyRoleFromWeights = (weights, roleIndex) => update(weights, { [roleIndex]: { $set: [] } });

const addPlayersToTeams = (weights, teams) => {
  let isFirstTeam = true;
  let newTeams = update(teams, { $merge: {} });
  let newWeights = update(weights, { $merge: [] });
  
  while (_.flatten(newWeights).length) {
    const maxPlayer = getMaxWeightPlayer(newWeights);
    newTeams = update(newTeams, isFirstTeam ? { teamOne: { $push: [maxPlayer] } } : { teamTwo: { $push: [maxPlayer] } });
    newWeights = removePlayerFromWeights(newWeights, maxPlayer.name);
    const secondMaxPlayer = getMaxWeightPlayerForRole(newWeights, mapRoleToIndex(maxPlayer.role));
    newTeams = update(newTeams, isFirstTeam ? { teamTwo: { $push: [secondMaxPlayer] } } : { teamOne: { $push: [secondMaxPlayer] } });
    newWeights = removePlayerFromWeights(newWeights, secondMaxPlayer.name);
    newWeights = emptyRoleFromWeights(newWeights, mapRoleToIndex(maxPlayer.role));
    isFirstTeam = !isFirstTeam;
  }
  return newTeams;
};

const getTeamPlayers = (players) => {
  const teams = {
    teamOne: [],
    teamTwo: [],
  };

  if (players.length !== 10) {
    return teams;
  }

  const topWeights = getWeightedRoleValues(players, TOP);
  const jungleWeights = getWeightedRoleValues(players, JUNGLE);
  const midWeights = getWeightedRoleValues(players, MID);
  const duoCarryWeights = getWeightedRoleValues(players, DUO_CARRY);
  const duoSupportWeights = getWeightedRoleValues(players, DUO_SUPPORT);
  const startWeights = [topWeights, jungleWeights, midWeights, duoCarryWeights, duoSupportWeights];
  console.log(...startWeights);

  const newTeams = addPlayersToTeams(startWeights, teams);

  console.log(newTeams);
  return newTeams;
};

export default {
  getTeamPlayers,
};
