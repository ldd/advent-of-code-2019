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

function getResultFromProgram2(A = [], programArray = []) {
  resetBoard();
  A[0] = 2;
  let i = 0;
  const instance = runIntcodeProgram([...A], programArray[i].shift(), false);
  let result = { value: undefined, done: false };
  while (result.done === false) {
    const oldValue = result.value;
    result = instance.next();
    if (result.value === undefined) {
      if (!programArray[i]) return oldValue;
      while (programArray[i].length > 0) {
        const n = programArray[i].shift();
        result = instance.next(n);
      }
      i += 1;
    }
  }
  return result.value;
}

// ans bigger than 10k
function part2(rawInput) {
  const input = parseInput(rawInput);
  getResultFromProgram(input);
  const programArray = getPath();
  // make sure to finish with denying the video feed
  programArray.push(["n", "\n"].map(e => e.charCodeAt(0)));
  return getResultFromProgram2(input, programArray);
}

module.exports = { part1, part2 };
