import React from 'react';
import PropTypes from 'prop-types';

import Player from './Player';
import RankedTierEnum from '../../constants/RankedTierEnum';

const PlayerList = ({ players, handleRemoveClick }) => {
  const getRankColorClass = (rank) => {
    const rankPrefix = rank.substring(0, 1);

    switch (rankPrefix) {
      case RankedTierEnum.UNRANKED.shortName:
        return 'player-background-unranked';
      case RankedTierEnum.BRONZE.shortName:
        return 'player-background-bronze';
      case RankedTierEnum.SILVER.shortName:
        return 'player-background-silver';
      case RankedTierEnum.GOLD.shortName:
        return 'player-background-gold';
      case RankedTierEnum.PLATINUM.shortName:
        return 'player-background-platinum';
      case RankedTierEnum.DIAMOND.shortName:
        return 'player-background-diamond';
      case RankedTierEnum.MASTER.shortName:
        return 'player-background-master';
      case RankedTierEnum.CHALLENGER.shortName:
        return 'player-background-challenger';
      default:
        return 'player-background';
    }
  };

  const renderPlayers = players.map((player) => {
    const rankClass = getRankColorClass(player.rank);
    return (
      <li key={player.summonerName} className={`list-group-item ${rankClass}`}>
        <Player handleRemoveClick={handleRemoveClick} player={player} />
      </li>
    );
  });

  return (
    <ul className="list-group">
      {renderPlayers}
    </ul>
  );
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    summonerName: PropTypes.string.isRequired,
    rank: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.number),
  })),
  handleRemoveClick: PropTypes.func.isRequired,
};

PlayerList.defaultProps = {
  players: [],
};

export default PlayerList;
