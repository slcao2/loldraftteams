import { connect } from 'react-redux';

import SubmitPlayersButton from './SubmitPlayersButton';
import { getTeams } from '../../actions/teamListActions';

const mapStateToProps = state => ({
  players: state.playerList,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (players) => {
    dispatch(getTeams(players));
  },
});

const SubmitPlayersButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitPlayersButton);

export default SubmitPlayersButtonContainer;
