import React, { Component } from 'react';
import minmax from '../minmax';
import Cell from './Cell';

const initialState = {
  isGameOver: false,
  gameWinner: null,
  moves: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
  availableCells: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  manPlayTurn: true,
  botPlayTurn: false,
  botCellChoice: 9,
};

class GameBoard extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    // this.makeBotPlay();
  }

  resetGame = () => {
    this.setState({ ...initialState });
    window.location.reload(false);
  };

  checkGameState = () => {
    const gameState = minmax(this.state);
    console.log('game state = ', gameState)
    if (gameState.gameOver) {
      this.setState({
        isGameOver: true,
        gameWinner: gameState.gameWinner,
      });
    }
  };

  updateBoardState = (cellNumber, marker) => {
    if(cellNumber !== undefined) {
      this.setState(prevState => {
        const outerIndex = Math.floor(cellNumber/3);
        const innerIndex = cellNumber % 3;
        const moves = prevState.moves;
        moves[outerIndex].splice(innerIndex, 1, marker); 
        return {
          availableCells: prevState.availableCells.filter(cell => cell !== cellNumber),
          moves: moves,
          manPlayTurn: !prevState.manPlayTurn,
          botPlayTurn: !prevState.botPlayTurn,
        };
      });
    }
  };

  makeBotPlay = () => {
    this.checkGameState();
    this.setState(prevState => {
      const arr = prevState.availableCells;
      const randomChoice = arr[Math.floor(Math.random() * arr.length)]
      // const choice = minmax(prevState).choice;
      return {
        botCellChoice: randomChoice,
      };
    });
    setTimeout(() => {
      this.updateBoardState(this.state.botCellChoice, 'o');
    }, 500);
    setTimeout(() => {
      this.checkGameState();
    }, 502);
  };

  render() {
    const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return(
      <div>
        <div className="grid">
          {cells.map(
            cell =>
              <Cell
                key={cell}
                cellNumber={cell}
                botPlayTurn={this.state.botPlayTurn}
                manPlayTurn={this.state.manPlayTurn}
                botCellChoice={this.state.botCellChoice}
                makeBotPlay={this.makeBotPlay}
                availableCells={this.state.availableCells}
                updateBoardState={this.updateBoardState}
                isGameOver={this.state.isGameOver}
              />
          )}
        </div>
        {
          this.state.isGameOver &&
          <div className='modal-gameover'>
            <div>
              <h1
                className={
                  this.state.gameWinner === 'x' ?
                    'h1-winner-x' :
                    this.state.gameWinner === 'o' ?
                      'h1-winner-o' :
                      'h1-tie-game'
                }
              >
                {
                  this.state.gameWinner === 'x' ?
                      'Congratulations! You Won.' :
                       this.state.gameWinner === 'o' ?
                          'Game Over!' :
                              'It\'s a tie. Would you like to try again?'
                }
              </h1>
              <button className='btn-reset' onClick={this.resetGame}>
                {this.state.gameWinner === 'x' ? 'Go again' : 'Try again'}
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default GameBoard;
