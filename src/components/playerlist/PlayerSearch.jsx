import React from 'react';
import PropTypes from 'prop-types';

import RegionDropdownContainer from './RegionDropdownContainer';
import { SEARCH } from '../../constants/StaticText';

const PlayerSearch = ({
  handleChange, handleKeyDown, searchValue, enabled, selectedRegion,
}) => (
  <div className="input-group">
    <input
      id="searchBox"
      className="form-control"
      type="search"
      placeholder="Add player..."
      value={searchValue}
      onChange={event => handleChange(event.target.value)}
      onKeyDown={event => handleKeyDown(event, selectedRegion)}
      disabled={!enabled}
    />
    <div className="input-group-append">
      <RegionDropdownContainer />
      <button
        id="searchButton"
        className="btn btn-success"
        onClick={event => handleKeyDown({ keyCode: 13, target: { value: document.getElementById('searchBox').value } }, selectedRegion)}
      >
        {SEARCH}
      </button>
    </div>
  </div>
);

PlayerSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  enabled: PropTypes.bool,
  selectedRegion: PropTypes.string,
};

PlayerSearch.defaultProps = {
  searchValue: '',
  enabled: true,
  selectedRegion: 'NA',
};

export default PlayerSearch;
