function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(Number);
}

function sum(A = [], f = x => x) {
  return A.reduce((total, n) => total + f(n), 0);
}

const getFuel = mass => Math.floor(mass / 3) - 2;
function part1(rawInput) {
  const A = parseInput(rawInput);
  return sum(A, getFuel);
}

function part2(rawInput) {
  const A = parseInput(rawInput);
  const getFuelRecursively = x => {
    const result = getFuel(x);
    return result > 0 ? result + getFuelRecursively(result) : 0;
  };
  return sum(A, getFuelRecursively);
}

module.exports = { part1, part2 };
