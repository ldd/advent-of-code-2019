const { runIntcodeProgram } = require("../day5");

function parseInput(rawInput = "") {
  return rawInput.split(",").map(Number);
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  let max = -Infinity;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        for (let l = 0; l < 5; l++) {
          for (let m = 0; m < 5; m++) {
            const choices = [i, j, k, l, m];
            if (new Set(choices).size === 5) {
              const output = choices.reduce(
                (p, n) => runIntcodeProgram([...A], [n, p]),
                0
              );
              if (max < output) max = output;
            }
          }
        }
      }
    }
  }
  return max;
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
