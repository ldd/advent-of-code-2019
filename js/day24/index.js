function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));
}

const ROWS = 5;
const COLS = 5;

function getNeighbours(x, y, rows = ROWS, cols = COLS) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ].filter(([i, j]) => i >= 0 && i < rows && j >= 0 && j < cols);
}

function getNextState(A, x, y) {
  const isBug = ([i, j]) => A[i][j] === "#";
  const bugNeighbourCount = getNeighbours(x, y).filter(isBug);
  const l = bugNeighbourCount.length;

  // you are bug, find out if you die
  if (A[x][y] === "#") {
    if (l === 1) return "#";
    return ".";
  }
  if (l === 1 || l === 2) return "#";
  return ".";
}

function biodiversityScore(A) {
  return A.flatMap((row, i) =>
    row.map((cell, j) => (cell === "#" ? 2 ** (i * COLS + j) : 0))
  ).reduce((p, n) => p + n, 0);
}

function tick(A = []) {
  return A.map((row, i) => row.map((_, j) => getNextState(A, i, j)));
}

function part1(rawInput) {
  const input = parseInput(rawInput);

  let state = JSON.parse(JSON.stringify(input));
  const scoreDic = {};
  for (;;) {
    const score = biodiversityScore(state);
    if (scoreDic[score]) {
      return score;
    }
    scoreDic[score] = true;
    state = tick(state);
  }
}
function part2(rawInput) {
  return null;
}

module.exports = { part1, part2 };
