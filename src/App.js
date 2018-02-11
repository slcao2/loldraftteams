import React, { Component } from 'react';
import './App.css';
import PlayerMatchingService from './services/PlayerMatchingService';
import mockPlayers from './constants/mockPlayers';
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    PlayerMatchingService.getTeamPlayers(mockPlayers);

    return (
      <div>
        <MainPage />
      </div>
    );
  }
}

export default App;
