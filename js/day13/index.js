const { runIntcodeProgram } = require("../day7/intcode");
const { fillTile, resetBoard, getBlockCount, getBestMove } = require("./board");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], mode = 1) {
  resetBoard();
  const instance = runIntcodeProgram([...A], mode, true);

  let result = { done: false, value: undefined };
  while (result.done === false) {
    const x = instance.next();
    const y = instance.next();
    const tileId = instance.next();
    fillTile(x.value, y.value, tileId.value);
    result = tileId;
  }
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  getResultFromProgram(A);
  return getBlockCount();
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  A[0] = 2;
  resetBoard();
  const instance = runIntcodeProgram([...A], 0, true);

  let result = { done: false, value: undefined };
  let score = 0;
  while (result.done === false) {
    let x = instance.next();
    if (x.value === undefined) {
      // we are driving the joystick
      const joystickPosition = getBestMove();
      x = instance.next(joystickPosition);
    }
    const y = instance.next();
    const tileId = instance.next();
    if (x === -1 && y === 0) {
      score = tileId;
    } else {
      fillTile(x.value, y.value, tileId.value);
    }
    result = tileId;
  }
  return score;
}

module.exports = { part1, part2 };
