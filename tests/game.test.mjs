import assert from "node:assert/strict";
import test from "node:test";

import Board from "../js/classes/board.js";
import Player from "../js/classes/player.js";

test("Board detects horizontal, vertical, and diagonal wins", () => {
  assert.deepEqual(new Board(["x", "x", "x", "", "", "", "", "", ""]).isTerminal(), {
    winner: Board.X,
    cells: [0, 1, 2]
  });
  assert.deepEqual(new Board(["o", "", "", "o", "", "", "o", "", ""]).isTerminal(), {
    winner: Board.O,
    cells: [0, 3, 6]
  });
  assert.deepEqual(new Board(["x", "", "", "", "x", "", "", "", "x"]).isTerminal(), {
    winner: Board.X,
    cells: [0, 4, 8]
  });
});

test("Board detects draws without a winning line", () => {
  const board = new Board(["x", "o", "x", "x", "o", "o", "o", "x", "x"]);

  assert.deepEqual(board.isTerminal(), {winner: "draw"});
});

test("Player chooses an immediate winning move", () => {
  const board = new Board(["x", "x", "", "o", "", "", "", "o", ""]);
  const player = new Player();

  assert.equal(player.getBestMove(board, true), 2);
});

test("Player blocks an immediate loss", () => {
  const board = new Board(["x", "x", "", "", "o", "", "", "", ""]);
  const player = new Player();

  assert.equal(player.getBestMove(board, false), 2);
});

test("Limited-depth player still scores non-terminal positions", () => {
  const board = new Board(["x", "x", "", "", "o", "", "", "", ""]);
  const player = new Player(1);

  assert.equal(player.getBestMove(board, false), 2);
});
