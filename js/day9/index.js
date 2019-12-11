const { runIntcodeProgram } = require("../day7/intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function getResultFromProgram(A = [], mode = 1) {
  const instance = runIntcodeProgram([...A], mode, true);
  let result = instance.next();
  while (result.done === false) {
    result = instance.next();
  }
  return result.value;
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  return getResultFromProgram(A, 1);
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  return getResultFromProgram(A, 2);
}

module.exports = { part1, part2 };
