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

  get topLeftVal() {
    return this.state[Board.TOP_LEFT]
  }

  get topCenterVal() {
    return this.state[Board.TOP_CENTER]
  }

  get topRightVal() {
    return this.state[Board.TOP_RIGHT]
  }

  get centerLeftVal() {
    return this.state[Board.CENTER_LEFT]
  }

  get centerCenterVal() {
    return this.state[Board.CENTER_CENTER]
  }

  get centerRightVal() {
    return this.state[Board.CENTER_RIGHT]
  }

  get bottomLeftVal() {
    return this.state[Board.BOTTOM_LEFT]
  }

  get bottomCenterVal() {
    return this.state[Board.BOTTOM_CENTER]
  }

  get bottomRightVal() {
    return this.state[Board.BOTTOM_RIGHT]
  }

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

    const horizontal = this.checkHorizontalWins()
    if (horizontal) {
      return horizontal
    }

    const vertical = this.checkVerticalWins()
    if (vertical) {
      return vertical
    }

    const diagonal = this.checkDiagonalWins()
    if (diagonal) {
      return diagonal
    }

    //no winner but the board is full
    if (this.isFull()) {
      return {winner: "draw"};
    }

    return false;
  }

  checkHorizontalWins() {
    if (this.topLeftVal === this.topCenterVal
        && this.topLeftVal === this.topRightVal
        && this.topLeftVal) {
      return {
        winner: this.topLeftVal,
        cells: [Board.TOP_LEFT, Board.TOP_CENTER, Board.TOP_RIGHT],
      };
    }
    if (this.centerLeftVal === this.centerCenterVal
        && this.centerLeftVal === this.centerRightVal
        && this.centerLeftVal) {
      return {
        winner: this.centerLeftVal,
        cells: [Board.CENTER_LEFT, Board.CENTER_CENTER, Board.CENTER_RIGHT]
      };
    }
    if (this.bottomLeftVal === this.bottomCenterVal
        && this.bottomLeftVal === this.bottomRightVal
        && this.bottomLeftVal) {
      return {
        winner: this.bottomLeftVal,
        cells: [Board.BOTTOM_LEFT, Board.BOTTOM_CENTER, Board.BOTTOM_RIGHT]
      };
    }
  }

  checkVerticalWins() {
    if (this.topLeftVal === this.centerLeftVal
        && this.topLeftVal === this.bottomLeftVal
        && this.topLeftVal) {
      return {
        winner: this.topLeftVal,
        cells: [Board.TOP_LEFT, Board.CENTER_LEFT, Board.BOTTOM_LEFT]
      };
    }
    if (this.topCenterVal === this.centerCenterVal
        && this.topCenterVal === this.bottomCenterVal
        && this.topCenterVal) {
      return {
        winner: this.topCenterVal,
        cells: [Board.TOP_CENTER, Board.CENTER_CENTER, Board.BOTTOM_CENTER]
      };
    }
    if (this.topRightVal === this.centerRightVal
        && this.topRightVal === this.bottomRightVal
        && this.topRightVal) {
      return {
        winner: this.topRightVal,
        cells: [Board.TOP_RIGHT, Board.CENTER_RIGHT, Board.BOTTOM_RIGHT]
      };
    }
  }

  checkDiagonalWins() {
    if (this.topLeftVal === this.centerCenterVal
        && this.topLeftVal === this.bottomRightVal
        && this.topLeftVal) {
      return {
        winner: this.topLeftVal,
        cells: [Board.TOP_LEFT, Board.CENTER_CENTER, Board.BOTTOM_RIGHT]
      };
    }
    if (this.topRightVal === this.centerCenterVal
        && this.topRightVal === this.bottomLeftVal
        && this.topRightVal) {
      return {
        winner: this.topRightVal,
        cells: [Board.TOP_RIGHT, Board.CENTER_CENTER, Board.BOTTOM_LEFT]
      };
    }
  }
}

export default Board;