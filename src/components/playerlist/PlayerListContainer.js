import { connect } from 'react-redux';

import PlayerList from './PlayerList';
import { removePlayer } from '../../actions/playerListActions';

const mapStateToProps = state => ({
  players: state.playerList,
});

const mapDispatchToProps = dispatch => ({
  handleRemoveClick: (player) => {
    dispatch(removePlayer(player));
  },
});

const PlayerListContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerList);

export default PlayerListContainer;
