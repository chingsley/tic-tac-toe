import React, { Component } from 'react';
import Cell from './Cell';

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      gameOver: false,
      cells: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      availableCells: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      manPlayTurn: true,
      botPlayTurn: false,
      botCellChoice: '9',
    };
  }

  updateAvailableCells = (cellNumber) => {
    this.setState(prevState => ({
      availableCells: prevState.availableCells.filter(cell => cell !== cellNumber)
    }));
  };

  togglePlayTurn = () => {
    this.setState(prevState => {
      return {
        manPlayTurn: !prevState.manPlayTurn,
        botPlayTurn: !prevState.botPlayTurn,
      };
    });
  };

  makeBotPlay = () => {
    // this.props.availableCells.includes(this.props.cellNumber)
    this.setState(prevState => {
      const botCellChoice = (Number(prevState.botCellChoice) - 1).toString();
      return {
        botCellChoice: botCellChoice,
      };
    });
    setTimeout(() => {
      this.updateAvailableCells(this.state.botCellChoice);
      this.togglePlayTurn()
    }, 500);
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
              availableCells={this.state.availableCells}
              updateAvailableCells={this.updateAvailableCells}
            />
        )}
      </div>
    );
  }
}

export default GameBoard;
