import React from 'react';
import PropTypes from 'prop-types';

import Team from './Team';

const mockTeams = {
  teamOne: [{ name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }],
  teamTwo: [{ name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'TOP' }],
};

const TeamList = ({ teams }) => (
  <div className="teams">
    <div className="team-list">
      <Team teamName="Team One" team={teams.teamOne} />
    </div>
    <div className="team-list">
      <Team teamName="Team Two" team={teams.teamTwo} />
    </div>
  </div>
);

TeamList.propTypes = {
  teams: PropTypes.shape({
    teamOne: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      role: PropTypes.string,
    })),
    teamTwo: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      role: PropTypes.string,
    })),
  }),
};

TeamList.defaultProps = {
  teams: {
    teamOne: [],
    teamTwo: [],
  },
};

export default TeamList;
