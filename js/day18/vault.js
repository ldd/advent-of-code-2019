const { shuffle } = require("../utils");

let vault = [];

const isPlayer = (x, y) => vault[y][x] === "@";
const isWall = (x, y) => vault[y][x] === "#";
const isDoor = (x, y) => /^[A-Z]$/.test(vault[y][x]);
const isKey = (x, y) => /^[a-z]$/.test(vault[y][x]);

function makeChildren(currentPosition) {
  return [
    [currentPosition[0], currentPosition[1] - 1],
    [currentPosition[0], currentPosition[1] + 1],
    [currentPosition[0] - 1, currentPosition[1]],
    [currentPosition[0] + 1, currentPosition[1]]
  ].filter(([x, y]) => vault[y] && vault[y][x] !== undefined);
}

function initialize(A = []) {
  vault = JSON.parse(JSON.stringify(A));
  let root = [];
  vault.some((line, y) =>
    line.some((entry, x) => {
      if (isPlayer(x, y)) {
        root = [x, y];
        return true;
      }
      return false;
    })
  );
  return root;
}

function exploreVault(root, keys = {}) {
  function dfs(node = root, depth = 0, nodes = {}, steps = 0) {
    nodes[node] = { visited: true };

    const [x, y] = node;
    if (isKey(x, y) && keys[vault[y][x]] === undefined) {
      steps += depth;
      return { node, steps };
    }
    let result = { node: null, steps };
    shuffle(makeChildren([x, y])).some(childKey => {
      const [i, j] = childKey;
      const isVisited = nodes[childKey] && nodes[childKey].visited;
      const doorKey = vault[j][i];
      const isClosedDoor =
        isDoor(i, j) && keys[doorKey.toLowerCase()] === undefined;
      if (!isWall(x, y) && !isVisited && !isClosedDoor) {
        nodes[childKey] = { visited: true };
        result = dfs(childKey, depth + 1, nodes, steps);
        return result.node !== null;
      }
      return false;
    });
    return result;
  }
  function runVault() {
    let { node, steps } = dfs();
    let sum = 0;
    while (node !== null) {
      const [x, y] = node;
      const key = vault[y][x];
      keys[key] = node;
      sum += steps;
      ({ node, steps } = dfs([x, y]));
    }
    return sum;
  }
  return runVault();
}

// less than 4144, more than 2000
function something(node) {
  let min = Infinity;
  for (let i = 0; i < 999; i += 1) {
    const result = exploreVault(node);
    if (min > result) min = result;
    console.log(min);
  }
  return min;
}
module.exports = { initialize, something };
