import React from 'react';
import PropTypes from 'prop-types';

function ChampionMastery({ masteries }) {
  const masteryList = masteries.map(mastery => (
    <li>
      {mastery.name}
      {mastery.level}
      {mastery.points}
    </li>));

  return (
    <div>
      <ul>
        {masteryList}
      </ul>
    </div>
  );
}

ChampionMastery.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    level: PropTypes.number,
    points: PropTypes.number,
  })).isRequired,
};

export default ChampionMastery;
