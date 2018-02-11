import React from 'react';

import TeamListContainer from './teamlist/TeamListContainer';
import SubmitPlayersButtonContainer from './playerlist/SubmitPlayersButtonContainer';
import PlayerSearchContainer from './playerlist/PlayerSearchContainer';
import PlayerListContainer from './playerlist/PlayerListContainer';

const MainPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-5">
        <PlayerSearchContainer />
        <PlayerListContainer />
        <SubmitPlayersButtonContainer />
      </div>
      <div className="col-md-7">
        <TeamListContainer />
      </div>
    </div >
  </div>
);

export default MainPage;
