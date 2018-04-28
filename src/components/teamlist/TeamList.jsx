import React from 'react';
import PropTypes from 'prop-types';

import Team from './Team';
import ShareTeamButton from './ShareTeamButton';

const mockTeams = {
  teamOne: [{ name: 'asdfasdfasdfasdf', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'JUNGLE' }, { name: 'one', value: 1, role: 'MID' }, { name: 'one', value: 1, role: 'DUO_CARRY' }, { name: 'one', value: 1, role: 'DUO_SUPPORT' }],
  teamTwo: [{ name: 'asdfasdfasdfasdf', value: 1, role: 'TOP' }, { name: 'one', value: 1, role: 'JUNGLE' }, { name: 'one', value: 1, role: 'MID' }, { name: 'one', value: 1, role: 'DUO_CARRY' }, { name: 'one', value: 1, role: 'DUO_SUPPORT' }],
};

const TeamList = ({ teams }) => {
  const shareTeamButton = teams.teamOne.length === 5 && <ShareTeamButton teams={teams} /> && '';

  return (
    <div>
      <div className="teams">
        <div className="team-list">
          <Team teamName="Team One" team={mockTeams.teamOne} />
        </div>
        <div className="team-list">
          <Team teamName="Team Two" team={mockTeams.teamTwo} />
        </div>
      </div>
      {shareTeamButton}
    </div>
  );
};

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
