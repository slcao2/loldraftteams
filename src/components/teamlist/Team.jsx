import React from 'react';
import PropTypes from 'prop-types';

import PlayerList from '../playerlist/PlayerList';

const Team = ({ teamName, team }) => {
  const players = team.map(player => (
    <li key={player.name} className="list-group-item">
      <div>{player.name}</div>
      <div>{player.role}</div>
    </li>));

  return (
    <div>
      {teamName}
      <ul className="list-group list-group-flush">
        {players}
      </ul>
    </div>
  );
};

Team.propTypes = {
  teamName: PropTypes.string.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    role: PropTypes.string,
  })).isRequired,
};

PlayerList.defaultProps = {
  team: [],
};

export default Team;
