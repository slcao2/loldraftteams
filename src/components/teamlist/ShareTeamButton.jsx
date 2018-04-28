import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ShareTeamButton = ({ teams }) => {
  const handleClick = (teams) => {
    const teamStringify = (teamString, player) => {
      const numberOfSpaces = 20 - player.name.length;
      return `${teamString}\n${player.name}${_.repeat(' ', numberOfSpaces)} sugg:${player.role}`;
    };
    const teamOne = _.reduce(
      teams.teamOne,
      teamStringify,
      'Team One',
    );
    const teamTwo = _.reduce(
      teams.teamTwo,
      teamStringify,
      'Team Two',
    );
    const teamString = `${teamOne}\n\n${teamTwo}`;
  };

  return (
    <button id="share-team-button" className="btn btn-block btn-primary" onClick={event => handleClick(teams)}>Share Teams</button>
  );
};


ShareTeamButton.propTypes = {
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

ShareTeamButton.defaultProps = {
  teams: {
    teamOne: [],
    teamTwo: [],
  },
};

export default ShareTeamButton;
