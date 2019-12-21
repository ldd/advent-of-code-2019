const { initialize, something } = require("./vault");

function parseInput(rawInput = "") {
  rawInput = `
#########
#b.A.@.a#
#########
`;
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  initialize(A);
  return something();
}
function part2() {
  return null;
}

module.exports = { part1, part2 };
