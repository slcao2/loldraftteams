import PlayerMatchingService from '../services/PlayerMatchingService';

export const GET_TEAMS = 'GET_TEAMS';

export function getTeams(players) {
  const team = PlayerMatchingService.getTeamPlayers(players);
  return { type: GET_TEAMS, team };
}
