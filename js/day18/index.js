const { initialize, something } = require("./vault");

function parseInput(rawInput = "") {
  rawInput = `
  #########
  #b.A.@.a#
  #########
  `;
  rawInput = `
  ########################
  #f.D.E.e.C.b.A.@.a.B.c.#
  ######################.#
  #d.....................#
  ########################
  `;
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));
}

function part1(rawInput) {
  const A = parseInput(rawInput);
  const root = initialize(A);
  return something(root);
}
function part2() {
  return null;
}

module.exports = { part1, part2 };
