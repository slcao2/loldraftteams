import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ player, handleRemoveClick }) => {
  const renderX = player.rank ? (<div className="prefix-icon"><i className="fa fa-times fa-lg" aria-hidden="true" onClick={event => (handleRemoveClick(player))} /></div>) : '';
  const renderSpinner = player.rank ? '' : (<div className="prefix-icon"><i className="fa fa-spinner fa-lg animated-rotation" aria-hidden="true" /></div>);

  return (
    <div className="player">
      {renderX}
      {renderSpinner}
      <div className="rank">{player.rank}</div>
      <div className="summoner-name">{player.summonerName}</div>
    </div>
  );
};

Player.propTypes = {
  handleRemoveClick: PropTypes.func.isRequired,
  player: PropTypes.shape({
    summonerName: PropTypes.string.isRequired,
    rank: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.number),
    mastery: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.number,
      points: PropTypes.number,
    })),
  }).isRequired,
};

export default Player;
