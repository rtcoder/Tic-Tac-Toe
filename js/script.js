import Board from "./classes/board.js";
import Player from "./classes/player.js";
import {addClass, drawWinningLine, hasClass} from "./helpers.js";

const STATUS = {
  humanTurn: "Your turn",
  computerTurn: "Computer is thinking",
  humanWon: "You won",
  computerWon: "Computer won",
  draw: "Draw"
};

const getMoveLabel = index => {
  const rows = ["top", "middle", "bottom"];
  const columns = ["left", "center", "right"];
  return `${rows[Math.floor(index / 3)]} ${columns[index % 3]}`;
};

const newGame = (depth = -1, startingPlayer = 1) => {
  const player = new Player(parseInt(depth));
  const board = new Board(['', '', '', '', '', '', '', '', '']);

  const boardDIV = document.getElementById("board");
  const statusDIV = document.getElementById("gameStatus");
  boardDIV.className = '';
  boardDIV.innerHTML =
      `<div class="cells-wrap">
            ${board.state.map((cell, index) => (
                `<button class="cell-${index}" type="button" aria-label="Place mark in ${getMoveLabel(index)} cell"></button>`
            )).join('')}
        </div>`;
  //Storing HTML cells in an array
  const htmlCells = [...boardDIV.querySelector('.cells-wrap').children];
  //Initializing some variables for internal use
  const starting = parseInt(startingPlayer),
      maximizing = starting;
  let playerTurn = starting;
  const setStatus = message => statusDIV.textContent = message;
  const updateCellState = (index, symbol) => {
    addClass(htmlCells[index], symbol);
    htmlCells[index].disabled = true;
    htmlCells[index].setAttribute('aria-label', `${symbol.toUpperCase()} in ${getMoveLabel(index)} cell`);
  };
  const finishGame = status => {
    drawWinningLine(status);
    htmlCells.forEach(cell => cell.disabled = true);

    if (status.winner === "draw") {
      setStatus(STATUS.draw);
    } else if ((status.winner === Board.X && maximizing) || (status.winner === Board.O && !maximizing)) {
      setStatus(STATUS.humanWon);
    } else {
      setStatus(STATUS.computerWon);
    }
  };

  setStatus(starting ? STATUS.humanTurn : STATUS.computerTurn);

  //If computer is going to start, choose a random cell as long as it is the center or a corner
  if (!starting) {
    const firstChoice = Board.CENTER_AND_CORNERS[Math.floor(Math.random() * Board.CENTER_AND_CORNERS.length)];
    const symbol = !maximizing ? Board.X : Board.O;
    board.insert(symbol, firstChoice);
    updateCellState(firstChoice, symbol);
    playerTurn = 1; //Switch turns
    setStatus(STATUS.humanTurn);
  }

  //Adding Click event listener for each cell
  board.state.forEach((cell, index) => {
    htmlCells[index].addEventListener('click', () => {
      //If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
      if (hasClass(htmlCells[index], Board.X)
          || hasClass(htmlCells[index], Board.O)
          || board.isTerminal()
          || !playerTurn) {
        return false;
      }
      const symbol = maximizing ? Board.X : Board.O; //Maximizing player is always 'x'
      //Update the Board class instance as well as the Board UI
      board.insert(symbol, index);
      updateCellState(index, symbol);
      //If it's a terminal move and it's not a draw, then human won
      const humanMoveStatus = board.isTerminal();
      if (humanMoveStatus) {
        finishGame(humanMoveStatus);
        return;
      }
      playerTurn = 0; //Switch turns
      setStatus(STATUS.computerTurn);

      //Get computer's best move and update the UI
      player.getBestMove(board, !maximizing, best => {
        const symbol = !maximizing ? Board.X : Board.O;
        board.insert(symbol, best);
        updateCellState(best, symbol);

        const computerMoveStatus = board.isTerminal();
        if (computerMoveStatus) {
          finishGame(computerMoveStatus);
          return;
        }

        playerTurn = 1; //Switch turns
        setStatus(STATUS.humanTurn);
      });
    }, false);

    if (cell) {
      updateCellState(index, cell);
    }
  });
}

const startGame = () => {
  const starting = document.querySelector('input[name="starting"]:checked').value;
  const depthDIV = document.getElementById("depth");
  const depth = depthDIV.options[depthDIV.selectedIndex].value;
  newGame(depth, starting);
}

document.addEventListener("DOMContentLoaded", () => {
  //Start a new game when page loads with default values
  startGame();
  //Start a new game with chosen options when new game button is clicked
  document.getElementById("newGame").addEventListener('click', startGame);
  document.getElementById("depth").addEventListener('change', startGame);
  document.querySelectorAll('[name="starting"]').forEach(input => input.addEventListener('change', startGame));
});
