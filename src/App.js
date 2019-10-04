import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header"><h1>Tic Tac Toe</h1></header>
      <div className="gameboard-container">
      <GameBoard />
      </div>
    </div>
  );
}

export default App;
