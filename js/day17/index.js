const { runIntcodeProgram } = require("../day7/intcode");
const {
  fillTile,
  getIntersectionSum,
  getPath,
  resetBoard
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
}

function part1(rawInput) {
  const input = parseInput(rawInput);
  getResultFromProgram(input);
  return getIntersectionSum();
}

function getResultFromProgram2(A = [], programs = []) {
  resetBoard();
  A[0] = 2;
  const instance = runIntcodeProgram([...A], programs[0], false);
  let result = instance.next(programs[1]);
  while (result.done === false) {
    result = instance.next(1);
  }
  return result.value;
}

// ans bigger than 10k
function part2(rawInput) {
  const input = parseInput(rawInput);
  getResultFromProgram(input);
  const programs = getPath();
  // .join("")
  // .slice(0, -2);
  return getResultFromProgram2(input, programs);
}

module.exports = { part1, part2 };
