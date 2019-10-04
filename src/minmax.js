const checkWin = (moves) => {

  const winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let spreadMoves = [];
  moves.forEach(row => spreadMoves = [...spreadMoves, ...row] );

  let xWins = false;
  let oWins = false;
  winComb.forEach(row => {
    if (row.every(spot => spreadMoves[spot] === 'x')) {
      xWins = true;
      return;
    } else if (row.every(spot => spreadMoves[spot] === 'o')) {
      oWins = true;
      return;
    }
  });
  return { x: xWins, o: oWins };

};

export default function minmax(boardState) {
  const  winner = checkWin(boardState.moves);
  if(winner.x || winner.o || boardState.availableCells.length < 1) {
    const gameWinner = winner.x ? 'x' : winner.o ? 'o' : null;
    return { gameOver: true, gameWinner, choice: null };
  }
  
  let availSpots = [];
  boardState.availableCells.forEach(spot => {
    boardState.moves.forEach(row => {
      if (row.includes(spot)) {
        let value = 0;
        row.forEach(item => {
          if(item === 'o') {
            value += 1000;
          } else if (item === 'x') {
            value -= 1000;
          }
        });
        availSpots.push({ spot, value })
      }
    });
  });

  let ref = -2001;
  let choice = -1;
  availSpots.forEach(obj => {   // availSpots is an array of objs
    if (obj.value > ref) {
      ref = obj.value;
      choice = obj.spot;
    }
  });

  return { gameOver: false, gameWinner: null, choice };
}