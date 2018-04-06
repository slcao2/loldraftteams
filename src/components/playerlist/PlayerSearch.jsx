import React from 'react';
import PropTypes from 'prop-types';

const PlayerSearch = ({
  handleChange, handleKeyDown, searchValue, enabled,
}) => (
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
    disabled={!enabled}
  />
);

PlayerSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  enabled: PropTypes.bool,
};

PlayerSearch.defaultProps = {
  searchValue: '',
  enabled: true,
};

export default PlayerSearch;
