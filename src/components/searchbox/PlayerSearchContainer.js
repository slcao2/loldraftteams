import { connect } from 'react-redux';
import { addBanner, removeBanner } from '../../actions/bannerActions';
import { requestSearchPlayer, resetSearchValue, setSearchValue, setHistoryVisibility } from '../../actions/searchActions';
import { generateId, isPlayerInList } from '../../utilities/StringUtils';
import PlayerSearch from './PlayerSearch';

const mapStateToProps = state => ({
  searchValue: state.searchUIValue.value,
  enabled: state.searchUIValue.enabled,
  playerList: state.playerList,
  selectedRegion: state.searchUIValue.region,
  showHistory: state.visibility.isHistoryVisible,
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
  handleBlur: () => {
    dispatch(setHistoryVisibility(false));
  },
  handleFocus: () => {
    dispatch(setHistoryVisibility(true));
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
  handleBlur: dispatchProps.handleBlur,
  handleFocus: dispatchProps.handleFocus,
  showHistory: stateProps.showHistory,
});

const PlayerSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PlayerSearch);

export default PlayerSearchContainer;
