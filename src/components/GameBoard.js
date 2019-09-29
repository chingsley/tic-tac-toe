import React, { Component } from 'react';
import Cell from './Cell';

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      gameOver: false,
      cells: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      manPlayTurn: false,
      botPlayTurn: true,
      botCellChoice: null,
    };
  }

  componentDidMount() {
    // console.log('componentDidMount');
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    if (this.state.botPlayTurn) {
      // console.log('bot play turn');
      // implement bot play here
    }
  }

  togglePlayTurn = () => {

    this.setState(prevState => {
      console.log(prevState);
      const botCellChoice = prevState.manPlayTurn ? 7 : null;
      return {
        manPlayTurn: !prevState.manPlayTurn,
        botPlayTurn: !prevState.botPlayTurn,
        botCellChoice: botCellChoice,
      };
    });
  };

  render() {
    // console.log('in gameboard', this.state);
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
            />
        )}
      </div>
    );
  }
}

export default GameBoard;
