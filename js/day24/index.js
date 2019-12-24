function parseInput(rawInput = "") {
  return rawInput
    .split("\n")
    .filter(Boolean)
    .map(line => line.split(""));
}

const ROWS = 5;
const COLS = 5;
const MID = 2;

const MAX_DEPTH = 5;
const MIN_DEPTH = -5;
function getNeighbours(x, y, depth, rows = ROWS, cols = COLS) {
  const close = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ].filter(([i, j]) => i >= 0 && i < rows && j >= 0 && j < cols);

  if (depth !== undefined) {
    // never fill center stage
    if (x === MID && y === MID) return [];
    if (MIN_DEPTH < depth) {
      if (x === 0) return close.concat([[MID - 1, MID, depth - 1]]);
      if (x === COLS - 1) return close.concat([[MID + 1, MID, depth - 1]]);
      if (y === 0) return close.concat([[MID, MID - 1, depth - 1]]);
      if (y === ROWS - 1) return close.concat([[MID, MID + 1, depth - 1]]);
    }
    if (depth < MAX_DEPTH) {
      if (x === MID - 1 && y === MID) {
        const firstLine = Array(ROWS)
          .fill()
          .map((_, j) => [0, j, depth + 1]);
        return close.concat(firstLine);
      }
      if (x === MID + 1 && y === MID) {
        const firstLine = Array(ROWS)
          .fill()
          .map((_, j) => [COLS - 1, j, depth + 1]);
        return close.concat(firstLine);
      }
      if (x === MID && y === MID - 1) {
        const firstLine = Array(COLS)
          .fill()
          .map((_, i) => [i, 0, depth + 1]);
        return close.concat(firstLine);
      }
      if (x === MID && y === MID + 1) {
        const firstLine = Array(COLS)
          .fill()
          .map((_, i) => [i, ROWS - 1, depth + 1]);
        return close.concat(firstLine);
      }
    }
  }

  return close;
}

function bugRules(entry, bugNearCount) {
  // you are bug, find out if you die
  if (entry === "#") {
    if (bugNearCount === 1) return "#";
    return ".";
  }
  if (bugNearCount === 1 || bugNearCount === 2) return "#";
  return ".";
}

function getNextState(A, x, y) {
  const isBug = ([i, j]) => A[i][j] === "#";
  const bugNeighbours = getNeighbours(x, y).filter(isBug);
  const l = bugNeighbours.length;
  return bugRules(A[x][y], l);
}

function biodiversityScore(A) {
  return A.flatMap((row, i) =>
    row.map((cell, j) => (cell === "#" ? 2 ** (i * COLS + j) : 0))
  ).reduce((p, n) => p + n, 0);
}

function tick(A = []) {
  return A.map((row, i) => row.map((_, j) => getNextState(A, i, j)));
}

function copyState(state = []) {
  return JSON.parse(JSON.stringify(state));
}

function part1(rawInput) {
  const input = parseInput(rawInput);

  let state = copyState(input);
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

// depth goes from - 5 to 5
function getNextStateDeep(states, x, y, depth) {
  const isBug = ([i, j, otherDepth = depth]) =>
    states[otherDepth - MIN_DEPTH][i][j] === "#";
  const bugNeighbours = getNeighbours(x, y, depth).filter(isBug);
  const l = bugNeighbours.length;
  return bugRules(states[depth - MIN_DEPTH][x][y], l);
}

function tickDeep(states = [], depth) {
  const state = states[depth - MIN_DEPTH];
  return state.map((row, i) =>
    row.map((_, j) => getNextStateDeep(states, i, j, depth))
  );
}

function part2(rawInput) {
  rawInput = `....#
#..#.
#.?##
..#..
#....`;
  const input = parseInput(rawInput);
  let states = Array(11)
    .fill()
    .map(() => copyState(input));
  for (let i = 0; i < 10; i += 1) {
    states = states.map((state, depth) => tickDeep(states, depth + MIN_DEPTH));
  }
  return states;
}

module.exports = { part1, part2 };
