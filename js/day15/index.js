const { runIntcodeProgram } = require("../day7/intcode");
const {
  resetCanvas,
  getNextMove,
  reportStatus,
  reportOxygenStatus
} = require("./repairer");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], reporter = reportStatus) {
  resetCanvas();
  const instance = runIntcodeProgram([...A], getNextMove(), true);

  let result = instance.next();
  while (result.done === false) {
    const count = reporter(result.value);
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
  return getResultFromProgram(A, reportOxygenStatus);
}

module.exports = { part1, part2 };
