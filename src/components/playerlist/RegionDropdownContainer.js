import { connect } from 'react-redux';

import { setRegion } from '../../actions/searchActions';
import RegionDropdown from './RegionDropdown';

const mapStateToProps = state => ({
  selectedRegion: state.searchUIValue.region,
});

const mapDispatchToProps = dispatch => ({
  handleSelectRegion: (region) => {
    dispatch(setRegion(region));
  },
});

const RegionDropdownContainer = connect(mapStateToProps, mapDispatchToProps)(RegionDropdown);

export default RegionDropdownContainer;
