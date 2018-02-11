import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import PlayerInformationService from '../services/PlayerInformationService';
import TeamList from './TeamList';
import SubmitPlayersButton from './SubmitPlayersButton';
import PlayerMatchingService from '../services/PlayerMatchingService';
import PlayerSearchContainer from './PlayerSearchContainer';
import PlayerListContainer from './PlayerListContainer';

class MainPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      searchValue: '',
      teams: {
        teamOne: [],
        teamTwo: [],
      },
      linkPlayerOptions: {
        showModal: false,
        player: '',
        isSameTeam: true,
      },
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePlayersSubmit = this.handlePlayersSubmit.bind(this);
    this.handlePlayerRemove = this.handlePlayerRemove.bind(this);
    this.handleRoleSelect = this.handleRoleSelect.bind(this);
    this.handleLinkPlayer = this.handleLinkPlayer.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleSearchSubmit(submittedPlayer) {
    this.setState({ searchValue: '' });
    PlayerInformationService.getPlayerData(submittedPlayer).then((player) => {
      this.setState((prevState, props) => {
        const newPlayers = prevState.players.slice();
        newPlayers.push(player);
        return {
          players: newPlayers,
        };
      });
    });
  }

  handlePlayersSubmit(players) {
    const calculatedTeams = PlayerMatchingService.getTeamPlayers(players);
    this.setState({ teams: calculatedTeams });
  }

  handleSearchChange(value) {
    this.setState({ searchValue: value });
  }

  handlePlayerRemove(player) {
    this.setState((prevState, props) => {
      const newPlayers = _.without(prevState.players, player);
      return {
        players: newPlayers,
      };
    });
  }

  handleRoleSelect(role) {

  }

  handleLinkPlayer(selectedPlayer, isSameTeam) {
    this.setState({
      linkPlayerOptions: {
        showModal: true,
        player: selectedPlayer,
        sameTeam: isSameTeam,
      },
    });
  }

  handleSubmitModal() {
    this.setState({
      linkPlayerOptions: {
        showModal: false,
        player: '',
        sameTeam: true,
      },
    });
  }

  handleCloseModal() {
    this.setState({
      linkPlayerOptions: {
        showModal: false,
        player: '',
        sameTeam: true,
      },
    });
  }

  render() {
    const renderModal = null;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <PlayerSearchContainer />
            <PlayerListContainer />
            <SubmitPlayersButton handleClick={this.handlePlayersSubmit} players={this.state.players} />
          </div>
          <div className="col-md-7">
            <TeamList teams={this.state.teams} />
          </div>
        </div >
      </div>
    );
  }
}

export default MainPageContainer;
