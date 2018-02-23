import React, { Component } from 'react';
import './App.css';
import PlayerMatchingService from './services/PlayerMatchingService';
import mockPlayerList from './mock_data/mockPlayerList';
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    PlayerMatchingService.getTeamPlayers(mockPlayerList);

    return (
      <div>
        <MainPage />
      </div>
    );
  }
}

export default App;
