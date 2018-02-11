import { connect } from 'react-redux';

import PlayerSearch from './PlayerSearch';
import {
  resetSearchValue,
  setSearchValue,
  requestSearchPlayer,
} from '../../actions/searchActions';

const mapStateToProps = state => ({
  searchValue: state.searchUIValue,
});

const mapDispatchToProps = dispatch => ({
  handleChange: (value) => {
    dispatch(setSearchValue(value));
  },
  handleKeyDown: (event) => {
    const searchValue = event.target.value;
    if (event.keyCode === 13 && searchValue) {
      dispatch(requestSearchPlayer(searchValue));
      dispatch(resetSearchValue());
    }
  },
});

const PlayerSearchContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerSearch);

export default PlayerSearchContainer;
