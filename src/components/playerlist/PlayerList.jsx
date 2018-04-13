import React from 'react';
import PropTypes from 'prop-types';

import Player from './Player';
import RankedTierEnum from '../../constants/RankedTierEnum';

const PlayerList = ({ players, handleRemoveClick }) => {
  const getRankColorClass = (rank) => {
    const rankPrefix = rank.substring(0, 1);
    const classPrefix = 'player-background';

    switch (rankPrefix) {
      case RankedTierEnum.UNRANKED.shortName:
        return `${classPrefix}-unranked`;
      case RankedTierEnum.BRONZE.shortName:
        return `${classPrefix}-bronze`;
      case RankedTierEnum.SILVER.shortName:
        return `${classPrefix}-silver`;
      case RankedTierEnum.GOLD.shortName:
        return `${classPrefix}-gold`;
      case RankedTierEnum.PLATINUM.shortName:
        return `${classPrefix}-platinum`;
      case RankedTierEnum.DIAMOND.shortName:
        return `${classPrefix}-diamond`;
      case RankedTierEnum.MASTER.shortName:
        return `${classPrefix}-master`;
      case RankedTierEnum.CHALLENGER.shortName:
        return `${classPrefix}-challenger`;
      default:
        return classPrefix;
    }
  };

  const renderPlayers = players.map((player) => {
    const rankClass = getRankColorClass(player.rank);
    return (
      <li key={player.summonerName} className={`list-group-item player-item ${rankClass}`}>
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
