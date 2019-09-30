import React, { Component } from 'react';
import Cell from './Cell';

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      gameOver: false,
      cells: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      manPlayTurn: true,
      botPlayTurn: false,
      botCellChoice: '9',
    };
  }

  togglePlayTurn = () => {
    this.setState(prevState => {
      return {
        manPlayTurn: !prevState.manPlayTurn,
        botPlayTurn: !prevState.botPlayTurn,
      };
    });
  };

  makeBotPlay = () => {
    this.setState(prevState => {
      const botCellChoice = (Number(prevState.botCellChoice) - 1).toString();
      return {
        botCellChoice: botCellChoice,
      };
    });
    setTimeout(() => this.togglePlayTurn(), 2000);
  };

  render() {
    return(
      <div className="grid">
        {this.state.cells.map(
          cell =>
            <Cell
              key={cell}
              cellNumber={cell}
              botPlayTurn={this.state.botPlayTurn}
              manPlayTurn={this.state.manPlayTurn}
              togglePlayTurn={this.togglePlayTurn}
              botCellChoice={this.state.botCellChoice}
              makeBotPlay={this.makeBotPlay}
            />
        )}
      </div>
    );
  }
}

export default GameBoard;
