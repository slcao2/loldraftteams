import { connect } from 'react-redux';
import { addBanner, removeBanner } from '../../actions/bannerActions';
import { removeSearchHistory, requestSearchPlayer, setHistoryVisibility } from '../../actions/searchActions';
import { generateId, isPlayerInList } from '../../utilities/StringUtils';
import SearchHistory from './SearchHistory';

const mapStateToProps = state => ({
  region: state.searchUIValue.region,
  historyList: state.searchHistory,
  playerList: state.playerList,
});

const mapDispatchToProps = dispatch => ({
  handleRemoveClick: (player) => {
    dispatch(removeSearchHistory(player));
  },
  handleTextClick: (player, region) => {
    dispatch(requestSearchPlayer(player, region));
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
  region: stateProps.region,
  historyList: stateProps.historyList,
  handleRemoveClick: dispatchProps.handleRemoveClick,
  handleTextClick: (player, region) => {
    if (isPlayerInList(player, stateProps.playerList)) {
      const bannerId = generateId('summonerExists');
      dispatchProps.addBanner(bannerId, 'Summoner already exists or is pending.');
      setTimeout(() => {
        dispatchProps.removeBanner(bannerId);
      }, 5000);
    } else {
      dispatchProps.handleTextClick(player, region);
    }
  },
  handleBlur: dispatchProps.handleBlur,
  handleFocus: dispatchProps.handleFocus,
});

const SearchHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SearchHistory);

export default SearchHistoryContainer;
