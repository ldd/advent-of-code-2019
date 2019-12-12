function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(entry => entry.split(")"));
}

const sumReducer = (sum, n) => sum + n;

// to be completely honest, I gave up doing a tree solution
// this one is roughly based on
// https://old.reddit.com/r/adventofcode/comments/e6tyva/2019_day_6_solutions/f9tf07s/
function part1(rawInput) {
  const A = parseInput(rawInput);

  const valueMap = A.reduce((dic, [l, r]) => ({ ...dic, [r]: l }), {});
  const count = parent => (parent ? 1 + count(valueMap[parent]) : 0);
  return A.map(([, r]) => count(valueMap[r])).reduce(sumReducer);
}

const source = "YOU";
const destination = "SAN";
// still roughly based on the solution I found on reddit
function part2(rawInput) {
  const A = parseInput(rawInput);

  const valueMap = A.reduce((dic, [l, r]) => ({ ...dic, [r]: l }), {});
  const getPath = (child, parent) =>
    parent ? [child].concat(getPath(parent, valueMap[parent])) : [];

  const youPath = getPath("YOU", valueMap[source]);
  const sanPath = getPath("SAN", valueMap[destination]);
  return [
    youPath.filter(p => !sanPath.includes(p)).length,
    sanPath.filter(p => !youPath.includes(p)).length
  ].reduce(sumReducer);
}

module.exports = { part1, part2 };
