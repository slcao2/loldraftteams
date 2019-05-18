import React from 'react';

import AlertBannerContainer from './AlertBannerContainer';
import NavBar from './NavBar';
import PlayerListContainer from './playerlist/PlayerListContainer';
import { PLAYER_LIST } from '../constants/StaticText';
import SubmitPlayersButtonContainer from './searchbox/SubmitPlayersButtonContainer';
import TeamListContainer from './teamlist/TeamListContainer';

const MainPage = () => (
  <div>
    <NavBar />
    <AlertBannerContainer />
    <div className="main-container">
      <div className="players-list card">
        <div className="card-header text-center font-weight-bold">
          {PLAYER_LIST}
        </div>
        <div className="card-body">
          <PlayerListContainer />
        </div>
        <div className="card-footer">
          <SubmitPlayersButtonContainer />
        </div>
      </div>
      <div className="teams-list">
        <TeamListContainer />
      </div>
    </div>
  </div>
);

export default MainPage;
