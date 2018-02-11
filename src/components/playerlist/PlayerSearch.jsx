import React from 'react';
import PropTypes from 'prop-types';

const PlayerSearch = ({ handleChange, handleKeyDown, searchValue }) => (
  <input
    className="search-box"
    type="search"
    placeholder="Add player..."
    value={searchValue}
    onChange={(event) => {
        handleChange(event.target.value);
      }}
    onKeyDown={(event) => {
      handleKeyDown(event);
    }}
  />
);

PlayerSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

PlayerSearch.defaultProps = {
  searchValue: '',
};

export default PlayerSearch;
