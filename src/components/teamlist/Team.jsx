import React from 'react';
import PropTypes from 'prop-types';
import { mapRoleToAltName } from '../../constants/riotConstants';

const Team = ({ teamName, team }) => {
  const players = team.map(player => (
    <li key={player.name} className="list-group-item team">
      <div className="name">{player.name}</div>
      <div>
        <div className="suggested-role"><i>sugg: <b>{mapRoleToAltName(player.role)}</b></i></div>
      </div>
    </li>));

  return (
    <div className="card">
      <div className="card-header text-center font-weight-bold">
        {teamName}
      </div>
      <div className="card-body">
        <ul className="list-group team-list-group">
          {players}
        </ul>
      </div>
    </div>
  );
};

Team.propTypes = {
  teamName: PropTypes.string.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    role: PropTypes.string,
  })),
};

Team.defaultProps = {
  team: [],
};

export default Team;
