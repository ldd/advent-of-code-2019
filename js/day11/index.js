const { runIntcodeProgram } = require("../day7/intcode");
const { getPaintCount, drawCanvas, resetCanvas, paint } = require("./painter");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], mode = 1) {
  resetCanvas();
  const instance = runIntcodeProgram([...A], mode, true);

  let result = instance.next();

  while (result.done === false) {
    const { value } = instance.next();
    instance.next();
    const newPosition = paint(result.value, value);
    result = instance.next(newPosition);
  }
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  getResultFromProgram(A, 0);
  return getPaintCount();
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  getResultFromProgram(A, 1);
  return drawCanvas();
}

module.exports = { part1, part2 };
