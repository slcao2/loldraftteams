import React from 'react';
import PropTypes from 'prop-types';

import { REGION_LIST } from '../../constants/riotConstants';

const RegionDropdown = ({ handleSelectRegion, selectedRegion }) => {
  window.onclick = (event) => {
    if (!event.target.matches('.selected-region')) {
      const dropdowns = document.getElementsByClassName('region-list');
      let i;
      for (i = 0; i < dropdowns.length; i += 1) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  const onRegionToggle = () => {
    document.getElementById('regionList').classList.toggle('show');
  };

  const renderRegionList = REGION_LIST.map((region) => {
    const selectedRegionClass = region === selectedRegion ? ' active-region' : '';
    const buttonClass = 'btn btn-secondary region-button'.concat(selectedRegionClass);
    return (
      <button key={region} className={buttonClass} onClick={() => { handleSelectRegion(region); }}>{region}</button>
    );
  });

  return (
    <div className="region-dropdown">
      <button className="btn btn-secondary selected-region" onClick={onRegionToggle}>
        {selectedRegion}
      </button>
      <div id="regionList" className="btn-group-vertical region-list">
        {renderRegionList}
      </div>
    </div>
  );
};

RegionDropdown.propTypes = {
  handleSelectRegion: PropTypes.func.isRequired,
  selectedRegion: PropTypes.string,
};

RegionDropdown.defaultProps = {
  selectedRegion: 'NA',
};

export default RegionDropdown;
