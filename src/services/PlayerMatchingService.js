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

const removePlayer = (playerName, weights) => {
  const newWeights = weights.map(role =>
    role.filter(player => player.name !== playerName));
  return newWeights;
};

const getMaxWeightValue = (weights) => {
  let max = 0;
  weights.forEach((role) => {
    max = role.value > max ? role.value : max;
  });
  return weights.find(value => max === value.value);
};

const getMaxWeightIndex = (weights) => {
  let max = 0;
  weights.forEach((role) => {
    max = role.value > max ? role.value : max;
  });
  return weights.findIndex(value => max === value.value);
};

const getMaxWeights = (weights) => {
  const maxWeightsArr = [];
  weights.forEach((role) => {
    let max = { value: 0 };
    role.forEach((player) => {
      max = player.value > max.value ? player : max;
    });
    maxWeightsArr.push(max);
  });
  return maxWeightsArr;
};

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
    const max = getMaxWeightPlayerForRole(weights, index);
    if (max.value >= maxPlayer.value) {
      maxPlayer = update(max, { role: { $set: mapIndexToRole(index) } });
    }
  });
  return maxPlayer;
};

const addPlayersToTeams = (weights, teams) => {
  let isFirstTeam = true;
  let newTeams = update(teams, { $merge: {} });
  let newWeights = update(weights, { $merge: [] });
  while (newWeights[0].length) {
    const maxPlayer = getMaxWeightPlayer(newWeights);
    newTeams = update(newTeams, isFirstTeam ? { teamOne: { $push: [maxPlayer] } } : { teamTwo: { $push: [maxPlayer] } }); // addPlayerToTeam(maxPlayer, isFirstTeam ? newTeams.teamOne : newTeams.teamTwo);
    newWeights = removePlayerFromWeights(newWeights, maxPlayer.name);
    const secondMaxPlayer = getMaxWeightPlayerForRole(newWeights, mapRoleToIndex(maxPlayer.role));
    newTeams = update(newTeams, isFirstTeam ? { teamTwo: { $push: [secondMaxPlayer] } } : { teamOne: { $push: [secondMaxPlayer] } });
    newWeights = removePlayerFromWeights(newWeights, secondMaxPlayer.name);
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

  /*
  Get the role that has the highest value in it.
  Put that highest value in one team, and then the closest to that value on the other team.
  Repeat until there are no more roles to go through.
   */
  // const maxWeights = getMaxWeights(weights);
  //
  // let maxWeightIndex = getMaxWeightIndex(maxWeights);
  //
  // let firstTeam = true;
  // while (weights[0].length) {
  //   const addTeams = addToTeams(weights, maxWeightIndex, teams, firstTeam);
  //   weights = addTeams.weights;
  //   teams = addTeams.newTeams;
  //   maxWeights[maxWeightIndex].value = 0;
  //   maxWeightIndex = getMaxWeightIndex(maxWeights);
  //   firstTeam = weights[0].length === 6 ? firstTeam : !firstTeam;// !firstTeam;
  // }

  console.log(newTeams);

  // TODO: Doesn't work if the sameTeam players are playing in the same role on opposite teams.
  // teams = resolveLinkedPlayer(players, teams);
  return newTeams;
};

export default {
  getTeamPlayers,
};
