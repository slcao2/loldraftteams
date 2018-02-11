import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ player, handleRemoveClick }) => (
  <div className="row">
    <div className="col-md-1"><i className="fa fa-times fa-lg" aria-hidden="true" onClick={event => (handleRemoveClick(player))} /></div>
    <div className="col-md-2 player-rank">{player.rank}</div>
    <div className="col-md-7">{player.summonerName}</div>
  </div>
);

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
