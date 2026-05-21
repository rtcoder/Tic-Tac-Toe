class Board {
  static X = 'x'
  static O = 'o'

  static TOP_LEFT = 0;
  static TOP_CENTER = 1;
  static TOP_RIGHT = 2;
  static CENTER_LEFT = 3;
  static CENTER_CENTER = 4;
  static CENTER_RIGHT = 5;
  static BOTTOM_LEFT = 6;
  static BOTTOM_CENTER = 7;
  static BOTTOM_RIGHT = 8;

  static BOARD_POSITIONS = [
    Board.TOP_LEFT,
    Board.TOP_CENTER,
    Board.TOP_RIGHT,
    Board.CENTER_LEFT,
    Board.CENTER_CENTER,
    Board.CENTER_RIGHT,
    Board.BOTTOM_LEFT,
    Board.BOTTOM_CENTER,
    Board.BOTTOM_RIGHT
  ]

  static WINNING_LINES = [
    [Board.TOP_LEFT, Board.TOP_CENTER, Board.TOP_RIGHT],
    [Board.CENTER_LEFT, Board.CENTER_CENTER, Board.CENTER_RIGHT],
    [Board.BOTTOM_LEFT, Board.BOTTOM_CENTER, Board.BOTTOM_RIGHT],
    [Board.TOP_LEFT, Board.CENTER_LEFT, Board.BOTTOM_LEFT],
    [Board.TOP_CENTER, Board.CENTER_CENTER, Board.BOTTOM_CENTER],
    [Board.TOP_RIGHT, Board.CENTER_RIGHT, Board.BOTTOM_RIGHT],
    [Board.TOP_LEFT, Board.CENTER_CENTER, Board.BOTTOM_RIGHT],
    [Board.TOP_RIGHT, Board.CENTER_CENTER, Board.BOTTOM_LEFT]
  ]

  static CENTER_AND_CORNERS = [
    Board.CENTER_CENTER,
    Board.TOP_LEFT,
    Board.TOP_RIGHT,
    Board.BOTTOM_LEFT,
    Board.BOTTOM_RIGHT
  ]

  constructor(state = ["", "", "", "", "", "", "", "", ""]) {
    this.state = state;
  }

  //Logs a visualized board with the current state to the console
  printFormattedBoard() {
    let formattedString = "";
    this.state.forEach((cell, index) => {
      formattedString += cell ? ` ${cell} |` : "   |";
      if ((index + 1) % 3 === 0) {
        formattedString = formattedString.slice(0, -1);
        if (index < 8)
          formattedString +=
              "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    });
    console.log("%c" + formattedString, "color: #c11dd4;font-size:16px");
  }

  isEmpty() {
    return this.state.every(cell => !cell);
  }

  isFull() {
    return this.state.every(cell => cell);
  }

  /**
   * Inserts a new symbol(x,o) into a cell
   * @param {String} symbol
   * @param {Number} position
   * @return {Boolean} boolean represent success of the operation
   */
  insert(symbol, position) {
    if (!Board.BOARD_POSITIONS.includes(position)) {
      throw new Error("Cell index does not exist!");
    }
    if (![Board.X, Board.O].includes(symbol)) {
      throw new Error("The symbol can only be x or o!");
    }
    if (this.state[position]) {
      return false;
    }
    this.state[position] = symbol;
    return true;
  }

  getAvailableMoves() {
    const moves = [];
    this.state.forEach((cell, index) => {
      if (!cell) moves.push(index);
    });
    return moves;
  }

  /**
   * Checks if the board has a terminal state ie. a player wins or the board is full with no winner
   * @return {Object} an object containing the winner, direction of winning and row/column/diagonal number/name
   */
  isTerminal() {
    //Return False if board in empty
    if (this.isEmpty()) {
      return false;
    }

    const winner = this.checkWinner()
    if (winner) return winner

    //no winner but the board is full
    if (this.isFull()) {
      return {winner: "draw"};
    }

    return false;
  }

  checkWinner() {
    for (const cells of Board.WINNING_LINES) {
      const [first, second, third] = cells;
      const symbol = this.state[first];

      if (symbol && symbol === this.state[second] && symbol === this.state[third]) {
        return {winner: symbol, cells};
      }
    }

    return false;
  }
}

export default Board;
