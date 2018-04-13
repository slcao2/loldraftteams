import React from 'react';

import TeamListContainer from './teamlist/TeamListContainer';
import SubmitPlayersButtonContainer from './playerlist/SubmitPlayersButtonContainer';
import PlayerSearchContainer from './playerlist/PlayerSearchContainer';
import PlayerListContainer from './playerlist/PlayerListContainer';
import AlertBannerContainer from './AlertBannerContainer';
import NavBar from './NavBar';

const MainPage = () => (
  <div>
    <NavBar />
    <AlertBannerContainer />
    <div className="main-container">
      <div className="players-list">
        {'Player List'}
        <PlayerSearchContainer />
        <PlayerListContainer />
        <SubmitPlayersButtonContainer />
      </div>
      <div className="teams-list">
        <TeamListContainer />
      </div>
    </div>
  </div>
);

export default MainPage;
