const { runIntcodeProgram } = require("../day7/intcode");
const { resetCanvas, getNextMove, reportStatus } = require("./repairer");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], fullyExplore = false) {
  resetCanvas();
  const instance = runIntcodeProgram([...A], getNextMove(), true);

  let result = instance.next();
  while (result.done === false) {
    const count = reportStatus(result.value, fullyExplore);
    if (count) return count;
    instance.next();
    result = instance.next(getNextMove());
  }
  return -1;
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return getResultFromProgram(A);
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return getResultFromProgram(A, true);
}

module.exports = { part1, part2 };
