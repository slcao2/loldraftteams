import { generateMirrorTeamsSingleRolePlayerList, generateNoRolesPlayedPlayerList } from '../../mock_data/mockPlayerList';
import PlayerMatchingService from '../PlayerMatchingService';
import { TOP, JUNGLE, MID, DUO_CARRY, DUO_SUPPORT } from '../../constants/riotConstants';

let playerList;
let teams;

const hasOneOfEachRole = (team) => {
  const truthArray = [false, false, false, false, false];
  let hasOneOfEach = true;
  team.forEach((player) => {
    const roleIndex = player.role;
    if (truthArray[roleIndex]) {
      hasOneOfEach = false;
    }
    truthArray[roleIndex] = true;
  });
  return hasOneOfEach;
};

const expectToBeRole = (team, role, name) => {
  const teamRolePlayer = team.find(player => player.role === role);
  expect(teamRolePlayer.role).toBe(role);
  expect(teamRolePlayer.name).toContain(name);
};

describe('Generates teams successfully', () => {
  describe('Mirrored players for each role', () => {
    beforeEach(() => {
      playerList = generateMirrorTeamsSingleRolePlayerList();
      teams = PlayerMatchingService.getTeamPlayers(playerList);
    });

    it('should generate teams with 5 players per team', () => {
      expect(teams.teamOne.length).toBe(5);
      expect(teams.teamTwo.length).toBe(5);
    });

    it('should generate teams with one of each role on each team', () => {
      expect(hasOneOfEachRole(teams.teamOne)).toBe(true);
      expect(hasOneOfEachRole(teams.teamTwo)).toBe(true);
    });

    describe('Players in correct role', () => {
      it('should generate teams with topplayer in the TOP role', () => {
        expectToBeRole(teams.teamOne, TOP, 'topplayer');
        expectToBeRole(teams.teamTwo, TOP, 'topplayer');
      });

      it('should generate teams with jungleplayer in the JUNGLE role', () => {
        expectToBeRole(teams.teamOne, JUNGLE, 'jungleplayer');
        expectToBeRole(teams.teamTwo, JUNGLE, 'jungleplayer');
      });

      it('should generate teams with midplayer in the MID role', () => {
        expectToBeRole(teams.teamOne, MID, 'midplayer');
        expectToBeRole(teams.teamTwo, MID, 'midplayer');
      });

      it('should generate teams with adcplayer in the DUO_CARRY role', () => {
        expectToBeRole(teams.teamOne, DUO_CARRY, 'adcplayer');
        expectToBeRole(teams.teamTwo, DUO_CARRY, 'adcplayer');
      });

      it('should generate teams with supportplayer in the DUO_SUPPORT role', () => {
        expectToBeRole(teams.teamOne, DUO_SUPPORT, 'supportplayer');
        expectToBeRole(teams.teamTwo, DUO_SUPPORT, 'supportplayer');
      });
    });
  });

  describe('No players have a rank or role', () => {
    beforeEach(() => {
      playerList = generateNoRolesPlayedPlayerList();
      teams = PlayerMatchingService.getTeamPlayers(playerList);
    });

    it('should generate teams with 5 players per team', () => {
      expect(teams.teamOne.length).toBe(5);
      expect(teams.teamTwo.length).toBe(5);
    });

    it('should generate teams with one of each role on each team', () => {
      expect(hasOneOfEachRole(teams.teamOne)).toBe(true);
      expect(hasOneOfEachRole(teams.teamTwo)).toBe(true);
    });
  });
});
