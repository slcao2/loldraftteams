import _ from 'lodash';
import { generateMockPlayer, generateListOfPlayers, DUPLICATE_PLAYER } from '../utilities/MockPlayerUtils';

const generateMirrorTeamsSingleRolePlayerList = () => {
  let playerList = [];
  playerList = _.concat(playerList, generateListOfPlayers(DUPLICATE_PLAYER, 'topplayer', 'G5', [100, 0, 0, 0, 0], 2));
  playerList = _.concat(playerList, generateListOfPlayers(DUPLICATE_PLAYER, 'jungleplayer', 'G5', [0, 100, 0, 0, 0], 2));
  playerList = _.concat(playerList, generateListOfPlayers(DUPLICATE_PLAYER, 'midplayer', 'G5', [0, 0, 100, 0, 0], 2));
  playerList = _.concat(playerList, generateListOfPlayers(DUPLICATE_PLAYER, 'adcplayer', 'G5', [0, 0, 0, 100, 0], 2));
  playerList = _.concat(playerList, generateListOfPlayers(DUPLICATE_PLAYER, 'supportplayer', 'G5', [0, 0, 0, 0, 100], 2));
  return playerList;
};

const generateNoRolesPlayedPlayerList = () => generateListOfPlayers(DUPLICATE_PLAYER, 'unrankedplayer', 'U', [0, 0, 0, 0, 0], 10);

export { generateMirrorTeamsSingleRolePlayerList, generateNoRolesPlayedPlayerList };
