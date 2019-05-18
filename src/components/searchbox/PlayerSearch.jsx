import PropTypes from 'prop-types';
import React from 'react';
import { SEARCH } from '../../constants/StaticText';
import RegionDropdownContainer from './RegionDropdownContainer';
import SearchHistoryContainer from './SearchHistoryContainer';

const PlayerSearch = ({
  handleBlur, handleChange, handleFocus, handleKeyDown, searchValue, enabled, selectedRegion, showHistory,
}) => (
  <div
    className="search-group"
    onFocus={event => handleFocus()}
    // onBlur={event => handleBlur()}
  >
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
    {showHistory && <SearchHistoryContainer />}
  </div>
);

PlayerSearch.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  enabled: PropTypes.bool,
  selectedRegion: PropTypes.string,
  showHistory: PropTypes.bool.isRequired,
};

PlayerSearch.defaultProps = {
  searchValue: '',
  enabled: true,
  selectedRegion: 'NA',
};

export default PlayerSearch;
