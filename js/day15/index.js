const { runIntcodeProgram } = require("../day7/intcode");
const {
  drawCanvas,
  resetCanvas,
  getNextMove,
  reportStatus
} = require("./repairer");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = []) {
  resetCanvas();
  const instance = runIntcodeProgram([...A], getNextMove(), true);

  let result = instance.next();
  while (result.done === false) {
    if (reportStatus(result.value)) break;
    instance.next();
    result = instance.next(getNextMove());
    drawCanvas();
  }
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return getResultFromProgram(A);
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
