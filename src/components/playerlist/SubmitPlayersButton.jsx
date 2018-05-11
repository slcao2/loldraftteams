import React from 'react';
import PropTypes from 'prop-types';

import { GENERATE_TEAMS } from '../../constants/StaticText';

const SubmitPlayersButton = ({ players, handleClick }) => (
  <button className="btn btn-block btn-primary" onClick={event => handleClick(players)}>{GENERATE_TEAMS}</button>
);

SubmitPlayersButton.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    summonerName: PropTypes.string.isRequired,
    rank: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.number),
  })),
  handleClick: PropTypes.func.isRequired,
};

SubmitPlayersButton.defaultProps = {
  players: [],
};

export default SubmitPlayersButton;
