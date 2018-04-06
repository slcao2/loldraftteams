import React from 'react';

import TeamListContainer from './teamlist/TeamListContainer';
import SubmitPlayersButtonContainer from './playerlist/SubmitPlayersButtonContainer';
import PlayerSearchContainer from './playerlist/PlayerSearchContainer';
import PlayerListContainer from './playerlist/PlayerListContainer';

const MainPage = () => (
  <div className="main-container">
    <div className="players-list">
      <PlayerSearchContainer />
      <PlayerListContainer />
      <SubmitPlayersButtonContainer />
    </div>
    <div className="teams-list">
      <TeamListContainer />
    </div>
  </div >
);

export default MainPage;
