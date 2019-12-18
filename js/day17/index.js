const { runIntcodeProgram } = require("../day7/intcode");
const {
  resetBoard,
  getIntersectionSum,
  fillTile,
  drawCanvas
} = require("./board");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], mode = 1) {
  resetBoard();
  const instance = runIntcodeProgram([...A], mode, true);
  let result = { done: false, value: undefined };
  while (result.done === false) {
    result = instance.next();
    fillTile(result.value);
  }
  // drawCanvas();
}

function part1(rawInput) {
  const input = parseInput(rawInput);
  getResultFromProgram(input);
  return getIntersectionSum();
}
function part2(rawInput) {
  const input = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
