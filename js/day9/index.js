const { runIntcodeProgram } = require("../day7/intcode");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

// 203 tried, "too low"
function part1(rawInput) {
  const A = parseInput(rawInput);
  const instance = runIntcodeProgram([...A], 1, true);
  let result = instance.next();
  while (result.done === false) {
    result = instance.next();
  }
  return result.value;
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
