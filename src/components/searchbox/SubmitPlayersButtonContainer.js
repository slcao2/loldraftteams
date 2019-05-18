import { connect } from 'react-redux';

import SubmitPlayersButton from './SubmitPlayersButton';
import { getTeams } from '../../actions/teamListActions';
import { addBanner, removeBanner } from '../../actions/bannerActions';
import { generateId } from '../../utilities/StringUtils';
import { setHistoryVisibility } from '../../actions/searchActions';

const mapStateToProps = state => ({
  players: state.playerList,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (players) => {
    dispatch(getTeams(players));
  },
  addBanner: (id, message) => {
    dispatch(addBanner(id, message));
  },
  removeBanner: (id) => {
    dispatch(removeBanner(id));
  },
  handleFocus: () => {
    dispatch(setHistoryVisibility(false));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, {
  players: stateProps.players,
  handleClick: (players) => {
    if (stateProps.players.length === 10) {
      dispatchProps.handleClick(players);
    } else {
      const bannerId = generateId('notEnoughPlayers');
      dispatchProps.addBanner(bannerId, 'There needs to be 10 players in the players list to generate teams.');
      setTimeout(() => {
        dispatchProps.removeBanner(bannerId);
      }, 5000);
    }
  },
  handleFocus: dispatchProps.handleFocus,
});

const SubmitPlayersButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SubmitPlayersButton);

export default SubmitPlayersButtonContainer;
