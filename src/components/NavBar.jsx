import React from 'react';
import PlayerSearchContainer from './playerlist/PlayerSearchContainer';

const NavBar = () => (
  <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">LoLDraftTeams</a>
    <PlayerSearchContainer />
  </nav>
);

export default NavBar;
