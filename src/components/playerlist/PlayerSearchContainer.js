import { connect } from 'react-redux';

import PlayerSearch from './PlayerSearch';
import {
  resetSearchValue,
  setSearchValue,
  requestSearchPlayer,
} from '../../actions/searchActions';
import { addBanner, removeBanner } from '../../actions/bannerActions';
import { generateId } from '../../utilities/StringUtils';

const isPlayerInList = (player, list) => {
  let isInList = false;
  list.forEach((summoner) => {
    if (summoner.summonerName === player) {
      isInList = true;
    }
  });
  return isInList;
};

const mapStateToProps = state => ({
  searchValue: state.searchUIValue.value,
  enabled: state.searchUIValue.enabled,
  playerList: state.playerList,
  selectedRegion: state.searchUIValue.region,
});

const mapDispatchToProps = dispatch => ({
  handleChange: (value) => {
    dispatch(setSearchValue(value));
  },
  handleKeyDown: (event, region) => {
    const searchValue = event.target.value;
    if (event.keyCode === 13 && searchValue) {
      dispatch(requestSearchPlayer(searchValue, region));
      dispatch(resetSearchValue());
    }
  },
  addBanner: (id, message) => {
    dispatch(addBanner(id, message));
  },
  removeBanner: (id) => {
    dispatch(removeBanner(id));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, {
  searchValue: stateProps.searchValue,
  enabled: stateProps.enabled,
  selectedRegion: stateProps.selectedRegion,
  handleChange: dispatchProps.handleChange,
  handleKeyDown: (event, region) => {
    if (event.keyCode === 13 && isPlayerInList(stateProps.searchValue, stateProps.playerList)) {
      const bannerId = generateId('summonerExists');
      dispatchProps.addBanner(bannerId, `Summoner ${stateProps.searchValue} already exists or is pending.`);
      setTimeout(() => {
        dispatchProps.removeBanner(bannerId);
      }, 5000);
    } else {
      dispatchProps.handleKeyDown(event, region);
    }
  },
});

const PlayerSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PlayerSearch);

export default PlayerSearchContainer;
