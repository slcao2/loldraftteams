import _ from 'lodash';
import {
  TOP,
  JUNGLE,
  MID,
  DUO_CARRY,
  DUO_SUPPORT,
  mapRoleToIndex,
  mapIndexToRole,
} from '../constants/riotConstants';
import { getEnumFromShortName } from '../constants/RankedTierEnum';

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

const addPlayerToTeam = (weights, maxIndex, teams, toggle) => {
  const maxInRole = getMaxWeightValue(weights[maxIndex]);
  maxInRole.role = mapIndexToRole(maxIndex);
  if (toggle) {
    teams.teamOne.push(maxInRole);
  } else {
    teams.teamTwo.push(maxInRole);
  }
  const newWeights = removePlayer(maxInRole.name, weights);
  return {
    newTeams: teams,
    weights: newWeights,
  };
};

// true is teamOne, false is teamTwo
const addToTeams = (weights, maxIndex, teams, firstTeam) => {
  const firstPlayerAdded = addPlayerToTeam(weights, maxIndex, teams, firstTeam);
  const secondPlayerAdded = addPlayerToTeam(firstPlayerAdded.weights, maxIndex, firstPlayerAdded.newTeams, !firstTeam);
  return secondPlayerAdded;
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
    value: player.roles[roleIndex] * getEnumFromShortName(player.rank).ordinal,
  }));
  return weightedValues;
};

const isTeamOne = (player, teams) => (!!teams.teamOne.find(name => name === player));

const listLinkError = (sameTeam, differentTeam, team) => {
  const errors = [];
  sameTeam.forEach((name, index) => {
    const onSameTeam = team.find(player => player === name);
    if (!onSameTeam) {
      errors.push(index);
    }
  });
  differentTeam.forEach((name, index) => {
    const onSameTeam = team.find(player => player === name);
    if (onSameTeam) {
      errors.push(index);
    }
  });
  return _.uniq(errors);
};

const resolveLinkedPlayer = (players, teams) => {
  const newTeams = {
    teamOne: teams.teamOne.slice(),
    teamTwo: teams.teamTwo.slice(),
  };

  let playerCount = 0;

  const findPlayerOne = player => player.summonerName === newTeams.teamOne[playerCount];
  const findPlayerTwo = player => player.summonerName === newTeams.teamTwo[playerCount];

  while (playerCount < 5) {
    const foundPlayer = players.find(findPlayerOne);
    const playerTeam = isTeamOne(foundPlayer.summonerName, newTeams) ? newTeams.teamOne : newTeams.teamTwo;
    const errors = listLinkError(foundPlayer.sameTeam, foundPlayer.differentTeam, playerTeam);
    errors.forEach((error) => {
      const swapValue = newTeams.teamOne[error];
      newTeams.teamOne[error] = newTeams.teamTwo[error];
      newTeams.teamTwo[error] = swapValue;
    });

    const secondFoundPlayer = players.find(findPlayerTwo);
    const secondPlayerTeam = isTeamOne(secondFoundPlayer.summonerName, newTeams) ? newTeams.teamOne : newTeams.teamTwo;
    const secondErrors = listLinkError(secondFoundPlayer.sameTeam, secondFoundPlayer.differentTeam, secondPlayerTeam);
    secondErrors.forEach((error) => {
      const swapValue = newTeams.teamOne[error];
      newTeams.teamOne[error] = newTeams.teamTwo[error];
      newTeams.teamTwo[error] = swapValue;
    });

    playerCount += 1;
  }

  console.log(newTeams);
  return newTeams;
};

const getTeamPlayers = (players) => {
  let teams = {
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
  let weights = [topWeights, jungleWeights, midWeights, duoCarryWeights, duoSupportWeights];
  console.log(...weights);

  /*
  Get the role that has the highest value in it.
  Put that highest value in one team, and then the closest to that value on the other team.
  Repeat until there are no more roles to go through.
   */
  const maxWeights = getMaxWeights(weights);

  let maxWeightIndex = getMaxWeightIndex(maxWeights);

  let firstTeam = true;
  while (weights[0].length) {
    const addTeams = addToTeams(weights, maxWeightIndex, teams, firstTeam);
    weights = addTeams.weights;
    teams = addTeams.newTeams;
    maxWeights[maxWeightIndex].value = 0;
    maxWeightIndex = getMaxWeightIndex(maxWeights);
    firstTeam = weights[0].length === 6 ? firstTeam : !firstTeam;// !firstTeam;
  }

  console.log(teams);

  // TODO: Doesn't work if the sameTeam players are playing in the same role on opposite teams.
  // teams = resolveLinkedPlayer(players, teams);
  return teams;
};

export default {
  getTeamPlayers,
};
