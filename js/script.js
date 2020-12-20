import Board from "./classes/board.js";
import Player from "./classes/player.js";
import {addClass, drawWinningLine, hasClass} from "./helpers.js";

const newGame = (depth = -1, startingPlayer = 1) => {
  const player = new Player(parseInt(depth));
  const board = new Board(['', '', '', '', '', '', '', '', '']);

  const boardDIV = document.getElementById("board");
  boardDIV.className = '';
  boardDIV.innerHTML =
      `<div class="cells-wrap">
            <div class="cell cell-0"></div>
            <div class="cell cell-1"></div>
            <div class="cell cell-2"></div>
            <div class="cell cell-3"></div>
            <div class="cell cell-4"></div>
            <div class="cell cell-5"></div>
            <div class="cell cell-6"></div>
            <div class="cell cell-7"></div>
            <div class="cell cell-8"></div>
        </div>`;
  //Storing HTML cells in an array
  const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];
  //Initializing some variables for internal use
  const starting = parseInt(startingPlayer),
      maximizing = starting;
  let playerTurn = starting;
  //If computer is going to start, choose a random cell as long as it is the center or a corner
  if (!starting) {
    const centerAndCorners = [0, 2, 4, 6, 8];
    const firstChoice = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
    const symbol = !maximizing ? 'x' : Board.O;
    board.insert(symbol, firstChoice);
    addClass(htmlCells[firstChoice], symbol);
    playerTurn = 1; //Switch turns
  }
  //Adding Click event listener for each cell
  board.state.forEach((cell, index) => {
    htmlCells[index].addEventListener('click', () => {
      //If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
      if (hasClass(htmlCells[index], 'x')
          || hasClass(htmlCells[index], Board.O)
          || board.isTerminal()
          || !playerTurn) {
        return false;
      }
      const symbol = maximizing ? 'x' : Board.O; //Maximizing player is always 'x'
      //Update the Board class instance as well as the Board UI
      board.insert(symbol, index);
      addClass(htmlCells[index], symbol);
      //If it's a terminal move and it's not a draw, then human won
      if (board.isTerminal()) {
        drawWinningLine(board.isTerminal());
      }
      playerTurn = 0; //Switch turns
      //Get computer's best move and update the UI
      player.getBestMove(board, !maximizing, best => {
        const symbol = !maximizing ? 'x' : 'o';
        board.insert(symbol, parseInt(best));
        addClass(htmlCells[best], symbol);
        if (board.isTerminal()) {
          drawWinningLine(board.isTerminal());
        }
        playerTurn = 1; //Switch turns
      });
    }, false);

    if (cell) {
      addClass(htmlCells[index], cell);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  //Start a new game when page loads with default values
  const depth = -1;
  const startingPlayer = 1;
  newGame(depth, startingPlayer);
  //Start a new game with chosen options when new game button is clicked
  document.getElementById("newGame").addEventListener('click', () => {
    const startingDIV = document.getElementById("starting");
    const starting = startingDIV.options[startingDIV.selectedIndex].value;
    const depthDIV = document.getElementById("depth");
    const depth = depthDIV.options[depthDIV.selectedIndex].value;
    newGame(depth, starting);
  });
});