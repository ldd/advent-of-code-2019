const { generateVault } = require("./vault");

function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));
}

function part1(rawInput) {
  const input = parseInput(rawInput);
  const myVault = generateVault();
  return myVault.reset(input);
}
function part2(rawInput) {
  const A = parseInput(rawInput);
  return null;
}

module.exports = { part1, part2 };
