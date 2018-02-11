export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export function removePlayer(player) {
  return { type: REMOVE_PLAYER, player };
}
