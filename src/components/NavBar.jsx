/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PlayerSearchContainer from './searchbox/PlayerSearchContainer';

const NavBar = () => (
  <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">LoLDraftTeams</a>
    <PlayerSearchContainer />
  </nav>
);

export default NavBar;
